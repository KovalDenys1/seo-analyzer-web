import { Logo, Github } from "@/components/ui/Icons";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px 56px",
        borderTop: "1px solid var(--ink-100)",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo size={20} />
          <span style={{ fontWeight: 700, letterSpacing: -0.2 }}>
            seo<span style={{ color: "var(--teal)" }}>.</span>analyzer
          </span>
          <span style={{ marginLeft: 14, fontSize: 12.5, color: "var(--ink-500)" }}>
            © 2026 — built for developers.
          </span>
        </div>

        <nav style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--ink-600)" }}>
          {[
            { label: "Docs", href: "/docs" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/status"
            style={{
              color: "inherit",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }}
            />
            Status
          </Link>
          <Link href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>
            Privacy
          </Link>
          <Link
            href="https://github.com/KovalDenys1/SEO-Analyzer-API"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Github size={18} color="var(--ink-600)" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
