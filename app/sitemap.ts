import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/docs", "/contact", "/privacy", "/terms"];
  return pages.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}
