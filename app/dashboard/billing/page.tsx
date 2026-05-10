import PageHead from "@/components/dashboard/PageHead";
import Pill from "@/components/ui/Pill";
import Table from "@/components/ui/Table";
import { ArrowR } from "@/components/ui/Icons";
import Link from "next/link";

const invoices = [
  { date: "May 02, 2026", desc: "Pro · Monthly",       amount: "$9.00",  },
  { date: "Apr 02, 2026", desc: "Pro · Monthly",       amount: "$9.00",  },
  { date: "Mar 02, 2026", desc: "Pro · Monthly",       amount: "$9.00",  },
  { date: "Feb 14, 2026", desc: "Free → Pro upgrade",  amount: "$4.20",  },
];

const btnTeal: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 16px",
  background: "var(--teal)",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};

const btnOutline: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "10px 16px",
  background: "transparent",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.18)",
  borderRadius: 8,
  fontFamily: "inherit",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};

export default function BillingPage() {
  return (
    <>
      <PageHead
        title="Billing"
        sub="Manage your subscription, payment method, and invoices."
      />

      <div
        style={{
          padding: 36,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 20,
        }}
      >
        {/* current plan card */}
        <div
          style={{
            background: "linear-gradient(135deg, var(--ink-900) 0%, #042f2e 100%)",
            color: "#fff",
            borderRadius: 14,
            padding: 28,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(400px 200px at 90% 10%, rgba(94,234,212,.18), transparent 60%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 12,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1.2,
              }}
            >
              Current plan
            </div>
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>Pro</span>
              <span style={{ fontSize: 16, color: "#9ca3af" }}>· $9 / month</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13.5, color: "#9ca3af" }}>
              5,000 requests/day · all endpoints · email support
            </div>
            <div style={{ marginTop: 22, display: "flex", gap: 10 }}>
              <button style={btnTeal}>Upgrade to Business</button>
              <button style={btnOutline}>Downgrade</button>
            </div>
            <div
              style={{
                marginTop: 24,
                padding: "14px 16px",
                background: "rgba(255,255,255,.06)",
                borderRadius: 10,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12.5,
              }}
            >
              <span style={{ color: "#9ca3af" }}>Next renewal</span>
              <span className="mono">May 23, 2026 · $9.00</span>
            </div>
          </div>
        </div>

        {/* payment method */}
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 14,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600 }}>Payment method</div>
          <div
            style={{
              marginTop: 14,
              padding: 16,
              border: "1px solid var(--ink-200)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 30,
                borderRadius: 4,
                background: "linear-gradient(135deg,#312e81,#0d9488)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div className="mono" style={{ fontSize: 13.5 }}>Visa •••• 4242</div>
              <div style={{ fontSize: 12, color: "var(--ink-500)" }}>Expires 09 / 28</div>
            </div>
            <button
              style={{
                padding: "6px 12px",
                background: "#fff",
                color: "var(--ink-700)",
                border: "1px solid var(--ink-200)",
                borderRadius: 8,
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </div>
          <div style={{ marginTop: 18, fontSize: 13, color: "var(--ink-500)" }}>
            Billing email{" "}
            <span style={{ color: "var(--ink-800)", marginLeft: 4 }}>
              billing@acme.com
            </span>
          </div>
        </div>
      </div>

      {/* invoice history */}
      <div style={{ padding: "0 36px 36px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Invoice history
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--ink-200)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Table
            cols={["Date", "Description", "Amount", "Status", ""]}
            colWidths={["1fr", "2fr", ".8fr", ".8fr", ".6fr"]}
            rows={invoices.map((iv) => [
              <span key="date" className="mono">{iv.date}</span>,
              <span key="desc" style={{ color: "var(--ink-700)" }}>{iv.desc}</span>,
              <span key="amt" className="mono">{iv.amount}</span>,
              <Pill key="status" tone="green">Paid</Pill>,
              <a
                key="pdf"
                style={{
                  fontSize: 12.5,
                  color: "var(--teal)",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Download PDF →
              </a>,
            ])}
          />
        </div>
      </div>
    </>
  );
}
