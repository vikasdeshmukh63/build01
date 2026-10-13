"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  released: boolean;
  accentColor: string;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "core-array",
    code: "A.01",
    category: "COMPUTE",
    name: "Core Array",
    headline: "Dense Neural Compute Spine",
    description:
      "High-density accelerator clusters engineered for zero-jitter agent inference, deterministic memory bandwidth, and sub-millisecond dispatch across thousands of concurrent nodes.",
    tags: ["Accelerator Fabric", "Zero-Jitter Inference", "Deterministic Bus"],
    href: "/agent-os",
    released: true,
    accentColor: "#E87945",
    image: "/assets/products/product-01.jpg",
  },
  {
    id: "fluidics-loop",
    code: "A.02",
    category: "THERMAL",
    name: "Fluidics Loop",
    headline: "Fluidics Loop",
    description:
      "A sealed dielectric loop moves heat away from silicon at the source, holding the entire rack within a two degree band.",
    tags: ["Dielectric Coolant", "Two-Degree Band", "Closed Cycle"],
    href: "/contact",
    released: false,
    accentColor: "#C5F82A",
    image: "/assets/products/product-02.jpg",
  },
  {
    id: "power-grid",
    code: "A.03",
    category: "ENERGY",
    name: "Power Grid",
    headline: "Direct-Bus DC Distribution",
    description:
      "Solid-state power delivery routing 48V direct-to-die power distribution, eliminating multistage conversion losses and surviving transient spikes with microsecond response times.",
    tags: ["Direct-to-Die 48V", "Microsecond Regulation", "Solid-State Bus"],
    href: "/contact",
    released: false,
    accentColor: "#E5A84B",
    image: "/assets/products/product-03.jpg",
  },
  {
    id: "sync-layer",
    code: "A.04",
    category: "NETWORK",
    name: "Sync Layer",
    headline: "Deterministic Optical Interconnect",
    description:
      "Ultra-low latency coherent optical mesh synchronizing distributed AI memory spaces and collective communications across planetary-scale infrastructure.",
    tags: ["Coherent Optics", "Sub-Microsecond Mesh", "Zero-Drop Fabric"],
    href: "/contact",
    released: false,
    accentColor: "#6BC8D6",
    image: "/assets/products/product-04.jpg",
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
        <h2 className="op-header__title">Four systems. One spine.</h2>
        <div className="op-header__meta">
          <span className="op-header__tag">03 / HOVER OR TAP A COLUMN</span>
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
                {/* Background Image & Gradient for Expanded State */}
                <div className="op-strip__bg-wrap" aria-hidden="true">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 70vw"
                    priority={i < 2}
                    className="op-strip__bg-img"
                  />
                  <div className="op-strip__bg-gradient" />
                </div>

                {/* Collapsed state (Code at top, vertical text centered, plus at bottom) */}
                <div className="op-strip__collapsed" aria-hidden={isExpanded}>
                  <span className="op-strip__code">{product.code}</span>
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
                        <Link
                          href={product.href}
                          className="op-strip__cta"
                          tabIndex={isExpanded ? 0 : -1}
                        >
                          Explore {product.name} <span>↗</span>
                        </Link>
                      ) : (
                        <Link
                          href={product.href}
                          className="op-strip__cta"
                          tabIndex={isExpanded ? 0 : -1}
                        >
                          Request Access <span>↗</span>
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
