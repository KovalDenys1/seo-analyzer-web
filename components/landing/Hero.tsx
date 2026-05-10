"use client";

import { useState } from "react";
import { Search, ArrowR, Check } from "@/components/ui/Icons";
import ScoreCircle from "@/components/ui/ScoreCircle";
import WarningBadge from "@/components/ui/WarningBadge";
import Link from "next/link";

const DEMO_RESULTS = {
  high: {
    score: 87,
    warnings: ["Missing canonical", "Slow LCP (3.2s)", "4 images without alt"] as string[],
  },
  low: {
    score: 54,
    warnings: ["No meta description", "H1 missing", "7 broken links"] as string[],
  },
};

export default function Hero() {
  const [url, setUrl] = useState("https://stripe.com/pricing");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(DEMO_RESULTS.high);

  const run = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const score = 60 + Math.floor(Math.random() * 38);
      setResult(score >= 80 ? DEMO_RESULTS.high : DEMO_RESULTS.low);
      setAnalyzing(false);
    }, 900);
  };

  return (
    <section
      style={{
        padding: "88px 56px 72px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* grid + radial bg */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% -10%, rgba(13,148,136,.10), transparent 55%)," +
            "linear-gradient(rgba(15,23,42,.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 32px 32px, 32px 32px",
          maskImage: "linear-gradient(180deg, #000 60%, transparent)",
        }}
      />

      <div style={{ position: "relative" }}>
        {/* badge */}
        <span
          className="mono"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: "#fff",
            border: "1px solid var(--ink-200)",
            fontSize: 12,
            color: "var(--ink-600)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <span
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)" }}
          />
          v1.4 · 12 new endpoints &nbsp;·&nbsp;{" "}
          <span style={{ color: "var(--teal)" }}>Read the changelog →</span>
        </span>

        <h1
          style={{
            margin: "24px auto 16px",
            maxWidth: 880,
            fontSize: 64,
            lineHeight: 1.05,
            letterSpacing: -2.2,
            fontWeight: 700,
            color: "var(--ink-900)",
          }}
        >
          Analyze any page&rsquo;s SEO
          <br />
          in <span style={{ color: "var(--teal)" }}>milliseconds</span>.
        </h1>

        <p
          style={{
            maxWidth: 600,
            margin: "0 auto 36px",
            fontSize: 17,
            lineHeight: 1.55,
            color: "var(--ink-500)",
          }}
        >
          Fast, accurate SEO analysis via API. Metadata, headings, links,
          images, keyword density, and a score &mdash; in a single round-trip.
        </p>

        {/* live demo widget */}
        <div
          style={{
            margin: "0 auto",
            maxWidth: 720,
            background: "#fff",
            borderRadius: 16,
            border: "1px solid var(--ink-200)",
            boxShadow: "var(--shadow-lg)",
            padding: 18,
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "4px 6px 14px",
              borderBottom: "1px solid var(--ink-100)",
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)" }}
            />
            <span className="mono" style={{ fontSize: 12, color: "var(--ink-500)" }}>
              POST /v1/analyze
            </span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-400)" }}>
              Try it — no key required
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 12px",
                height: 46,
                background: "var(--ink-50)",
                border: "1px solid var(--ink-200)",
                borderRadius: 10,
              }}
            >
              <Search size={16} color="var(--ink-400)" />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                className="mono"
                placeholder="https://example.com"
                style={{
                  flex: 1,
                  border: 0,
                  outline: 0,
                  background: "transparent",
                  fontSize: 13.5,
                  color: "var(--ink-800)",
                  fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
                }}
              />
            </div>
            <button
              onClick={run}
              disabled={analyzing}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 46,
                padding: "0 22px",
                background: analyzing ? "var(--ink-400)" : "var(--teal)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                cursor: analyzing ? "not-allowed" : "pointer",
                transition: "background .15s",
              }}
            >
              {analyzing ? "Analyzing…" : "Analyze"}
            </button>
          </div>

          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              alignItems: "center",
              gap: 20,
              padding: 16,
              background: "var(--ink-50)",
              borderRadius: 12,
            }}
          >
            <div style={{ display: "grid", placeItems: "center" }}>
              <ScoreCircle score={result.score} size={120} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-500)",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 8,
                }}
              >
                Warnings
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {result.warnings.map((w, i) => (
                  <WarningBadge key={i} tone={i === 1 ? "red" : "amber"}>
                    {w}
                  </WarningBadge>
                ))}
              </div>
              <div
                className="mono"
                style={{
                  marginTop: 14,
                  fontSize: 11.5,
                  color: "var(--ink-500)",
                  display: "flex",
                  gap: 16,
                }}
              >
                <span>↳ 142ms</span>
                <span>· 18 checks</span>
                <span>· response 4.1kb</span>
              </div>
            </div>
          </div>
        </div>

        {/* trust badges */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            gap: 24,
            fontSize: 12,
            color: "var(--ink-500)",
          }}
        >
          {[
            "99.99% uptime",
            "P95 < 200ms",
            "12 regions",
          ].map((text) => (
            <span
              key={text}
              style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
            >
              <Check size={14} color="var(--teal)" /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
