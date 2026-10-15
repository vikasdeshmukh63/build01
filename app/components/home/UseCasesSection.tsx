"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TypewriterText from "../ui/TypewriterText";
import MacTerminal from "./MacTerminal";

interface UseCase {
  id: string;
  num: string;
  code: string;
  tag: string;
  product: string;
  statusBadge: string;
  isLive?: boolean;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /* Visual state shown in sticky panel when active */
  visual: {
    label: string;
    headline: string;
    lines: { text: string; colorClass?: string }[];
  };
  note: string;
}

const USE_CASES: UseCase[] = [
  {
    id: "uc-01",
    num: "U.01",
    code: "A.01",
    tag: "AUTONOMOUS RUNTIME · LIVE",
    product: "AgentOS",
    statusBadge: "A.01 · LIVE IN REPO",
    isLive: true,
    title: "Autonomous Code Execution & Loop Engineering",
    description:
      "Drive coding agents like Claude Code or Codex to implement features, fix bugs, and refactor codebases while keeping execution bounded, observable, and verified in your local repo.",
    primaryHref: "/agent-os",
    primaryLabel: "Explore AgentOS (Live) ↗",
    secondaryHref: "https://github.com/vikasdeshmukh63/AgentOS",
    secondaryLabel: "GitHub Repo ↗",
    visual: {
      label: "RUNTIME EXECUTION",
      headline: "Bounded loops & deterministic git commits.",
      lines: [
        { text: "$ agentos run --spec ./tasks/auth-jwt.md --driver claude-code", colorClass: "c" },
        { text: "✓ supervisor: bounded scope locked to 3 files", colorClass: "g" },
        { text: "✓ driver: Claude Code worker execution dispatched", colorClass: "c" },
        { text: "✓ verifier: deterministic test harness passed (14/14)", colorClass: "g" },
        { text: "✓ git: commit verified · 0 repo drift detected", colorClass: "g" },
        { text: "★ RESULT: atomic commit landed in 18.4s", colorClass: "m" },
      ],
    },
    note: "Foundation models are swappable commodities. AgentOS owns the loop around them—ensuring execution is bounded, reproducible, and committed directly into your repository.",
  },
  {
    id: "uc-02",
    num: "U.02",
    code: "A.02",
    tag: "VERIFICATION & GATES · IN DEV",
    product: "EvalOS",
    statusBadge: "A.02 · IN DEV Q2 2026",
    isLive: false,
    title: "Automated Pre-Merge Quality Gates",
    description:
      "Enforce deterministic contract testing and AST invariant verification on agent-generated diffs before any code merges into production. Replaces self-reported \"done\" with mathematical verification.",
    primaryHref: "/contact",
    primaryLabel: "Request Design Partner Access ↗",
    secondaryHref: "/about",
    secondaryLabel: "View Systems Roadmap ↗",
    visual: {
      label: "AST QUALITY GATES",
      headline: "Deterministic contracts over blind trust.",
      lines: [
        { text: "$ evalos gate --diff HEAD~1 --contracts ./schemas/api.proto", colorClass: "c" },
        { text: "✓ ast-guard: 0 unauthorized policy deletions detected", colorClass: "g" },
        { text: "✓ contracts: 24/24 endpoint schemas backwards-compatible", colorClass: "g" },
        { text: "✓ invariant: differential fuzz test passed on modified nodes", colorClass: "g" },
        { text: "✓ attestation: sha256:d84f91c0b2 generated and verified", colorClass: "g" },
        { text: "★ RESULT: diff approved for production merge", colorClass: "m" },
      ],
    },
    note: "Never rely on self-reported agent completion. EvalOS runs machine-enforced quality gates directly on the diff so regressions never enter production.",
  },
  {
    id: "uc-03",
    num: "U.03",
    code: "A.03",
    tag: "PROJECT MEMORY · IN DEV",
    product: "Context Spine",
    statusBadge: "A.03 · IN DEV Q3 2026",
    isLive: false,
    title: "Persistent Workspace Memory Mesh",
    description:
      "Maintain repo-embedded durable knowledge that captures architecture decisions and run histories across sessions without prompt bloat, token taxes, or proprietary platform lock-in.",
    primaryHref: "/contact",
    primaryLabel: "Inquire About Product Suite ↗",
    secondaryHref: "/about",
    secondaryLabel: "Architecture Specs ↗",
    visual: {
      label: "PERSISTENT MEMORY",
      headline: "Repo-local durable workspace intelligence.",
      lines: [
        { text: "$ spine query --intent \"Refactor webhook retry loop\" --context", colorClass: "c" },
        { text: "✓ index: local spine mounted at .build01/spine/", colorClass: "g" },
        { text: "✓ graph: linked ADR-014 (Idempotency) & Run #84 error trace", colorClass: "g" },
        { text: "✓ budget: 410 tokens injected (saved 28,400 tokens of bloat)", colorClass: "g" },
        { text: "✓ storage: 100% versioned in git · zero cloud lock-in", colorClass: "g" },
        { text: "★ RESULT: multi-session intelligence preserved", colorClass: "m" },
      ],
    },
    note: "Context shouldn't vanish when a session ends. Context Spine preserves conventions and architectural decisions inside version control without token bloat.",
  },
  {
    id: "uc-04",
    num: "U.04",
    code: "A.04",
    tag: "FLEET ORCHESTRATION · IN DEV",
    product: "Swarm Mesh",
    statusBadge: "A.04 · IN DEV Q4 2026",
    isLive: false,
    title: "Multi-Agent Fleet Orchestration",
    description:
      "Dispatch parallel tasks across specialist agents with strict dependency graphs, bounded execution environments, and automated handoffs. Scale throughput without coordination bottlenecks.",
    primaryHref: "/contact",
    primaryLabel: "Inquire About Product Suite ↗",
    secondaryHref: "/about",
    secondaryLabel: "Architecture Specs ↗",
    visual: {
      label: "FLEET COORDINATION",
      headline: "Topological dispatch with isolated sandboxes.",
      lines: [
        { text: "$ swarm dispatch --graph ./epics/tenant-isolation.yaml", colorClass: "c" },
        { text: "✓ orchestrator: DAG generated across 3 specialist roles", colorClass: "g" },
        { text: "✓ worker-1 (DB): schema migrated in isolated sandbox", colorClass: "g" },
        { text: "✓ worker-2 (API): auth middleware updated with handoff context", colorClass: "g" },
        { text: "✓ worker-3 (EVAL): regression test suite passing", colorClass: "g" },
        { text: "★ RESULT: 3 parallel tasks merged with 0 file collisions", colorClass: "m" },
      ],
    },
    note: "Single-agent chat interfaces hit organizational ceilings. Swarm Mesh orchestrates parallel specialist agents with strict dependency graphs and clean handoffs.",
  },
];

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState<string>("uc-01");
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = window.innerWidth <= 900;
    const prevSection = document.getElementById("product-principles");
    const prevInner =
      prevSection?.querySelector<HTMLElement>(".principles-inner") ||
      prevSection;

    let frame = 0;

    const onScrollOrResize = () => {
      frame = 0;
      if (reducedMotion || isMobile || !prevInner || !prevSection) return;

      const vh = window.innerHeight || 1;
      const stageTop = section.getBoundingClientRect().top;
      // progress 0 (usecases is below viewport) -> 1 (usecases top reaches 0, fully covering product-principles)
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
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(onScrollOrResize);
    };

    onScrollOrResize();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
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

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    rowRefs.current.forEach((rowEl, index) => {
      if (!rowEl) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const useCase = USE_CASES[index];
              if (useCase) setActiveId(useCase.id);
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

  const active = USE_CASES.find((item) => item.id === activeId) || USE_CASES[0];

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="usecase-loop-section w-full"
    >
      <div className="usecase-loop__inner">
        {/* Top Header Bar */}
        <div className="usecase-loop__top">
          <h4>Applied Autonomy In Production</h4>
          <span className="usecase-loop__mono">07 / Product Use Cases</span>
        </div>

        {/* Intro Headline */}
        <div className="usecase-loop__intro">
          <span className="usecase-loop__tag">USE CASES & WORKFLOWS</span>
          <h2 className="usecase-loop__heading">
            Engineered for Real-World
            <br />
            <em>Autonomous Work.</em>
          </h2>
          <p className="usecase-loop__lead">
            Build01 develops targeted products to power critical stages of the
            autonomous development and operational lifecycle. Explore how our systems
            eliminate runtime bottlenecks, verify code deterministically, and scale
            parallel agent fleets.
          </p>
        </div>

        {/* Split: Scrolling left cards list + Sticky right visualizer */}
        <div className="usecase-loop__split">
          {/* Full-height Aura Background matching Our Products (Desktop, on right column) */}
          <div className="usecase-loop__aura-stripe" aria-hidden="true">
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
                  <filter id="usecase-aura-grain">
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
                    filter="url(#usecase-aura-grain)"
                  />
                </svg>
              </div>
              <div className="aura-vignette" />
            </div>
          </div>

          {/* Left Column — Scrolling use case list (CARDS ON LEFT) */}
          <div className="usecase-loop__list">
            {USE_CASES.map((item, idx) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`usecase-loop__row ${item.isLive ? "is-live" : ""} ${
                    isActive ? "is-active" : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveId(item.id);
                  }}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="usecase-loop__row-n">{item.num}</span>
                  <div>
                    <span className="usecase-loop__row-tag">{item.tag}</span>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                    <div className="usecase-loop__row-actions">
                      <Link
                        href={item.primaryHref}
                        className="usecase-loop__row-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.primaryLabel}
                      </Link>
                      {item.secondaryHref && (
                        <Link
                          href={item.secondaryHref}
                          className="usecase-loop__row-link opacity-75 hover:opacity-100"
                          onClick={(e) => e.stopPropagation()}
                          target={
                            item.secondaryHref.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.secondaryHref.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.secondaryLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column — Sticky Live Visualizer (TERMINAL ON RIGHT) */}
          <div className="usecase-loop__panel-col">
            {/* Mobile Aura Background */}
            <div className="usecase-loop__mobile-aura" aria-hidden="true">
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
                      filter="url(#usecase-aura-grain)"
                    />
                  </svg>
                </div>
                <div className="aura-vignette" />
              </div>
            </div>

            <div className="usecase-loop__panel">
              <div className="usecase-loop__lab" aria-live="polite">
                <b>{active.num}</b>
                <span>/ {active.visual.label}</span>
                <span
                  className={`usecase-loop__live-badge ${
                    active.isLive ? "" : "in-dev"
                  }`}
                >
                  <span className="usecase-loop__live-dot" />
                  {active.statusBadge}
                </span>
              </div>

              <TypewriterText
                key={`headline-${active.id}`}
                as="h3"
                className="usecase-loop__panel-headline"
                text={active.visual.headline}
                speed={16}
                showCursor
              />

              {/* Mac Terminal with Typewriter Streaming Effect */}
              <MacTerminal lines={active.visual.lines} activeId={active.id} />

              <div className="usecase-loop__panel-footer">
                <p className="usecase-loop__panel-note">{active.note}</p>
                <div className="usecase-loop__panel-actions">
                  <Link
                    href={active.primaryHref}
                    className="usecase-loop__cta-primary"
                  >
                    {active.primaryLabel}
                  </Link>
                  {active.secondaryHref && (
                    <Link
                      href={active.secondaryHref}
                      className="usecase-loop__cta-secondary"
                      target={
                        active.secondaryHref.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        active.secondaryHref.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {active.secondaryLabel}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Spacer allowing Section 08 (Approach) to rise with parallax */}
      <div className="usecase-loop__exit-spacer" aria-hidden="true" />
    </section>
  );
}
