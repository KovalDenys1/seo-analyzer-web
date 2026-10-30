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
    <div className="dash-shell">
      <aside className="dash-aside">
        {/* logo */}
        <Link href="/" className="dash-brand" aria-label="SEO Audit Lab home">
          <Logo size={22} color="#5eead4" />
          <span style={{ fontWeight: 700, color: "#fff", letterSpacing: -0.2 }}>
            SEO Audit <span style={{ color: "#5eead4" }}>Lab</span>
          </span>
        </Link>

        {/* nav */}
        <div
          className="dash-hide-sm"
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
        <nav className="dash-nav" aria-label="Dashboard">
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
                }}
              >
                <item.icon size={16} color={isActive ? "#5eead4" : "#9ca3af"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="dash-hide-sm" style={{ flex: 1 }} />

        {/* user */}
        <div className="dash-user">
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 32, height: 32 },
              },
            }}
          />
          <div className="dash-hide-sm" style={{ minWidth: 0, flex: 1 }}>
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

      <main className="dash-main">{children}</main>
    </div>
  );
}
