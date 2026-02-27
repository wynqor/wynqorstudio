import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Extend Window interface for Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
          revoke: (token: string, callback: () => void) => void;
        };
      };
    };
  }
}


export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google';
  googleId?: string;
  accessToken?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  initializeGoogleAuth: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  // Load user from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('wynqor-user');
      const savedToken = localStorage.getItem('wynqor-google-token');

      if (savedUser && savedToken) {
        try {
          const userData = JSON.parse(savedUser);
          // Check if token is still valid
          const isTokenValid = await refreshToken();
          if (isTokenValid) {
            setUser(userData);
          }
        } catch (error) {
          console.error('Failed to load user from localStorage:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('wynqor-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wynqor-user');
      localStorage.removeItem('wynqor-google-token');
      localStorage.removeItem('wynqor-token-expiry');
    }
  }, [user]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    // Sign out from Google if available
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect();
      window.google.accounts.id.revoke(localStorage.getItem('wynqor-google-token') || '', () => {
        console.log('Access token revoked');
      });
    }

    setUser(null);
    localStorage.removeItem('wynqor-user');
    localStorage.removeItem('wynqor-google-token');
    localStorage.removeItem('wynqor-token-expiry');
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      // For Google OAuth, tokens are typically valid for 1 hour
      // In a real implementation, you'd use the refresh token to get a new access token
      // For now, we'll check if the current token is still valid
      const token = localStorage.getItem('wynqor-google-token');
      const expiry = localStorage.getItem('wynqor-token-expiry');

      if (!token || !expiry) return false;

      // Check if token is expired (with 5 minute buffer)
      if (Date.now() >= (parseInt(expiry) - 300000)) {
        // Token expired or about to expire
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
    }
  };

  const initializeGoogleAuth = () => {
    if (!ENABLE_GOOGLE_AUTH) return;
    if (!GOOGLE_CLIENT_ID) return;
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    const el = document.getElementById('google-signin-button');
    if (el) {
      window.google.accounts.id.renderButton(el, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
      });
    }
  };

  const handleGoogleResponse = (response: any) => {
    if (response.credential) {
      // Decode JWT token to get user info
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));

      const userData: User = {
        id: decodedToken.sub,
        name: decodedToken.name,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        provider: 'google',
        googleId: decodedToken.sub,
        accessToken: response.credential,
      };

      // Store token and set expiry (Google tokens are valid for 1 hour)
      localStorage.setItem('wynqor-google-token', response.credential);
      localStorage.setItem('wynqor-token-expiry', (Date.now() + 3600000).toString());

      login(userData);
    }
  };

  // Load Google Identity Services script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (!ENABLE_GOOGLE_AUTH) return;
      if (!GOOGLE_CLIENT_ID) return;

      // Check if script is already loaded
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Failed to load Google Identity Services script');
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, [ENABLE_GOOGLE_AUTH, GOOGLE_CLIENT_ID]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    initializeGoogleAuth,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
