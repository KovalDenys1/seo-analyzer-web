"use client";

import { MotionConfig } from "motion/react";
import { MOVE } from "@/lib/motion";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={MOVE}>
      {children}
    </MotionConfig>
  );
}
