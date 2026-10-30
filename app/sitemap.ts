import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/components/landing/GuideEnd";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/docs", "/guides", ...GUIDES.map((g) => `/guides/${g.slug}`), "/contact", "/privacy", "/terms"];
  return pages.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}
