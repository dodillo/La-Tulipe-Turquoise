"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useMotion } from "./motion-provider"

interface PageTransitionProps {
  children: ReactNode
  delay?: number
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  const { prefersReducedMotion } = useMotion()

  const liquidVariants = {
    initial: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      opacity: 0,
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div variants={liquidVariants} initial="initial" animate="animate" exit="exit" transition={{ delay }}>
      {children}
    </motion.div>
  )
}
