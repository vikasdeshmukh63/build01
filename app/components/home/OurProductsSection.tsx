"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  released: boolean;
  accentColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: "agent-os",
    name: "Agent OS",
    tagline: "Orchestrate AI agents at work",
    description:
      "Agent OS is our first product — a platform for building, deploying, and managing AI agents across real business workflows. It moves AI beyond the chat window into systems that actually get work done.",
    href: "/agent-os",
    released: true,
    accentColor: "#E87945",
  },
  {
    id: "product-02",
    name: "Coming Soon",
    tagline: "Next product in development",
    description:
      "We're working on something new. This product will expand what's possible with intelligent automation for teams.",
    href: "/contact",
    released: false,
    accentColor: "#6BC8D6",
  },
  {
    id: "product-03",
    name: "Coming Soon",
    tagline: "More to be announced",
    description:
      "A third product is on the roadmap. Stay close — we build in public and share progress as we go.",
    href: "/contact",
    released: false,
    accentColor: "#778397",
  },
];

const N = PRODUCTS.length;

function ProductStrip({
  product,
  index,
  progress,
}: {
  product: Product;
  index: number;
  // 0 = fully hidden off-screen, 1 = fully in place
  progress: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Odd strips slide from bottom, even from top
  const fromTop = index % 2 === 0;

  // translateY: start fully off-screen (±100%), settle at 0
  const translateY = fromTop
    ? `${(1 - progress) * -100}%`
    : `${(1 - progress) * 100}%`;

  return (
    <div
      className={[
        "op-strip",
        hovered ? "op-strip--hovered" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--accent": product.accentColor,
        transform: `translateY(${translateY})`,
      } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent line on left edge */}
      <div className="op-strip__accent-line" aria-hidden="true" />

      {/* Collapsed content — always visible */}
      <div className="op-strip__collapsed">
        <span className="op-strip__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="op-strip__name-wrap">
          <span className="op-strip__name">{product.name}</span>
          {!product.released && (
            <span className="op-strip__badge">Soon</span>
          )}
        </div>
        <span className="op-strip__tagline-hint">{product.tagline}</span>
      </div>

      {/* Expanded overlay — slides in from left on hover */}
      <div className="op-strip__expanded" aria-hidden={!hovered}>
        <div className="op-strip__expanded-inner">
          <div className="op-strip__logo-placeholder" aria-hidden="true">
            <span>{product.name.charAt(0)}</span>
          </div>
          <div className="op-strip__info">
            <p className="op-strip__eyebrow">{product.tagline}</p>
            <h3 className="op-strip__heading">{product.name}</h3>
            <p className="op-strip__description">{product.description}</p>
            {product.released ? (
              <Link
                href={product.href}
                className="op-strip__cta"
                tabIndex={hovered ? 0 : -1}
              >
                Explore {product.name} ↗
              </Link>
            ) : (
              <Link
                href={product.href}
                className="op-strip__cta op-strip__cta--muted"
                tabIndex={hovered ? 0 : -1}
              >
                Get notified ↗
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OurProductsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Per-strip progress 0→1
  const [stripProgress, setStripProgress] = useState<number[]>(
    Array(N).fill(0),
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (motionPreference.matches) {
      setStripProgress(Array(N).fill(1));
      return;
    }

    let raf: number | null = null;

    const update = () => {
      raf = null;
      const rect = wrapper.getBoundingClientRect();
      // Total scroll distance available in the wrapper past the sticky panel
      const scrollBudget = wrapper.offsetHeight - window.innerHeight;
      if (scrollBudget <= 0) {
        setStripProgress(Array(N).fill(1));
        return;
      }

      // progress 0→1 across the entire wrapper scroll range
      const overallProgress = Math.min(
        1,
        Math.max(0, -rect.top / scrollBudget),
      );

      // Each strip gets its own 1/N window of the overall progress
      // Strip i starts at i/N and is fully in by (i+1)/N
      const next = PRODUCTS.map((_, i) => {
        const start = i / N;
        const end = (i + 1) / N;
        return Math.min(1, Math.max(0, (overallProgress - start) / (end - start)));
      });

      setStripProgress(next);
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf !== null) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    /*
     * Wrapper creates the scroll budget.
     * 100vh = the sticky panel height
     * N * 80vh = scroll distance to bring all strips fully in
     */
    <div
      ref={wrapperRef}
      className="op-wrapper"
      style={{ minHeight: `${100 + N * 80}vh` }}
    >
      {/* Sticky frame — pins to viewport, clips overflowing strips */}
      <div className="op-stage">
        {PRODUCTS.map((product, i) => (
          <ProductStrip
            key={product.id}
            product={product}
            index={i}
            progress={stripProgress[i]}
          />
        ))}
      </div>
    </div>
  );
}
