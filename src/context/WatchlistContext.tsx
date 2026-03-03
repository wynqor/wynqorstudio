import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Service } from '../data/servicesData';
import { useAuth } from './AuthContext';
import { useToast } from '../components/ToastProvider';

export interface WatchItem extends Service {}

interface WatchlistContextType {
  watchItems: WatchItem[];
  addToWatchlist: (service: Service) => void;
  removeFromWatchlist: (serviceId: string) => void;
  isInWatchlist: (serviceId: string) => boolean;
  getWatchCount: () => number;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchItems, setWatchItems] = useState<WatchItem[]>([]);
  const { user } = useAuth();
  const storageKey = `wynqor-watchlist${user?.email ? `:${user.email}` : ''}`;
  const { addToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || localStorage.getItem('wynqor-watchlist');
    if (saved) {
      try {
        setWatchItems(JSON.parse(saved));
      } catch {
        setWatchItems([]);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(watchItems));
  }, [watchItems, storageKey]);

  const addToWatchlist = (service: Service) => {
    setWatchItems(prev => {
      if (prev.some(item => item.id === service.id)) return prev;
      addToast({ type: 'success', title: 'Saved to Watchlist', message: service.title });
      return [...prev, service];
    });
  };

  const removeFromWatchlist = (serviceId: string) => {
    setWatchItems(prev => {
      const found = prev.find(i => i.id === serviceId);
      const next = prev.filter(item => item.id !== serviceId);
      if (found) addToast({ type: 'info', title: 'Removed from Watchlist', message: found.title });
      return next;
    });
  };

  const isInWatchlist = (serviceId: string) => {
    return watchItems.some(item => item.id === serviceId);
  };

  const getWatchCount = () => watchItems.length;

  const clearWatchlist = () => setWatchItems([]);

  const value: WatchlistContextType = {
    watchItems,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    getWatchCount,
    clearWatchlist,
  };

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
};
