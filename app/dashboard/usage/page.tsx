import PageHead from "@/components/dashboard/PageHead";
import StatTile from "@/components/dashboard/StatTile";
import Pill from "@/components/ui/Pill";
import Table from "@/components/ui/Table";
import Bar from "@/components/ui/Bar";
import { Down } from "@/components/ui/Icons";

const DATA = [120,180,240,210,300,260,310,360,420,380,510,460,520,490,560,600,720,640,710,690,820,780,930,860,920,1010,980,1080,1140,1240];
const MAX = Math.max(...DATA);

const btnOutline: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 12px",
  background: "#fff",
  color: "var(--ink-700)",
  border: "1px solid var(--ink-200)",
  borderRadius: 8,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

export default function UsagePage() {
  return (
    <>
      <PageHead
        title="Usage"
        sub="Track requests, throughput, and where your quota is going."
        right={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={btnOutline}>
              Last 30 days <Down size={14} />
            </button>
            <button style={btnOutline}>Export CSV</button>
          </div>
        }
      />

      {/* stat tiles */}
      <div
        style={{
          padding: "24px 36px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        <StatTile label="This month"  value="48,329" delta="+24%" />
        <StatTile label="Last month"  value="38,965" />
        <StatTile label="Avg / day"   value="1,610"  delta="+18%" />
        <StatTile label="Quota used"  value="9.7%"   delta="of plan" deltaTone="gray" />
      </div>

      {/* bar chart */}
      <div style={{ padding: "0 36px 24px" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Requests per day</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>
                Apr 11 — May 10, 2026
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-500)" }}>
              {[
                { color: "var(--teal)",  label: "/analyze" },
                { color: "#5eead4",      label: "/quick-score" },
                { color: "#cffafe",      label: "/metadata" },
              ].map(({ color, label }) => (
                <span
                  key={label}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                >
                  <span
                    style={{ width: 10, height: 10, borderRadius: 2, background: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 4,
              height: 200,
              borderBottom: "1px solid var(--ink-100)",
            }}
          >
            {DATA.map((v, i) => {
              const a = Math.round(v * 0.55);
              const b = Math.round(v * 0.30);
              const c = v - a - b;
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div style={{ height: `${(c / MAX) * 100}%`, background: "#cffafe" }} />
                  <div style={{ height: `${(b / MAX) * 100}%`, background: "#5eead4" }} />
                  <div
                    style={{
                      height: `${(a / MAX) * 100}%`,
                      background: "var(--teal)",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="mono"
            style={{
              marginTop: 8,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "var(--ink-400)",
            }}
          >
            {["Apr 11", "Apr 18", "Apr 25", "May 2", "May 10"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* by endpoint table */}
      <div style={{ padding: "0 36px 36px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>By endpoint</div>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Table
            cols={["Endpoint", "Method", "Requests", "% of total", "Avg latency"]}
            colWidths={["1.6fr", ".6fr", "1fr", "1fr", "1fr"]}
            rows={[
              [
                <span key="ep" className="mono">/v1/analyze</span>,
                <Pill key="m" tone="gray">POST</Pill>,
                <span key="r" className="mono">26,581</span>,
                <Bar key="b" pct={55} />,
                <span key="l" className="mono" style={{ color: "var(--ink-700)" }}>184ms</span>,
              ],
              [
                <span key="ep" className="mono">/v1/quick-score</span>,
                <Pill key="m" tone="gray">GET</Pill>,
                <span key="r" className="mono">14,488</span>,
                <Bar key="b" pct={30} />,
                <span key="l" className="mono" style={{ color: "var(--ink-700)" }}>96ms</span>,
              ],
              [
                <span key="ep" className="mono">/v1/metadata</span>,
                <Pill key="m" tone="gray">GET</Pill>,
                <span key="r" className="mono">5,801</span>,
                <Bar key="b" pct={12} />,
                <span key="l" className="mono" style={{ color: "var(--ink-700)" }}>112ms</span>,
              ],
              [
                <span key="ep" className="mono">/v1/headings</span>,
                <Pill key="m" tone="gray">GET</Pill>,
                <span key="r" className="mono">1,459</span>,
                <Bar key="b" pct={3} />,
                <span key="l" className="mono" style={{ color: "var(--ink-700)" }}>88ms</span>,
              ],
            ]}
          />
        </div>
      </div>
    </>
  );
}
