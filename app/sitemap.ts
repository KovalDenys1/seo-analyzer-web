import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/components/landing/GuideEnd";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified?: string }[] = [
    { path: "" },
    { path: "/docs" },
    { path: "/guides" },
    ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, lastModified: g.updated })),
    { path: "/contact" },
    { path: "/privacy" },
    { path: "/terms" },
  ];
  return pages.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path || "/"}`,
    ...(lastModified ? { lastModified } : {}),
  }));
}
