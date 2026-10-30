import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkLocalization } from "@/lib/clerk";
import DashShell from "@/components/dashboard/DashShell";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={clerkLocalization}>
      <DashShell>{children}</DashShell>
    </ClerkProvider>
  );
}
