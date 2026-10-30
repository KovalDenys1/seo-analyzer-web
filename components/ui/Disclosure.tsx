"use client";

import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { enterExit } from "@/lib/motion";

export default function Disclosure({
  summary,
  className,
  children,
}: {
  summary: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  return (
    <m.details
      layout="position"
      className={className}
      open={mounted}
      onToggle={(e) => {
        // Find-in-page opens a closed <details> natively.
        if (e.currentTarget.open && !open) {
          setMounted(true);
          setOpen(true);
        }
      }}
    >
      <summary
        onClick={(e) => {
          e.preventDefault();
          if (open) setOpen(false);
          else {
            setMounted(true);
            setOpen(true);
          }
        }}
      >
        {summary}
      </summary>
      <AnimatePresence initial={false} onExitComplete={() => setMounted(false)}>
        {open && (
          <m.div key="content" variants={enterExit(reduce)} initial="hidden" animate="shown" exit="exit">
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </m.details>
  );
}
