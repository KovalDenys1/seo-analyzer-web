import { Copy } from "@/components/ui/Icons";

export default function CodeSnippet() {
  return (
    <section
      style={{
        padding: "64px 56px",
        background: "var(--ink-50)",
        borderTop: "1px solid var(--ink-100)",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div
            className="mono"
            style={{
              fontSize: 12,
              color: "var(--teal)",
              textTransform: "uppercase",
              letterSpacing: 1.4,
            }}
          >
            Three lines
          </div>
          <h2
            style={{
              margin: "8px 0 16px",
              fontSize: 34,
              letterSpacing: -1,
              color: "var(--ink-900)",
            }}
          >
            Drop it into anything that speaks HTTP.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 15.5,
              color: "var(--ink-500)",
              lineHeight: 1.6,
            }}
          >
            A single REST endpoint. JSON in, JSON out. SDKs available for Node,
            Python, Go, Ruby and PHP &mdash; or just{" "}
            <code
              className="mono"
              style={{
                color: "var(--ink-700)",
                background: "#fff",
                padding: "1px 6px",
                borderRadius: 4,
                border: "1px solid var(--ink-200)",
              }}
            >
              curl
            </code>
            .
          </p>
        </div>

        <div
          style={{
            background: "#0b1220",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid #1f2937",
            }}
          >
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
            <span
              style={{
                fontSize: 11,
                color: "#6b7280",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
              }}
            >
              <Copy size={12} color="#6b7280" /> Copy
            </span>
          </div>
          <pre
            className="mono"
            style={{
              margin: 0,
              padding: 22,
              fontSize: 13,
              color: "#e5e7eb",
              lineHeight: 1.7,
              overflowX: "auto",
            }}
          >
            <span style={{ color: "#5eead4" }}>$</span>
            {" curl https://api.seo-analyzer.dev/v1/analyze \\\n"}
            {"  -H "}
            <span style={{ color: "#fde68a" }}>&quot;Authorization: Bearer sk_live_...&quot;</span>
            {" \\\n"}
            {"  -d "}
            <span style={{ color: "#fde68a" }}>
              {`'{"url":"https://stripe.com/pricing"}'`}
            </span>
            {"\n\n"}
            <span style={{ color: "#9ca3af" }}>{"{"}</span>
            {"\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;score&quot;</span>
            {": "}
            <span style={{ color: "#fbbf24" }}>87</span>
            {",\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;meta&quot;</span>
            {": "}
            <span style={{ color: "#9ca3af" }}>{"{ "}</span>
            <span style={{ color: "#7dd3fc" }}>&quot;title&quot;</span>
            {": "}
            <span style={{ color: "#fde68a" }}>&quot;Pricing — Stripe&quot;</span>
            <span style={{ color: "#9ca3af" }}>{" }"}</span>
            {",\n  "}
            <span style={{ color: "#7dd3fc" }}>&quot;warnings&quot;</span>
            {": "}
            <span style={{ color: "#9ca3af" }}>{"["}</span>
            <span style={{ color: "#fde68a" }}>&quot;missing_canonical&quot;</span>
            <span style={{ color: "#9ca3af" }}>{"]\n"}</span>
            <span style={{ color: "#9ca3af" }}>{"}"}</span>
          </pre>
        </div>
      </div>
    </section>
  );
}
