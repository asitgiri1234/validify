import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/80">
        <ShieldAlert className="h-8 w-8 text-amber-400" aria-hidden />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:from-brand-500 hover:to-indigo-500"
      >
        <Home className="h-4 w-4" aria-hidden />
        Back to Validify
      </Link>
    </div>
  );
}
