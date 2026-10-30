"use client";

import { useEffect } from "react";
import PageHead from "@/components/dashboard/PageHead";

export default function DashboardError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHead title="Something went wrong" />
      <div style={{ padding: "24px var(--dash-pad)", maxWidth: 560 }}>
        <p style={{ margin: "0 0 16px", fontSize: 14, color: "var(--ink-600)", lineHeight: 1.55 }}>
          Your account data could not be loaded. This is on our side, and your API key still works if
          you have one. Try again in a minute.
        </p>
        <button onClick={() => retry()} className="btn-teal btn-sm">
          Try again
        </button>
      </div>
    </>
  );
}
