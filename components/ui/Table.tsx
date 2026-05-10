"use client";

type Row = React.ReactNode[];

export default function Table({
  cols,
  colWidths,
  rows,
}: {
  cols: string[];
  colWidths: string[];
  rows: Row[];
}) {
  const gridCols = colWidths.join(" ");
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols,
          padding: "10px 16px",
          background: "var(--ink-50)",
          borderBottom: "1px solid var(--ink-100)",
          fontSize: 11,
          color: "var(--ink-500)",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: 600,
        }}
      >
        {cols.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
      <div>
        {rows.map((cells, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              padding: "12px 16px",
              alignItems: "center",
              fontSize: 13,
              borderBottom: i < rows.length - 1 ? "1px solid var(--ink-100)" : "none",
              transition: "background .1s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "var(--ink-50)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.background = "transparent")
            }
          >
            {cells.map((c, j) => (
              <div key={j}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
