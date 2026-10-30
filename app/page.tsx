import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PromoVideo from "@/components/landing/PromoVideo";
import Features from "@/components/landing/Features";
import CodeSnippet from "@/components/landing/CodeSnippet";
import Pricing from "@/components/landing/Pricing";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";
import { APIFY_ACTOR_URL, GITHUB_URL, PROMO_VIDEO, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [APIFY_ACTOR_URL, GITHUB_URL],
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#org` },
      offers: [
        { "@type": "Offer", name: "Free page audit", price: "0", priceCurrency: "USD" },
        {
          "@type": "Offer",
          name: "Page audit on Apify",
          url: APIFY_ACTOR_URL,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 0.02,
            priceCurrency: "USD",
            unitText: "page",
          },
        },
      ],
    },
    {
      "@type": "VideoObject",
      name: `${SITE_NAME} – what a crawler sees on your page`,
      description:
        "A 30-second tour of SEO Audit Lab: a free audit flags a JavaScript page that crawlers see as empty, scores it and leads with the fix.",
      thumbnailUrl: [PROMO_VIDEO.poster],
      contentUrl: PROMO_VIDEO.src,
      uploadDate: PROMO_VIDEO.uploadDate,
      duration: PROMO_VIDEO.duration,
      publisher: { "@id": `${SITE_URL}/#org` },
    },
  ],
};

export default function Home() {
  return (
    <div style={{ background: "#fff", overflowX: "clip" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
        <Hero />
        <PromoVideo />
        <Features />
        <CodeSnippet />
        <Pricing />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
