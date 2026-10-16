import { ArrowR } from "@/components/ui/Icons";
import { APIFY_ACTOR_URL } from "@/lib/site";

export default function CTABanner() {
  return (
    <section className="section">
      <div className="container cta-banner">
        <div aria-hidden className="cta-banner-bg" />
        <div style={{ position: "relative" }}>
          <h2 className="cta-title">Audit the whole site, not just the homepage.</h2>
          <p className="cta-sub">
            A site audit crawls up to 100 pages and finds what a single page cannot show: broken
            internal links, duplicate titles and descriptions, orphan pages and gaps in your
            pricing, feature and comparison pages.
          </p>
          <div className="cta-actions">
            <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener" className="btn-teal btn-lg">
              Run a site audit on Apify <ArrowR size={14} />
            </a>
            <a href="#try" className="btn-ghost-dark btn-lg">
              Try it free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
