import React, { createContext, useContext, useCallback, useState, useEffect, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';
type Toast = { id: string; type: ToastType; title?: string; message: string };

interface ToastContextType {
  addToast: (t: { type: ToastType; message: string; title?: string; durationMs?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const typeStyles: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: '#ecfdf5', border: '#10b981', text: '#065f46', icon: 'check_circle' },
  error: { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d', icon: 'error' },
  info: { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a', icon: 'info' },
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(({ type, message, title, durationMs = 3500 }: { type: ToastType; message: string; title?: string; durationMs?: number }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, durationMs);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setToasts([]);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', right: 24, top: 24, display: 'flex', flexDirection: 'column', gap: 8, width: 'min(400px, 92vw)' }}>
          {toasts.map((t) => {
            const s = typeStyles[t.type];
            return (
              <div key={t.id} style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                color: s.text,
                borderRadius: 12,
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                pointerEvents: 'auto'
              }}>
                <span className="material-symbols-outlined" style={{ color: s.border }}> {s.icon} </span>
                <div style={{ flex: 1 }}>
                  {t.title && <div style={{ fontWeight: 800, marginBottom: 2 }}>{t.title}</div>}
                  <div style={{ fontWeight: 600 }}>{t.message}</div>
                </div>
                <button
                  onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                  style={{ background: 'transparent', border: 'none', color: s.text, cursor: 'pointer' }}
                  aria-label="Close notification"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
