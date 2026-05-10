import { Check } from "@/components/ui/Icons";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    desc: "Hobby projects and testing.",
    limit: "100 requests / day",
    features: ["/quick-score only"],
    cta: "Start free",
    href: "/signup",
    accent: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    desc: "Production sites and small teams.",
    limit: "5,000 requests / day",
    features: ["All endpoints", "Priority queue", "Email support"],
    cta: "Upgrade to Pro",
    href: "/signup?plan=pro",
    accent: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/month",
    desc: "Agencies and high-volume APIs.",
    limit: "50,000 requests / day",
    features: ["All endpoints", "Bulk /batch up to 100 URLs", "SLA & dedicated support"],
    cta: "Talk to sales",
    href: "/contact",
    accent: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "96px 56px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--teal)",
              textTransform: "uppercase",
              letterSpacing: 1.4,
            }}
          >
            Pricing
          </div>
          <h2
            style={{ margin: "8px 0 0", fontSize: 38, letterSpacing: -1, color: "var(--ink-900)" }}
          >
            Pay for what you ship.
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "var(--ink-500)" }}>
            No seats, no minimums. Upgrade when you outgrow Free.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {tiers.map((t) => (
            <div
              key={t.name}
              style={{
                position: "relative",
                padding: 28,
                background: t.accent ? "var(--ink-900)" : "#fff",
                color: t.accent ? "#fff" : "inherit",
                border: `1px solid ${t.accent ? "var(--ink-900)" : "var(--ink-200)"}`,
                borderRadius: 16,
                boxShadow: t.accent
                  ? "0 24px 60px rgba(13,148,136,.18)"
                  : "var(--shadow-sm)",
                transform: t.accent ? "translateY(-8px)" : "none",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {t.accent && (
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    right: 24,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "var(--teal)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: 0.3,
                  }}
                >
                  MOST POPULAR
                </span>
              )}

              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: t.accent ? "#9ca3af" : "var(--ink-500)",
                }}
              >
                {t.name}
              </div>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>
                  {t.price}
                </span>
                <span style={{ fontSize: 14, color: t.accent ? "#9ca3af" : "var(--ink-500)" }}>
                  {t.period}
                </span>
              </div>

              <p
                style={{
                  marginTop: 6,
                  marginBottom: 0,
                  fontSize: 13.5,
                  color: t.accent ? "#9ca3af" : "var(--ink-500)",
                }}
              >
                {t.desc}
              </p>

              <div
                style={{
                  marginTop: 18,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: t.accent ? "rgba(255,255,255,.06)" : "var(--teal-50)",
                  color: t.accent ? "#5eead4" : "var(--teal)",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                  border: `1px solid ${t.accent ? "rgba(255,255,255,.08)" : "var(--teal-100)"}`,
                }}
              >
                {t.limit}
              </div>

              <ul
                style={{
                  marginTop: 20,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 10,
                  flex: 1,
                }}
              >
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 13.5,
                      color: t.accent ? "#e5e7eb" : "var(--ink-700)",
                    }}
                  >
                    <Check size={16} color={t.accent ? "#5eead4" : "var(--teal)"} />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={t.href}
                style={{
                  marginTop: 24,
                  display: "block",
                  width: "100%",
                  padding: "12px 16px",
                  background: t.accent ? "var(--teal)" : "#fff",
                  color: t.accent ? "#fff" : "var(--ink-800)",
                  border: t.accent ? "none" : "1px solid var(--ink-200)",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
