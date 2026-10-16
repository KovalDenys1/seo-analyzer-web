import { Check } from "@/components/ui/Icons";
import { APIFY_ACTOR_URL } from "@/lib/site";

type Tier = {
  name: string;
  price: string;
  period: string;
  desc: string;
  limit: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
  accent: boolean;
};

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "no sign-up",
    desc: "One page at a time, right here in your browser.",
    limit: "10 pages an hour",
    features: [
      "SEO score, grade and SaaS score",
      "Every issue found on the page",
      "The top fixes, ranked by impact",
    ],
    cta: "Try it free",
    href: "#try",
    external: false,
    accent: false,
  },
  {
    name: "Pay per page",
    price: "$0.02",
    period: "per page audited",
    desc: "On Apify. No subscription, no minimum. Set a spend cap per run.",
    limit: "Quick score $0.005 per URL",
    features: [
      "Full JSON report per page, with evidence",
      "Site audit up to 100 pages: broken links, duplicates, orphan pages",
      "API, schedules, and Make, Zapier or n8n",
      "25-page site audit $0.50 · 1,000 quick scores $5",
      "Apify's free plan includes $5 of usage a month, no card needed",
    ],
    cta: "Run it on Apify",
    href: APIFY_ACTOR_URL,
    external: true,
    accent: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div className="mono eyebrow">Pricing</div>
          <h2 className="section-title">Free for one page. Cents for a whole site.</h2>
          <p className="section-sub">Pages that fail to load are not charged.</p>
        </div>

        <div className="grid-2">
          {tiers.map((t) => (
            <div key={t.name} className={t.accent ? "tier tier-accent" : "tier"}>
              <div className="tier-name">{t.name}</div>
              <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{t.price}</span>
                <span className="tier-muted" style={{ fontSize: 14 }}>
                  {t.period}
                </span>
              </div>
              <p className="tier-muted" style={{ marginTop: 6, marginBottom: 0, fontSize: 13.5 }}>
                {t.desc}
              </p>
              <div className="mono tier-limit">{t.limit}</div>
              <ul className="tier-features">
                {t.features.map((f) => (
                  <li key={f}>
                    <Check size={16} color={t.accent ? "#5eead4" : "var(--teal)"} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={t.href}
                className="tier-cta"
                {...(t.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
