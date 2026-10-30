import type { Metadata } from "next";
import TextPage from "@/components/landing/TextPage";
import GuideEnd, { GUIDES, guideJsonLd } from "@/components/landing/GuideEnd";

const guide = GUIDES[0];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `/guides/${guide.slug}` },
};

const shell = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Acme – Invoicing for small agencies</title>
    <meta name="description" content="Send invoices and chase late payments." />
    <script type="module" src="/assets/index-4f2a9c.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const curlCheck = `# Size of the HTML the server sends
curl -sL https://yourproduct.com | wc -c

# Is a sentence from your hero in it?
curl -sL https://yourproduct.com | grep -c "the exact words of your headline"`;

export default function Page() {
  return (
    <TextPage
      title={guide.title}
      lead="If your site is built with Vite, Create React App or a client-side React Router app, the HTML your server sends may be an empty box and a script tag. A browser fills the box in. A crawler that does not run JavaScript sees nothing."
      updated="30 October 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)).replace(/</g, "\\u003c") }}
      />
      <h2>What a shell looks like</h2>
      <p>This is close to the whole homepage of a typical Vite build, as the server sends it:</p>
      <pre className="mono">{shell}</pre>
      <p>
        The title and description are in the head, so search results and link previews can still
        show those. Everything in the body – the headline, the copy, the links to pricing and docs,
        the testimonials – only exists after <code>index-4f2a9c.js</code> has downloaded and run.
      </p>

      <h2>Check 1: view the source, not the inspector</h2>
      <p>
        Open the page and choose View Page Source (<code>Ctrl+U</code>, or{" "}
        <code>Cmd+Option+U</code> on a Mac). Search it for a sentence from your hero. The Elements
        panel in DevTools is the wrong place to look: it shows the page after JavaScript has run,
        which is exactly what a crawler without JavaScript never gets.
      </p>

      <h2>Check 2: curl</h2>
      <pre className="mono">{curlCheck}</pre>
      <p>
        A few hundred bytes to a couple of kilobytes, and <code>0</code> from the second command,
        means a shell. Some frameworks send a large HTML file that is still empty, because it carries
        inlined CSS or data, so the text check matters more than the size.
      </p>

      <h2>Check 3: the free audit</h2>
      <p>
        The audit on this site flags a page as a JavaScript shell when its HTML has fewer than 30
        words of readable text and either the HTML is over 10 KB or it shows a client-rendering sign:
        an empty mount element (<code>#root</code>, <code>#app</code>, <code>#__next</code>,{" "}
        <code>#__nuxt</code>, <code>#___gatsby</code>, <code>#svelte</code> or{" "}
        <code>#q-app</code>), a module script, or a <code>&lt;noscript&gt;</code> asking for
        JavaScript. It reports the word and byte counts it found, caps the score at 40 and puts the
        fix first, because missing headings, links and calls to action on such a page are symptoms of
        one cause, not separate problems.
      </p>

      <h2>When a shell is fine</h2>
      <p>
        A logged-in app behind a sign-in screen does not need to be crawled, so a shell there costs
        nothing. The pages that matter are the ones you want found: the homepage, pricing, feature and
        comparison pages, docs and the blog. If those share the app&rsquo;s shell, they are the ones
        to fix. <a href="/guides/vite-react-spa-seo">SEO for a Vite or React single-page app</a> lists
        the ways to do it.
      </p>

      <GuideEnd current={guide.slug} />
    </TextPage>
  );
}
