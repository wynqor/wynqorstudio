import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWatchlist } from '../context/WatchlistContext';

interface DashboardProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onServiceDetails?: (serviceId: string) => void;
  onAboutClick?: () => void;
  onCareersClick?: () => void;
  onBlogClick?: () => void;
  onHelpClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
}

const Dashboard = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onServiceDetails, onAboutClick, onCareersClick, onBlogClick, onHelpClick, onTermsClick, onPrivacyClick }: DashboardProps) => {
  const { user } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const { watchItems, removeFromWatchlist } = useWatchlist();
  const paymentsStorageKey = user?.email ? `wynqor-payments:${user.email}` : 'wynqor-payments';
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [selectedRequest, setSelectedRequest] = React.useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = React.useState<'UPI' | 'Bank Transfer' | 'Card (Mock)'>('UPI');
  const [paymentRef, setPaymentRef] = React.useState('');
  const [paymentNote, setPaymentNote] = React.useState('');
  const [isPaying, setIsPaying] = React.useState(false);
  const razorpayKey = (import.meta as any).env.VITE_RAZORPAY_KEY_ID || '';
  const payments = (() => {
    try {
      const raw = localStorage.getItem(paymentsStorageKey) || localStorage.getItem('wynqor-payments');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  })() as Record<string, { status: 'Unpaid' | 'Paid' | 'Failed'; method?: string; ref?: string; note?: string; paidAt?: string }>;
  const getPaymentStatus = (reqId: string) => payments[reqId]?.status || 'Unpaid';
  const bankInfo = { account: 'Wynqor Pvt Ltd', number: '0000000000', ifsc: 'BANK0000000' };
  const requests = (() => {
    try {
      const key = user?.email ? `wynqor-requests:${user.email}` : 'wynqor-requests';
      const raw = localStorage.getItem(key) || localStorage.getItem('wynqor-requests');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  const openPaymentFor = (req: any) => {
    setSelectedRequest(req);
    setPaymentMethod('UPI');
    setPaymentRef('');
    setPaymentNote('');
    setShowPaymentModal(true);
  };

  const savePayment = (reqId: string, record: { status: 'Unpaid' | 'Paid' | 'Failed'; method?: string; ref?: string; note?: string; paidAt?: string }) => {
    try {
      const raw = localStorage.getItem(paymentsStorageKey);
      const obj = raw ? JSON.parse(raw) : {};
      obj[reqId] = record;
      localStorage.setItem(paymentsStorageKey, JSON.stringify(obj));
    } catch {
      try {
        const raw = localStorage.getItem('wynqor-payments');
        const obj = raw ? JSON.parse(raw) : {};
        obj[reqId] = record;
        localStorage.setItem('wynqor-payments', JSON.stringify(obj));
      } catch { void 0; }
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    const record = {
      status: 'Paid' as const,
      method: paymentMethod,
      ref: paymentRef,
      note: paymentNote,
      paidAt: new Date().toISOString()
    };
    savePayment(selectedRequest.requestId, record);
    setShowPaymentModal(false);
  };

  const loadScript = (src: string) =>
    new Promise<boolean>((resolve) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  const startRazorpayUpi = async () => {
    if (!selectedRequest) return;
    setIsPaying(true);
    try {
      const resp = await fetch('/api/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(selectedRequest.total || 0),
          currency: 'INR',
          receipt: selectedRequest.requestId,
          notes: { email: user?.email || '' }
        })
      });
      const data = await resp.json().catch(() => null);
      if (!data?.success) throw new Error(data?.error || 'Failed to create order');
      const ok = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!ok) throw new Error('Failed to load Razorpay');
      const order = data.order;
      const options: any = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Wynqor',
        description: 'Service Payment',
        order_id: order.id,
        notes: { requestId: selectedRequest.requestId },
        prefill: { email: user?.email || '', name: user?.name || '' },
        theme: { color: '#3b82f6' },
        handler: async function (response: any) {
          const verifyResp = await fetch('/api/verifyPayment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: order.id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature
            })
          });
          const v = await verifyResp.json().catch(() => null);
          if (v?.success) {
            savePayment(selectedRequest.requestId, {
              status: 'Paid',
              method: 'Razorpay UPI',
              ref: response.razorpay_payment_id,
              note: paymentNote,
              paidAt: new Date().toISOString()
            });
            setShowPaymentModal(false);
          }
        },
        method: { upi: true, card: false, netbanking: false, wallet: false }
      };
      const rz = new (window as any).Razorpay(options);
      rz.open();
    } catch (e) {
      setShowPaymentModal(false);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header onHomeClick={onHomeClick} onLoginClick={onLoginClick} onSearch={onSearch} onCartClick={onCartClick} onUserClick={onHomeClick} />
      <main className="w-full min-h-screen pb-24 pt-12">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-6 space-y-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">Dashboard</h1>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Account</h2>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full bg-cover bg-center ring-2 ring-white shadow-md" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                <div>
                  <div className="text-slate-800 font-bold">{user.name}</div>
                  <div className="text-slate-500 text-sm">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="text-slate-600">Please login to view your dashboard.</div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary">Cart</h2>
              <div className="text-sm text-slate-600">Total: ₹{getCartTotal().toFixed(2)}</div>
            </div>
            {cartItems.length === 0 ? (
              <div className="text-slate-600">Your cart is empty.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onServiceDetails?.(item.id)}
                    className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="size-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                        <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800">{item.title}</div>
                        <div className="text-sm text-slate-500">{item.category}</div>
                        <div className="text-sm font-bold text-primary">{item.price} × {item.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Watchlist</h2>
            {watchItems.length === 0 ? (
              <div className="text-slate-600">No items in your watchlist.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {watchItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onServiceDetails?.(item.id)}
                    className="border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="size-16 rounded-lg bg-slate-100 shrink-0 overflow-hidden border border-slate-100">
                        <img alt={item.title} className="w-full h-full object-cover" src={item.image} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-800">{item.title}</div>
                        <div className="text-sm text-slate-500">{item.category}</div>
                        <div className="text-sm font-bold text-primary">{item.price}</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFromWatchlist(item.id); }}
                        className="text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove from Watchlist"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-secondary mb-4">Previous Requests</h2>
            {requests.length === 0 ? (
              <div className="text-slate-600">No previous requests recorded.</div>
            ) : (
              <div className="space-y-4">
                {requests.map((req: any, idx: number) => (
                  <div key={`${req.requestId}-${idx}`} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-800">{req.requestId}</div>
                      <div className="text-sm text-slate-500">{new Date(req.submittedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                    </div>
                    <div className="text-sm text-slate-600 mt-2">Total: ₹{Number(req.total || 0).toFixed(2)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getPaymentStatus(req.requestId) === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {getPaymentStatus(req.requestId)}
                      </span>
                      {getPaymentStatus(req.requestId) !== 'Paid' && (
                        <button onClick={() => openPaymentFor(req)} className="text-xs font-bold px-3 py-1 rounded bg-primary text-white hover:bg-primary-dark">
                          Pay Now
                        </button>
                      )}
                      {getPaymentStatus(req.requestId) === 'Paid' && (
                        <button onClick={() => openPaymentFor(req)} className="text-xs font-bold px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50">
                          View Payment
                        </button>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="text-xs font-bold text-slate-600 mb-1">Services in this request:</div>
                      <ul className="text-xs text-slate-500 space-y-1">
                        {(req.cartItems || []).map((it: any, i: number) => (
                          <li key={`${it.id}-${i}`}>{it.title} • {it.category} • {it.price}{it.quantity > 1 ? ` × ${it.quantity}` : ''}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          {showPaymentModal && selectedRequest && (
            <section className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
              <div className="w-full max-w-[640px] mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-secondary font-display">Payment for {selectedRequest.requestId}</h3>
                  <button onClick={() => setShowPaymentModal(false)} className="text-slate-500 hover:text-primary">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="mt-3 text-sm text-slate-600">Amount Due: <span className="font-bold text-secondary">₹{Number(selectedRequest.total || 0).toFixed(2)}</span></div>
                <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as any)} className="w-full px-3 py-2 rounded-lg border border-slate-200">
                      <option>UPI</option>
                      <option>Bank Transfer</option>
                      <option>Card (Mock)</option>
                    </select>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      Scan and pay using UPI. Click the button below to open UPI QR and complete payment.
                      <div className="mt-3">
                        <button disabled={!razorpayKey || isPaying} onClick={startRazorpayUpi} className="px-4 py-2 rounded-lg bg-primary text-white font-bold disabled:bg-slate-400">
                          {isPaying ? 'Processing...' : 'Pay via UPI QR'}
                        </button>
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'Bank Transfer' && (
                    <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      Account: <span className="font-bold">{bankInfo.account}</span><br/>
                      Account No: <span className="font-bold">{bankInfo.number}</span><br/>
                      IFSC: <span className="font-bold">{bankInfo.ifsc}</span>
                    </div>
                  )}
                  {paymentMethod === 'Card (Mock)' && (
                    <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      Mock card payment for testing on Vercel free tier. No actual charge.
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Transaction/Reference ID</label>
                    <input value={paymentRef} onChange={e => setPaymentRef(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200" placeholder="e.g., UPI/Bank txn ID"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Note (optional)</label>
                    <textarea value={paymentNote} onChange={e => setPaymentNote(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200" rows={3} placeholder="Any additional info..."/>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white font-bold">Mark as Paid</button>
                    <button type="button" onClick={() => setShowPaymentModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold">Cancel</button>
                  </div>
                </form>
                {payments[selectedRequest.requestId]?.status === 'Paid' && (
                  <div className="mt-6 text-xs text-slate-600">
                    Current Status: <span className="font-bold text-emerald-700">Paid</span><br/>
                    Method: {payments[selectedRequest.requestId]?.method}<br/>
                    Ref: {payments[selectedRequest.requestId]?.ref}<br/>
                    Paid At: {new Date(payments[selectedRequest.requestId]?.paidAt || '').toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer
        onAboutClick={onAboutClick}
        onCareersClick={onCareersClick}
        onBlogClick={onBlogClick}
        onHelpClick={onHelpClick}
        onTermsClick={onTermsClick}
        onPrivacyClick={onPrivacyClick}
      />
    </div>
  );
};

export default Dashboard;
