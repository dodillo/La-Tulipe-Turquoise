"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

export function CustomCursor() {
  const { prefersReducedMotion } = useMotionPreferences()
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const auraX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.2 })
  const auraY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.2 })
  const [isVisible, setIsVisible] = useState(false)
  const isTouch = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    const updatePosition = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        isTouch.current = true
        setIsVisible(false)
        return
      }

      if (isTouch.current) return

      setIsVisible(true)
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener("pointermove", updatePosition)
    window.addEventListener("pointerdown", updatePosition)
    window.addEventListener("pointerleave", hideCursor)
    window.addEventListener("blur", hideCursor)

    return () => {
      window.removeEventListener("pointermove", updatePosition)
      window.removeEventListener("pointerdown", updatePosition)
      window.removeEventListener("pointerleave", hideCursor)
      window.removeEventListener("blur", hideCursor)
    }
  }, [cursorX, cursorY, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-50 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/90 mix-blend-difference md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      <motion.div
        className="pointer-events-none fixed z-50 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: auraX,
          y: auraY,
          background:
            "radial-gradient(circle at center, rgba(217,70,239,0.14), rgba(45,212,191,0.05) 55%, transparent 70%)",
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </>
  )
}
