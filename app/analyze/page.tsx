"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo, Search, Tag, Heading, Link as LinkIcon, Image as ImageIcon, Key, Speed, Down } from "@/components/ui/Icons";
import ScoreCircle from "@/components/ui/ScoreCircle";
import WarningBadge from "@/components/ui/WarningBadge";
import Pill from "@/components/ui/Pill";
import Bar from "@/components/ui/Bar";
import Table from "@/components/ui/Table";
import type { ComponentType } from "react";

function Section({
  icon: Ico,
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  icon: ComponentType<{ size?: number; color?: string }>;
  title: string;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--ink-200)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--teal-50)",
            color: "var(--teal)",
            display: "grid",
            placeItems: "center",
            border: "1px solid var(--teal-100)",
            flexShrink: 0,
          }}
        >
          <Ico size={16} color="var(--teal)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink-900)" }}>{title}</div>
        </div>
        {badge}
        <span style={{ transform: open ? "rotate(0)" : "rotate(-90deg)", transition: "transform .15s", display: "flex" }}>
          <Down size={16} color="var(--ink-400)" />
        </span>
      </button>
      {open && <div style={{ padding: "4px 20px 20px" }}>{children}</div>}
    </div>
  );
}

function KV({ k, v, mono = true }: { k: string; v: React.ReactNode; mono?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px dashed var(--ink-100)",
      }}
    >
      <div
        style={{
          fontSize: 12.5,
          color: "var(--ink-500)",
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {k}
      </div>
      <div
        className={mono ? "mono" : undefined}
        style={{ fontSize: 13.5, color: "var(--ink-800)", overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {v}
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  const [query, setQuery] = useState("https://stripe.com/pricing");

  return (
    <div style={{ background: "var(--ink-50)", minHeight: "100vh" }}>
      {/* top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 36px",
          background: "#fff",
          borderBottom: "1px solid var(--ink-100)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <Logo size={20} />
            <span style={{ fontWeight: 700, letterSpacing: -0.2, color: "var(--ink-900)" }}>
              seo<span style={{ color: "var(--teal)" }}>.</span>analyzer
            </span>
          </Link>
          <span style={{ marginLeft: 14, fontSize: 12, color: "var(--ink-400)" }}>/ Analysis</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: 380,
              height: 38,
              padding: "0 12px",
              background: "var(--ink-50)",
              border: "1px solid var(--ink-200)",
              borderRadius: 10,
            }}
          >
            <Search size={14} color="var(--ink-400)" />
            <input
              className="mono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Analyze another URL"
              style={{
                flex: 1,
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 13,
                fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
              }}
            />
          </div>
          <button
            style={{
              height: 38,
              padding: "0 16px",
              background: "var(--teal)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Analyze
          </button>
        </div>
      </header>

      {/* score hero */}
      <div style={{ padding: "24px 36px" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 16,
            padding: 28,
            display: "grid",
            gridTemplateColumns: "180px 1fr 220px",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div style={{ display: "grid", placeItems: "center" }}>
            <ScoreCircle score={87} size={160} stroke={14} />
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                color: "var(--ink-500)",
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
              <span className="mono">200 OK · 142ms · cached 3m ago</span>
            </div>
            <h1
              className="mono"
              style={{
                margin: "8px 0 6px",
                fontSize: 22,
                color: "var(--ink-900)",
                fontWeight: 600,
                letterSpacing: -0.3,
              }}
            >
              https://stripe.com/pricing
            </h1>
            <div style={{ fontSize: 13.5, color: "var(--ink-500)" }}>
              Pricing — Stripe · analyzed May 10, 2026 at 4:18pm
            </div>
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              <WarningBadge tone="red">Missing canonical link</WarningBadge>
              <WarningBadge tone="amber">LCP &gt; 2.5s (3.2s)</WarningBadge>
              <WarningBadge tone="amber">4 images without alt</WarningBadge>
              <WarningBadge tone="amber">2 H2s before H1</WarningBadge>
            </div>
          </div>

          <div style={{ display: "grid", gap: 8, fontSize: 12.5 }}>
            {[
              { k: "Word count",     v: "1,284" },
              { k: "Internal links", v: "38" },
              { k: "External links", v: "12" },
              { k: "Images",         v: "24 (4 missing alt)" },
              { k: "Page weight",    v: "824 KB" },
            ].map((r) => (
              <div
                key={r.k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px dashed var(--ink-100)",
                  paddingBottom: 6,
                }}
              >
                <span style={{ color: "var(--ink-500)" }}>{r.k}</span>
                <span className="mono" style={{ color: "var(--ink-800)", fontWeight: 600 }}>
                  {r.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sections grid */}
      <div
        style={{
          padding: "0 36px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <Section icon={Tag} title="Meta" badge={<Pill tone="amber">3 issues</Pill>}>
          <KV k="Title"       v="Pricing — Stripe" />
          <KV k="Description" v="Transparent pricing for every Stripe product." />
          <KV k="Keywords"    v="pricing, payments, fees, billing, stripe" />
          <KV k="Canonical"   v={<span style={{ color: "var(--red)" }}>missing</span>} />
          <KV k="Robots"      v="index, follow" />
          <KV k="OG image"    v="https://stripe.com/og.png" />
          <KV k="Lang"        v="en" />
          <KV k="Viewport"    v="width=device-width, initial-scale=1" />
        </Section>

        <Section icon={Heading} title="Headings" badge={<Pill tone="gray">12 nodes</Pill>}>
          <div style={{ paddingTop: 4, fontSize: 13 }} className="mono">
            {[
              { lvl: 1, txt: "Pricing" },
              { lvl: 2, txt: "Pay as you go" },
              { lvl: 3, txt: "Cards, wallets, bank debits" },
              { lvl: 3, txt: "In-person payments" },
              { lvl: 2, txt: "Customized for your business" },
              { lvl: 3, txt: "Volume-based pricing" },
              { lvl: 2, txt: "Frequently asked questions" },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--teal)",
                    padding: "2px 0",
                    borderRadius: 4,
                    background: "var(--teal-50)",
                    border: "1px solid var(--teal-100)",
                  }}
                >
                  H{h.lvl}
                </span>
                <span style={{ color: "var(--ink-700)", paddingLeft: (h.lvl - 1) * 14 }}>
                  {h.txt}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={LinkIcon} title="Links" badge={<Pill tone="gray">50 total</Pill>}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 6 }}>
            {[
              { k: "Internal", v: 38, c: "var(--teal)" },
              { k: "External", v: 12, c: "var(--ink-700)" },
              { k: "Dofollow", v: 44, c: "var(--green)" },
              { k: "Nofollow", v:  6, c: "var(--amber)" },
            ].map((s) => (
              <div
                key={s.k}
                style={{ padding: 14, background: "var(--ink-50)", borderRadius: 10 }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--ink-500)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  {s.k}
                </div>
                <div
                  className="mono"
                  style={{ marginTop: 4, fontSize: 22, fontWeight: 700, color: s.c, letterSpacing: -0.3 }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-500)" }}>
            <span className="mono" style={{ color: "var(--red)" }}>2 broken</span> · stripe.com/old-docs, stripe.com/legacy-fees
          </div>
        </Section>

        <Section icon={ImageIcon} title="Images" badge={<Pill tone="amber">4 missing alt</Pill>}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 6 }}>
            {[
              { k: "Total",       v: 24, c: "var(--ink-700)" },
              { k: "With alt",    v: 20, c: "var(--green)" },
              { k: "Missing alt", v:  4, c: "var(--red)" },
            ].map((s) => (
              <div key={s.k} style={{ padding: 14, background: "var(--ink-50)", borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                  {s.k}
                </div>
                <div className="mono" style={{ marginTop: 4, fontSize: 22, fontWeight: 700, color: s.c }}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div className="mono" style={{ marginTop: 14, fontSize: 12.5, color: "var(--ink-500)" }}>
            /img/hero-bg.png · /img/case-studies/uber.png · /img/integrations/shopify.svg
          </div>
        </Section>

        <Section icon={Key} title="Keyword density" badge={<Pill tone="gray">Top 10</Pill>}>
          <Table
            cols={["Term", "", "Count", "Density"]}
            colWidths={["1.2fr", "2fr", ".6fr", "1fr"]}
            rows={[
              ["payments",    <Bar key="b" pct={42} />, <span className="mono">54</span>, <span className="mono">4.2%</span>],
              ["pricing",     <Bar key="b" pct={31} />, <span className="mono">39</span>, <span className="mono">3.1%</span>],
              ["fee",         <Bar key="b" pct={26} />, <span className="mono">34</span>, <span className="mono">2.6%</span>],
              ["transaction", <Bar key="b" pct={22} />, <span className="mono">28</span>, <span className="mono">2.2%</span>],
              ["stripe",      <Bar key="b" pct={19} />, <span className="mono">24</span>, <span className="mono">1.9%</span>],
              ["business",    <Bar key="b" pct={14} />, <span className="mono">18</span>, <span className="mono">1.4%</span>],
              ["volume",      <Bar key="b" pct={11} />, <span className="mono">14</span>, <span className="mono">1.1%</span>],
              ["card",        <Bar key="b" pct={ 9} />, <span className="mono">12</span>, <span className="mono">0.9%</span>],
              ["custom",      <Bar key="b" pct={ 8} />, <span className="mono">10</span>, <span className="mono">0.8%</span>],
              ["discount",    <Bar key="b" pct={ 7} />, <span className="mono"> 9</span>, <span className="mono">0.7%</span>],
            ]}
          />
        </Section>

        <Section icon={Speed} title="Performance" badge={<Pill tone="amber">LCP slow</Pill>}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 6 }}>
            {[
              { k: "TTFB", v: "188ms", tone: "green" as const },
              { k: "LCP",  v: "3.2s",  tone: "amber" as const },
              { k: "CLS",  v: "0.04",  tone: "green" as const },
              { k: "INP",  v: "142ms", tone: "green" as const },
            ].map((m) => (
              <div
                key={m.k}
                style={{
                  padding: 14,
                  background: "var(--ink-50)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                    {m.k}
                  </div>
                  <div className="mono" style={{ marginTop: 4, fontSize: 18, fontWeight: 700, letterSpacing: -0.3 }}>
                    {m.v}
                  </div>
                </div>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background:
                      m.tone === "green" ? "var(--green)" : m.tone === "amber" ? "var(--amber)" : "var(--red)",
                  }}
                />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
