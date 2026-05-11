import PageHead from "@/components/dashboard/PageHead";
import StatTile from "@/components/dashboard/StatTile";
import Pill from "@/components/ui/Pill";
import Table from "@/components/ui/Table";
import Bar from "@/components/ui/Bar";
import { ensureUser } from "@/lib/ensure-user";
import { supabase } from "@/lib/supabase";

const PLAN_LIMITS: Record<string, number> = { free: 100, pro: 5000, business: 50000 };

export default async function UsagePage() {
  const user = await ensureUser();
  if (!user) return null;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // First day of current and previous month
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const firstOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
  const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString().slice(0, 10);

  // Days elapsed this month (at least 1)
  const daysElapsed = Math.max(now.getDate(), 1);

  // 30-day window start
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);

  // Parallel queries
  const [
    { count: thisMonth },
    { count: lastMonth },
    { count: usedToday },
    { data: dailyRaw },
    { data: endpointRaw },
  ] = await Promise.all([
    supabase.from("usage_logs").select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", firstOfMonth),
    supabase.from("usage_logs").select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", firstOfLastMonth).lt("created_at", firstOfNextMonth),
    supabase.from("usage_logs").select("id", { count: "exact", head: true })
      .eq("user_id", user.id).gte("created_at", todayStr),
    supabase.from("usage_logs").select("created_at")
      .eq("user_id", user.id).gte("created_at", thirtyDaysAgoStr)
      .order("created_at", { ascending: true }),
    supabase.from("usage_logs").select("endpoint, duration_ms")
      .eq("user_id", user.id).gte("created_at", firstOfMonth),
  ]);

  // Build 30-day array
  const dayCounts: Record<string, number> = {};
  for (const row of dailyRaw ?? []) {
    const d = row.created_at.slice(0, 10);
    dayCounts[d] = (dayCounts[d] ?? 0) + 1;
  }
  const days: string[] = [];
  const data: number[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo);
    d.setDate(d.getDate() + i);
    const str = d.toISOString().slice(0, 10);
    days.push(str);
    data.push(dayCounts[str] ?? 0);
  }
  const maxVal = Math.max(...data, 1);

  // Endpoint breakdown
  const epMap: Record<string, { count: number; totalMs: number }> = {};
  for (const row of endpointRaw ?? []) {
    const ep = row.endpoint as string;
    if (!epMap[ep]) epMap[ep] = { count: 0, totalMs: 0 };
    epMap[ep].count++;
    epMap[ep].totalMs += row.duration_ms ?? 0;
  }
  const totalRequests = Object.values(epMap).reduce((s, v) => s + v.count, 0);
  const endpoints = Object.entries(epMap)
    .map(([ep, { count, totalMs }]) => ({
      ep,
      count,
      pct: totalRequests > 0 ? Math.round((count / totalRequests) * 100) : 0,
      avgMs: count > 0 ? Math.round(totalMs / count) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Stats
  const tm = thisMonth ?? 0;
  const lm = lastMonth ?? 0;
  const avgDay = Math.round(tm / daysElapsed);
  const limit = PLAN_LIMITS[user.plan];
  const quotaPct = limit > 0 ? ((usedToday ?? 0) / limit * 100).toFixed(1) : "0.0";

  // Date labels for x-axis (show 5 evenly spaced)
  const labelIdxs = [0, 7, 14, 21, 29];
  const formatLabel = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <>
      <PageHead
        title="Usage"
        sub="Track requests, throughput, and where your quota is going."
      />

      <div style={{ padding: "24px 36px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <StatTile label="This month"  value={tm.toLocaleString()} delta={lm > 0 ? `${lm > 0 ? "+" : ""}${Math.round(((tm - lm) / lm) * 100)}%` : undefined} />
        <StatTile label="Last month"  value={lm.toLocaleString()} />
        <StatTile label="Avg / day"   value={avgDay.toLocaleString()} />
        <StatTile label="Quota used"  value={`${quotaPct}%`} deltaTone="gray" delta="today" />
      </div>

      {/* bar chart */}
      <div style={{ padding: "0 36px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Requests per day</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>
                {formatLabel(days[0])} — {formatLabel(days[29])}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ink-500)" }}>
              {[
                { color: "var(--teal)", label: "/analyze" },
                { color: "#5eead4",     label: "/quick-score" },
                { color: "#cffafe",     label: "/metadata" },
              ].map(({ color, label }) => (
                <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 200, borderBottom: "1px solid var(--ink-100)" }}>
            {data.map((v, i) => {
              // Split by endpoint ratio if we have endpoint data, otherwise show solid
              const analyzeShare = endpoints.find(e => e.ep === "/analyze")?.pct ?? 55;
              const qsShare = endpoints.find(e => e.ep === "/quick-score")?.pct ?? 30;
              const a = Math.round(v * analyzeShare / 100);
              const b = Math.round(v * qsShare / 100);
              const c = v - a - b;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                  {v > 0 && <div style={{ height: `${(c / maxVal) * 100}%`, background: "#cffafe" }} />}
                  {v > 0 && <div style={{ height: `${(b / maxVal) * 100}%`, background: "#5eead4" }} />}
                  <div style={{ height: `${(a / maxVal) * 100}%`, background: v > 0 ? "var(--teal)" : "var(--ink-100)", borderRadius: "3px 3px 0 0" }} />
                </div>
              );
            })}
          </div>

          <div className="mono" style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-400)" }}>
            {labelIdxs.map((idx) => <span key={idx}>{formatLabel(days[idx])}</span>)}
          </div>
        </div>
      </div>

      {/* by endpoint table */}
      <div style={{ padding: "0 36px 36px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>By endpoint</div>
        <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, overflow: "hidden" }}>
          {endpoints.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", fontSize: 13.5, color: "var(--ink-400)" }}>
              No requests this month yet.
            </div>
          ) : (
            <Table
              cols={["Endpoint", "Requests", "% of total", "Avg latency"]}
              colWidths={["1.6fr", "1fr", "1fr", "1fr"]}
              rows={endpoints.map((e) => [
                <span key="ep" className="mono">{e.ep}</span>,
                <span key="r" className="mono">{e.count.toLocaleString()}</span>,
                <Bar key="b" pct={e.pct} />,
                <span key="l" className="mono" style={{ color: "var(--ink-700)" }}>{e.avgMs}ms</span>,
              ])}
            />
          )}
        </div>
      </div>
    </>
  );
}
