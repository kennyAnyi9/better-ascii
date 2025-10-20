import { useEffect, useState, ElementType } from "react";
import { textToAscii } from "../utils/figlet";
import { getAnimationStyle, injectAnimationStyles } from "../utils/animation";
import type { Font, AnimationType } from "../types";

export interface AsciiProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
  font?: Font;
  as?: ElementType;
  animate?: AnimationType;
  onAnimationComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Ascii component - Renders text as ASCII art
 *
 * @example
 * ```tsx
 * <Ascii>Hello World</Ascii>
 * <Ascii font={fonts.doom}>Hello</Ascii>
 * <Ascii as="div" className="text-green-400">Styled</Ascii>
 * <Ascii animate>Animated</Ascii>
 * <Ascii animate="typewriter" onAnimationComplete={() => console.log('done')}>Hello</Ascii>
 * ```
 */
export function Ascii({
  children,
  font,
  as: Component = "pre",
  animate = false,
  onAnimationComplete,
  className,
  style,
  ...props
}: AsciiProps) {
  const [asciiText, setAsciiText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Inject animation styles if needed
  useEffect(() => {
    if (animate && typeof document !== 'undefined') {
      injectAnimationStyles();
    }
  }, [animate]);

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

  // Default styles to ensure ASCII art renders correctly
  const animationStyle = getAnimationStyle(animate, prefersReducedMotion);
  const defaultStyle: React.CSSProperties = {
    fontFamily: 'monospace',
    whiteSpace: 'pre',
    margin: 0,
    ...animationStyle,
    ...style,
  };

  // Handle animation complete event
  const handleAnimationEnd = () => {
    if (onAnimationComplete && !prefersReducedMotion) {
      onAnimationComplete();
    }
  };

  if (error) {
    return (
      <Component
        className={className}
        style={defaultStyle}
        role="alert"
        {...props}
      >
        Error: {error}
      </Component>
    );
  }

  if (isLoading) {
    return (
      <Component
        className={className}
        style={defaultStyle}
        aria-busy="true"
        aria-live="polite"
        {...props}
      >
        Loading...
      </Component>
    );
  }

  return (
    <Component
      className={className}
      style={defaultStyle}
      role="img"
      aria-label={`ASCII art: ${children}`}
      data-ascii-animated={animate ? 'true' : undefined}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {asciiText}
    </Component>
  );
}
