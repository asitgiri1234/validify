import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  Lock,
  Route as RouteIcon,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import LandingFooter from '../components/LandingFooter.jsx';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'validation-rules', label: 'Validation rules in Salesforce' },
  { id: 'capabilities', label: 'Product capabilities' },
  { id: 'workflow', label: 'Intended operational workflow' },
  { id: 'release-scope', label: 'Release scope and roadmap' },
  { id: 'security', label: 'Security, privacy, and governance' },
  { id: 'getting-started', label: 'Getting started' },
];

export default function LearnMorePage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Learn more · Validify';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/35 via-slate-950 to-slate-950" />
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-indigo-600/15 blur-3xl" />

      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to sign in
          </Link>
          <div className="flex items-center gap-2 text-slate-400">
            <Sparkles className="h-4 w-4 text-brand-400" aria-hidden />
            <span className="text-sm font-semibold tracking-tight text-white">Validify</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 shadow-inner sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-300">Product information</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Learn more about Validify</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Validify is a web-based control plane for Salesforce Account validation rules. This page describes the
            product in plain language, clarifies Salesforce concepts where helpful, and sets expectations for what is
            available today versus what will ship with a full Salesforce integration.
          </p>
        </div>

        <nav
          aria-label="On this page"
          className="mb-12 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">On this page</p>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-brand-300 hover:text-brand-200 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="space-y-14 text-slate-300">
          <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-5 w-5 shrink-0 text-brand-400" aria-hidden />
              <div>
                <h2 id="overview-heading" className="text-xl font-semibold text-white">
                  Overview
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    Organizations use Salesforce validation rules to enforce data quality at the point of save—for
                    example, requiring fields under certain conditions, constraining numeric ranges, or mandating
                    consistent formatting. As the number of rules grows, administration can become fragmented across
                    setup screens, making it harder to reason about what is enforced in production and harder to
                    coordinate controlled changes across teams.
                  </p>
                  <p>
                    Validify is designed to provide a single, administrator-friendly surface to review validation
                    rules that apply to the Account object, understand their intent from descriptions and metadata, and
                    change their activation state in a deliberate manner. The goal is operational clarity: fewer
                    surprises in production behavior and a clearer change path aligned with how enterprises govern
                    Salesforce configuration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="validation-rules" aria-labelledby="vr-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <div>
                <h2 id="vr-heading" className="text-xl font-semibold text-white">
                  Validation rules in Salesforce (terminology)
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    A <strong className="font-semibold text-slate-100">validation rule</strong> is a server-side
                    configuration that evaluates a logical expression when a record is saved. If the expression
                    evaluates to true, Salesforce blocks the save and returns a user-facing error message. Rules can be
                    toggled between active and inactive; inactive rules do not execute on save.
                  </p>
                  <p>
                    Validation rules are distinct from other automation (for example, Flow or Apex triggers). They are
                    declarative, versioned as metadata, and typically managed through Salesforce setup or metadata
                    deployment pipelines. Validify does not replace those mechanisms; it is intended to complement
                    them by improving visibility and controlled toggling for Account validation rules specifically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="capabilities" aria-labelledby="cap-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <ClipboardList className="mt-1 h-5 w-5 shrink-0 text-indigo-400" aria-hidden />
              <div>
                <h2 id="cap-heading" className="text-xl font-semibold text-white">
                  Product capabilities (target state)
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>When connected to a Salesforce organization, Validify is intended to support administrators in:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>
                      <strong className="font-semibold text-slate-100">Discovery:</strong> listing Account validation
                      rules with stable identifiers, human-readable names, descriptions, and current activation status.
                    </li>
                    <li>
                      <strong className="font-semibold text-slate-100">Controlled changes:</strong> toggling
                      individual rules between active and inactive with explicit user action, reducing accidental bulk
                      edits.
                    </li>
                    <li>
                      <strong className="font-semibold text-slate-100">Batch operations:</strong> enabling or
                      disabling all listed rules where policy permits, with safeguards appropriate to enterprise
                      change management.
                    </li>
                    <li>
                      <strong className="font-semibold text-slate-100">Deployment alignment:</strong> a deploy step
                      that mirrors how organizations expect configuration changes to be acknowledged, with success and
                      failure surfaced clearly in the UI.
                    </li>
                    <li>
                      <strong className="font-semibold text-slate-100">Session-based access:</strong> authenticated
                      access to the dashboard after a successful Salesforce authorization flow (planned), with logout
                      terminating the application session.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="workflow" aria-labelledby="wf-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <RouteIcon className="mt-1 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
              <div>
                <h2 id="wf-heading" className="text-xl font-semibold text-white">
                  Intended operational workflow
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    The intended workflow mirrors common enterprise change patterns: connect to the correct Salesforce
                    context (sandbox versus production should be explicit in a full implementation), review the
                    current rule baseline, make intentional edits, and confirm deployment. In mature organizations,
                    these steps often sit alongside ticketing, peer review, and automated testing; Validify is aimed at
                    the user experience layer for validation-rule toggling rather than replacing an entire change
                    advisory board process.
                  </p>
                  <p>
                    The mock application you are viewing today follows the same interaction model—retrieve rules,
                    adjust activation, deploy—while using a local mock API so that user interface and session behavior
                    can be validated before OAuth and Salesforce APIs are connected.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="release-scope" aria-labelledby="rs-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-brand-400" aria-hidden />
              <div>
                <h2 id="rs-heading" className="text-xl font-semibold text-white">
                  Current release scope and roadmap
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    <strong className="font-semibold text-slate-100">Current milestone:</strong> the repository ships a
                    production-grade user interface and an Express API that simulates authentication, session
                    continuity, validation-rule retrieval, toggling, bulk updates, and deploy responses. No Salesforce
                    tenant is contacted, and no OAuth credentials are requested.
                  </p>
                  <p>
                    <strong className="font-semibold text-slate-100">Planned milestone:</strong> Salesforce OAuth
                    (authorization code flow with secure token storage appropriate to deployment topology), followed by
                    integration with Salesforce APIs suitable for reading and updating validation rule metadata (for
                    example, Tooling API or Metadata API, depending on org capabilities and product constraints). Exact
                    API choices will be documented in technical release notes when implemented.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="security" aria-labelledby="sec-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 shrink-0 text-slate-400" aria-hidden />
              <div>
                <h2 id="sec-heading" className="text-xl font-semibold text-white">
                  Security, privacy, and governance
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    In the current mock milestone, Validify runs as a local web application and API. Session cookies are
                    used to demonstrate authenticated dashboard access. You should treat mock deployments as
                    non-production systems and avoid placing real secrets in example environment files.
                  </p>
                  <p>
                    When Salesforce integration is added, security expectations include least-privilege OAuth scopes,
                    secure storage of tokens and refresh tokens, transport security (HTTPS), and clear data-handling
                    documentation for administrators. Organizational policies—retention, auditing, separation of duties,
                    and sandbox promotion practices—remain the responsibility of the customer; Validify is intended to
                    fit within those policies rather than redefine them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="getting-started" aria-labelledby="gs-heading" className="scroll-mt-28">
            <div className="flex items-start gap-3">
              <ArrowLeft className="mt-1 h-5 w-5 shrink-0 text-brand-400" aria-hidden />
              <div>
                <h2 id="gs-heading" className="text-xl font-semibold text-white">
                  Getting started
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed sm:text-base">
                  <p>
                    From the sign-in page, use <strong className="font-semibold text-slate-100">Connect to Salesforce</strong>{' '}
                    to exercise the mock authentication flow and open the dashboard. Use <strong className="font-semibold text-slate-100">Logout</strong>{' '}
                    to terminate the session and return to the sign-in experience.
                  </p>
                  <p>
                    If you are evaluating Validify for a future Salesforce connection, focus on whether the dashboard
                    meets your expectations for clarity, change ergonomics, and operational messaging; the integration
                    layer can then be implemented against your org’s constraints.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition hover:from-brand-500 hover:to-indigo-500"
                    >
                      Return to sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>

      <LandingFooter />
    </div>
  );
}
