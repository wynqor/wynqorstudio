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
}

const Dashboard = ({ onHomeClick, onLoginClick, onSearch, onCartClick, onServiceDetails }: DashboardProps) => {
  const { user } = useAuth();
  const { cartItems, getCartTotal } = useCart();
  const { watchItems, removeFromWatchlist } = useWatchlist();
  const requests = (() => {
    try {
      const key = user?.email ? `wynqor-requests:${user.email}` : 'wynqor-requests';
      const raw = localStorage.getItem(key) || localStorage.getItem('wynqor-requests');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header onHomeClick={onHomeClick} onLoginClick={onLoginClick} onSearch={onSearch} onCartClick={onCartClick} />
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
