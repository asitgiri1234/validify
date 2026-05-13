import { Power, PowerOff } from 'lucide-react';

export default function ActionButtons({ active, disabled, onToggle }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={active ? 'Disable rule' : 'Enable rule'}
      >
        {active ? (
          <>
            <PowerOff className="h-3.5 w-3.5" aria-hidden />
            Disable
          </>
        ) : (
          <>
            <Power className="h-3.5 w-3.5" aria-hidden />
            Enable
          </>
        )}
      </button>
    </div>
  );
}
