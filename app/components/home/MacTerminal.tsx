"use client";

import { useEffect, useState } from "react";

interface TerminalLine {
  text: string;
  colorClass?: string;
}

interface MacTerminalProps {
  lines: TerminalLine[];
  activeId: string;
}

export default function MacTerminal({ lines, activeId }: MacTerminalProps) {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setTypedLines(lines.map((l) => l.text));
      setCurrentLineIdx(lines.length);
      setIsFinished(true);
      return;
    }

    // Reset for new problem
    setTypedLines([]);
    setCurrentLineIdx(0);
    setIsFinished(false);

    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (lineIndex >= lines.length) {
        setIsFinished(true);
        return;
      }

      const targetText = lines[lineIndex].text;
      // Step: 1 or 2 chars per tick for smooth yet snappy terminal speed
      const step = targetText.length > 40 ? 2 : 1;
      charIndex = Math.min(targetText.length, charIndex + step);

      setTypedLines((prev) => {
        const next = [...prev];
        next[lineIndex] = targetText.slice(0, charIndex);
        return next;
      });
      setCurrentLineIdx(lineIndex);

      if (charIndex >= targetText.length) {
        // Line completed, short pause before next line
        lineIndex++;
        charIndex = 0;
        timer = setTimeout(typeNextChar, 50);
      } else {
        timer = setTimeout(typeNextChar, 12);
      }
    };

    // Initial slight pause before typing starts
    timer = setTimeout(typeNextChar, 80);

    return () => {
      clearTimeout(timer);
    };
  }, [activeId, lines]);

  return (
    <div className="mac-terminal" aria-live="polite">
      {/* macOS Window Titlebar */}
      <div className="mac-terminal__header">
        <div className="mac-terminal__traffic">
          <span className="mac-terminal__btn mac-terminal__btn--close" title="Close" />
          <span className="mac-terminal__btn mac-terminal__btn--min" title="Minimize" />
          <span className="mac-terminal__btn mac-terminal__btn--max" title="Zoom" />
        </div>
        <div className="mac-terminal__title">
          <span className="mac-terminal__title-icon">⚡</span>
          <span>agentos-trace — bash — 80×24</span>
        </div>
        <div className="mac-terminal__status">
          <span className="mac-terminal__status-dot" />
          <span>{isFinished ? "FAULT" : "STREAM"}</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="mac-terminal__body">
        <div className="mac-terminal__lines">
          {lines.map((line, idx) => {
            const textToDisplay = typedLines[idx] ?? "";
            const isCurrentlyTyping = currentLineIdx === idx && !isFinished;
            if (idx > currentLineIdx && !isFinished) return null;

            return (
              <div
                key={`${activeId}-line-${idx}`}
                className={`mac-terminal__line ${line.colorClass || ""}`}
              >
                <span>{textToDisplay}</span>
                {isCurrentlyTyping && (
                  <span
                    className="mac-terminal__cursor mac-terminal__cursor--inline"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Prompt Line with Bipping Cursor */}
        <div className="mac-terminal__prompt-row">
          <span className="mac-terminal__prompt-path">~/build01</span>
          <span className="mac-terminal__prompt-symbol">❯</span>
          <span className="mac-terminal__prompt-cmd">agentos audit --halt-on-drift</span>
          {isFinished && <span className="mac-terminal__cursor" aria-hidden="true" />}
        </div>
      </div>
    </div>
  );
}
