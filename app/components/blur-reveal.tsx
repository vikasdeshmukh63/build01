"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from "react";

interface BlurRevealProps {
  children: string;
  className?: string;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  as?: ElementType;
  style?: CSSProperties;
  inView?: boolean;
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  as: Component = "p",
  style,
  inView = false,
}: BlurRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(!inView);
  const isVisible = trigger && hasEnteredView;

  useEffect(() => {
    const element = elementRef.current;
    if (!inView || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  const charsPerSegment = Math.max(1, Math.ceil(children.length / 20));

  return (
    <Component
      ref={elementRef}
      className={["blur-reveal", className].filter(Boolean).join(" ")}
      aria-label={children}
      style={
        {
          ...style,
          "--blur-reveal-duration": `${speedReveal}s`,
        } as CSSProperties
      }
    >
      <span className="blur-reveal__sr-only">{children}</span>
      <span className="blur-reveal__visual" aria-hidden="true">
        {Array.from(children).map((character, index) => (
          <span
            className={`blur-reveal__character${isVisible ? " is-visible" : ""}`}
            key={`${index}-${character}`}
            style={
              {
                "--blur-reveal-delay": `${delay + Math.floor(index / charsPerSegment) * (speedSegment / 20)}s`,
              } as CSSProperties
            }
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </Component>
  );
}
