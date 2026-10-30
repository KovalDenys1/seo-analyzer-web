import type { Metadata } from "next";
import Link from "next/link";
import TextPage from "@/components/landing/TextPage";
import { GUIDES } from "@/components/landing/GuideEnd";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Short guides on JavaScript-rendered sites and SEO: how to check for an empty page, why crawlers miss it, and how to fix it in a Vite or React app.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <TextPage
      title="Guides"
      lead="What crawlers actually receive from a JavaScript-rendered site, and what to do about it."
    >
      {GUIDES.map((g) => (
        <div key={g.slug}>
          <h2>
            <Link href={`/guides/${g.slug}`}>{g.title}</Link>
          </h2>
          <p>{g.description}</p>
        </div>
      ))}
    </TextPage>
  );
}
