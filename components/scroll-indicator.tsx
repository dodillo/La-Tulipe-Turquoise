"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollY(progress)
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-magenta-500 via-cyan-500 to-magenta-500"
        style={{ scaleX: scrollY / 100, transformOrigin: "left" }}
        animate={{
          backgroundPosition: ["0% center", "200% center"],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-2 z-40 pointer-events-none"
        style={{ scaleX: scrollY / 100, transformOrigin: "left" }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(217, 70, 239, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
            "0 0 30px rgba(217, 70, 239, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)",
            "0 0 20px rgba(217, 70, 239, 0.3), 0 0 40px rgba(6, 182, 212, 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-magenta-600 to-cyan-600 flex items-center justify-center font-bold text-white text-sm backdrop-blur-sm border border-magenta-500/50 shadow-lg shadow-magenta-500/50"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {Math.round(scrollY)}%
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
