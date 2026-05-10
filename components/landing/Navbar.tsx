import { Logo, ArrowR } from "@/components/ui/Icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 56px",
        background: "rgba(255,255,255,.85)",
        backdropFilter: "saturate(140%) blur(12px)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={24} />
        <span style={{ fontWeight: 700, letterSpacing: -0.2, fontSize: 16 }}>
          seo<span style={{ color: "var(--teal)" }}>.</span>analyzer
        </span>
        <span
          className="mono"
          style={{
            marginLeft: 10,
            fontSize: 11,
            padding: "2px 7px",
            background: "var(--ink-100)",
            borderRadius: 4,
            color: "var(--ink-500)",
          }}
        >
          v1.4
        </span>
      </div>

      <nav style={{ display: "flex", gap: 28, fontSize: 14, color: "var(--ink-600)" }}>
        {["Pricing", "Docs", "Changelog", "Blog"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {item}
          </Link>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link
          href="/login"
          style={{
            padding: "8px 12px",
            background: "transparent",
            color: "var(--ink-700)",
            border: "none",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Login
        </Link>
        <Link
          href="/signup"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            background: "var(--teal)",
            color: "#fff",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 1px 0 rgba(255,255,255,.2) inset, 0 1px 2px rgba(13,148,136,.4)",
          }}
        >
          Sign Up <ArrowR size={14} />
        </Link>
      </div>
    </header>
  );
}
