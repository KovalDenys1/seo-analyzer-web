export default function Bar({ pct }: { pct: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          maxWidth: 140,
          height: 6,
          background: "var(--ink-100)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: `${pct}%`, height: "100%", background: "var(--teal)" }}
        />
      </div>
      <span className="mono" style={{ fontSize: 12, color: "var(--ink-500)" }}>
        {pct}%
      </span>
    </div>
  );
}
