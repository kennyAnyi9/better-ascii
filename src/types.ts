/**
 * Font data type - represents the raw figlet font data string
 */
export type Font = string;

/**
 * Animation type - can be a boolean (default animation) or a preset name
 */
export type AnimationType = boolean | 'fade' | 'typewriter' | 'slide';

/**
 * Animation event callbacks
 */
export interface AnimationCallbacks {
  /** Called when animation completes */
  onAnimationComplete?: () => void;
}
