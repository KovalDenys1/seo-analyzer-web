import Link from "next/link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type Guide = { slug: string; title: string; description: string; updated: string };

export const GUIDES: Guide[] = [
  {
    slug: "javascript-shell-check",
    title: "Is my site a JavaScript shell?",
    description:
      "How to tell in one minute whether crawlers get your page or an empty <div id=\"root\">, with curl, view-source and a free audit.",
    updated: "2026-10-30",
  },
  {
    slug: "vite-react-spa-seo",
    title: "SEO for a Vite or React single-page app",
    description:
      "Five ways to give a Vite, Create React App or React Router SPA real HTML for crawlers, from prerendering a few routes to full SSR.",
    updated: "2026-10-30",
  },
  {
    slug: "why-google-sees-an-empty-page",
    title: "Why Google sees an empty page",
    description:
      "What Googlebot, link previews and AI crawlers each do with a client-rendered page, and why \"Google renders JavaScript\" is not the whole answer.",
    updated: "2026-10-30",
  },
];

export function guideJsonLd(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    url: `${SITE_URL}/guides/${guide.slug}`,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export default function GuideEnd({ current }: { current: string }) {
  const others = GUIDES.filter((g) => g.slug !== current);
  return (
    <>
      <div className="guide-cta">
        <strong>Check your own page.</strong> The <Link href="/#try">free audit</Link> fetches the
        HTML a crawler gets and says first if it is an empty JavaScript shell, with the byte and word
        counts. No sign-up, 10 pages an hour.
      </div>
      <h2>Related</h2>
      <ul>
        {others.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`}>{g.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
