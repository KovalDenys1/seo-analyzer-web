import { ArrowR } from "@/components/ui/Icons";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section style={{ padding: "88px 56px" }}>
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          position: "relative",
          background: "linear-gradient(135deg, var(--ink-900) 0%, #042f2e 100%)",
          borderRadius: 20,
          padding: "64px 56px",
          overflow: "hidden",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 0%, rgba(13,148,136,.5), transparent 40%)," +
              "radial-gradient(circle at 80% 100%, rgba(94,234,212,.25), transparent 40%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <h2 style={{ margin: 0, fontSize: 40, letterSpacing: -1.2 }}>
            Start free, upgrade when ready.
          </h2>
          <p
            style={{
              margin: "12px auto 28px",
              maxWidth: 520,
              fontSize: 16,
              color: "#9ca3af",
            }}
          >
            100 free requests per day, no credit card. Set up your first key in
            under a minute.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link
              href="/signup"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "12px 22px",
                background: "var(--teal)",
                color: "#fff",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 1px 0 rgba(255,255,255,.2) inset, 0 1px 2px rgba(13,148,136,.4)",
              }}
            >
              Sign Up <ArrowR size={14} />
            </Link>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 22px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
