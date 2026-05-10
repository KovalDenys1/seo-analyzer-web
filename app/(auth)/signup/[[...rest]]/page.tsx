import { SignUp } from "@clerk/nextjs";
import { Logo } from "@/components/ui/Icons";
import Link from "next/link";

const clerkAppearance = {
  variables: {
    colorPrimary: "#0D9488",
    colorText: "#0b1220",
    colorTextSecondary: "#6b7280",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#0b1220",
    borderRadius: "10px",
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: "14px",
  },
  elements: {
    rootBox: { width: "100%", maxWidth: 380 },
    cardBox: { boxShadow: "none", width: "100%" },
    card: { boxShadow: "none", padding: 0, background: "transparent" },
    headerTitle: { fontSize: "28px", fontWeight: "700", letterSpacing: "-0.6px" },
    headerSubtitle: { fontSize: "14px" },
    socialButtonsBlockButton: {
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      height: "44px",
      fontSize: "14px",
      fontWeight: "500",
    },
    formButtonPrimary: {
      backgroundColor: "#0D9488",
      borderRadius: "10px",
      height: "44px",
      fontSize: "14px",
      fontWeight: "600",
    },
    formFieldInput: {
      height: "42px",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      fontSize: "14px",
    },
    footerActionLink: { color: "#0D9488", fontWeight: "600" },
  },
} as const;

export default function SignUpPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
      {/* form column */}
      <div style={{ display: "flex", flexDirection: "column", padding: "32px 56px", background: "#fff" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
          <Logo size={22} />
          <span style={{ fontWeight: 700, letterSpacing: -0.2 }}>
            seo<span style={{ color: "#0D9488" }}>.</span>analyzer
          </span>
        </Link>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 32, paddingBottom: 32 }}>
          <SignUp appearance={clerkAppearance} />
        </div>

        <div style={{ fontSize: 12, color: "#9ca3af" }}>
          © 2026 seo.analyzer
        </div>
      </div>

      {/* brand column */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(160deg, #042f2e 0%, #0b1220 60%, #111827 100%)",
        color: "#fff",
        display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56,
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

        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, color: "#5eead4", fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5eead4" }} />
          <span style={{ fontFamily: "monospace" }}>api.seo-analyzer.dev</span>
          <span style={{ marginLeft: "auto", color: "#9ca3af", fontFamily: "monospace" }}>200 OK · 142ms</span>
        </div>

        <div style={{ position: "relative" }}>
          <h2 style={{ fontSize: 34, letterSpacing: -1, margin: 0, lineHeight: 1.15, fontWeight: 700 }}>
            &ldquo;We replaced our entire SEO crawler with one curl call.&rdquo;
          </h2>
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#0d9488,#5eead4)", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600 }}>Lena Ortiz</div>
              <div style={{ fontSize: 12.5, color: "#9ca3af" }}>Staff Eng · Mercury</div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", background: "rgba(15,23,42,.7)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, padding: 20 }}>
          <pre style={{ margin: 0, fontSize: 12.5, color: "#e5e7eb", lineHeight: 1.7, fontFamily: "monospace", whiteSpace: "pre" }}>
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
