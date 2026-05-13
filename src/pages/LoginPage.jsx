import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Cloud, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import LandingFooter from '../components/LandingFooter.jsx';
import PageLoader from '../components/PageLoader.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { status, isAuthenticated, login } = useAuth();
  const [connecting, setConnecting] = useState(false);

  async function handleConnect() {
    setConnecting(true);
    try {
      await login();
      navigate('/dashboard');
    } catch (e) {
      const msg =
        e?.response?.data?.error || e?.message || 'Could not reach the server. Is the API running?';
      toast.error(msg);
    } finally {
      setConnecting(false);
    }
  }

  function scrollToLearn() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950">
        <PageLoader label="Loading Validify…" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-950 to-slate-950" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-600/15 blur-3xl" />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-8 flex items-center justify-center gap-2 text-brand-300">
            <Cloud className="h-5 w-5" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-widest">Salesforce-ready (mock)</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-card backdrop-blur-xl sm:p-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 shadow-lg shadow-brand-900/50">
                <Sparkles className="h-7 w-7 text-white" aria-hidden />
              </div>
            </div>

            <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Validify</h1>
            <p className="mt-3 text-center text-lg text-slate-300">
              Manage Salesforce Validation Rules Effortlessly
            </p>
            <p className="mt-4 text-center text-sm leading-relaxed text-slate-400">
              Connect your Salesforce org and enable or disable validation rules from a clean centralized
              dashboard.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={handleConnect}
                disabled={connecting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:from-brand-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {connecting ? 'Connecting…' : 'Connect to Salesforce'}
                {!connecting && <ArrowRight className="h-4 w-4" aria-hidden />}
              </button>
              <button
                type="button"
                onClick={scrollToLearn}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-900 sm:flex-none"
              >
                Learn More
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              OAuth and live Salesforce APIs ship in a later milestone. This flow calls{' '}
              <code className="rounded bg-slate-800 px-1 py-0.5 font-mono text-[10px] text-slate-300">
                GET /api/auth/login
              </code>{' '}
              and stores a session cookie before opening the dashboard.
            </p>
          </div>
        </div>

        <section id="features" className="mx-auto mt-20 max-w-2xl scroll-mt-24">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            Why Validify
          </h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            {[
              'Operate validation rules from a focused admin experience instead of scattered setup pages.',
              'Bulk enable or disable with guardrails and a clear deploy step when APIs are connected.',
              'Built for teams who need enterprise polish today and Salesforce depth tomorrow.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
