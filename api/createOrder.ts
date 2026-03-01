import type { VercelRequest, VercelResponse } from '@vercel/node';
import Razorpay from 'razorpay';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  try {
    const keyId = process.env.RAZORPAY_KEY_ID || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    if (!keyId || !keySecret) {
      return res.status(500).json({ success: false, error: 'Razorpay credentials not configured.' });
    }
    const { amount, currency, receipt, notes } = (req.body || {}) as any;
    const amt = Number(amount || 0);
    if (!amt || amt <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid amount.' });
    }
    const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await instance.orders.create({
      amount: Math.round(amt * 100),
      currency: (currency || 'INR') as any,
      receipt: receipt || `REQ-${Date.now()}`,
      notes: notes || {}
    } as any);
    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to create order.' });
  }
}
