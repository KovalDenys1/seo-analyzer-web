"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

// Only components that animate load the features, after hydration, so static pages ship none of it.
export default function MotionScope({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
