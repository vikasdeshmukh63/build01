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

    const clearProperties = () => {
      hero.style.removeProperty("--hero-exit-progress");
      hero.style.removeProperty("--hero-exit-scale");
      hero.style.removeProperty("--hero-exit-opacity");
      hero.style.removeProperty("--hero-exit-offset");
      hero.style.removeProperty("--hero-decor-scale");
      hero.style.removeProperty("--hero-decor-opacity");
      hero.style.pointerEvents = "";
      hero.style.visibility = "";
    };

    const updateProgress = () => {
      frame = 0;
      if (reducedMotion.matches) {
        clearProperties();
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const top = brandStatement.getBoundingClientRect().top;
      // progress 0 (hero at top) -> 1 (brandStatement reaches top of viewport)
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - top) / viewportHeight),
      );

      // 1. Scale down curve: smoothly shrinks from 1.0 down to ~0.65
      const scaleProgress = Math.min(1, Math.max(0, progress));
      const scale = 1 - 0.35 * Math.sin((scaleProgress * Math.PI) / 2);

      // 2. Gentle upward parallax lift as elements shrink
      const offset = -32 * Math.min(1, Math.pow(progress, 0.9));

      // 3. Vanish / dissolve curve: stays visible initially (0 -> 0.12) to showcase scale down,
      // then dissolves gracefully to 0 by 0.82
      let opacity = 1;
      if (progress <= 0.12) {
        opacity = 1;
      } else if (progress >= 0.82) {
        opacity = 0;
      } else {
        const fadeProgress = (progress - 0.12) / (0.82 - 0.12);
        opacity = Math.max(0, 1 - Math.pow(fadeProgress, 1.25));
      }

      // 4. Floating decorative shapes scale down slightly more for 3D depth
      const decorScale = 1 - 0.45 * Math.min(1, Math.pow(progress, 0.85));
      const decorOpacity = Math.max(0, opacity * (1 - progress * 0.2));

      hero.style.setProperty("--hero-exit-progress", progress.toFixed(4));
      hero.style.setProperty("--hero-exit-scale", scale.toFixed(4));
      hero.style.setProperty("--hero-exit-opacity", opacity.toFixed(4));
      hero.style.setProperty("--hero-exit-offset", `${offset.toFixed(1)}px`);
      hero.style.setProperty("--hero-decor-scale", decorScale.toFixed(4));
      hero.style.setProperty("--hero-decor-opacity", decorOpacity.toFixed(4));

      // Disable pointer events when vanished to allow clicking behind
      hero.style.pointerEvents = progress >= 0.82 ? "none" : "auto";

      // Hide when Brand Statement reaches the top of the viewport
      hero.style.visibility = progress >= 1 ? "hidden" : "visible";
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(
      () => updateProgress(),
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
      clearProperties();
    };
  }, []);

  return (
    <div className="home-hero-transition" ref={transitionRef}>
      {children}
    </div>
  );
}
