import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const gsapConfig = {
  // Easing functions for cinematic feel
  easings: {
    smooth: "power2.inOut",
    smooth3: "power3.inOut",
    elastic: "elastic.out(1, 0.5)",
    back: "back.out(1.7)",
  },

  // Stagger configurations
  stagger: {
    word: 0.1,
    line: 0.15,
    card: 0.12,
    massive: 0.2,
  },

  // Duration presets
  duration: {
    quick: 0.3,
    normal: 0.6,
    slow: 1,
    slowest: 1.5,
  },
}

export const createScrollMorph = (element: HTMLElement) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      markers: false,
    },
    rotation: 360,
    scale: 1.2,
    duration: 2,
  })
}

export const createMagneticHover = (element: HTMLElement) => {
  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const x = (e.clientX - centerX) * 0.3
    const y = (e.clientY - centerY) * 0.3

    gsap.to(element, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const onMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
  }

  element.addEventListener("mousemove", onMouseMove)
  element.addEventListener("mouseleave", onMouseLeave)

  return () => {
    element.removeEventListener("mousemove", onMouseMove)
    element.removeEventListener("mouseleave", onMouseLeave)
  }
}
