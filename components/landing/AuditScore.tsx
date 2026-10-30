"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { EASE } from "@/lib/motion";

export default function AuditScore({ score, size = 112, stroke = 10 }: { score: number; size?: number; stroke?: number }) {
  const reduce = useReducedMotion();
  const num = useRef<HTMLDivElement>(null);
  const color = score >= 80 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)";
  const r = (size - stroke) / 2;
  const target = Math.min(Math.max(score, 0), 100) / 100;
  const fmt = (v: number) => (Number.isInteger(score) ? String(Math.round(v)) : v.toFixed(1));
  const write = (v: number) => {
    if (num.current) num.current.textContent = fmt(v);
  };

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ink-100)" strokeWidth={stroke} />
        <m.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? target : 0 }}
          animate={{ pathLength: target }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          onUpdate={(latest) => {
            if (typeof latest.pathLength === "number") write(latest.pathLength * 100);
          }}
          onAnimationComplete={() => write(score)}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <div
            ref={num}
            style={{
              fontSize: size * (Number.isInteger(score) ? 0.32 : 0.27),
              fontWeight: 700,
              color: "var(--ink-900)",
              letterSpacing: -1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(reduce ? score : 0)}
          </div>
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
        </div>
      </div>
    </div>
  );
}
