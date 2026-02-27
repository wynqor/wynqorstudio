import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import multer from 'multer';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

const corsOrigin =
  process.env.CORS_ORIGIN ||
  ((origin, callback) => {
    // Allow server-to-server requests (like Vite proxy) and same-machine dev origins.
    if (!origin) return callback(null, true);
    if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  });
app.use(
  cors({
    origin: corsOrigin,
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);

app.use(express.json({ limit: '1mb' }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 5,
  },
});

const smtpUser = process.env.EMAIL_USER;
const smtpPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

if (!smtpUser || !smtpPass) {
  console.warn('⚠️ Missing EMAIL_USER / EMAIL_PASS in environment');
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

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/sendMail', upload.array('files', 5), async (req, res) => {
  try {
    const {
      clientTo,
      clientSubject,
      clientBody,
      companyTo,
      companySubject,
      companyBody,
    } = req.body || {};

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ success: false, error: 'Server email credentials not configured.' });
    }

    if (!clientTo || !clientSubject || !clientBody || !companyTo || !companySubject || !companyBody) {
      return res.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    const fromAddress = process.env.EMAIL_FROM || smtpUser;
    const companyAddress = process.env.EMAIL_TO || companyTo;

    const uploadedFiles = (req.files || []).map((f) => ({
      filename: f.originalname,
      content: f.buffer,
      contentType: f.mimetype,
    }));

    // Send client confirmation (no attachments)
    await transporter.sendMail({
      from: fromAddress,
      to: clientTo,
      subject: clientSubject,
      text: clientBody,
    });

    // Send company notification (with attachments)
    await transporter.sendMail({
      from: fromAddress,
      to: companyAddress,
      subject: companySubject,
      text: companyBody,
      attachments: uploadedFiles,
    });

    return res.json({ success: true });
  } catch (err) {
    console.error('❌ /api/sendMail error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send email.' });
  }
});

const port = Number(process.env.PORT || 3001);
const server = app.listen(port, () => {
  console.log(`✅ Email server running on http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use. Stop the other process or set PORT=3002 and retry.`);
    process.exit(1);
  }
  console.error('❌ Server error:', err);
  process.exit(1);
});

