"use client"

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { useMotion } from "./motion-provider"

type AmbientShape = {
  size: number
  top: string
  left: string
  duration: number
  delay: number
  blur: number
  opacity: number
  hue: string
}

const SHAPES: AmbientShape[] = [
  { size: 480, top: "5%", left: "-10%", duration: 22, delay: 0, blur: 40, opacity: 0.35, hue: "rgba(12, 176, 192, 0.55)" },
  { size: 360, top: "18%", left: "70%", duration: 28, delay: 2, blur: 32, opacity: 0.3, hue: "rgba(111, 245, 255, 0.45)" },
  { size: 420, top: "42%", left: "15%", duration: 26, delay: 4, blur: 36, opacity: 0.28, hue: "rgba(72, 226, 218, 0.4)" },
  { size: 520, top: "62%", left: "68%", duration: 32, delay: 1, blur: 44, opacity: 0.25, hue: "rgba(188, 255, 248, 0.35)" },
  { size: 380, top: "78%", left: "-8%", duration: 24, delay: 3, blur: 28, opacity: 0.3, hue: "rgba(96, 224, 233, 0.38)" },
  { size: 300, top: "28%", left: "40%", duration: 18, delay: 5, blur: 24, opacity: 0.22, hue: "rgba(49, 198, 210, 0.32)" },
]

export const AmbientBackground = memo(function AmbientBackground() {
  const { prefersReducedMotion } = useMotion()

  const shapes = useMemo(() => SHAPES, [])

  if (prefersReducedMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(12,176,192,0.2), transparent 55%), radial-gradient(circle at 80% 10%, rgba(111,245,255,0.2), transparent 50%), radial-gradient(circle at 50% 80%, rgba(188,255,248,0.18), transparent 55%)",
        }}
      />
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"
        animate={{ opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {shapes.map((shape, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-white/10 to-transparent"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            filter: `blur(${shape.blur}px)`,
            background: `radial-gradient(circle, ${shape.hue}, transparent 70%)`,
            opacity: shape.opacity,
          }}
          animate={{
            y: ["-5%", "5%", "-5%"],
            x: ["-3%", "3%", "-3%"],
            rotate: [0, 12, -6, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-background via-background/80 to-transparent"
        animate={{ opacity: [0.8, 0.6, 0.8] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
})
