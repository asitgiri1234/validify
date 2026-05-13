import { Loader2 } from 'lucide-react';

export default function PageLoader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="h-10 w-10 animate-spin text-brand-400" aria-hidden />
      <p className="text-sm">{label}</p>
    </div>
  );
}
