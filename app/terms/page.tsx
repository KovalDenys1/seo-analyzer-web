import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import TextPage from "@/components/landing/TextPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms for using the SEO Audit Lab site, free audit and API.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <TextPage title="Terms" updated="16 October 2026">
      <h2>What the service is</h2>
      <p>
        SEO Audit Lab fetches public web pages and reports technical SEO and conversion findings.
        Scores are diagnostics. They do not predict search positions, traffic or revenue.
      </p>
      <h2>Fair use</h2>
      <p>
        The free audit is limited to 10 pages an hour. Do not use the service to overload, probe or
        attack a website, or to get around a site&rsquo;s access controls. We may block traffic
        that does.
      </p>
      <h2>Paid use</h2>
      <p>
        Paid audits run on Apify and are billed by Apify at the prices shown on the actor page. Pages
        that fail to load are not charged.
      </p>
      <h2>No warranty</h2>
      <p>
        The service is provided as is. We work to keep the checks accurate, but we are not liable for
        decisions made on the basis of a report or for losses caused by downtime.
      </p>
      <h2>Changes</h2>
      <p>
        We may change these terms. The date at the top shows the latest version.
      </p>
    </TextPage>
  );
}
