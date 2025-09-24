// Animation variants for consistent motion across components
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInFromRight: {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideInFromLeft: {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideUp: {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

// Transition configurations
export const TRANSITIONS = {
  default: { duration: 0.2 },
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  smooth: { duration: 0.3, ease: 'easeInOut' as const },
};

// Common class combinations
export const GLASS_EFFECT = 'backdrop-blur-lg bg-white/80 dark:bg-gray-900/80';
export const BORDER_SUBTLE = 'border border-gray-200 dark:border-gray-800';
export const SHADOW_SOFT = 'shadow-sm';
export const SHADOW_ELEVATED = 'shadow-lg';

// Layout constants
export const CONTAINER_CLASSES = 'container mx-auto px-4 sm:px-6 lg:px-8';
export const SECTION_PADDING = 'py-12 lg:py-16';

// Z-index scale for layering
export const Z_INDEX = {
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;
