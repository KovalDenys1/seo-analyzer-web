import DashShell from "@/components/dashboard/DashShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashShell>{children}</DashShell>;
}
