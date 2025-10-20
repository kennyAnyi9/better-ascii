import type { AnimationType } from "../types";

/**
 * Gets CSS animation styles based on animation type
 */
export function getAnimationStyle(
  animate: AnimationType,
  prefersReducedMotion: boolean
): React.CSSProperties {
  // If user prefers reduced motion, disable animations
  if (prefersReducedMotion || !animate) {
    return {};
  }

  const animationType = animate === true ? 'fade' : animate;

  const animations: Record<string, React.CSSProperties> = {
    fade: {
      animation: 'ascii-fade-in 0.8s ease-in',
    },
    typewriter: {
      animation: 'ascii-typewriter 1.2s steps(40) forwards',
      overflow: 'hidden',
      whiteSpace: 'nowrap' as const,
    },
    slide: {
      animation: 'ascii-slide-in 0.6s ease-out',
    },
  };

  return animations[animationType] || {};
}

/**
 * Injects CSS keyframes for animations into the document head
 */
export function injectAnimationStyles(): void {
  // Check if styles already exist
  if (document.getElementById('better-ascii-react-animations')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'better-ascii-react-animations';
  style.textContent = `
    @keyframes ascii-fade-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes ascii-typewriter {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @keyframes ascii-slide-in {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-ascii-animated] {
        animation: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}
