import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkLocalization } from "@/lib/clerk";

export const metadata: Metadata = {
  robots: { index: false },
};

// Clerk loads only on account pages, so public pages ship no auth JavaScript.
export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider localization={clerkLocalization}>{children}</ClerkProvider>;
}
