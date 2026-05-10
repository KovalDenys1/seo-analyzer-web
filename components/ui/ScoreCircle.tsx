type Props = { score: number; size?: number; stroke?: number; label?: boolean };

export default function ScoreCircle({ score, size = 120, stroke = 10, label = true }: Props) {
  const color =
    score >= 80 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)";
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--ink-100)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: size * 0.32,
              fontWeight: 700,
              color: "var(--ink-900)",
              letterSpacing: -1,
            }}
          >
            {score}
          </div>
          {label && (
            <div
              style={{
                fontSize: 10,
                color: "var(--ink-500)",
                textTransform: "uppercase",
                letterSpacing: 1.2,
                marginTop: -4,
              }}
            >
              Score
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
