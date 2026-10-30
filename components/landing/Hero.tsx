import { Check } from "@/components/ui/Icons";
import AuditWidget from "@/components/landing/AuditWidget";
import { GITHUB_URL, METHODOLOGY_URL } from "@/lib/site";

export default function Hero() {
  return (
    <section className="hero">
      <div aria-hidden className="hero-bg" />

      <div style={{ position: "relative" }}>
        <span className="mono hero-badge">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)" }} />
          Free page audit · no sign-up
        </span>

        <h1 className="hero-title">
          Find the SEO issues that cost your <span style={{ color: "var(--teal)" }}>SaaS</span>{" "}
          signups.
        </h1>

        <p className="hero-sub">
          Paste a URL. Get a 0–100 score, every issue on the page with its fix, ranked by impact
          and effort. If your site is a React or Vite app that sends crawlers an empty page, it
          says so first, where other audits call it fine.
        </p>

        <AuditWidget />

        <div className="hero-trust">
          <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
            <Check size={14} color="var(--teal)" /> Results in seconds
          </span>
          <a href={METHODOLOGY_URL} target="_blank" rel="noopener" className="hero-trust-link">
            <Check size={14} color="var(--teal)" /> Scoring method published
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener" className="hero-trust-link">
            <Check size={14} color="var(--teal)" /> Analyzer is open source (MIT)
          </a>
        </div>
      </div>
    </section>
  );
}
