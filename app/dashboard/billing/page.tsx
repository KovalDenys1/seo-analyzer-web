import PageHead from "@/components/dashboard/PageHead";
import { ArrowR } from "@/components/ui/Icons";
import { APIFY_ACTOR_URL } from "@/lib/site";

export default function BillingPage() {
  return (
    <>
      <PageHead title="Billing" sub="Your plan and how to get more volume." />

      <div style={{ padding: 36, display: "grid", gap: 20, maxWidth: 760 }}>
        <div
          style={{
            background: "linear-gradient(135deg, var(--ink-900) 0%, #042f2e 100%)",
            color: "#fff",
            borderRadius: 14,
            padding: 28,
          }}
        >
          <div style={{ fontSize: 12, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1.2 }}>
            Current plan
          </div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>Free</span>
            <span style={{ fontSize: 16, color: "#9ca3af" }}>· $0</span>
          </div>
          <div style={{ marginTop: 6, fontSize: 13.5, color: "#9ca3af" }}>
            100 requests a day on your API key.
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600 }}>Need more volume?</div>
          <p style={{ margin: "8px 0 18px", fontSize: 13.5, color: "var(--ink-500)", lineHeight: 1.55 }}>
            Paid plans are not sold on this site yet. The same analyzer runs on Apify at $0.02 per
            page audited and $0.005 per quick score, with site crawls of up to 100 pages and no
            subscription.
          </p>
          <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener" className="btn-teal btn-sm">
            Run it on Apify <ArrowR size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
