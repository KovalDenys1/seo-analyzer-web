import Link from "next/link";
import PageHead from "@/components/dashboard/PageHead";
import StatTile from "@/components/dashboard/StatTile";
import ScorePill from "@/components/ui/ScorePill";
import Pill from "@/components/ui/Pill";
import Table from "@/components/ui/Table";
import { Key, Lightning } from "@/components/ui/Icons";
import { ensureUser } from "@/lib/ensure-user";
import { supabase } from "@/lib/supabase";

const PLAN_LIMITS: Record<string, number> = { free: 100, pro: 5000, business: 50000 };

export default async function OverviewPage() {
  const user = await ensureUser();
  if (!user) return null;

  const plan = user.plan;
  const limit = PLAN_LIMITS[plan];

  // Usage today
  const today = new Date().toISOString().slice(0, 10);
  const { count: usedToday } = await supabase
    .from("usage_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", today);

  const used = usedToday ?? 0;
  const pct = Math.min(Math.round((used / limit) * 100), 100);

  // API key prefix
  const { data: keyRows } = await supabase
    .from("api_keys")
    .select("key_prefix, last_used")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);
  const activeKey = keyRows?.[0] ?? null;

  // Recent logs
  const { data: logs } = await supabase
    .from("usage_logs")
    .select("url, endpoint, score, status, duration_ms, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(7);

  const recentRows = (logs ?? []).map((r) => {
    const age = Math.round((Date.now() - new Date(r.created_at).getTime()) / 1000);
    const t = age < 60 ? `${age}s ago` : age < 3600 ? `${Math.round(age / 60)}m ago` : `${Math.round(age / 3600)}h ago`;
    return { url: r.url ?? "—", ep: r.endpoint, score: r.score, ok: r.status < 400, t };
  });

  // Hours until midnight reset
  const now = new Date();
  const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
  const hoursLeft = Math.round((midnight.getTime() - now.getTime()) / 3600000);

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <>
      <PageHead
        title="Overview"
        sub={`Welcome back, ${user.name ?? user.email.split("@")[0]}`}
      />

      <div style={{ padding: "24px 36px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <div style={{ padding: 18, background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12 }}>
          <div style={{ fontSize: 12, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: 0.8 }}>Plan</div>
          <div style={{ marginTop: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
              background: "var(--teal-50)", color: "var(--teal)", border: "1px solid var(--teal-100)",
            }}>
              <Lightning size={12} /> {planLabel} plan
            </span>
          </div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink-500)" }}>
            {limit.toLocaleString()} req/day
          </div>
        </div>
        <StatTile label="Requests today" value={used.toLocaleString()} />
        <StatTile label="Daily limit" value={limit.toLocaleString()} />
        <StatTile label="Resets in" value={`${hoursLeft}h`} />
      </div>

      {/* quota bar */}
      <div style={{ padding: "0 36px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Daily request quota</div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 2 }}>
                {used.toLocaleString()} / {limit.toLocaleString()} · resets in {hoursLeft}h
              </div>
            </div>
            <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{pct}% used</span>
          </div>
          <div style={{ height: 10, background: "var(--ink-100)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: pct > 90 ? "var(--red)" : "linear-gradient(90deg, var(--teal) 0%, #5eead4 100%)",
            }} />
          </div>
        </div>
      </div>

      {/* api key preview */}
      <div style={{ padding: "0 36px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Key size={16} color="var(--ink-500)" />
              <div style={{ fontSize: 14, fontWeight: 600 }}>API key</div>
            </div>
            <Link href="/dashboard/api-key" style={{
              fontSize: 12.5, color: "var(--teal)", fontWeight: 500, textDecoration: "none",
            }}>
              Manage →
            </Link>
          </div>
          <div className="mono" style={{
            padding: "14px 18px", background: "var(--ink-50)",
            border: "1px solid var(--ink-100)", borderRadius: 10,
            fontSize: 14, color: "var(--ink-800)", letterSpacing: 0.4,
          }}>
            {activeKey
              ? <>{activeKey.key_prefix}<span style={{ color: "var(--ink-400)" }}>••••••••••••••••••••••••</span></>
              : <span style={{ color: "var(--ink-400)" }}>No key yet — <Link href="/dashboard/api-key" style={{ color: "var(--teal)" }}>generate one</Link></span>
            }
          </div>
        </div>
      </div>

      {/* recent requests */}
      <div style={{ padding: "0 36px 36px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recent requests</div>
        <div style={{ background: "#fff", border: "1px solid var(--ink-200)", borderRadius: 12, overflow: "hidden" }}>
          {recentRows.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", fontSize: 13.5, color: "var(--ink-400)" }}>
              No requests yet. Use your API key to start analyzing pages.
            </div>
          ) : (
            <Table
              cols={["URL", "Endpoint", "Score", "Timestamp", "Status"]}
              colWidths={["1.6fr", "1fr", ".6fr", "1fr", ".7fr"]}
              rows={recentRows.map((r) => [
                <span key="url" className="mono" style={{ color: "var(--ink-700)", fontSize: 12 }}>{r.url}</span>,
                <span key="ep" className="mono" style={{ fontSize: 12, color: "var(--ink-500)", padding: "2px 8px", background: "var(--ink-100)", borderRadius: 4 }}>{r.ep}</span>,
                r.score === null ? <span key="score" style={{ color: "var(--ink-400)" }}>—</span> : <ScorePill key="score" score={r.score} />,
                <span key="time" style={{ color: "var(--ink-500)" }}>{r.t}</span>,
                r.ok ? <Pill key="status" tone="green">200 OK</Pill> : <Pill key="status" tone="red">error</Pill>,
              ])}
            />
          )}
        </div>
      </div>
    </>
  );
}
