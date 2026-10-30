export const SITE_NAME = "SEO Audit Lab";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://seo-analyzer-web-ebon.vercel.app"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "Free SEO audit for SaaS sites: a 0–100 score, every issue with its fix, and a flag when crawlers get an empty JavaScript page. Whole sites on Apify at $0.02 a page.";

export const CONTACT_EMAIL = "denyskoval.outreach@gmail.com";

export const APIFY_ACTOR_URL = "https://apify.com/seo-audit-lab/saas-seo-analyzer";
export const APIFY_API_URL = "https://apify.com/seo-audit-lab/saas-seo-analyzer/api";
export const APIFY_ISSUES_URL = "https://apify.com/seo-audit-lab/saas-seo-analyzer/issues";
export const GITHUB_URL = "https://github.com/KovalDenys1/SEO-Analyzer-API";
export const GITHUB_ISSUES_URL = "https://github.com/KovalDenys1/SEO-Analyzer-API/issues";
// Served from the public Vercel Blob store `seo-audit-lab-media`, not from git.
const PROMO_VIDEO_BASE = "https://dq3bggxc4xu7hosl.public.blob.vercel-storage.com";

export const PROMO_VIDEO = {
  src: `${PROMO_VIDEO_BASE}/promo/v3/en.mp4`,
  poster: `${PROMO_VIDEO_BASE}/promo/v3/en.jpg`,
  uploadDate: "2026-10-30",
  duration: "PT54S",
};

export const METHODOLOGY_URL =
  "https://github.com/KovalDenys1/SEO-Analyzer-API/blob/main/docs/METHODOLOGY.md";
