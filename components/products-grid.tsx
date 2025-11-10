"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProductCard } from "./product-card"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: "1",
    name: "Midnight Eclipse",
    price: 129.99,
    image: "/dark-purple-flowers-arrangement-luxury.jpg",
    rating: 5,
    reviews: 234,
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Neon Pulse",
    price: 119.99,
    image: "/neon-cyan-bright-flowers-arrangement-modern.jpg",
    rating: 5,
    reviews: 189,
    badge: "Featured",
  },
  {
    id: "3",
    name: "Ethereal Garden",
    price: 124.99,
    image: "/mixed-flowers-garden-arrangement-elegant.jpg",
    rating: 4.8,
    reviews: 156,
    badge: "New",
  },
  {
    id: "4",
    name: "Romantic Dreams",
    price: 99.99,
    image: "/placeholder.svg?key=romantic",
    rating: 4.9,
    reviews: 201,
  },
  {
    id: "5",
    name: "Cyber Bloom",
    price: 134.99,
    image: "/placeholder.svg?key=cyber",
    rating: 5,
    reviews: 178,
    badge: "Limited",
  },
  {
    id: "6",
    name: "Velvet Whisper",
    price: 109.99,
    image: "/placeholder.svg?key=velvet",
    rating: 4.7,
    reviews: 143,
  },
  {
    id: "7",
    name: "Aurora Blaze",
    price: 139.99,
    image: "/placeholder.svg?key=aurora",
    rating: 5,
    reviews: 267,
    badge: "Bestseller",
  },
  {
    id: "8",
    name: "Void Eternal",
    price: 149.99,
    image: "/placeholder.svg?key=void",
    rating: 4.9,
    reviews: 198,
    badge: "Exclusive",
  },
]

export function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState("all")
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (gridRef.current) {
      cardsRef.current.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top center",
            scrub: 0.5,
          },
          opacity: 0,
          y: 100,
          rotation: idx % 2 === 0 ? -15 : 15,
          scale: 0.8,
        })

        // Morphing border effect on scroll
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
          borderRadius: ["0% 100% 0% 100%", "50% 50% 50% 50%", "100% 0% 100% 0%"],
        })
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  return (
    <div className="w-full">
      <motion.div
        className="mb-16 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {["all", "bestsellers", "new", "exclusive"].map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative px-8 py-3 font-bold text-lg rounded-lg overflow-hidden group transition-all ${
              activeCategory === category ? "text-white" : "text-slate-300 hover:text-white"
            }`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background gradient for active state */}
            {activeCategory === category && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-magenta-600 to-cyan-600 -z-10"
                layoutId="activeCategory"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Border glow effect */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
              animate={{
                borderColor: activeCategory === category ? "rgba(217, 70, 239, 0.5)" : "rgba(6, 182, 212, 0.2)",
                boxShadow:
                  activeCategory === category ? "0 0 20px rgba(217, 70, 239, 0.6)" : "0 0 10px rgba(6, 182, 212, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-max"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el
            }}
            className={`${index === 0 || index === 3 ? "lg:col-span-2 lg:row-span-2" : ""}`}
          >
            <motion.div
              className="relative h-full group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Glitch border effect container */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-magenta-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <ProductCard {...product} index={index} />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
