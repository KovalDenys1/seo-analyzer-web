"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { Check, Copy } from "@/components/ui/Icons";
import { SPRING } from "@/lib/motion";
import MotionScope from "@/components/motion/MotionScope";

export default function CopyButton({
  text,
  className,
  style,
  size = 14,
  label = "Copy",
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduce = useReducedMotion();
  const blur = (px: number) => (reduce ? "blur(0px)" : `blur(${px}px)`);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button type="button" onClick={copy} className={className} style={style}>
      <span className="icon-swap" style={{ width: size, height: size }}>
        <MotionScope>
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              key={copied ? "done" : "copy"}
              initial={{ opacity: 0, scale: 0.25, filter: blur(4) }}
              animate={{ opacity: 1, scale: 1, filter: blur(0) }}
              exit={{ opacity: 0, scale: 0.25, filter: blur(4) }}
              transition={SPRING}
            >
              {copied ? <Check size={size} /> : <Copy size={size} />}
            </m.span>
          </AnimatePresence>
        </MotionScope>
      </span>
      <span className="text-swap">
        <span data-off={copied || undefined} aria-hidden={copied || undefined}>
          {label}
        </span>
        <span data-off={!copied || undefined} aria-hidden={!copied || undefined}>
          Copied
        </span>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
