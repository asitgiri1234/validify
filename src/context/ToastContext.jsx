import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, ...toast }]);
      const duration = toast.duration ?? 4000;
      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss],
  );

  const value = useMemo(
    () => ({
      success: (message, options) => pushToast({ type: 'success', message, ...options }),
      error: (message, options) => pushToast({ type: 'error', message, ...options }),
    }),
    [pushToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-xl border px-4 py-3 shadow-card backdrop-blur ${
              t.type === 'success'
                ? 'border-emerald-500/30 bg-emerald-950/90 text-emerald-50'
                : 'border-rose-500/30 bg-rose-950/90 text-rose-50'
            }`}
            role="status"
          >
            {t.type === 'success' ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" aria-hidden />
            )}
            <p className="text-sm leading-relaxed">{t.message}</p>
            <button
              type="button"
              className="ml-1 shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => dismiss(t.id)}
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
