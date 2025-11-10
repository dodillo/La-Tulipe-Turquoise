"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface ProductGalleryProps {
  images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLImageElement>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      clipPath: direction > 0 ? "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" : "polygon(0 0, 0 0, 0 100%, 0 100%)",
      opacity: 0,
    }),
    center: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
    },
    exit: (direction: number) => ({
      clipPath: direction > 0 ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setSelectedIndex((prev) => (prev + newDirection + images.length) % images.length)
  }

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(containerRef.current, {
        "--mouse-x": x,
        "--mouse-y": y,
        duration: 0.3,
      } as any)
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)
    return () => containerRef.current?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="space-y-6">
      {/* Main gallery with liquid transition */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden group border border-slate-700/50"
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "linear-gradient(45deg, #d946ef 0%, transparent 50%)",
              "linear-gradient(45deg, transparent 0%, #06b6d4 50%)",
              "linear-gradient(45deg, #d946ef 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedIndex}
            className="absolute inset-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              clipPath: { duration: 0.6, ease: "easeInOut" },
              opacity: { duration: 0.3 },
            }}
          >
            <img
              ref={mainImageRef}
              src={images[selectedIndex] || "/placeholder.svg"}
              alt={`Product view ${selectedIndex + 1}`}
              className="w-full h-full object-cover"
            />

            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  "inset 0 0 40px rgba(217, 70, 239, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.05)",
                  "inset 0 0 60px rgba(217, 70, 239, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.1)",
                  "inset 0 0 40px rgba(217, 70, 239, 0.1), inset 0 0 20px rgba(6, 182, 212, 0.05)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gradient-to-r from-magenta-600/30 to-cyan-600/30 border border-magenta-500/40 text-white backdrop-blur-sm hover:border-magenta-500/60 group/btn"
              onClick={() => paginate(-1)}
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 30px rgba(217, 70, 239, 0.6)",
              }}
              whileTap={{ scale: 0.85 }}
            >
              <svg
                className="w-6 h-6 group-hover/btn:translate-x-[-2px] transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gradient-to-r from-magenta-600/30 to-cyan-600/30 border border-magenta-500/40 text-white backdrop-blur-sm hover:border-magenta-500/60 group/btn"
              onClick={() => paginate(1)}
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 30px rgba(217, 70, 239, 0.6)",
              }}
              whileTap={{ scale: 0.85 }}
            >
              <svg
                className="w-6 h-6 group-hover/btn:translate-x-[2px] transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        <motion.div
          className="absolute bottom-6 right-6 px-4 py-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 font-mono text-sm backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {selectedIndex + 1}/{images.length}
        </motion.div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-3">
          {images.map((image, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > selectedIndex ? 1 : -1)
                setSelectedIndex(idx)
              }}
              className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden relative group border-2 transition-all ${
                selectedIndex === idx
                  ? "border-magenta-500 shadow-lg shadow-magenta-500/50"
                  : "border-slate-600 hover:border-cyan-500/50"
              }`}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-magenta-500/0 via-cyan-500/0 to-magenta-500/0 pointer-events-none"
                animate={
                  selectedIndex === idx
                    ? {
                        background: [
                          "linear-gradient(45deg, #d946ef/0 0%, #06b6d4/0 50%, #d946ef/0 100%)",
                          "linear-gradient(45deg, #d946ef/30 0%, #06b6d4/30 50%, #d946ef/30 100%)",
                          "linear-gradient(45deg, #d946ef/0 0%, #06b6d4/0 50%, #d946ef/0 100%)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Play indicator for multiple images */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors"
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
