"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  code: string;
  category: string;
  name: string;
  headline: string;
  description: string;
  tags: string[];
  href: string;
  githubUrl?: string;
  installCommand?: string;
  released: boolean;
  accentColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: "agent-os",
    code: "A.01",
    category: "AUTONOMOUS RUNTIME",
    name: "AgentOS",
    headline: "Rent the intelligence. Own the loop.",
    description:
      "AgentOS owns the loop around the coding agents you already run. Describe intent in a few sentences; AgentOS plans it into tasks, drives Claude Code or Codex as interchangeable workers, verifies every result deterministically, and keeps memory and handoffs in your repo.",
    tags: ["Loop Engineering", "Deterministic Verifier", "Claude Code & Codex", "Repo-Local State"],
    href: "/agent-os",
    githubUrl: "https://github.com/vikasdeshmukh63/AgentOS",
    installCommand: "cargo install agentos-build01 --locked",
    released: true,
    accentColor: "#FF5C00",
  },
  {
    id: "eval-os",
    code: "A.02",
    category: "VERIFICATION & GATES",
    name: "EvalOS",
    headline: "Deterministic Agent Quality Gate",
    description:
      "Automated verification harness evaluating code against strict contracts before merge. Checks schema, invariants, and scope drift directly from git diffs so done is never self-reported.",
    tags: ["Contract Testing", "Zero Drift Checks", "Automated Gates"],
    href: "/contact",
    released: false,
    accentColor: "#C5F82A",
  },
  {
    id: "context-spine",
    code: "A.03",
    category: "PROJECT MEMORY",
    name: "Context Spine",
    headline: "Durable Workspace Knowledge Mesh",
    description:
      "Repo-embedded persistent memory capturing facts, decisions, and run histories across agent sessions. Feeds relevant context to workers without prompt bloat or vendor lock-in.",
    tags: ["Repo-Local Memory", "Trust Records", "Zero Token-Bloat"],
    href: "/contact",
    released: false,
    accentColor: "#E5A84B",
  },
  {
    id: "swarm-mesh",
    code: "A.04",
    category: "FLEET ORCHESTRATION",
    name: "Swarm Mesh",
    headline: "Coordinated Agent Fleet Dispatch",
    description:
      "Distributed task router managing parallel queues, dependency graphs, and multi-agent teams. Coordinates specialist workers with bounded scopes and automated handoffs.",
    tags: ["Multi-Agent Routing", "Dependency Queues", "Sandboxed Execution"],
    href: "/contact",
    released: false,
    accentColor: "#6BC8D6",
  },
];

interface OurProductsSectionProps {
  isEmbedded?: boolean;
  entryProgress?: number;
}

export default function OurProductsSection({
  isEmbedded = false,
  entryProgress = 0,
}: OurProductsSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [internalProgress, setInternalProgress] = useState(0);
  const [activeStrip, setActiveStrip] = useState<number | null>(null);

  useEffect(() => {
    if (isEmbedded) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (motionPreference.matches) {
      setInternalProgress(1);
      return;
    }

    let raf: number | null = null;

    const update = () => {
      raf = null;
      const rect = wrapper.getBoundingClientRect();
      const scrollBudget = wrapper.offsetHeight - window.innerHeight;
      if (scrollBudget <= 0) {
        setInternalProgress(1);
        return;
      }

      // progress 0 (wrapper enters top) -> 1 (scrolled through wrapper)
      const p = Math.min(1, Math.max(0, -rect.top / scrollBudget));
      setInternalProgress(p);
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(update);
    };

    // Initial check
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, [isEmbedded]);

  // When embedded, activeProgress is 0 -> 1 directly from parent
  const activeProgress = isEmbedded ? entryProgress : internalProgress;
  const animationFinished = isEmbedded ? activeProgress >= 1 : activeProgress >= 0.36;

  // If scrolling back up before animation completes, collapse any active strip
  useEffect(() => {
    if (!animationFinished && activeStrip !== null) {
      setActiveStrip(null);
    }
  }, [animationFinished, activeStrip]);

  // Staggered arrival progress per strip:
  // Each strip arrives smoothly from alternating directions
  const stripProgress = PRODUCTS.map((_, i) => {
    if (isEmbedded) {
      const start = i * 0.1;
      const end = Math.min(1, start + 0.65);
      const raw = (activeProgress - start) / (end - start);
      return Math.min(1, Math.max(0, raw));
    }
    const start = i * 0.05;
    const end = Math.min(0.36, start + 0.22);
    const raw = (activeProgress - start) / (end - start);
    return Math.min(1, Math.max(0, raw));
  });

  const headerProgress = isEmbedded
    ? Math.min(1, Math.max(0, activeProgress / 0.5))
    : 1;

  const stageContent = (
    <div
      id="our-products"
      className={`op-stage ${isEmbedded ? "op-stage--embedded" : ""} ${animationFinished ? "op-stage--interactive" : ""}`}
      style={{
        pointerEvents: animationFinished ? "auto" : "none",
        visibility: activeProgress > 0 ? "visible" : isEmbedded ? "hidden" : "visible",
      }}
    >
      {/* Header bar matching the reference design */}
      <header
        className="op-header"
        style={{
          transform: isEmbedded ? `translateY(${(1 - headerProgress) * -100}%)` : undefined,
        }}
      >
        <h2 className="op-header__title">The Build01 Product Suite</h2>
        <div className="op-header__meta">
          <span className="op-header__tag">03 / FOUR SYSTEMS · HOVER TO EXPLORE</span>
        </div>
      </header>

        {/* Horizontal container for vertical strips */}
        <div
          className={`op-strips ${animationFinished ? "op-strips--interactive" : ""}`}
          role="region"
          aria-label="Product Systems"
        >
          {PRODUCTS.map((product, i) => {
            // Even strips enter from TOP, Odd strips enter from BOTTOM
            const fromTop = i % 2 === 0;
            const currentP = stripProgress[i];
            const translateY = fromTop
              ? (1 - currentP) * -100
              : (1 - currentP) * 100;

            const isExpanded = animationFinished && activeStrip === i;

            return (
              <div
                key={product.id}
                className={`op-strip ${isExpanded ? "op-strip--expanded" : ""}`}
                style={
                  {
                    "--accent": product.accentColor,
                    transform: `translateY(${translateY.toFixed(2)}%)`,
                  } as React.CSSProperties
                }
                onMouseEnter={() => {
                  if (animationFinished) setActiveStrip(i);
                }}
                onMouseMove={() => {
                  if (animationFinished && activeStrip !== i) setActiveStrip(i);
                }}
                onPointerEnter={() => {
                  if (animationFinished) setActiveStrip(i);
                }}
                onClick={() => {
                  if (animationFinished) setActiveStrip(i);
                }}
                tabIndex={0}
                onFocus={() => {
                  if (animationFinished) setActiveStrip(i);
                }}
                onKeyDown={(e) => {
                  if (animationFinished && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setActiveStrip(i);
                  }
                }}
              >
                {/* Aura Gradient: "Burnt Paper" Background for Hover/Expanded State */}
                <div className="op-strip__aura-wrap" aria-hidden="true">
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
                        <filter id={`aura-grain-${product.id}`}>
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
                          filter={`url(#aura-grain-${product.id})`}
                        />
                      </svg>
                    </div>
                    <div className="aura-vignette" />
                  </div>
                </div>

                {/* Collapsed state (Code & status at top, vertical text centered, plus at bottom) */}
                <div className="op-strip__collapsed" aria-hidden={isExpanded}>
                  <div className="op-strip__collapsed-top">
                    <span className="op-strip__code">{product.code}</span>
                    <span
                      className={`op-strip__collapsed-badge ${
                        product.released
                          ? "op-strip__collapsed-badge--live"
                          : "op-strip__collapsed-badge--soon"
                      }`}
                    >
                      {product.released ? "LIVE" : "SOON"}
                    </span>
                  </div>
                  <div className="op-strip__vertical-wrap">
                    <span className="op-strip__vertical-title">
                      {product.name}
                    </span>
                  </div>
                  <span className="op-strip__plus" aria-hidden="true">
                    +
                  </span>
                </div>

                {/* Expanded state (Rich product details) */}
                <div className="op-strip__expanded" aria-hidden={!isExpanded}>
                  <div className="op-strip__expanded-content">
                    <p className="op-strip__eyebrow">
                      <span className="op-strip__eyebrow-code">{product.code}</span>{" "}
                      <span className="op-strip__separator">/</span>{" "}
                      <span className="op-strip__eyebrow-cat">{product.category}</span>
                      <span
                        className={`op-strip__eyebrow-status ${
                          product.released
                            ? "op-strip__eyebrow-status--live"
                            : "op-strip__eyebrow-status--soon"
                        }`}
                      >
                        {product.released ? "LIVE & OPEN SOURCE" : "IN DEVELOPMENT"}
                      </span>
                    </p>
                    <h3 className="op-strip__title">{product.headline}</h3>
                    <p className="op-strip__description">
                      {product.description}
                    </p>

                    <div className="op-strip__tags">
                      {product.tags.map((tag) => (
                        <span key={tag} className="op-strip__tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="op-strip__actions">
                      {product.released ? (
                        <>
                          <Link
                            href={product.href}
                            className="op-strip__cta"
                            tabIndex={isExpanded ? 0 : -1}
                          >
                            Explore {product.name} <span>↗</span>
                          </Link>
                          {product.githubUrl && (
                            <a
                              href={product.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="op-strip__cta op-strip__cta--github"
                              tabIndex={isExpanded ? 0 : -1}
                            >
                              GitHub <span>↗</span>
                            </a>
                          )}
                          {product.installCommand && (
                            <span
                              className="op-strip__install-pill"
                              title="Click to copy install command"
                            >
                              <code>$ {product.installCommand}</code>
                            </span>
                          )}
                        </>
                      ) : (
                        <Link
                          href={product.href}
                          className="op-strip__cta"
                          tabIndex={isExpanded ? 0 : -1}
                        >
                          Request Early Access <span>↗</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );

  if (isEmbedded) {
    return stageContent;
  }

  return (
    <section
      id="our-products"
      ref={wrapperRef}
      className="op-wrapper"
      style={{ minHeight: "320vh" }}
    >
      {stageContent}
    </section>
  );
}
