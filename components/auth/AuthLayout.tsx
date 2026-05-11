import Link from "next/link";
import { Logo } from "@/components/ui/Icons";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "100vh", overflow: "hidden" }}>
      {/* form column */}
      <div style={{
        display: "flex", flexDirection: "column",
        padding: "32px 56px",
        background: "#fff",
        overflowY: "auto",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit", flexShrink: 0 }}>
          <Logo size={22} />
          <span style={{ fontWeight: 700, letterSpacing: -0.2 }}>
            seo<span style={{ color: "#0D9488" }}>.</span>analyzer
          </span>
        </Link>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 0" }}>
          {children}
        </div>

        <div style={{ fontSize: 12, color: "#9ca3af", flexShrink: 0 }}>
          © 2026 seo.analyzer
        </div>
      </div>

      {/* brand column */}
      <div style={{
        position: "relative",
        background: "linear-gradient(160deg, #042f2e 0%, #0b1220 60%, #111827 100%)",
        color: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: 48,
        overflow: "hidden",
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "radial-gradient(800px 400px at 90% -10%, rgba(94,234,212,.18), transparent 60%)," +
            "radial-gradient(600px 300px at 10% 110%, rgba(13,148,136,.18), transparent 60%)," +
            "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 32px 32px, 32px 32px",
        }} />

        {/* top status bar */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, color: "#5eead4", fontSize: 12, flexShrink: 0 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5eead4" }} />
          <span style={{ fontFamily: "monospace" }}>api.seo-analyzer.dev</span>
          <span style={{ marginLeft: "auto", color: "#9ca3af", fontFamily: "monospace" }}>200 OK · 142ms</span>
        </div>

        {/* quote */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <h2 style={{ fontSize: "clamp(22px, 2.4vw, 34px)", letterSpacing: -1, margin: 0, lineHeight: 1.2, fontWeight: 700 }}>
            &ldquo;We replaced our entire SEO crawler with one curl call.&rdquo;
          </h2>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0d9488,#5eead4)", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Lena Ortiz</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>Staff Eng · Mercury</div>
            </div>
          </div>
        </div>

        {/* code block */}
        <div style={{ position: "relative", background: "rgba(15,23,42,.7)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 16, flexShrink: 0 }}>
          <pre style={{ margin: 0, fontSize: 12, color: "#e5e7eb", lineHeight: 1.65, fontFamily: "monospace", whiteSpace: "pre", overflow: "hidden" }}>
{`const { score, warnings } = await seo.analyze({
  url: 'https://stripe.com',
  include: ['meta', 'links'],
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}
