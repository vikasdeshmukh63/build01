"use client";

import { useEffect, useState, type ElementType } from "react";

interface TypewriterTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  as: Component = "h3",
  className = "",
  speed = 16,
  showCursor = false,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);

    let charIdx = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      charIdx++;
      setDisplayedText(text.slice(0, charIdx));

      if (charIdx < text.length) {
        timer = setTimeout(typeChar, speed);
      } else {
        setIsComplete(true);
      }
    };

    timer = setTimeout(typeChar, 30);

    return () => {
      clearTimeout(timer);
    };
  }, [text, speed]);

  return (
    <Component className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <span className="typewriter-cursor" aria-hidden="true" />
      )}
    </Component>
  );
}
