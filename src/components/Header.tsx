import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onLoginClick?: () => void;
  onHomeClick?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onHomeClick, onSearch, onCartClick }) => {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group bg-transparent border-none cursor-pointer"
          >
            <div className="size-9 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center text-white font-black text-xl group-hover:bg-primary-dark transition-colors">W</div>
            <h1 className="text-2xl font-bold tracking-tight text-secondary font-display">Wynqor<span className="text-primary text-3xl leading-none">.</span></h1>
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              className="h-full pl-4 pr-3 flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-primary border-r border-slate-200 hover:bg-slate-50 rounded-l-full transition-colors"
            >
              All Categories <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
          <input
            className="w-full bg-slate-100/80 border border-slate-200/50 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-full py-3 pl-36 pr-12 text-sm transition-all shadow-inner"
            placeholder="Find services like 'Logo Design'..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined">search</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {/* <a className="hover:text-primary transition-colors" href="#">Explore</a>
            <a className="hover:text-primary transition-colors" href="#">Enterprise</a> */}
            <a className="hover:text-primary transition-colors" href="#">Become a Provider</a>
          </nav>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-full transition-all group"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 size-5 bg-rose-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-white leading-none">{getCartCount()}</span>
                </span>
              )}
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-white shadow-md group-hover:ring-primary transition-all" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Logout"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">login</span>
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

