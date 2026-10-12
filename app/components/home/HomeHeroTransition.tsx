"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface HomeHeroTransitionProps {
  children: ReactNode;
}

export default function HomeHeroTransition({
  children,
}: HomeHeroTransitionProps) {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transition = transitionRef.current;
    const hero = transition?.querySelector<HTMLElement>("#hero");
    const brandStatement =
      transition?.querySelector<HTMLElement>("#brand-statement");
    if (!hero || !brandStatement) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frame = 0;

    const updateProgress = (sectionTop?: number) => {
      frame = 0;
      if (reducedMotion.matches) {
        hero.style.removeProperty("--hero-exit-progress");
        hero.style.removeProperty("--hero-exit-wipe");
        hero.style.removeProperty("--hero-exit-scale");
        hero.style.removeProperty("--hero-exit-offset");
        return;
      }

      const viewportHeight = window.innerHeight;
      const top = sectionTop ?? brandStatement.getBoundingClientRect().top;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - top) / viewportHeight),
      );

      hero.style.setProperty("--hero-exit-progress", progress.toFixed(4));
      hero.style.setProperty("--hero-exit-wipe", `${progress * 100}%`);
      hero.style.setProperty("--hero-exit-scale", `${1 - progress * 0.16}`);
      hero.style.setProperty("--hero-exit-offset", `${progress * -24}px`);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateProgress(entry.boundingClientRect.top),
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    );

    updateProgress();
    observer.observe(brandStatement);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      hero.style.removeProperty("--hero-exit-progress");
      hero.style.removeProperty("--hero-exit-wipe");
      hero.style.removeProperty("--hero-exit-scale");
      hero.style.removeProperty("--hero-exit-offset");
    };
  }, []);

  return (
    <div className="home-hero-transition" ref={transitionRef}>
      {children}
    </div>
  );
}
