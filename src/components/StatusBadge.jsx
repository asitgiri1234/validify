export default function StatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
        active
          ? 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/30'
          : 'bg-slate-500/10 text-slate-300 ring-slate-500/30'
      }`}
    >
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}
