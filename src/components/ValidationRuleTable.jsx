import { Inbox, Loader2 } from 'lucide-react';
import ValidationRuleRow from './ValidationRuleRow.jsx';

export default function ValidationRuleTable({ rules, loading, error, busyIds, onToggleRule, onRetry }) {
  if (loading) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" aria-hidden />
        <p className="text-sm">Loading validation rules…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-xl border border-rose-500/20 bg-rose-950/20 p-10 text-center">
        <p className="text-sm text-rose-200">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!rules.length) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900/30 p-10 text-slate-400">
        <Inbox className="h-10 w-10 text-slate-600" aria-hidden />
        <p className="text-sm">No validation rules returned. Use &quot;Get Validation Rules&quot; to refresh.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 shadow-inner">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-900/80">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-300">
                Rule Name
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-300">
                Description
              </th>
              <th scope="col" className="px-4 py-3 font-semibold text-slate-300">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right font-semibold text-slate-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {rules.map((rule) => (
              <ValidationRuleRow
                key={rule.id}
                rule={rule}
                busy={busyIds.has(rule.id)}
                onToggle={onToggleRule}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
