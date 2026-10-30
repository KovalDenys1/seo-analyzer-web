import type { Transition, Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.2, 0, 0, 1];

export const MOVE: Transition = { duration: 0.3, ease: EASE };
export const FADE: Transition = { duration: 0.18, ease: EASE };
export const EXIT: Transition = { duration: 0.15, ease: "easeOut" };
export const SPRING: Transition = { type: "spring", duration: 0.3, bounce: 0 };

// Under reduced motion MotionConfig already drops the movement, so only the blur needs removing here.
export function enterExit(reduce: boolean | null): Variants {
  const blur = (px: number) => (reduce ? "blur(0px)" : `blur(${px}px)`);
  return {
    hidden: { opacity: 0, y: 12, filter: blur(4) },
    shown: { opacity: 1, y: 0, filter: blur(0), transition: MOVE },
    exit: { opacity: 0, y: -12, filter: blur(4), transition: EXIT },
  };
}

export function stagger(gap: number, delay = 0): Variants {
  return { shown: { transition: { staggerChildren: gap, delayChildren: delay } } };
}
