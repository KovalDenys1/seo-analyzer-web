import { Check } from "@/components/ui/Icons";
import AuditWidget from "@/components/landing/AuditWidget";

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
          Paste a URL. Get a 0–100 score, every issue with the evidence that triggered it, and
          fixes ranked by impact and effort. A second score checks whether the page gives a
          visitor a reason to sign up.
        </p>

        <AuditWidget />

        <div className="hero-trust">
          {[
            "Results in seconds",
            "Scoring method published",
            "Analyzer is open source (MIT)",
          ].map((text) => (
            <span key={text} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Check size={14} color="var(--teal)" /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
