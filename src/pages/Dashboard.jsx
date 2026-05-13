import { useCallback, useEffect, useState } from 'react';
import { CloudUpload, Loader2, RefreshCw, ShieldOff, ShieldPlus } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import ValidationRuleTable from '../components/ValidationRuleTable.jsx';
import DashboardStats from '../components/DashboardStats.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { validationApi } from '../services/api.js';
import { useToast } from '../context/ToastContext.jsx';

function parseError(e) {
  return e?.response?.data?.error || e?.message || 'Something went wrong.';
}

export default function Dashboard() {
  const toast = useToast();
  const { user, logout } = useAuth();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [deployBusy, setDeployBusy] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set());

  const fetchRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await validationApi.getRules();
      if (data?.success && Array.isArray(data.data)) {
        setRules(data.data);
      } else {
        setRules([]);
        setError('Unexpected response from server.');
      }
    } catch (e) {
      setError(parseError(e));
      setRules([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  async function handleToggleRule(id) {
    setBusyIds((prev) => new Set(prev).add(id));
    try {
      const { data } = await validationApi.toggleRule(id);
      if (data?.success && Array.isArray(data.data)) setRules(data.data);
      else toast.error('Could not update rule.');
    } catch (e) {
      toast.error(parseError(e));
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  async function handleToggleAll(active) {
    setBulkBusy(true);
    try {
      const { data } = await validationApi.toggleAll(active);
      if (data?.success && Array.isArray(data.data)) setRules(data.data);
      else toast.error('Could not update rules.');
    } catch (e) {
      toast.error(parseError(e));
    } finally {
      setBulkBusy(false);
    }
  }

  async function handleDeploy() {
    setDeployBusy(true);
    try {
      const { data } = await validationApi.deploy();
      if (data?.success) {
        toast.success(data.message || 'Deployed successfully.');
      } else {
        toast.error('Deploy failed.');
      }
    } catch (e) {
      toast.error(parseError(e));
    } finally {
      setDeployBusy(false);
    }
  }

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">
              Mock data from the Express API. Wire Salesforce when you are ready.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <DashboardStats rules={rules} />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={fetchRules}
            disabled={loading || bulkBusy}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden />
            Get Validation Rules
          </button>
          <button
            type="button"
            onClick={() => handleToggleAll(true)}
            disabled={loading || bulkBusy || deployBusy}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bulkBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <ShieldPlus className="h-4 w-4" aria-hidden />
            )}
            Enable All
          </button>
          <button
            type="button"
            onClick={() => handleToggleAll(false)}
            disabled={loading || bulkBusy || deployBusy}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 ring-1 ring-slate-700 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bulkBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <ShieldOff className="h-4 w-4" aria-hidden />
            )}
            Disable All
          </button>
          <button
            type="button"
            onClick={handleDeploy}
            disabled={loading || bulkBusy || deployBusy}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-900/30 transition hover:from-brand-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deployBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <CloudUpload className="h-4 w-4" aria-hidden />
            )}
            Deploy Changes
          </button>
        </div>

        <div className="mt-8">
          <ValidationRuleTable
            rules={rules}
            loading={loading}
            error={error}
            busyIds={busyIds}
            onToggleRule={handleToggleRule}
            onRetry={fetchRules}
          />
        </div>
      </div>
    </div>
  );
}
