import type { Metadata } from "next";
import Link from "next/link";
import TextPage from "@/components/landing/TextPage";
import { APIFY_ACTOR_URL, APIFY_API_URL, GITHUB_URL, METHODOLOGY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "How to run SEO Audit Lab: the free page audit, the Apify actor's modes, input, output and API, and how the score is calculated.",
  alternates: { canonical: "/docs" },
};

const runSync = `curl -X POST \\
  "https://api.apify.com/v2/acts/seo-audit-lab~saas-seo-analyzer/run-sync-get-dataset-items?token=$APIFY_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"urls":["https://example.com"],"mode":"site","maxPages":25}'`;

export default function DocsPage() {
  return (
    <TextPage
      title="Docs"
      lead="One analyzer, two ways to run it: one page free on this site, or lists of URLs and whole sites on Apify."
    >
      <h2>Free page audit</h2>
      <p>
        Enter an address in the box on the <Link href="/#try">home page</Link>. You get the SEO score and
        grade, the SaaS conversion score, every issue on the page and the top fixes. It runs 10 pages
        an hour and needs no account.
      </p>

      <h2>The Apify actor</h2>
      <p>
        <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener">
          SEO Audit Lab on Apify
        </a>{" "}
        runs the same analyzer over URL lists and site crawls. Start it from the Apify console, on a
        schedule, from Make, Zapier or n8n, or through the API.
      </p>
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>Use it for</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>page</code></td>
            <td>A full report for each URL</td>
            <td>$0.02 per page</td>
          </tr>
          <tr>
            <td><code>quick</code></td>
            <td>Scoring long URL lists</td>
            <td>$0.005 per URL</td>
          </tr>
          <tr>
            <td><code>site</code></td>
            <td>A crawl of up to 100 pages per start URL, plus a site summary</td>
            <td>$0.02 per page, summary free</td>
          </tr>
        </tbody>
      </table>
      <p>
        Input fields: <code>urls</code> (required), <code>mode</code>, <code>maxPages</code> (1–100),{" "}
        <code>maxDepth</code> (0–8), <code>useSitemap</code>, <code>respectRobots</code> and{" "}
        <code>includeSubdomains</code>. A URL that cannot be fetched comes back as an{" "}
        <code>error</code> item and is not charged.
      </p>

      <h2>Calling it from code</h2>
      <p>
        Run the actor and get the results in one request. Your token is in the Apify console under
        Settings, API &amp; Integrations. More options are on the{" "}
        <a href={APIFY_API_URL} target="_blank" rel="noopener">
          actor&rsquo;s API tab
        </a>
        .
      </p>
      <pre className="mono">{runSync}</pre>

      <h2>What a report contains</h2>
      <ul>
        <li>
          <strong>Score.</strong> 0–100 and a letter grade from eight weighted categories:
          indexability, on-page, content, links, technical, structured data, media and social,
          delivery. The weights come back with every report.
        </li>
        <li>
          <strong>Issues.</strong> A code, category, severity, the penalty it cost and the evidence
          that triggered it.
        </li>
        <li>
          <strong>Recommendations.</strong> Ranked fixes with the action, the reason, impact, effort,
          confidence and how to check the fix worked.
        </li>
        <li>
          <strong>SaaS score.</strong> Value proposition, call to action, trust and product evidence,
          scored separately so a clean page that does not sell still shows up.
        </li>
        <li>
          <strong>Site audit extras.</strong> Broken internal links, duplicate titles, descriptions
          and content, orphan candidates and coverage of seven SaaS strategy pillars.
        </li>
      </ul>
      <p>
        The scoring rules are published in{" "}
        <a href={METHODOLOGY_URL} target="_blank" rel="noopener">
          METHODOLOGY.md
        </a>
        .
      </p>

      <h2>Limits</h2>
      <ul>
        <li>It reads the HTML a crawler receives and does not run JavaScript.</li>
        <li>It has no keyword, backlink or SERP database and does not predict rankings.</li>
        <li>It does not measure Core Web Vitals. Timing covers the HTML response only.</li>
        <li>Sites that block data-centre traffic or need a login return an error item.</li>
      </ul>

      <h2>Self-hosting</h2>
      <p>
        The analyzer is open source under the MIT licence:{" "}
        <a href={GITHUB_URL} target="_blank" rel="noopener">
          KovalDenys1/SEO-Analyzer-API
        </a>
        . It runs as a FastAPI service with Docker.
      </p>
    </TextPage>
  );
}
