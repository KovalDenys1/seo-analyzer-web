"use client";

import { useEffect, useRef } from "react";
import { animateMini, inView } from "motion/react";
import { EASE } from "@/lib/motion";

type Props = {
  as?: "div" | "figure" | "section";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  children: React.ReactNode;
};

const HIDDEN = { opacity: "0", transform: "translateY(12px)", filter: "blur(4px)" };

// The server HTML is always visible; only blocks still below the fold at hydration are hidden and revealed.
export default function Reveal({ as: Tag = "div", delay = 0, className, style, id, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.getBoundingClientRect().top < window.innerHeight) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clear = () => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.filter = "";
    };
    if (reduce) el.style.opacity = "0";
    else Object.assign(el.style, HIDDEN);

    const stop = inView(
      el,
      () => {
        stop();
        const keyframes = reduce
          ? { opacity: [0, 1] }
          : {
              opacity: [0, 1],
              transform: ["translateY(12px)", "translateY(0px)"],
              filter: ["blur(4px)", "blur(0px)"],
            };
        animateMini(el, keyframes, { duration: reduce ? 0.2 : 0.3, delay, ease: EASE }).then(clear);
      },
      { margin: "0px 0px -8% 0px" },
    );

    return () => {
      stop();
      clear();
    };
  }, [delay]);

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        ref.current = el;
      }}
      className={className}
      style={style}
      id={id}
    >
      {children}
    </Tag>
  );
}
