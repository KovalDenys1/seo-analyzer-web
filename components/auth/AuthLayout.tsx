import Link from "next/link";
import { Logo, Check } from "@/components/ui/Icons";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const perks = [
  "An API key for the same audit the free page runs",
  "100 audits a day on the free plan",
  "Usage history for every call",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-form-col">
        <Link href="/" className="brand" aria-label={`${SITE_NAME} home`}>
          <Logo size={22} />
          <span style={{ fontWeight: 700, letterSpacing: -0.2 }}>
            SEO Audit <span style={{ color: "var(--teal)" }}>Lab</span>
          </span>
        </Link>

        <div className="auth-form-slot">{children}</div>

        <div style={{ fontSize: 12, color: "var(--ink-400)", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span>© 2026 {SITE_NAME}</span>
          <Link href="/privacy" className="link-quiet">Privacy</Link>
          <Link href="/terms" className="link-quiet">Terms</Link>
        </div>
      </div>

      <div className="auth-brand-col">
        <div aria-hidden className="auth-brand-bg" />

        <div style={{ position: "relative" }}>
          <h2 style={{ fontSize: "clamp(22px, 2.4vw, 32px)", letterSpacing: -1, margin: 0, lineHeight: 1.2, fontWeight: 700 }}>
            Run the audit from your own code.
          </h2>
          <ul style={{ margin: "24px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
            {perks.map((text) => (
              <li key={text} style={{ display: "flex", gap: 10, fontSize: 15, color: "#e5e7eb" }}>
                <Check size={16} color="#5eead4" /> {text}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ position: "relative", background: "rgba(15,23,42,.7)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16 }}>
          <pre className="mono" style={{ margin: 0, fontSize: 12, color: "#e5e7eb", lineHeight: 1.65, whiteSpace: "pre", overflowX: "auto" }}>
{`curl "${SITE_URL}/api/analyze?url=example.com" \\
  -H "Authorization: Bearer $SEO_AUDIT_KEY"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
