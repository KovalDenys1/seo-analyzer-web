"use client";

import { useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Reveal from "@/components/motion/Reveal";
import MotionScope from "@/components/motion/MotionScope";
import { EXIT } from "@/lib/motion";
import { PROMO_VIDEO } from "@/lib/site";

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section className="section section-tinted" aria-labelledby="promo-video-title">
      <div className="container">
        <Reveal style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="mono eyebrow">See it run</div>
          <h2 id="promo-video-title" className="section-title">
            What a crawler sees, in 45 seconds.
          </h2>
        </Reveal>

        <Reveal className="promo-video" delay={0.1}>
          <video
            ref={videoRef}
            src={PROMO_VIDEO.src}
            poster={PROMO_VIDEO.poster}
            preload="none"
            controls={started}
            playsInline
            aria-label="SEO Audit Lab promo video"
            onPlay={() => setStarted(true)}
          />
          <MotionScope>
            <AnimatePresence initial={false}>
              {!started && (
                <m.div
                  key="overlay"
                  className="promo-video-overlay"
                  exit={{ opacity: 0, scale: 1.04, filter: reduce ? "blur(0px)" : "blur(4px)", transition: EXIT }}
                >
                  <button
                    type="button"
                    className="promo-video-play"
                    onClick={() => {
                      setStarted(true);
                      void videoRef.current?.play();
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
                    </svg>
                    Play video
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </MotionScope>
        </Reveal>
      </div>
    </section>
  );
}
