export default function LandingFooter() {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/60 py-8 text-center text-xs text-slate-500 backdrop-blur">
      <p>© {new Date().getFullYear()} Validify. Mock environment — no Salesforce data is accessed.</p>
    </footer>
  );
}
