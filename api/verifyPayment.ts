import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    if (!keySecret) {
      return res.status(500).json({ success: false, error: 'Razorpay secret not configured.' });
    }
    const { order_id, payment_id, signature } = (req.body || {}) as any;
    if (!order_id || !payment_id || !signature) {
      return res.status(400).json({ success: false, error: 'Missing fields.' });
    }
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${order_id}|${payment_id}`);
    const digest = hmac.digest('hex');
    const ok = digest === signature;
    return res.json({ success: ok });
  } catch {
    return res.status(500).json({ success: false, error: 'Verification failed.' });
  }
}
