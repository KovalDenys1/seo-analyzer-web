import { Tag, Heading, Link as LinkIcon, Image as ImageIcon, Key, Speed } from "@/components/ui/Icons";
import type { ComponentType } from "react";

type FeatureCard = {
  icon: ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
  mono: string;
};

const cards: FeatureCard[] = [
  {
    icon: Tag,
    title: "Meta Analysis",
    desc: "Title, description, OG/twitter cards, canonical, robots, lang, viewport.",
    mono: "GET /v1/metadata",
  },
  {
    icon: Heading,
    title: "Headings",
    desc: "Full H1–H6 outline with depth, order, and accessibility flags.",
    mono: "GET /v1/headings",
  },
  {
    icon: LinkIcon,
    title: "Link Audit",
    desc: "Internal vs external, dofollow/nofollow, status codes, broken links.",
    mono: "GET /v1/links",
  },
  {
    icon: ImageIcon,
    title: "Image Alt Check",
    desc: "Total images, missing alt text, dimensions, and lazy-loading hints.",
    mono: "GET /v1/images",
  },
  {
    icon: Key,
    title: "Keyword Density",
    desc: "Top terms, n-grams, stop-word filtered counts and ratios.",
    mono: "GET /v1/keywords",
  },
  {
    icon: Speed,
    title: "Load Time",
    desc: "TTFB, LCP, CLS, render-blocking resources, and Core Web Vitals.",
    mono: "GET /v1/performance",
  },
];

export default function Features() {
  return (
    <section
      style={{
        padding: "88px 56px",
        background: "#fff",
        borderTop: "1px solid var(--ink-100)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--teal)",
              textTransform: "uppercase",
              letterSpacing: 1.4,
            }}
          >
            Endpoints
          </div>
          <h2
            style={{ margin: "8px 0 0", fontSize: 38, letterSpacing: -1, color: "var(--ink-900)" }}
          >
            Six checks. One request.
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "var(--ink-500)",
              maxWidth: 520,
            }}
          >
            Every page tells the same story six different ways. We pull all of
            it into one strict, typed response.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                padding: 24,
                background: "#fff",
                border: "1px solid var(--ink-200)",
                borderRadius: 14,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--teal-50)",
                  color: "var(--teal)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: 14,
                  border: "1px solid var(--teal-100)",
                }}
              >
                <card.icon size={18} color="var(--teal)" />
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--ink-900)",
                  marginBottom: 6,
                }}
              >
                {card.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: "var(--ink-500)",
                  lineHeight: 1.55,
                }}
              >
                {card.desc}
              </p>
              <div
                className="mono"
                style={{ marginTop: 14, fontSize: 11.5, color: "var(--ink-400)" }}
              >
                {card.mono}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
