type Tone = "amber" | "red" | "green";

const palette: Record<Tone, { bg: string; fg: string; dot: string }> = {
  amber: { bg: "#fef3c7", fg: "#92400e", dot: "#f59e0b" },
  red:   { bg: "#fee2e2", fg: "#991b1b", dot: "#ef4444" },
  green: { bg: "#d1fae5", fg: "#065f46", dot: "#10b981" },
};

export default function WarningBadge({
  tone = "amber",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  const p = palette[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        background: p.bg,
        color: p.fg,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: p.dot,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
