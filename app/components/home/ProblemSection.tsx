"use client";

import { useEffect, useRef, useState } from "react";
import TypewriterText from "../ui/TypewriterText";
import MacTerminal from "./MacTerminal";

interface Problem {
  id: string;
  num: string;
  tag: string;
  title: string;
  description: string;
  isHot?: boolean;
  /* Visual state shown in left panel when this problem is active */
  visual: {
    label: string;
    headline: string;
    lines: { text: string; colorClass?: string }[];
  };
}

const PROBLEMS: Problem[] = [
  {
    id: "p-01",
    num: "P.01",
    tag: "CONTROL",
    title: "Agents run without boundaries.",
    description:
      "Foundation models have no concept of scope. Without a deterministic supervisor, autonomous agents drift into adjacent tasks, hallucinate sub-goals, and consume unbounded compute—leaving teams with no reliable way to stop, audit, or replay what happened.",
    isHot: true,
    visual: {
      label: "FAILURE MODE",
      headline: "Unbounded loops & hallucinated tasks.",
      lines: [
        { text: "! agent: entered sub-goal recursion (depth 12)", colorClass: "a" },
        { text: "! budget: exceeded 3×—no ceiling enforced", colorClass: "a" },
        { text: "! scope: 11 unrelated files mutated", colorClass: "a" },
        { text: "! supervisor: none — no kill signal available", colorClass: "m" },
        { text: "✗ RESULT: 6 h compute lost · repo unstable", colorClass: "m" },
      ],
    },
  },
  {
    id: "p-02",
    num: "P.02",
    tag: "MEMORY",
    title: "Intelligence dies at session end.",
    description:
      "Every chat window is a silo. When a session closes, the context, decisions, and architectural rationale disappear. Teams spend hours re-explaining codebase conventions to fresh model instances—a tax that scales poorly and introduces drift across each new run.",
    isHot: true,
    visual: {
      label: "FAILURE MODE",
      headline: "Stateless silos & vanishing context.",
      lines: [
        { text: "! session: terminated — all context discarded", colorClass: "a" },
        { text: "! memory: 0 facts persisted from last 3 runs", colorClass: "a" },
        { text: "! convention: agent re-introduced anti-pattern", colorClass: "m" },
        { text: "! bloat: 2400 tokens re-explaining architecture", colorClass: "m" },
        { text: "✗ RESULT: decisions duplicated · drift accumulates", colorClass: "m" },
      ],
    },
  },
  {
    id: "p-03",
    num: "P.03",
    tag: "VERIFICATION",
    title: "\"Done\" is self-declared.",
    description:
      "Agents confidently report success when tests fail and type contracts break. Without automated, machine-enforced quality gates running directly on the diff, self-reported completion is indistinguishable from hallucinated completion. Production systems cannot tolerate this.",
    isHot: true,
    visual: {
      label: "FAILURE MODE",
      headline: "Self-reported quality over actual contracts.",
      lines: [
        { text: '! agent: "task complete — all tests passing"', colorClass: "a" },
        { text: "! reality: 4 type errors · 11 tests failing", colorClass: "a" },
        { text: "! contract: schema drift undetected at merge", colorClass: "m" },
        { text: "! pipeline: no automated verifier invoked", colorClass: "m" },
        { text: "✗ RESULT: regression shipped to production", colorClass: "m" },
      ],
    },
  },
  {
    id: "p-04",
    num: "P.04",
    tag: "OWNERSHIP",
    title: "Vendor lock-in disguised as intelligence.",
    description:
      "Closed AI platforms bundle execution loops, memory, and runtime into proprietary black boxes. When the vendor changes pricing, deprecates an API, or the model is outcompeted, teams are trapped—workflows, context, and architectural decisions are locked inside a service they don't control.",
    isHot: false,
    visual: {
      label: "FAILURE MODE",
      headline: "Closed stacks trap your workflows.",
      lines: [
        { text: "! vendor: API v2 deprecated — migration required", colorClass: "a" },
        { text: "! context: 18 months of memory unmigratable", colorClass: "a" },
        { text: "! execution: loop proprietary — cannot fork", colorClass: "m" },
        { text: "! cost: pricing 4× since last quarter", colorClass: "m" },
        { text: "✗ RESULT: locked in · switching cost prohibitive", colorClass: "m" },
      ],
    },
  },
  {
    id: "p-05",
    num: "P.05",
    tag: "SCALE",
    title: "Single agents can't scale to real workloads.",
    description:
      "Enterprise development cycles involve parallel workstreams, cross-team handoffs, and multi-stage pipelines. A single agent operating sequentially through a chat interface cannot coordinate specialist workers, manage dependencies, or respect team boundaries—making true autonomous throughput impossible.",
    isHot: false,
    visual: {
      label: "FAILURE MODE",
      headline: "Single-threaded agents hit organisational ceilings.",
      lines: [
        { text: "! workload: 14 parallel tasks queued", colorClass: "a" },
        { text: "! agent: processing 1 task at a time", colorClass: "a" },
        { text: "! handoff: no dependency graph — blocked", colorClass: "m" },
        { text: "! coordination: cross-team context lost", colorClass: "m" },
        { text: "✗ RESULT: throughput bottlenecked · teams waiting", colorClass: "m" },
      ],
    },
  },
];

export default function ProblemSection() {
  const [activeId, setActiveId] = useState<string>("p-01");
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const stage = document.querySelector<HTMLElement>(".brand-statement__stage");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const clearProperties = () => {
      section.style.removeProperty("--problem-entry-progress");
      if (stage) {
        stage.style.removeProperty("--stage-exit-progress");
        stage.style.removeProperty("--stage-exit-scale");
        stage.style.removeProperty("--stage-exit-opacity");
        stage.style.removeProperty("--stage-exit-offset");
        stage.style.removeProperty("--stage-decor-scale");
        stage.style.removeProperty("--stage-decor-opacity");
        stage.style.pointerEvents = "";
        stage.style.visibility = "";
      }
    };

    const updateParallax = () => {
      frame = 0;
      if (reducedMotion.matches) {
        clearProperties();
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const top = section.getBoundingClientRect().top;
      // progress 0 (stage at top) -> 1 (problemSection reaches top of viewport)
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

      // 4. Floating decorative shapes/video scale down slightly more for 3D depth
      const decorScale = 1 - 0.45 * Math.min(1, Math.pow(progress, 0.85));
      const decorOpacity = Math.max(0, opacity * (1 - progress * 0.2));

      section.style.setProperty("--problem-entry-progress", progress.toFixed(4));

      if (stage) {
        stage.style.setProperty("--stage-exit-progress", progress.toFixed(4));
        stage.style.setProperty("--stage-exit-scale", scale.toFixed(4));
        stage.style.setProperty("--stage-exit-opacity", opacity.toFixed(4));
        stage.style.setProperty("--stage-exit-offset", `${offset.toFixed(1)}px`);
        stage.style.setProperty("--stage-decor-scale", decorScale.toFixed(4));
        stage.style.setProperty("--stage-decor-opacity", decorOpacity.toFixed(4));

        // Disable pointer events when vanished to allow clicking behind
        stage.style.pointerEvents = progress >= 0.82 ? "none" : "auto";

        // Hide when Problem Section reaches the top of the viewport
        stage.style.visibility = progress >= 1 ? "hidden" : "visible";
      }
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    const observer = new IntersectionObserver(
      () => updateParallax(),
      { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
    );

    updateParallax();
    observer.observe(section);
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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    rowRefs.current.forEach((rowEl, index) => {
      if (!rowEl) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const problem = PROBLEMS[index];
              if (problem) setActiveId(problem.id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-20% 0px -45% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(rowEl);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const active = PROBLEMS.find((p) => p.id === activeId) || PROBLEMS[0];

  return (
    <section ref={sectionRef} id="problem" className="problem-loop-section w-full">
      <div className="problem-loop__inner">
        {/* Top Header Bar */}
        <div className="problem-loop__top">
        <h4>Why Build01 Exists</h4>
        <span className="problem-loop__mono">05 / The Industry Problem</span>
      </div>

      {/* Intro Headline */}
      <div className="problem-loop__intro">
        <span className="problem-loop__tag">THE PROBLEM</span>
        <h2 className="problem-loop__heading">
          Raw Models Aren&apos;t Products.
          <br />
          <em>Workflows Need Infrastructure.</em>
        </h2>
        <p className="problem-loop__lead">
          Foundation models are advancing rapidly. But turning raw intelligence
          into dependable business software exposes five systemic failures that
          no model release can fix alone. Build01 engineers the infrastructure
          to address each one.
        </p>
      </div>

      {/* Split: Sticky left "failure visualiser" + Scrolling right problem list */}
      <div className="problem-loop__split">
        {/* Full-height Aura Background matching Our Products (Desktop) */}
        <div className="problem-loop__aura-stripe" aria-hidden="true">
          <div className="op-strip__aura-base" />
          <div className="aura-bg">
            <div className="aura-layer-1" />
            <div className="aura-layer-2" />
            <div className="aura-grain">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <filter id="problem-aura-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.7"
                    numOctaves={4}
                    stitchTiles="stitch"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0.181 0.608 0.061 0 0.075
                            0.181 0.608 0.061 0 0.075
                            0.181 0.608 0.061 0 0.075
                            0     0     0     1 0"
                  />
                </filter>
                <rect
                  width="100%"
                  height="100%"
                  filter="url(#problem-aura-grain)"
                />
              </svg>
            </div>
            <div className="aura-vignette" />
          </div>
        </div>

        {/* Left sticky column — shows the active failure pattern */}
        <div className="problem-loop__panel-col">
          {/* Mobile Aura Background */}
          <div className="problem-loop__mobile-aura" aria-hidden="true">
            <div className="op-strip__aura-base" />
            <div className="aura-bg">
              <div className="aura-layer-1" />
              <div className="aura-layer-2" />
              <div className="aura-grain">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect
                    width="100%"
                    height="100%"
                    filter="url(#problem-aura-grain)"
                  />
                </svg>
              </div>
              <div className="aura-vignette" />
            </div>
          </div>

          <div className="problem-loop__panel">
            <div className="problem-loop__lab" aria-live="polite">
              <b>{active.num}</b>
              <span>/ {active.visual.label}</span>
              <span className="problem-loop__err-badge">
                <span className="problem-loop__err-dot" />
                UNSOLVED WITHOUT SYSTEMS
              </span>
            </div>

            <TypewriterText
              key={`headline-${active.id}`}
              as="h3"
              className="problem-loop__panel-headline"
              text={active.visual.headline}
              speed={16}
              showCursor
            />

            {/* Mac Terminal with Typewriter Streaming Effect & Bipping Cursor */}
            <MacTerminal lines={active.visual.lines} activeId={active.id} />

            <p className="problem-loop__panel-note">
              These failures are not model problems. They are{" "}
              <strong>infrastructure problems</strong>. Build01 builds the
              systems layer that resolves them — across every product in our
              suite.
            </p>
          </div>
        </div>

        {/* Right scrolling problem list */}
        <div className="problem-loop__list">
          {PROBLEMS.map((problem, idx) => {
            const isActive = activeId === problem.id;
            return (
              <div
                key={problem.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                onClick={() => setActiveId(problem.id)}
                onMouseEnter={() => setActiveId(problem.id)}
                className={`problem-loop__row ${problem.isHot ? "hot" : ""} ${
                  isActive ? "is-active" : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActiveId(problem.id);
                }}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="problem-loop__row-n">{problem.num}</span>
                <div>
                  <span className="problem-loop__row-tag">{problem.tag}</span>
                  <h5>{problem.title}</h5>
                  <p>{problem.description}</p>
                </div>
              </div>
            );
          })}

          {/* Transition Spacer allowing Section 06 to rise with parallax while Problem 04 is held */}
          <div className="problem-loop__exit-spacer" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>
);
}
