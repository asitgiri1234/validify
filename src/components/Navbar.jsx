import { LogOut, ShieldCheck } from 'lucide-react';

export default function Navbar({ onLogout, logoutDisabled }) {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 shadow-lg shadow-brand-900/40">
            <ShieldCheck className="h-6 w-6 text-white" aria-hidden />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">Validify</p>
            <p className="text-xs text-slate-500">Account validation rules</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden h-9 w-9 shrink-0 rounded-full border border-slate-700 bg-gradient-to-br from-slate-600 to-slate-800 sm:block"
            title="User avatar"
            role="img"
            aria-label="User avatar placeholder"
          />
          <button
            type="button"
            disabled={logoutDisabled}
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
