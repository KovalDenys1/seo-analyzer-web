"use client";

import { useState } from "react";
import { Search, ArrowR } from "@/components/ui/Icons";
import ScoreCircle from "@/components/ui/ScoreCircle";
import WarningBadge from "@/components/ui/WarningBadge";
import { APIFY_ACTOR_URL } from "@/lib/site";

type Issue = { code: string; severity: string; title: string; recommendation: string };
type Fix = { code: string; impact: string; effort: string; title: string; action: string };
type Result = {
  url: string;
  status_code: number | null;
  title: string | null;
  score: { overall: number; grade: string };
  saas_score: { overall: number | null; grade: string | null } | null;
  issues: Issue[];
  recommendations: Fix[];
  duration_ms: number;
};

const tone = (severity: string) =>
  severity === "critical" || severity === "high" ? "red" : "amber";

export default function AuditWidget() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(null);
        setError(data?.error?.message ?? "That page could not be audited.");
      } else {
        setResult(data as Result);
      }
    } catch {
      setResult(null);
      setError("The audit service did not answer. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="try" className="audit-card">
      <div className="audit-card-head">
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--teal)" }} />
        <span className="mono" style={{ fontSize: 12, color: "var(--ink-500)" }}>
          Free page audit
        </span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-400)" }}>
          No sign-up
        </span>
      </div>

      <form onSubmit={run} className="audit-form">
        <label className="audit-input">
          <Search size={16} color="var(--ink-400)" />
          <span className="sr-only">Page address</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mono"
            inputMode="url"
            autoComplete="url"
            placeholder="yourproduct.com"
            required
          />
        </label>
        <button type="submit" disabled={loading} className="btn-teal audit-btn">
          {loading ? "Auditing…" : "Audit"}
        </button>
      </form>

      {error && (
        <p role="alert" style={{ margin: "14px 4px 0", fontSize: 13.5, color: "#991b1b" }}>
          {error}
        </p>
      )}

      {!result && !error && (
        <p style={{ margin: "14px 4px 0", fontSize: 13, color: "var(--ink-500)" }}>
          Takes a few seconds. Checks the HTML a crawler receives: indexability, title and
          description, headings, links, images, social previews, structured data and SaaS
          conversion signals.
        </p>
      )}

      {result && (
        <div aria-live="polite" className="audit-result">
          <div className="audit-scores">
            <ScoreCircle score={Math.round(result.score.overall)} size={112} />
            <div style={{ fontSize: 13, color: "var(--ink-600)", textAlign: "center" }}>
              SEO grade <strong>{result.score.grade}</strong>
              {result.saas_score?.overall != null && (
                <>
                  <br />
                  SaaS score <strong>{Math.round(result.saas_score.overall)}</strong>
                </>
              )}
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              className="mono"
              style={{ fontSize: 12, color: "var(--ink-500)", marginBottom: 8, overflowWrap: "anywhere" }}
            >
              {result.url} · HTTP {result.status_code ?? "?"} · {result.issues.length} issues
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {result.issues.slice(0, 6).map((i) => (
                <WarningBadge key={i.code} tone={tone(i.severity)}>
                  {i.title}
                </WarningBadge>
              ))}
              {result.issues.length === 0 && (
                <WarningBadge tone="green">No issues found</WarningBadge>
              )}
            </div>

            {result.recommendations.length > 0 && (
              <ol className="audit-fixes">
                {result.recommendations.slice(0, 3).map((r) => (
                  <li key={r.code}>
                    <strong>{r.title}.</strong> {r.action}
                    <span className="mono audit-meta">
                      impact {r.impact} · effort {r.effort}
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <div style={{ marginTop: 14, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
              <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener" className="link-teal">
                Audit the whole site on Apify <ArrowR size={13} />
              </a>
              <a href="/docs" className="link-quiet">
                Full JSON report via the API
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
