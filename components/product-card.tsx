"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { useMotion } from "./motion-provider"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  badge?: string
  index?: number
}

export function ProductCard({ id, name, price, image, rating, reviews, badge, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { prefersReducedMotion } = useMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = (e.clientX - centerX) * 0.2
      const y = (e.clientY - centerY) * 0.2

      gsap.to(cardRef.current, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    cardRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cardRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!isHovered || !particleCanvasRef.current) return

    const canvas = particleCanvasRef.current
    const ctx = canvas.getContext("2d")!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      color: string
    }> = []

    const createParticles = () => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
          size: Math.random() * 3 + 1,
          color: Math.random() > 0.5 ? "#0cb0c0" : "#6ff6ff",
        })
      }
    }

    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isHovered])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative h-full"
    >
      <div className="relative h-full rounded-2xl overflow-hidden group bg-[#012f34]/80 border border-white/10 backdrop-blur-sm">
        {/* Glitch background effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            animate={
              isHovered
                ? {
                    background: [
                      "linear-gradient(45deg, #0cb0c0 0%, transparent 50%)",
                      "linear-gradient(45deg, transparent 0%, #6ff6ff 50%)",
                      "linear-gradient(45deg, #0cb0c0 0%, transparent 50%)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
          />

        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-[#01363d]">
          {badge && (
            <motion.div
              className="absolute top-4 right-4 z-20 px-4 py-2 rounded-lg font-bold text-sm bg-gradient-to-r from-[#038a9a] to-[#72f5ff] text-white shadow-[0_15px_35px_rgba(8,139,154,0.35)]"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{
                boxShadow: "0 0 25px rgba(9, 164, 176, 0.8)",
              }}
            >
              {badge}
            </motion.div>
          )}

          {/* Main image with advanced zoom and tilt */}
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={
              isHovered && !prefersReducedMotion
                ? { scale: 1.15, filter: "brightness(1.1)" }
                : { scale: 1, filter: "brightness(1)" }
            }
            transition={{ duration: 0.4 }}
          />

          {/* Particle canvas overlay */}
          <canvas ref={particleCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#021f24] via-transparent to-transparent"
            animate={isHovered ? { opacity: 0.8 } : { opacity: 0.4 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none"
            animate={
              isHovered
                ? {
                    borderColor: ["rgba(10, 147, 160, 0.4)", "rgba(102, 244, 255, 0.7)", "rgba(10, 147, 160, 0.4)"],
                    boxShadow: [
                      "inset 0 0 20px rgba(11, 138, 152, 0.35)",
                      "inset 0 0 40px rgba(104, 245, 255, 0.45)",
                      "inset 0 0 20px rgba(11, 138, 152, 0.35)",
                    ],
                  }
                : {
                    borderColor: "rgba(4, 63, 67, 0.35)",
                    boxShadow: "inset 0 0 0px rgba(0, 0, 0, 0)",
                  }
            }
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#038a9a] to-[#6ff6ff] hover:from-[#049bac] hover:to-[#8bfaff] text-white font-bold px-8 rounded-lg shadow-lg shadow-[0_25px_40px_rgba(5,122,135,0.35)]"
              onClick={() => console.log("Quick view:", id)}
            >
              Quick View
            </Button>
          </motion.div>
        </div>

        {/* Content section */}
        <div className="p-6 flex flex-col justify-between h-full">
          <motion.h3
            className="text-xl font-bold text-white mb-2 leading-tight"
            whileHover={{
              textShadow: isHovered ? "2px 2px #0cb0c0, -2px -2px #72f5ff" : "none",
            }}
          >
            {name}
          </motion.h3>

          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className={`text-lg ${i < Math.round(rating) ? "text-cyan-400" : "text-slate-600"}`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="text-sm text-slate-400">({reviews})</span>
          </motion.div>

          {/* Price and action */}
          <div className="flex items-center justify-between mt-auto">
            <motion.div
              className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#04a3b4] via-[#31e0f0] to-[#9efbff]"
              whileHover={{ scale: 1.1 }}
            >
              ${price.toFixed(2)}
            </motion.div>

            <motion.button
              className="p-3 rounded-full bg-gradient-to-r from-[#049bac]/20 to-[#6ff6ff]/20 border border-[#049bac]/40 hover:border-[#049bac]/70 text-white transition-all"
              whileHover={{
                scale: 1.15,
                boxShadow: "0 0 25px rgba(4, 155, 172, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => console.log("Add to cart:", id)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
