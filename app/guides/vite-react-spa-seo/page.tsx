import type { Metadata } from "next";
import TextPage from "@/components/landing/TextPage";
import GuideEnd, { GUIDES, guideJsonLd } from "@/components/landing/GuideEnd";

const guide = GUIDES[1];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `/guides/${guide.slug}` },
};

const prerenderConfig = `// react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,                                  // still a static site
  prerender: ["/", "/pricing", "/features"],   // these get real HTML at build time
} satisfies Config;`;

export default function Page() {
  return (
    <TextPage
      title={guide.title}
      lead="A Vite or Create React App build sends crawlers an empty page by default. Here are five ways to fix that, from the smallest change to the largest, and what each one costs."
      updated="30 October 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)).replace(/</g, "\\u003c") }}
      />
      <p>
        First confirm that you have the problem: <a href="/guides/javascript-shell-check">is my site
        a JavaScript shell?</a> takes a minute. If the pages you want found are already real HTML,
        none of this is needed.
      </p>

      <h2>1. Split the marketing pages from the app</h2>
      <p>
        Most SaaS products only need crawlers on the homepage, pricing, features, docs and blog. The
        app behind the sign-in does not need indexing. Serve the public pages as plain or statically
        generated HTML at <code>yourproduct.com</code> (Astro, a static site generator, or
        hand-written HTML) and keep the Vite app at <code>app.yourproduct.com</code> or under{" "}
        <code>/app</code>. The app does not change at all, and the marketing pages become the fastest
        on the site.
      </p>
      <p>
        <strong>Cost:</strong> two deployments and some shared styling. <strong>Best when:</strong>{" "}
        the public pages are few and change less often than the app.
      </p>

      <h2>2. Prerender the public routes at build time</h2>
      <p>
        If the site already uses React Router, its framework mode can render chosen routes to HTML at
        build time and still deploy as static files. Every other route falls back to the normal SPA:
      </p>
      <pre className="mono">{prerenderConfig}</pre>
      <p>
        Vike (formerly vite-plugin-ssr) offers the same for a plain Vite app. Data that changes per
        visitor still loads in the browser; the copy, headings and links are in the HTML.
      </p>
      <p>
        <strong>Cost:</strong> moving to the framework&rsquo;s routing and making those pages render
        without <code>window</code>. <strong>Best when:</strong> marketing and app share one codebase
        and you do not want a server.
      </p>

      <h2>3. Server-side rendering</h2>
      <p>
        Render every request on a server: React Router framework mode with SSR on, Next.js, Vike or
        TanStack Start. This covers pages whose content depends on data, such as a public profile or
        a template gallery with thousands of entries, where building every page ahead of time is not
        practical.
      </p>
      <p>
        <strong>Cost:</strong> a server or serverless functions to run and pay for, and code that runs
        in both places. <strong>Best when:</strong> there are many public pages built from data.
      </p>

      <h2>4. A prerendering service</h2>
      <p>
        A proxy detects crawlers and serves them an HTML snapshot rendered by a headless browser,
        while visitors get the SPA. It needs no code change, but Google calls this &ldquo;dynamic
        rendering&rdquo; and describes it as &ldquo;a workaround and not a long-term solution&rdquo;,
        recommending server-side rendering, static rendering or hydration instead (
        <a
          href="https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering"
          target="_blank"
          rel="noopener"
        >
          Google Search Central
        </a>
        ). Snapshots can also go stale or differ from what visitors see.
      </p>
      <p>
        <strong>Cost:</strong> a monthly fee and one more moving part. <strong>Best when:</strong> you
        need crawlers to see something this week and a real fix is planned.
      </p>

      <h2>5. Rely on Google rendering it</h2>
      <p>
        Google does run JavaScript, so a shell can still be indexed. But pages wait in a render queue
        first, and other crawlers, link previews and AI assistants mostly do not run it at all.{" "}
        <a href="/guides/why-google-sees-an-empty-page">Why Google sees an empty page</a> goes through
        who sees what.
      </p>
      <p>
        <strong>Cost:</strong> nothing now, and slower or missing coverage later.{" "}
        <strong>Best when:</strong> search is not a channel for you.
      </p>

      <h2>What does not fix it</h2>
      <ul>
        <li>
          Setting the title and meta tags from JavaScript (for example with a head manager). Crawlers
          that do not run the script never see them; put them in the HTML the server sends.
        </li>
        <li>A sitemap. It helps crawlers find URLs, not see what is on them.</li>
        <li>
          Text hidden in <code>&lt;noscript&gt;</code> that differs from the page. It is not what
          visitors see, and it goes stale.
        </li>
      </ul>

      <h2>Check the fix</h2>
      <p>
        After deploying, run the same check again. The audit should no longer report a JavaScript
        shell, and the headings, links and copy you expect should appear in its report, because they
        are now in the HTML.
      </p>

      <GuideEnd current={guide.slug} />
    </TextPage>
  );
}
