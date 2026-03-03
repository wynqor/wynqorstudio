import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || '';
    const smtpPass = rawPass.replace(/\s+/g, '');

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ success: false, error: 'Server email credentials not configured.' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const {
      clientTo,
      clientSubject,
      clientBody,
      companyTo,
      companySubject,
      companyBody,
      attachments,
      clientHtml,
      companyHtml,
    } = (req.body || {}) as Record<string, any>;

    if (!clientTo || !clientSubject || !clientBody || !companyTo || !companySubject || !companyBody) {
      return res.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    const fromAddress = process.env.EMAIL_FROM || smtpUser;
    const companyAddress = process.env.EMAIL_TO || companyTo;

    const jsonAttachments = Array.isArray(attachments)
      ? attachments
          .filter((a) => a && a.filename && a.content)
          .map((a) => ({
            filename: a.filename,
            content: Buffer.from(a.content, 'base64'),
            contentType: a.contentType || undefined,
          }))
      : [];

    // Inline brand logo (cid) for email template
    let brandLogoAttachment: any = null;
    try {
      const logoFile = path.resolve(process.cwd(), 'src/images/logo1.jpeg');
      if (fs.existsSync(logoFile)) {
        const logoBuf = fs.readFileSync(logoFile);
        brandLogoAttachment = {
          filename: 'logo1.jpeg',
          content: logoBuf,
          cid: 'brand-logo',
          contentType: 'image/jpeg',
        };
      }
    } catch {}

    await transporter.sendMail({
      from: fromAddress,
      to: clientTo,
      subject: clientSubject,
      text: clientBody,
      html: clientHtml,
      attachments: brandLogoAttachment ? [brandLogoAttachment] : undefined,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: companyAddress,
      subject: companySubject,
      text: companyBody,
      html: companyHtml,
      attachments: brandLogoAttachment ? [brandLogoAttachment, ...jsonAttachments] : jsonAttachments,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('❌ /api/sendMail error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
}
