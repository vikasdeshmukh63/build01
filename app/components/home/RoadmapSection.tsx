"use client";

import { useEffect, useRef } from "react";

export default function RoadmapSection() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // IntersectionObserver for ascending staircase card reveal animations
    const cards = stage.querySelectorAll<HTMLElement>(".st");
    if (reducedMotion) {
      cards.forEach((card) => card.classList.add("show"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );

      cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.14}s`;
        io.observe(card);
      });
    }

    // Parallax scrolling: floating geometric layers + card watermarks + previous section entrance
    let frame = 0;
    const runParallax = () => {
      frame = 0;
      if (reducedMotion) return;

      const vh = window.innerHeight || 1;
      const sr = stage.getBoundingClientRect();
      const sc = sr.top + sr.height / 2 - vh / 2;

      // 1. Floating parallax layers and watermark numerals
      const parallaxEls = stage.querySelectorAll<HTMLElement>("[data-s]");
      parallaxEls.forEach((el) => {
        const parentCard = el.closest<HTMLElement>(".st");
        let c = sc;
        if (parentCard) {
          const r = parentCard.getBoundingClientRect();
          c = r.top + r.height / 2 - vh / 2;
        }

        const s = parseFloat(el.dataset.s || "0");
        const x = parseFloat(el.dataset.x || "0");
        const isSq = el.classList.contains("sq");

        el.style.transform = `translate3d(${(c * x).toFixed(1)}px, ${(
          c * s
        ).toFixed(1)}px, 0)${isSq ? " rotate(-8deg)" : ""}`;
      });

      // 2. Parallax entry transition over previous section (#about-snippet)
      const isMobile = window.innerWidth <= 900;
      const prevSection = document.getElementById("about-snippet");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".about-stage__inner") ||
        prevSection;

      if (prevInner && prevSection && !isMobile) {
        const stageTop = sr.top;
        // progress 0 (roadmap-stage is below viewport) -> 1 (roadmap-stage top reaches 0, fully covering about-snippet)
        const progress = Math.min(1, Math.max(0, (vh - stageTop) / vh));

        if (progress > 0 && progress < 1) {
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

          // Counteract window scroll to pin prevInner firmly in viewport
          const pinY = progress * vh;
          const totalY = pinY + offset;

          // Stable vertical center of viewport relative to prevSection
          const unpinnedSectionTop =
            prevSection.getBoundingClientRect().top + progress * vh;
          const originY = Math.max(0, vh / 2 - unpinnedSectionTop);

          prevInner.style.transformOrigin = `center ${originY.toFixed(0)}px`;
          prevInner.style.transform = `translate3d(0, ${totalY.toFixed(
            1,
          )}px, 0) scale(${scale.toFixed(4)})`;
          prevInner.style.opacity = opacity.toFixed(4);
          prevInner.style.willChange = "transform, opacity";
          prevInner.style.pointerEvents = progress >= 0.82 ? "none" : "auto";
          prevInner.style.visibility = "visible";
        } else if (progress >= 1) {
          prevInner.style.pointerEvents = "none";
          prevInner.style.visibility = "hidden";
        } else {
          // progress <= 0
          prevInner.style.removeProperty("transform");
          prevInner.style.removeProperty("opacity");
          prevInner.style.removeProperty("transform-origin");
          prevInner.style.removeProperty("will-change");
          prevInner.style.pointerEvents = "";
          prevInner.style.visibility = "";
        }
      }
    };

    const scheduleRun = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(runParallax);
      }
    };

    runParallax();
    window.addEventListener("scroll", scheduleRun, { passive: true });
    window.addEventListener("resize", scheduleRun);

    return () => {
      window.removeEventListener("scroll", scheduleRun);
      window.removeEventListener("resize", scheduleRun);
      if (frame) window.cancelAnimationFrame(frame);

      const prevSection = document.getElementById("about-snippet");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".about-stage__inner") ||
        prevSection;
      if (prevInner) {
        prevInner.style.removeProperty("transform");
        prevInner.style.removeProperty("opacity");
        prevInner.style.removeProperty("transform-origin");
        prevInner.style.removeProperty("will-change");
        prevInner.style.pointerEvents = "";
        prevInner.style.visibility = "";
      }
    };
  }, []);

  return (
    <section className="roadmap-stage stage" id="roadmap" ref={stageRef}>
      <div className="roadmap-stage__inner">
        {/* Parallax Floating Geometric Layers */}
        <div className="layer grid" data-s="-0.1" aria-hidden="true" />
        <div
          className="layer ghost"
          data-s="0.05"
          data-x="-0.3"
          aria-hidden="true"
        >
          ROADMAP
        </div>
        <div className="layer sq" data-s="0.14" aria-hidden="true" />
        <div className="layer sq2" data-s="-0.22" aria-hidden="true" />
        <div className="layer ci" data-s="-0.16" aria-hidden="true" />

        <div className="shell">
          <header className="hd">
            <div>
              <span className="tag">PRODUCT ROADMAP</span>
              <h2>
                The Build01 Product <em>Roadmap.</em>
              </h2>
            </div>
            <p className="lead">
              Our systems trajectory: from autonomous execution runtimes to
              deterministic quality gates and fleet coordination.
            </p>
          </header>

          <div className="stairs">
            {/* Card 1: AgentOS (Live) */}
            <article className="st a">
              <span className="wm" data-s="-0.06">
                01
              </span>
              <div className="top">
                <span className="code">A.01 · LIVE</span>
                <span className="pill live">● LIVE</span>
              </div>
              <div className="bot">
                <h3>
                  AgentOS<span>— Runtime</span>
                </h3>
                <p>
                  Our foundational loop-engineering runtime. Directs Claude Code
                  and Codex with deterministic verification, task planning, and
                  repo-local state.
                </p>
                <span className="cmd">
                  $ cargo install agentos-build01 --locked
                </span>
              </div>
            </article>

            {/* Card 2: EvalOS (In Dev) */}
            <article className="st">
              <span className="wm" data-s="-0.06">
                02
              </span>
              <div className="top">
                <span className="code">A.02 · IN DEV</span>
                <span className="pill dev">IN DEV</span>
              </div>
              <div className="bot">
                <h3>
                  EvalOS<span>— Quality Gate</span>
                </h3>
                <p>
                  Deterministic agent evaluation harness. Validates code against
                  strict contracts and AST invariants before merge, eliminating
                  self-reported success.
                </p>
              </div>
            </article>

            {/* Card 3: Context Spine (In Dev) */}
            <article className="st">
              <span className="wm" data-s="-0.06">
                03
              </span>
              <div className="top">
                <span className="code">A.03 · IN DEV</span>
                <span className="pill dev">IN DEV</span>
              </div>
              <div className="bot">
                <h3>
                  Context Spine<span>— Memory</span>
                </h3>
                <p>
                  Durable workspace knowledge mesh. Embeds persistent memory and
                  project history into repositories without token bloat.
                </p>
              </div>
            </article>

            {/* Card 4: Swarm Mesh (Planned) */}
            <article className="st d">
              <span className="wm" data-s="-0.06">
                04
              </span>
              <div className="top">
                <span className="code">A.04 · PLANNED</span>
                <span className="pill">PLANNED</span>
              </div>
              <div className="bot">
                <h3>
                  Swarm Mesh<span>— Dispatch</span>
                </h3>
                <p>
                  Distributed fleet router. Coordinates multi-agent teams with
                  dependency graphs, bounded execution scopes, and automated
                  handoffs.
                </p>
              </div>
            </article>
          </div>

          <div className="axis">
            <span>TODAY</span>
            <i aria-hidden="true" />
            <span>NEXT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
