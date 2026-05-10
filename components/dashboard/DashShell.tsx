"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Logo, Home, Key, Chart, Card, Doc } from "@/components/ui/Icons";

const navItems = [
  { id: "overview", label: "Overview", icon: Home,  href: "/dashboard" },
  { id: "apikey",   label: "API Key",  icon: Key,   href: "/dashboard/api-key" },
  { id: "usage",    label: "Usage",    icon: Chart,  href: "/dashboard/usage" },
  { id: "billing",  label: "Billing",  icon: Card,   href: "/dashboard/billing" },
  { id: "docs",     label: "Docs",     icon: Doc,    href: "/docs" },
];

export default function DashShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "232px 1fr", height: "100vh", overflow: "hidden" }}>
      <aside
        style={{
          background: "var(--ink-800)",
          color: "#e5e7eb",
          display: "flex",
          flexDirection: "column",
          padding: "20px 14px",
          overflow: "hidden",
        }}
      >
        {/* logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "4px 8px 16px",
            borderBottom: "1px solid #1f2937",
          }}
        >
          <Logo size={22} color="#5eead4" />
          <span style={{ fontWeight: 700, color: "#fff", letterSpacing: -0.2 }}>
            seo<span style={{ color: "#5eead4" }}>.</span>analyzer
          </span>
        </div>

        {/* nav */}
        <div
          style={{
            marginTop: 16,
            fontSize: 11,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: 1.2,
            padding: "0 8px",
          }}
        >
          Workspace
        </div>
        <div style={{ marginTop: 8, display: "grid", gap: 2 }}>
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: isActive ? "#fff" : "#9ca3af",
                  background: isActive ? "rgba(94,234,212,.08)" : "transparent",
                  boxShadow: isActive ? "inset 0 0 0 1px rgba(94,234,212,.18)" : "none",
                  textDecoration: "none",
                  transition: "color .1s, background .1s",
                }}
              >
                <item.icon size={16} color={isActive ? "#5eead4" : "#9ca3af"} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* status */}
        <div
          style={{
            marginTop: 28,
            fontSize: 11,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: 1.2,
            padding: "0 8px",
          }}
        >
          Status
        </div>
        <div
          style={{
            margin: "8px 0",
            padding: "10px 12px",
            background: "rgba(255,255,255,.03)",
            borderRadius: 8,
            border: "1px solid #1f2937",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#e5e7eb" }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }}
            />
            All systems operational
          </div>
          <div className="mono" style={{ marginTop: 4, fontSize: 11, color: "#6b7280" }}>
            api · 142ms · p95
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* user */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 8px",
            borderTop: "1px solid #1f2937",
          }}
        >
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 32, height: 32 },
              },
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                color: "#fff",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.fullName ?? user?.username ?? "Account"}
            </div>
            <div
              style={{
                fontSize: 11.5,
                color: "#9ca3af",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </div>
          </div>
        </div>
      </aside>

      <main style={{ background: "#fff", overflowY: "auto" }}>{children}</main>
    </div>
  );
}
