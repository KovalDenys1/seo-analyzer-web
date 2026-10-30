import { Tag, Heading, Link as LinkIcon, Image as ImageIcon, Key, Speed } from "@/components/ui/Icons";
import type { ComponentType } from "react";

type FeatureCard = {
  icon: ComponentType<{ size?: number; color?: string }>;
  title: string;
  desc: string;
};

const cards: FeatureCard[] = [
  {
    icon: Speed,
    title: "Empty JavaScript pages",
    desc: "A React, Vue or Vite page that sends crawlers an empty root element is named first, with the bytes and words found, and its score is capped until it is server-rendered.",
  },
  {
    icon: Key,
    title: "Fetch and indexability",
    desc: "Status code, redirect chain, robots directives, X-Robots-Tag and canonical. An error page is capped at 20, and a bot check is reported instead of scored.",
  },
  {
    icon: Tag,
    title: "Title, description, headings",
    desc: "Missing, duplicate, too long or too generic. The full H1–H6 outline as a crawler sees it.",
  },
  {
    icon: LinkIcon,
    title: "Links and site structure",
    desc: "Internal and external links, empty anchors, and in a site audit: broken internal links, orphan pages and duplicates.",
  },
  {
    icon: ImageIcon,
    title: "Social previews and structured data",
    desc: "Open Graph and Twitter card coverage, so a shared link shows a title and an image. JSON-LD inventory, image alt and dimensions.",
  },
  {
    icon: Heading,
    title: "SaaS conversion score",
    desc: "A separate score for value proposition, call to action, trust and product evidence, plus the page type it detected.",
  },
];

export default function Features() {
  return (
    <section id="checks" className="section section-ruled">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <div className="mono eyebrow">What it checks</div>
          <h2 className="section-title">Every point off the score has a reason.</h2>
          <p className="section-sub" style={{ maxWidth: 560 }}>
            Each issue comes with its code, the evidence that triggered it and the penalty it
            cost. Each fix says what to change, why, the expected impact, the effort and how to
            check it worked.
          </p>
        </div>

        <div className="grid-3">
          {cards.map((card) => (
            <div key={card.title} className="card">
              <div className="card-icon">
                <card.icon size={18} color="var(--teal)" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink-900)", marginBottom: 6 }}>
                {card.title}
              </div>
              <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-500)", lineHeight: 1.55 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: 13, color: "var(--ink-500)", lineHeight: 1.6 }}>
          What it does not do: it reads the HTML a crawler receives and does not run JavaScript, it
          has no keyword or backlink database, and it does not measure Core Web Vitals.
        </p>
      </div>
    </section>
  );
}
