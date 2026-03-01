import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { services, categories } from '../data/servicesData';
import logo from '../images/logo1.jpeg';

interface HeaderProps {
  onLoginClick?: () => void;
  onHomeClick?: () => void;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onProviderClick?: () => void;
  onUserClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onHomeClick, onSearch, onCartClick, onProviderClick, onUserClick }) => {
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const categoryButtonRef = useRef<HTMLButtonElement | null>(null);
  const suggestionBoxRef = useRef<HTMLDivElement | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalQuery = searchQuery.trim() || (selectedCategory !== 'All Categories' ? selectedCategory : '');
    if (finalQuery && onSearch) {
      onSearch(finalQuery);
      setShowSuggestions(false);
      setHighlightIndex(-1);
    }
  };
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return services.slice(0, 8).map(s => ({ type: 'service', label: s.title }));
    }
    const byTitle = services.filter(s => s.title.toLowerCase().includes(q)).slice(0, 6).map(s => ({ type: 'service', label: s.title }));
    const byCategory = categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 4).map(c => ({ type: 'category', label: c.name }));
    return [...byTitle, ...byCategory];
  }, [searchQuery]);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setShowCategoryMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0 && suggestions[highlightIndex]) {
      e.preventDefault();
      const sel = suggestions[highlightIndex];
      if (sel.type === 'category') {
        setSelectedCategory(sel.label);
        if (onSearch) onSearch(sel.label);
      } else {
        if (onSearch) onSearch(sel.label);
      }
      setShowSuggestions(false);
      setHighlightIndex(-1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setHighlightIndex(-1);
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
            <img src={logo} alt="Wynqor" className="size-9 rounded-xl shadow-lg shadow-primary/20 object-cover" />
            <h1 className="text-2xl font-bold tracking-tight text-secondary font-display">Wynqor<span className="text-primary text-3xl leading-none">.</span></h1>
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              type="button"
              ref={categoryButtonRef}
              onClick={() => setShowCategoryMenu(v => !v)}
              className="h-full w-44 pl-4 pr-3 flex items-center justify-between gap-1 text-xs font-semibold text-slate-600 hover:text-primary border-r border-slate-200 hover:bg-slate-50 rounded-l-full transition-colors"
            >
              <span className="truncate max-w-[8.5rem]">{selectedCategory}</span>
              <span className="material-symbols-outlined text-sm">{showCategoryMenu ? 'expand_less' : 'expand_more'}</span>
            </button>
          </div>
          <input
            ref={inputRef}
            className="w-full bg-slate-100/80 border border-slate-200/50 hover:bg-white focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-full py-3 pl-52 pr-12 text-sm transition-all shadow-inner"
            placeholder="Find services like 'Logo Design'..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          {showCategoryMenu && (
            <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
              <ul className="max-h-64 overflow-auto py-2">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setShowCategoryMenu(false);
                      if (onSearch) onSearch('');
                    }}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                      onClick={() => {
                        setSelectedCategory(c.name);
                        setShowCategoryMenu(false);
                        if (onSearch) onSearch(c.name);
                      }}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionBoxRef} className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
              <ul className="max-h-80 overflow-auto py-2">
                {suggestions.map((s, idx) => (
                  <li key={`${s.type}-${s.label}-${idx}`}>
                    <button
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 ${highlightIndex === idx ? 'bg-slate-100' : ''}`}
                      onMouseEnter={() => setHighlightIndex(idx)}
                      onMouseLeave={() => setHighlightIndex(-1)}
                      onClick={() => {
                        if (s.type === 'category') {
                          setSelectedCategory(s.label);
                          if (onSearch) onSearch(s.label);
                        } else {
                          if (onSearch) onSearch(s.label);
                        }
                        setShowSuggestions(false);
                        setHighlightIndex(-1);
                      }}
                    >
                      <span className="material-symbols-outlined text-slate-500 text-base">{s.type === 'category' ? 'category' : 'search'}</span>
                      <span className="font-medium text-slate-700">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button onClick={() => setMobileSearchOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full">
            <span className="material-symbols-outlined">search</span>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {onProviderClick && (
              <button onClick={onProviderClick} className="hover:text-primary transition-colors bg-transparent border-none cursor-pointer">Become a Provider</button>
            )}
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
              <div className="flex items-center gap-3 pl-2 cursor-pointer group" onClick={onUserClick}>
                <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-white shadow-md group-hover:ring-primary transition-all" style={{ backgroundImage: `url(${user.avatar})` }}></div>
                <div className="hidden md:flex flex-col">
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); logout(); }}
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
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto overscroll-contain relative">
          <div className="flex items-center gap-2 p-3 border-b border-slate-200">
            <button onClick={() => setMobileSearchOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-600">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <form onSubmit={(e) => {
              e.preventDefault();
              const finalQuery = searchQuery.trim() || (selectedCategory !== 'All Categories' ? selectedCategory : '');
              if (finalQuery && onSearch) {
                onSearch(finalQuery);
                setMobileSearchOpen(false);
                setShowSuggestions(false);
              }
            }} className="flex-1 relative">
              <input
                ref={mobileInputRef}
                autoFocus
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2.5 pl-4 pr-10 text-sm"
                placeholder="Search services"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
          <div className="p-3 bg-white">
            <div className="mb-2 text-xs font-bold text-slate-500">Suggestions</div>
            <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-md">
              {suggestions.map((s, idx) => (
                <button
                  key={`${s.type}-${s.label}-m-${idx}`}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
                  onClick={() => {
                    if (s.type === 'category') {
                      setSelectedCategory(s.label);
                      if (onSearch) onSearch(s.label);
                    } else {
                      if (onSearch) onSearch(s.label);
                    }
                    setMobileSearchOpen(false);
                  }}
                >
                  <span className="material-symbols-outlined text-slate-500 text-base">{s.type === 'category' ? 'category' : 'search'}</span>
                  <span className="font-medium text-slate-700">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
