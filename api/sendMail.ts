import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const smtpUser = process.env.EMAIL_USER;
  const smtpPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ success: false, error: 'Server email credentials not configured.' });
  }

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

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const fromAddress = process.env.EMAIL_FROM || smtpUser;
    const companyAddress = process.env.EMAIL_TO || companyTo;

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
      attachments:
        Array.isArray(attachments)
          ? attachments
              .filter((a) => a && a.filename && a.content)
              .map((a) => ({
                filename: a.filename,
                content: Buffer.from(a.content, 'base64'),
                contentType: a.contentType || undefined,
              }))
          : undefined,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ /api/sendMail error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
}
