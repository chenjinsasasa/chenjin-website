"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type HomeFrameProps = {
  children: ReactNode;
};

const HERO_BACKGROUND_VIDEO_URL =
  "https://framerusercontent.com/assets/gwafkIWvPelPtFvgTfDuJjXOKxc.mp4";

const MATRIX_COLUMNS = [
  {
    left: "4%",
    duration: "16s",
    delay: "-10s",
    cells: ["0", "1", "0", "1", "1", "0", "0", "1", "0", "1", "0", "1"],
  },
  {
    left: "18%",
    duration: "19s",
    delay: "-3s",
    cells: ["A", "I", "0", "1", "0", "1", "P", "R", "D", "0", "1", "1"],
  },
  {
    left: "34%",
    duration: "15s",
    delay: "-8s",
    cells: ["B", "U", "I", "L", "D", "0", "0", "1", "1", "0", "1", "0"],
  },
  {
    left: "52%",
    duration: "18s",
    delay: "-12s",
    cells: ["V", "E", "R", "I", "F", "Y", "0", "1", "0", "0", "1", "1"],
  },
  {
    left: "70%",
    duration: "14s",
    delay: "-5s",
    cells: ["S", "Y", "S", "0", "1", "0", "1", "1", "0", "1", "0", "0"],
  },
  {
    left: "86%",
    duration: "17s",
    delay: "-9s",
    cells: ["L", "I", "V", "E", "0", "0", "1", "1", "0", "1", "0", "1"],
  },
] as const;

export default function HomeFrame({ children }: HomeFrameProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroAnimatedRef = useRef(false);
  const [enableAmbientMotion, setEnableAmbientMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
    );

    const updateAmbientMotion = (event?: MediaQueryListEvent) => {
      setEnableAmbientMotion(event?.matches ?? query.matches);
    };

    updateAmbientMotion();

    query.addEventListener("change", updateAmbientMotion);

    return () => {
      query.removeEventListener("change", updateAmbientMotion);
    };
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
        const bindSection = (section: HTMLElement) => {
          if (
            section.dataset.revealed === "true" ||
            section.dataset.bound === "true"
          ) {
            return;
          }

          const items = gsap.utils.toArray<HTMLElement>(
            "[data-reveal='item']",
            section,
          );

          gsap.set(section, { autoAlpha: 0, y: 42 });

          if (items.length > 0) {
            gsap.set(items, { autoAlpha: 0, y: 22 });
          }

          section.dataset.bound = "true";

          ScrollTrigger.create({
            trigger: section,
            start: "top 82%",
            once: true,
            onEnter: () => {
              const timeline = gsap.timeline({
                defaults: { ease: "power2.out" },
                onComplete: () => {
                  section.dataset.revealed = "true";
                },
              });

              timeline.to(section, {
                y: 0,
                autoAlpha: 1,
                duration: 0.82,
                clearProps: "transform,opacity,visibility",
              });

              if (items.length > 0) {
                timeline.to(
                  items,
                  {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.52,
                    stagger: 0.07,
                    clearProps: "transform,opacity,visibility",
                  },
                  "-=0.5",
                );
              }
            },
          });
        };

        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");

        if (heroItems.length > 0 && !heroAnimatedRef.current) {
          heroAnimatedRef.current = true;
          gsap.from(heroItems, {
            y: 28,
            autoAlpha: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
          });
        }

        const sections = gsap
          .utils.toArray<HTMLElement>("[data-reveal='section']")
          .filter((section) => !section.hasAttribute("data-hero"));

        sections.forEach(bindSection);

        const observer = new MutationObserver(() => {
          const nextSections = gsap
            .utils.toArray<HTMLElement>("[data-reveal='section']")
            .filter((section) => !section.hasAttribute("data-hero"));

          nextSections.forEach(bindSection);
          ScrollTrigger.refresh();
        });

        if (rootRef.current) {
          observer.observe(rootRef.current, {
            childList: true,
            subtree: true,
          });
        }

        const header = rootRef.current?.querySelector<HTMLElement>(
          ".site-header__inner",
        );

        if (header) {
          ScrollTrigger.create({
            start: 20,
            end: 99999,
            toggleClass: {
              targets: header,
              className: "is-condensed",
            },
          });
        }

        return () => observer.disconnect();
      });

      return () => {
        media.revert();
      };
    },
    { scope: rootRef, dependencies: [] },
  );

  return (
    <div ref={rootRef} className="home-frame">
      <div className="hero-backdrop" aria-hidden="true">
        <div className="hero-backdrop__shadow" />
        {enableAmbientMotion ? (
          <div className="hero-backdrop__media">
            <video
              className="hero-backdrop__video"
              src={HERO_BACKGROUND_VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              您的浏览器暂不支持视频播放。
            </video>
          </div>
        ) : null}
        <div className="hero-backdrop__tint" />
        <div className="hero-backdrop__blur" />
      </div>

      {enableAmbientMotion ? (
        <div className="page-atmosphere" aria-hidden="true">
          <div className="page-atmosphere__inner">
            <div className="page-atmosphere__matrix">
              {MATRIX_COLUMNS.map((column) => (
                <div
                  key={column.left}
                  className="page-atmosphere__column"
                  style={{
                    left: column.left,
                    animationDuration: column.duration,
                    animationDelay: column.delay,
                  }}
                >
                  {column.cells.map((cell, index) => (
                    <span key={`${column.left}-${index}`}>{cell}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {children}
    </div>
  );
}
