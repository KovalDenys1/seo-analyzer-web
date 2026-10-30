import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import TextPage from "@/components/landing/TextPage";
import GuideEnd, { GUIDES, guideJsonLd } from "@/components/landing/GuideEnd";

const guide = GUIDES[2];

export const metadata: Metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}`,
  article: { published: guide.published, modified: guide.updated },
});

const GOOGLE_JS_BASICS =
  "https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics";
const VERCEL_AI_CRAWLERS = "https://vercel.com/blog/the-rise-of-the-ai-crawler";

export default function Page() {
  return (
    <TextPage
      title={guide.title}
      lead="“Google renders JavaScript” is true, and it is why many single-page apps are indexed at all. It is also why teams miss that most other readers of their pages get an empty one."
      updated="30 October 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideJsonLd(guide)).replace(/</g, "\\u003c") }}
      />
      <h2>Googlebot: crawl, wait, render, index</h2>
      <p>
        Google describes three phases for JavaScript pages: crawling, rendering and indexing. After
        the crawl, the page goes into a render queue: &ldquo;The page may stay on this queue for a few
        seconds, but it can take longer than that.&rdquo; Then a headless Chromium runs the
        JavaScript and the rendered HTML is indexed (
        <a href={GOOGLE_JS_BASICS} target="_blank" rel="noopener">
          JavaScript SEO basics
        </a>
        ).
      </p>
      <p>Three things follow for a page whose HTML is an empty shell:</p>
      <ul>
        <li>
          Links to your other pages exist only after rendering, so Google finds the rest of the site
          later than it would from HTML.
        </li>
        <li>
          Anything that fails during that render – an API call that errors or times out, a script
          blocked in <code>robots.txt</code>, content that loads only after a click or a scroll – is
          missing from what Google indexes, even though your browser shows it.
        </li>
        <li>
          The same page says, in Google&rsquo;s words, that &ldquo;server-side or pre-rendering is
          still a great idea&rdquo;, because &ldquo;not all bots can run JavaScript.&rdquo;
        </li>
      </ul>
      <p>
        To see what Google got, use URL Inspection in Search Console and look at the tested page&rsquo;s
        HTML and screenshot. If your headline is missing there, Google is indexing the empty page.
      </p>

      <h2>Link previews</h2>
      <p>
        When someone pastes your link into Slack, LinkedIn or X, the preview is built from
        the Open Graph and Twitter tags in the HTML your server sends. Tags that a script adds after
        load are not there for that fetch, so a shell whose tags are set in JavaScript shares as a bare
        URL. Tags written into <code>index.html</code> do show, which is why many SPAs have one
        preview for every page.
      </p>

      <h2>AI assistants and their crawlers</h2>
      <p>
        A December 2024 study of crawler traffic on Vercel&rsquo;s network found that &ldquo;none of
        the major AI crawlers currently render JavaScript&rdquo;, naming OpenAI&rsquo;s GPTBot,
        OAI-SearchBot and ChatGPT-User, Anthropic&rsquo;s ClaudeBot and PerplexityBot. They fetch the
        JavaScript files but do not run them, so &ldquo;they can&rsquo;t read client-side rendered
        content&rdquo; (
        <a href={VERCEL_AI_CRAWLERS} target="_blank" rel="noopener">
          Vercel, The rise of the AI crawler
        </a>
        ). The same study notes that Gemini uses Googlebot&rsquo;s infrastructure and does render.
        When someone asks an assistant to compare tools in your category, a shell gives it nothing to
        quote.
      </p>

      <h2>So what does a crawler see?</h2>
      <p>
        Whatever is in the HTML before any script runs. For a shell, that is a title, maybe a
        description, and an empty element. The fix is to put the real page in that HTML for the
        routes you want found; <a href="/guides/vite-react-spa-seo">SEO for a Vite or React
        single-page app</a> compares the ways to do it.
      </p>

      <GuideEnd current={guide.slug} />
    </TextPage>
  );
}
