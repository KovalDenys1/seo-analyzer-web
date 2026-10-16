import type { Metadata } from "next";
import TextPage from "@/components/landing/TextPage";
import { APIFY_ISSUES_URL, GITHUB_ISSUES_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach SEO Audit Lab with a question, a bug report or a feature request.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <TextPage title="Contact" lead="Questions, bug reports and feature requests are all welcome.">
      <h2>Using the Apify actor</h2>
      <p>
        Open an issue on the actor&rsquo;s{" "}
        <a href={APIFY_ISSUES_URL} target="_blank" rel="noopener">
          Issues tab on Apify
        </a>
        . Include the run ID if a run went wrong, so we can look at the exact input and log.
      </p>
      <h2>About the analyzer or this site</h2>
      <p>
        Open an issue on{" "}
        <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener">
          GitHub
        </a>
        . If a check flagged something that is not a problem on your page, say which URL and which
        issue code, and we will look at the rule.
      </p>
    </TextPage>
  );
}
