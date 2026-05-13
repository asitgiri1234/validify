import { Activity, ShieldCheck, ShieldOff } from 'lucide-react';

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-inner">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" aria-hidden />
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export default function DashboardStats({ rules }) {
  const total = rules.length;
  const active = rules.filter((r) => r.active).length;
  const inactive = total - active;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard icon={Activity} label="Total rules" value={total} hint="From mock API store" />
      <StatCard icon={ShieldCheck} label="Active" value={active} hint="Enforced when deployed" />
      <StatCard icon={ShieldOff} label="Inactive" value={inactive} hint="Skipped at runtime" />
    </div>
  );
}
