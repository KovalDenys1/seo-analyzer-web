type Tone = "green" | "red" | "amber" | "gray";

const palette: Record<Tone, { bg: string; fg: string }> = {
  green: { bg: "#d1fae5", fg: "#065f46" },
  red:   { bg: "#fee2e2", fg: "#991b1b" },
  amber: { bg: "#fef3c7", fg: "#92400e" },
  gray:  { bg: "var(--ink-100)", fg: "var(--ink-700)" },
};

export default function Pill({
  tone,
  children,
}: {
  tone: Tone;
  children: React.ReactNode;
}) {
  const p = palette[tone];
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 600,
        background: p.bg,
        color: p.fg,
      }}
    >
      {children}
    </span>
  );
}
