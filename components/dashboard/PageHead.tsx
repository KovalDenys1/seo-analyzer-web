export default function PageHead({
  title,
  sub,
  right,
}: {
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "28px 36px 20px",
        borderBottom: "1px solid var(--ink-100)",
      }}
    >
      <div>
        <h1
          style={{ margin: 0, fontSize: 24, letterSpacing: -0.5, color: "var(--ink-900)" }}
        >
          {title}
        </h1>
        {sub && (
          <div style={{ marginTop: 4, fontSize: 13.5, color: "var(--ink-500)" }}>{sub}</div>
        )}
      </div>
      {right}
    </div>
  );
}
