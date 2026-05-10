export default function StatTile({
  label,
  value,
  delta,
  deltaTone = "green",
  mono = true,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "green" | "gray";
  mono?: boolean;
}) {
  return (
    <div
      style={{
        padding: 18,
        background: "#fff",
        border: "1px solid var(--ink-200)",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "var(--ink-500)",
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {label}
      </div>
      <div
        style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 10 }}
      >
        <span
          className={mono ? "mono" : undefined}
          style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, color: "var(--ink-900)" }}
        >
          {value}
        </span>
        {delta && (
          <span
            style={{
              fontSize: 12,
              color: deltaTone === "green" ? "var(--green)" : "var(--ink-500)",
              fontWeight: 600,
            }}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
