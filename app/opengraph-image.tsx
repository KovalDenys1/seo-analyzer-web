import { ImageResponse } from "next/og";

export const alt = "SEO Audit Lab – free SEO audit for SaaS and product sites";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b1220 0%, #042f2e 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: "#14b8a6" }} />
          SEO Audit Lab
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            Find the SEO issues that cost your SaaS signups.
          </div>
          <div style={{ fontSize: 30, color: "#9ca3af" }}>
            Score, evidence and ranked fixes for any page. Free to try.
          </div>
        </div>
      </div>
    ),
    size
  );
}
