import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
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
        <Reveal style={{ marginBottom: 40 }}>
          <div className="mono eyebrow">What it checks</div>
          <h2 className="section-title">Every point off the score has a reason.</h2>
          <p className="section-sub" style={{ maxWidth: 560 }}>
            Each issue comes with its code, the evidence that triggered it and the penalty it
            cost. Each fix says what to change, why, the expected impact, the effort and how to
            check it worked.
          </p>
        </Reveal>

        <Reveal as="figure" className="report-shot">
          <Image
            src="/report-screenshot.png"
            width={1520}
            height={1448}
            sizes="(max-width: 760px) 100vw, 640px"
            alt="Screenshot of an SEO Audit Lab report on a JavaScript-rendered page: score 40, grade F, with the empty-page fix first and its evidence"
          />
          <figcaption>
            A real report on the <Link href="/demo/spa-shell">demo Vite shell</Link>: the fix that
            matters comes first, with the byte and word counts behind it.
          </figcaption>
        </Reveal>

        <div className="grid-3">
          {cards.map((card, i) => (
            <Reveal key={card.title} className="card" delay={(i % 3) * 0.1}>
              <div className="card-icon">
                <card.icon size={18} color="var(--teal)" />
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, color: "var(--ink-900)" }}>
                {card.title}
              </h3>
              <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-500)", lineHeight: 1.55 }}>
                {card.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: 13, color: "var(--ink-500)", lineHeight: 1.6 }}>
          What it does not do: it reads the HTML a crawler receives and does not run JavaScript, it
          has no keyword or backlink database, and it does not measure Core Web Vitals. Why reading
          the raw HTML matters for React and Vite sites:{" "}
          <Link href="/guides/why-google-sees-an-empty-page" className="link-teal">
            why Google sees an empty page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
