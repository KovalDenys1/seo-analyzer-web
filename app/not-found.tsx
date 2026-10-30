import type { Metadata } from "next";
import Link from "next/link";
import TextPage from "@/components/landing/TextPage";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <TextPage title="Page not found" lead="There is no page at this address.">
      <p>
        <Link href="/#try">Run a free audit</Link>, read the <Link href="/docs">docs</Link> or see{" "}
        <Link href="/#pricing">pricing</Link>.
      </p>
    </TextPage>
  );
}
