"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface MotionContextType {
  prefersReducedMotion: boolean
}

const MotionContext = createContext<MotionContextType | undefined>(undefined)

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion()

  return <MotionContext.Provider value={{ prefersReducedMotion: prefersReduced }}>{children}</MotionContext.Provider>
}

export function useMotion() {
  const context = useContext(MotionContext)
  if (!context) {
    throw new Error("useMotion must be used within MotionProvider")
  }
  return context
}
