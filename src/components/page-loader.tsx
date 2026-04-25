"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const LOADER_TEXT = "Welcome to Chenjin's space";
const INITIAL_TEXT = "W3LC0ME T0 CHENJIN'S SP4CE";

export default function PageLoader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useGSAP(
    () => {
      const shouldSkipLoader =
        window.matchMedia("(max-width: 760px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rootElement = rootRef.current;
      const labelElement = labelRef.current;

      if (shouldSkipLoader || !rootElement || !labelElement) {
        setIsVisible(false);
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        onComplete: () => {
          setIsVisible(false);
        },
      });

      gsap.set(labelElement, {
        opacity: 1,
        textContent: INITIAL_TEXT,
      });

      timeline
        .to(labelElement, {
          duration: 1.6,
          scrambleText: {
            text: LOADER_TEXT,
            chars: "upperAndLowerCase",
            revealDelay: 0.18,
            speed: 0.45,
            tweenLength: false,
          },
        })
        .to(
          labelElement,
          {
            opacity: 0,
            y: 12,
            duration: 0.32,
            ease: "power2.inOut",
          },
          "+=0.18",
        )
        .to(
          rootElement,
          {
            opacity: 0,
            duration: 0.28,
            ease: "power2.inOut",
          },
          "-=0.08",
        );
    },
    { scope: rootRef, dependencies: [], revertOnUpdate: true },
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={rootRef} className="page-loader" aria-hidden="true">
      <div className="page-loader__word">
        <p ref={labelRef} className="page-loader__label">
          {INITIAL_TEXT}
        </p>
      </div>
    </div>
  );
}
