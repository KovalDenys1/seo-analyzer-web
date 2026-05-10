type Tone = "green" | "amber" | "red";

const palette: Record<Tone, { bg: string; fg: string }> = {
  green: { bg: "#d1fae5", fg: "#065f46" },
  amber: { bg: "#fef3c7", fg: "#92400e" },
  red:   { bg: "#fee2e2", fg: "#991b1b" },
};

export default function ScorePill({ score }: { score: number }) {
  const tone: Tone = score >= 80 ? "green" : score >= 50 ? "amber" : "red";
  const p = palette[tone];
  return (
    <span
      className="mono"
      style={{
        display: "inline-block",
        minWidth: 36,
        textAlign: "center",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        background: p.bg,
        color: p.fg,
      }}
    >
      {score}
    </span>
  );
}
