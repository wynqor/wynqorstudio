import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
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

    await transporter.sendMail({
      from: fromAddress,
      to: clientTo,
      subject: clientSubject,
      text: clientBody,
      html: clientHtml,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: companyAddress,
      subject: companySubject,
      text: companyBody,
      html: companyHtml,
      attachments: jsonAttachments,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('❌ /api/sendMail error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
}
