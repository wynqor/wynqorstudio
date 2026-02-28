import Header from './Header';
import Footer from './Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Fragment } from 'react';

interface CartProps {
  onHomeClick?: () => void;
  onLoginClick?: () => void;
  onBackToServices?: () => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
}

const Cart: React.FC<CartProps> = ({
  onHomeClick,
  onLoginClick,
  onBackToServices,
  onCheckout,
  onContinueShopping,
  onSearch,
  onCartClick
}) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    // Remove ₹ symbol and commas, then parse as float
    const cleanPrice = item.price.replace('₹', '').replace(/,/g, '');
    return sum + (parseFloat(cleanPrice) * item.quantity);
  }, 0);
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;

  const breadcrumbItems = [
    { label: 'Home', href: '#', onClick: onHomeClick },
    { label: 'Services', href: '#', onClick: onBackToServices },
    { label: 'Cart', href: '#', current: true }
  ];

  const handleQuantityChange = (serviceId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(serviceId, newQuantity);
  };

  const handleRemoveItem = (serviceId: string) => {
    removeFromCart(serviceId);
  };

  return (
    <div className="bg-slate-50 text-text-main font-body antialiased selection:bg-primary/20 selection:text-primary-dark">
      <Header
        onHomeClick={onHomeClick}
        onLoginClick={onLoginClick}
        onSearch={onSearch}
        onCartClick={onCartClick}
      />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white sticky top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex items-center h-14 text-sm text-slate-500">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pr-4">
              {breadcrumbItems.map((item, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="material-symbols-outlined text-[16px] text-slate-300">chevron_right</span>
                  )}
                  {item.current ? (
                    <span className="text-slate-900 font-semibold">{item.label}</span>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="w-full min-h-screen pb-24 pt-12">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <nav className="flex text-sm text-slate-500 mb-2">
                <button onClick={onHomeClick} className="hover:text-primary transition-colors">Home</button>
                <span className="mx-2 text-slate-300">/</span>
                <button onClick={onBackToServices} className="hover:text-primary transition-colors">Services</button>
                <span className="mx-2 text-slate-300">/</span>
                <span className="text-primary font-medium">Cart</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary">Your Service Cart</h1>
            </div>
            <div className="text-slate-500 text-sm font-medium bg-slate-100 px-4 py-2 rounded-full border border-slate-200/50">
              <span className="text-secondary font-bold">{cartItems.length}</span> Services pending request
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="size-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-slate-400">shopping_cart</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Your cart is empty</h2>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                Start building your dream project by adding some creative services to your cart.
              </p>
              <button
                onClick={onContinueShopping}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
              {/* Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="group flex flex-col sm:flex-row bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                    <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 rounded-xl overflow-hidden relative bg-slate-100">
                      <img
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={item.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="flex-1 flex flex-col pt-4 sm:pt-1 sm:pl-6">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wide mb-2">
                            {item.category}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">{item.title}</h3>
                        </div>
                        <span className="text-xl font-black text-secondary tracking-tight">{item.price}</span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {item.title} - Perfect for businesses looking to make a professional impression.
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 flex items-center justify-center transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="w-12 text-center font-bold text-secondary">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 flex items-center justify-center transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                            Delivery: <span className="font-bold text-secondary">{item.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                            <span className="material-symbols-outlined text-[16px] text-yellow-500 fill">star</span>
                            {item.rating} Rating
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors group/remove"
                        >
                          <span className="material-symbols-outlined text-[16px] group-hover/remove:fill">delete</span>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                  <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
                    <h2 className="text-xl font-bold text-secondary font-display mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <span>Service Fees (5%)</span>
                        <span className="font-medium">₹{serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <span>Total Service Count</span>
                        <span className="font-medium">{cartItems.length} Items</span>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 mb-8">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Estimated Total</span>
                        <span className="text-3xl font-black text-secondary">₹{total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 text-right">Taxes calculated at checkout</p>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            onCheckout?.();
                          } else {
                            onLoginClick?.();
                          }
                        }}
                        className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        {isAuthenticated ? 'Proceed to Request Services' : 'Login to Continue'}
                        <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                      </button>
                      <button
                        onClick={onContinueShopping}
                        className="w-full py-3.5 px-6 bg-transparent border-2 border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm font-bold">arrow_back</span>
                        Continue Shopping
                      </button>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      Secure checkout powered by Wynqor
                    </div>
                  </div>

                  {/* Payment Method Icons */}
                  <div className="mt-6 flex justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    <div className="h-6 w-10 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
