import StatusBadge from './StatusBadge.jsx';
import ActionButtons from './ActionButtons.jsx';

export default function ValidationRuleRow({ rule, busy, onToggle }) {
  return (
    <tr className="border-b border-slate-800/80 last:border-0">
      <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-slate-100">{rule.name}</td>
      <td className="max-w-md px-4 py-3 text-sm text-slate-400">{rule.description}</td>
      <td className="px-4 py-3">
        <StatusBadge active={rule.active} />
      </td>
      <td className="px-4 py-3 text-right">
        <ActionButtons active={rule.active} disabled={busy} onToggle={() => onToggle(rule.id)} />
      </td>
    </tr>
  );
}
