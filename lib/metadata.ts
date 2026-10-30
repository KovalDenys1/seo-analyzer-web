import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

// A page that sets openGraph replaces the root's whole object, the root opengraph-image included.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} – free SEO audit for SaaS and product sites`,
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  article?: { published: string; modified: string };
};

export function pageMetadata({ title, description, path, article }: PageMeta): Metadata {
  const fullTitle = `${title} – ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      images: [SHARE_IMAGE],
      ...(article
        ? { type: "article", publishedTime: article.published, modifiedTime: article.modified }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [SHARE_IMAGE] },
  };
}
