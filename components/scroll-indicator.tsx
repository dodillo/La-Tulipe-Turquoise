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
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-gradient-to-r from-[#035c63] via-[#0fc2c3] to-[#8ffcff]"
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
            "0 0 20px rgba(9, 147, 160, 0.45), 0 0 40px rgba(111, 245, 255, 0.25)",
            "0 0 30px rgba(9, 147, 160, 0.6), 0 0 60px rgba(111, 245, 255, 0.35)",
            "0 0 20px rgba(9, 147, 160, 0.45), 0 0 40px rgba(111, 245, 255, 0.25)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-[#048396] to-[#72f5ff] flex items-center justify-center font-bold text-white text-sm backdrop-blur-sm border border-[#048396]/60 shadow-lg shadow-[#048396]/45"
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
