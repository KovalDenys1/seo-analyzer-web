"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ArrowR } from "@/components/ui/Icons";
import ScoreCircle from "@/components/ui/ScoreCircle";
import WarningBadge from "@/components/ui/WarningBadge";
import { APIFY_ACTOR_URL, SITE_URL } from "@/lib/site";

type Issue = {
  code: string;
  severity: string;
  title: string;
  recommendation: string;
  caused_by: string | null;
  evidence: string | null;
};
type Fix = { code: string; impact: string; effort: string; title: string; action: string };
type Result = {
  url: string;
  status_code: number | null;
  title: string | null;
  score: { overall: number; grade: string };
  saas_score: { overall: number | null; grade: string | null; note?: string } | null;
  issues: Issue[];
  recommendations: Fix[];
  duration_ms: number;
};

const tone = (severity: string) =>
  severity === "critical" || severity === "high" ? "red" : "amber";

const OPEN_ISSUES = 5;
const DEMO_SHELL_URL = `${SITE_URL}/demo/spa-shell`;
const GATES = ["http.non_success_status", "content.javascript_shell"];

export default function AuditWidget() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusOnTry = () => {
      if (window.location.hash === "#try") inputRef.current?.focus({ preventScroll: true });
    };
    focusOnTry();
    window.addEventListener("hashchange", focusOnTry);
    return () => window.removeEventListener("hashchange", focusOnTry);
  }, []);

  const audit = async (target: string) => {
    if (!target.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setResult(null);
        setError(data?.error?.message ?? "The audit service did not answer. Try again in a minute.");
      } else {
        setResult(data as Result);
        requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: false }));
      }
    } catch {
      setResult(null);
      setError("The audit service did not answer. Try again in a minute.");
    } finally {
      setLoading(false);
    }
  };

  const gate = result?.issues.find((i) => GATES.includes(i.code)) ?? null;
  const main = (result?.issues ?? []).filter((i) => !i.caused_by && i !== gate);
  const symptoms = (result?.issues ?? []).filter((i) => i.caused_by);
  const fixes = (result?.recommendations ?? []).filter((r) => r.code !== `fix.${gate?.code}`).slice(0, 3);

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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          audit(url);
        }}
        className="audit-form"
      >
        <label className="audit-input">
          <Search size={16} color="var(--ink-400)" />
          <span className="sr-only">Page address</span>
          <input
            ref={inputRef}
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

      <p className="sr-only" aria-live="polite">
        {loading
          ? "Auditing the page."
          : result
            ? `Audit done. Score ${result.score.overall.toFixed(1)}, grade ${result.score.grade}, ${result.issues.length} issues.`
            : ""}
      </p>

      {error && (
        <p role="alert" style={{ margin: "14px 4px 0", fontSize: 13.5, color: "#991b1b" }}>
          {error}
        </p>
      )}

      {!result && (
        <p className="audit-demo">
          Built with React, Vue or Vite?{" "}
          <button
            type="button"
            className="audit-demo-btn"
            disabled={loading}
            onClick={() => {
              setUrl(DEMO_SHELL_URL);
              audit(DEMO_SHELL_URL);
            }}
          >
            See what a crawler gets from a JavaScript-only page
          </button>
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
        <div
          ref={resultRef}
          tabIndex={-1}
          aria-busy={loading}
          className="audit-result"
          style={{ opacity: loading ? 0.45 : 1 }}
        >
          <div className="audit-scores">
            <ScoreCircle score={Math.round(result.score.overall * 10) / 10} size={112} />
            <div style={{ fontSize: 13, color: "var(--ink-600)", textAlign: "center" }}>
              SEO grade <strong>{result.score.grade}</strong>
              {result.saas_score?.overall == null && result.saas_score?.note && (
                <>
                  <br />
                  <span style={{ fontSize: 12, color: "var(--ink-500)" }}>SaaS score not scored</span>
                </>
              )}
              {result.saas_score?.overall != null && (
                <>
                  <br />
                  <span title="Whether the page gives a visitor a reason to sign up: value proposition, call to action, proof, pricing">
                    SaaS score <strong>{Math.round(result.saas_score.overall)}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 className="audit-result-title">{result.title || result.url}</h2>
            <div className="mono audit-result-url">
              {result.url} · HTTP {result.status_code ?? "?"} · {result.issues.length}{" "}
              {result.issues.length === 1 ? "issue" : "issues"} · {(result.duration_ms / 1000).toFixed(1)} s
            </div>

            {gate && (
              <div className="audit-gate" role="note">
                <strong>{gate.title}.</strong> {gate.recommendation}
                {gate.evidence && <span className="mono audit-meta">{gate.evidence}</span>}
              </div>
            )}

            {result.issues.length === 0 ? (
              <WarningBadge tone="green">No issues found</WarningBadge>
            ) : (
              <>
                <ul className="audit-issues">
                  {main.slice(0, OPEN_ISSUES).map((i) => (
                    <IssueRow key={i.code} issue={i} />
                  ))}
                </ul>
                {main.length > OPEN_ISSUES && (
                  <details className="audit-more">
                    <summary>Show {main.length - OPEN_ISSUES} more</summary>
                    <ul className="audit-issues">
                      {main.slice(OPEN_ISSUES).map((i) => (
                        <IssueRow key={i.code} issue={i} />
                      ))}
                    </ul>
                  </details>
                )}
                {symptoms.length > 0 && (
                  <details className="audit-more">
                    <summary>
                      {symptoms.length} more {symptoms.length === 1 ? "issue comes" : "issues come"} from the
                      empty HTML
                    </summary>
                    <p className="audit-issue-fix" style={{ margin: "0 0 10px" }}>
                      These are what a crawler sees because the content is rendered by JavaScript. Server
                      rendering fixes them together.
                    </p>
                    <ul className="audit-issues">
                      {symptoms.map((i) => (
                        <IssueRow key={i.code} issue={i} />
                      ))}
                    </ul>
                  </details>
                )}
              </>
            )}

            {fixes.length > 0 && (
              <>
                <h3 className="audit-sub">{gate ? "Then fix" : "Fix first"}</h3>
                <ol className="audit-fixes">
                  {fixes.map((r) => (
                    <li key={r.code}>
                      <strong>{r.title}.</strong> {r.action}
                      <span className="mono audit-meta">
                        impact {r.impact} · effort {r.effort}
                      </span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            <div className="audit-next">
              <p>
                This checked one page. To audit every page of the site, run the Apify actor:
                $0.02 a page, and Apify&apos;s free plan includes $5 of usage a month.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                <a href={APIFY_ACTOR_URL} target="_blank" rel="noopener" className="btn-teal btn-sm">
                  Audit the whole site <ArrowR size={13} />
                </a>
                <a href="/docs#score" className="link-quiet">
                  How the score works
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IssueRow({ issue }: { issue: Issue }) {
  return (
    <li>
      <WarningBadge tone={tone(issue.severity)}>{issue.severity}</WarningBadge>
      <div>
        <div className="audit-issue-title">{issue.title}</div>
        <div className="audit-issue-fix">{issue.recommendation}</div>
        {issue.evidence && <div className="mono audit-meta">{issue.evidence}</div>}
      </div>
    </li>
  );
}
