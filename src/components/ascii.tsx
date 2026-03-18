"use client";

import { useEffect, useState } from "react";
import { textToAscii } from "../utils/figlet";
import type { Font } from "../types";

export interface AsciiProps extends React.HTMLAttributes<HTMLPreElement> {
  children: string;
  font?: Font;
  className?: string;
  style?: React.CSSProperties;
}

export function Ascii({
  children,
  font,
  className,
  style,
  ...props
}: AsciiProps) {
  const [asciiText, setAsciiText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function generateAscii() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await textToAscii(children, font);

        if (isMounted) {
          setAsciiText(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to generate ASCII text");
          setIsLoading(false);
        }
      }
    }

    generateAscii();

    return () => {
      isMounted = false;
    };
  }, [children, font]);

  const defaultStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    margin: 0,
    ...style,
  };

  if (error) {
    return (
      <pre
        className={className}
        style={defaultStyle}
        role="alert"
        {...props}
      >
        Error: {error}
      </pre>
    );
  }

  if (isLoading) {
    return (
      <pre
        className={className}
        style={defaultStyle}
        aria-busy="true"
        aria-live="polite"
        {...props}
      >
        Loading...
      </pre>
    );
  }

  return (
    <pre
      className={className}
      style={defaultStyle}
      role="img"
      aria-label={`ASCII art: ${children}`}
      {...props}
    >
      {asciiText}
    </pre>
  );
}
