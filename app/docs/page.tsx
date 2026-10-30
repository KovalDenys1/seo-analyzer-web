import type { Metadata } from "next";
import Link from "next/link";
import TextPage from "@/components/landing/TextPage";
import { APIFY_ACTOR_URL, APIFY_API_URL, GITHUB_URL, METHODOLOGY_URL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "How to run SEO Audit Lab: the free page audit, the Apify actor's modes and API, the site's own API key, and how the score is calculated.",
  alternates: { canonical: "/docs" },
};

const runSync = `curl -X POST \\
  "https://api.apify.com/v2/acts/seo-audit-lab~saas-seo-analyzer/run-sync-get-dataset-items?token=$APIFY_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"urls":["https://example.com"],"mode":"site","maxPages":25}'`;

const keyCall = `curl "${SITE_URL}/api/analyze?url=example.com" \\
  -H "Authorization: Bearer $SEO_AUDIT_KEY"`;

export default function DocsPage() {
  return (
    <TextPage
      title="Docs"
      lead="One analyzer, three ways to run it: one page free on this site, lists of URLs and whole sites on Apify, or single pages from your own code with an API key."
    >
      <h2 id="free">Free page audit</h2>
      <p>
        Enter an address in the box on the <Link href="/#try">home page</Link>. You get the SEO score and
        grade, the SaaS conversion score, every issue on the page and the top fixes. It runs 10 pages
        an hour and needs no account.
      </p>

      <h2 id="apify">The Apify actor</h2>
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

      <h2 id="apify-api">Calling the actor from code</h2>
      <p>
        Run the actor and get the results in one request. Your token is in the Apify console under
        Settings, API &amp; Integrations. More options are on the{" "}
        <a href={APIFY_API_URL} target="_blank" rel="noopener">
          actor&rsquo;s API tab
        </a>
        .
      </p>
      <pre className="mono">{runSync}</pre>

      <h2 id="api-key">The site&rsquo;s API key</h2>
      <p>
        For one page at a time from your own code, <Link href="/signup">create a free account</Link>{" "}
        (early access), then make a key on the API Key page. The free plan allows 100 calls a day,
        reset at 00:00 UTC.
      </p>
      <pre className="mono">{keyCall}</pre>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>url</code></td>
            <td>The page to audit. <code>example.com</code> and full URLs both work.</td>
          </tr>
          <tr>
            <td><code>endpoint</code></td>
            <td>
              <code>analyze</code> (default, the full report), <code>quick-score</code> (score,
              grade, warnings and top fixes) or <code>metadata</code> (title, meta tags, headings,
              social tags).
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Send the key as <code>Authorization: Bearer &lt;key&gt;</code>. An <code>X-API-Key</code>{" "}
        header also works. Errors come back as{" "}
        <code>{`{"error": {"code": "...", "message": "..."}}`}</code> with a matching status:
        400 for a bad URL, 401 for a missing or wrong key, 429 when the daily limit is used up (with
        a <code>Retry-After</code> header), 422 or 502 when the page itself cannot be fetched, and
        503 when the service is down. Calls that fail on our side do not count toward the limit.
      </p>

      <h2 id="score">What a report contains</h2>
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

      <h2 id="limits">Limits</h2>
      <ul>
        <li>
          It reads the HTML a crawler receives and does not run JavaScript. A page whose HTML is an
          empty JavaScript shell is reported as one, because that is what a crawler that does not
          render sees.
        </li>
        <li>It has no keyword, backlink or SERP database and does not predict rankings.</li>
        <li>It does not measure Core Web Vitals. Timing covers the HTML response only.</li>
        <li>
          A page that cannot be fetched (DNS failure, timeout, not HTML) comes back as an error item
          and is not charged, and so does a bot-protection challenge (Cloudflare, DataDome, AWS WAF,
          PerimeterX), with the code <code>blocked_by_bot_protection</code>. A page that loads but
          returns 4xx or 5xx, or shows a login form, is audited as served and charged, so check the
          HTTP status in the report.
        </li>
      </ul>

      <h2 id="self-hosting">Self-hosting</h2>
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
