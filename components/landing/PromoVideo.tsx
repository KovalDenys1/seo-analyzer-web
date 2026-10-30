"use client";

import { useRef, useState } from "react";
import { PROMO_VIDEO } from "@/lib/site";

export default function PromoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <section className="section section-tinted" aria-labelledby="promo-video-title">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="mono eyebrow">See it run</div>
          <h2 id="promo-video-title" className="section-title">
            What a crawler sees, in 45 seconds.
          </h2>
        </div>

        <div className="promo-video">
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
          {!started && (
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
          )}
        </div>
      </div>
    </section>
  );
}
