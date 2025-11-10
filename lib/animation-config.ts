// Animation configuration and easing functions for consistent motion
export const animationConfig = {
  easing: {
    easeOut: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  duration: {
    fast: 0.2,
    normal: 0.5,
    slow: 0.8,
  },
  stagger: {
    default: 0.1,
    list: 0.05,
  },
}

// Helper to check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
