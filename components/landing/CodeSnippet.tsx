import { APIFY_API_URL } from "@/lib/site";

const K = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#7dd3fc" }}>{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#fde68a" }}>{children}</span>
);
const N = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#fbbf24" }}>{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#9ca3af" }}>{children}</span>
);

export default function CodeSnippet() {
  return (
    <section id="api" className="section section-tinted">
      <div className="container grid-code">
        <div>
          <div className="mono eyebrow">API</div>
          <h2 className="section-title" style={{ fontSize: 34 }}>
            One request. JSON back.
          </h2>
          <p className="section-sub" style={{ lineHeight: 1.6 }}>
            The analyzer runs on Apify, so you can call it from anything that speaks HTTP, schedule
            it, or plug it into Make, Zapier or n8n. Send a list of URLs, or one start URL in{" "}
            <code className="mono inline-code">site</code> mode to crawl up to 100 pages.{" "}
            <a href={APIFY_API_URL} target="_blank" rel="noopener" className="link-teal">
              API reference
            </a>
            .
          </p>
        </div>

        <div className="terminal">
          <div className="terminal-head">
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: "#374151" }}
                />
              ))}
            </div>
            <span className="mono" style={{ fontSize: 11, color: "#6b7280" }}>
              terminal
            </span>
            <span />
          </div>
          <pre className="mono terminal-body">
            <span style={{ color: "#5eead4" }}>$</span>
            {" curl -X POST \\\n"}
            {"  "}
            <S>&quot;https://api.apify.com/v2/acts/seo-audit-lab~saas-seo-analyzer/run-sync-get-dataset-items?token=$APIFY_TOKEN&quot;</S>
            {" \\\n  -H "}
            <S>&quot;Content-Type: application/json&quot;</S>
            {" \\\n  -d "}
            <S>{`'{"urls":["https://example.com"],"mode":"quick"}'`}</S>
            {"\n\n"}
            <P>{"[{"}</P>
            {"\n  "}
            <K>&quot;type&quot;</K>: <S>&quot;quick&quot;</S>,{"\n  "}
            <K>&quot;url&quot;</K>: <S>&quot;https://example.com/&quot;</S>,{"\n  "}
            <K>&quot;seo_score&quot;</K>: <N>77.8</N>, <K>&quot;seo_grade&quot;</K>: <S>&quot;C&quot;</S>,{"\n  "}
            <K>&quot;saas_score&quot;</K>: <N>67.2</N>, <K>&quot;issue_count&quot;</K>: <N>12</N>,{"\n  "}
            <K>&quot;warnings&quot;</K>: <P>[</P>
            <S>&quot;Meta description is missing&quot;</S>, <S>&quot;No H1 heading found&quot;</S>, <P>…]</P>,
            {"\n  "}
            <K>&quot;top_recommendations&quot;</K>: <P>[{"{ "}</P>
            <K>&quot;title&quot;</K>: <S>&quot;No crawlable internal links&quot;</S>,{" "}
            <K>&quot;impact&quot;</K>: <S>&quot;high&quot;</S>, <K>&quot;effort&quot;</K>: <S>&quot;low&quot;</S>,{" "}
            <P>… {"}"}, …]</P>
            {"\n"}
            <P>{"}]"}</P>
          </pre>
        </div>
      </div>
    </section>
  );
}
