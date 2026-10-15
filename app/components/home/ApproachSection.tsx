"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface Step {
  num: string;
  label: string;
  body: string;
  pill: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    label: "Isolate the runtime bottleneck.",
    body: "We pinpoint where autonomous execution breaks down—uncontrolled loops, lost workspace context, or missing verification.",
    pill: "FIND THE FAILURE",
  },
  {
    num: "02",
    label: "Architect specialized products.",
    body: "We build dedicated, composable tools rather than bloated wrappers, ensuring each system handles one job with deterministic reliability.",
    pill: "ONE SYSTEM, ONE JOB",
  },
  {
    num: "03",
    label: "Engineer for local ownership.",
    body: "We build products like AgentOS to run close to your codebase and data—open source, local-first, and free from SaaS lock-in.",
    pill: "LOCAL-FIRST",
  },
  {
    num: "04",
    label: "Validate through production rigor.",
    body: "Every product undergoes continuous testing against real codebases, strict compiler contracts, and live development workloads.",
    pill: "PROVEN IN PRODUCTION",
  },
];

export default function ApproachSection() {
  const stageRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const steps = stepsRef.current;
    if (!stage || !steps) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // IntersectionObserver for entrance reveal of row content
    const rows = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (reducedMotion) {
      rows.forEach((r) => r.classList.add("show"));
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
        { threshold: 0.15 },
      );
      rows.forEach((r) => io.observe(r));
    }

    let frame = 0;

    const run = () => {
      frame = 0;
      const vh = window.innerHeight || 1;

      // 1. Parallax layers
      if (!reducedMotion) {
        const layers = stage.querySelectorAll<HTMLElement>("[data-s]");
        layers.forEach((el) => {
          const p = el.closest<HTMLElement>(".goal") || stage;
          const r = p.getBoundingClientRect();
          const c = r.top + r.height / 2 - vh / 2;
          const s = parseFloat(el.dataset.s || "0");
          const x = parseFloat(el.dataset.x || "0");
          el.style.transform = `translate3d(${(c * x).toFixed(1)}px, ${(
            c * s
          ).toFixed(1)}px, 0)`;
        });
      }

      // 2. Spine line progress & row dot active states
      const r = steps.getBoundingClientRect();
      const mark = vh * 0.62;
      const progress = Math.max(0, Math.min(1, (mark - r.top) / (r.height || 1)));
      steps.style.setProperty("--p", progress.toFixed(4));

      rows.forEach((row) => {
        const b = row.getBoundingClientRect();
        if (b.top + b.height / 2 < mark) {
          row.classList.add("done");
        } else {
          row.classList.remove("done");
        }
      });
      // 3. Parallax entry transition over previous section (#use-cases)
      const isMobile = window.innerWidth <= 900;
      const prevSection = document.getElementById("use-cases");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".usecase-loop__inner") ||
        prevSection;

      if (prevInner && prevSection && !reducedMotion && !isMobile) {
        const stageTop = stage.getBoundingClientRect().top;
        // progress 0 (approach is below viewport) -> 1 (approach top reaches 0, fully covering use-cases)
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
      if (!frame) frame = window.requestAnimationFrame(run);
    };

    run();
    window.addEventListener("scroll", scheduleRun, { passive: true });
    window.addEventListener("resize", scheduleRun);

    return () => {
      window.removeEventListener("scroll", scheduleRun);
      window.removeEventListener("resize", scheduleRun);
      if (frame) window.cancelAnimationFrame(frame);
      const prevSection = document.getElementById("use-cases");
      const prevInner =
        prevSection?.querySelector<HTMLElement>(".usecase-loop__inner") ||
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
    <section ref={stageRef} className="approach-stage stage" id="approach">
      <div className="approach-stage__inner">
        {/* Floating Parallax Layers */}
        <div className="layer grid" data-s="-.1" aria-hidden="true" />
        <div
          className="layer ghost"
          data-s=".05"
          data-x="-.3"
          aria-hidden="true"
        >
          APPROACH
        </div>
        <div className="layer sq" data-s=".14" aria-hidden="true" />
        <div className="layer sq2" data-s="-.22" aria-hidden="true" />
        <div className="layer ci" data-s="-.16" aria-hidden="true" />

        <div className="shell">
          <header className="hd">
            <div>
              <span className="tag">OUR APPROACH</span>
              <h2>
                Systems Over <em>Speculation.</em>
              </h2>
            </div>
            <p className="lead">
              Building dependable AI products requires disciplined systems
              engineering, not just prompt tweaks.
            </p>
          </header>

          <div className="steps" id="steps" ref={stepsRef}>
            <div className="spine" aria-hidden="true">
              <i />
            </div>

            {STEPS.map((step, idx) => (
              <article
                key={step.num}
                className="row"
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
              >
                <div className="nm">
                  <span className="dot" aria-hidden="true" />
                  <b>{step.num}</b>
                </div>

                <h3>{step.label}</h3>

                <div>
                  <p>{step.body}</p>
                  <span className="pill">{step.pill}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Goal Manifesto Banner */}
        <div className="goal" id="goal">
          <div className="layer g" data-s="-.08" aria-hidden="true" />
          <div className="layer o" data-s=".12" aria-hidden="true" />
          <div className="gi">
            <div className="bar" aria-hidden="true" />
            <div>
              <span className="mono">Our Goal</span>
              <blockquote>
                Our goal at Build01 isn&apos;t to add AI hype to existing software.{" "}
                <span>It&apos;s to engineer the foundational systems that make</span>{" "}
                <em>autonomous intelligence dependable.</em>
              </blockquote>
              <div className="gf">
                <Link className="btn w" href="/agent-os">
                  Explore AgentOS ↗
                </Link>
                <Link className="btn o" href="/contact">
                  Talk to Build01 ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 09 (Why Build01) to rise with parallax */}
      <div className="approach-stage__exit-spacer" aria-hidden="true" />
    </section>
  );
}
