"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

interface ProductDetailsProps {
  name: string
  price: number
  rating: number
  reviews: number
  description: string
  inStock: boolean
  deliveryDate?: string
}

export function ProductDetails({
  name,
  price,
  rating,
  reviews,
  description,
  inStock,
  deliveryDate,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleAddToCart = () => {
    setAddedToCart(true)

    // Trigger confetti/bloom effect
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    setTimeout(() => setAddedToCart(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants}>
        <motion.h1
          className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight"
          whileHover={{
            textShadow: "2px 2px #0cb0c0, -2px -2px #72f5ff",
          }}
        >
          {name}
        </motion.h1>

        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className={`text-2xl ${i < Math.round(rating) ? "text-cyan-400" : "text-slate-600"}`}
                whileHover={{ scale: 1.3, rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                ★
              </motion.span>
            ))}
          </div>
          <span className="text-slate-300 font-light">
            {rating} out of 5 <span className="text-slate-500">({reviews} reviews)</span>
          </span>
        </div>
      </motion.div>

      <motion.div className="flex items-center gap-6" variants={itemVariants}>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#049bac] via-[#31e0f0] to-[#9efbff]">
          ${price.toFixed(2)}
        </div>
        <motion.div
          className={`px-6 py-2 rounded-lg font-bold text-sm ${
            inStock
              ? "bg-green-500/20 border border-green-500/40 text-green-400"
              : "bg-red-500/20 border border-red-500/40 text-red-400"
          }`}
          animate={{
            boxShadow: inStock
              ? ["0 0 0 rgba(34, 197, 94, 0.3)", "0 0 15px rgba(34, 197, 94, 0.6)", "0 0 0 rgba(34, 197, 94, 0.3)"]
              : "none",
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </motion.div>
      </motion.div>

      <motion.p className="text-lg text-slate-300 leading-relaxed font-light" variants={itemVariants}>
        {description}
      </motion.p>

      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Quantity:</span>
          <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <motion.button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full hover:bg-[#049bac]/50 flex items-center justify-center text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
            >
              −
            </motion.button>
            <motion.span
              className="px-6 py-2 text-white font-bold min-w-[60px] text-center"
              key={quantity}
              animate={{ scale: [0.8, 1] }}
              transition={{ duration: 0.2 }}
            >
              {quantity}
            </motion.span>
            <motion.button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full hover:bg-cyan-600/50 flex items-center justify-center text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
            >
              +
            </motion.button>
          </div>
        </div>

        <motion.button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full py-4 rounded-xl font-bold text-lg text-white uppercase tracking-wide overflow-hidden relative group disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{
            boxShadow: "0 0 30px rgba(4, 155, 172, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#038a9a] via-[#11c6d4] to-[#7df7ff]"
            animate={addedToCart ? { x: ["0%", "100%"] } : {}}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="relative z-10 flex items-center justify-center gap-2"
            animate={{
              y: addedToCart ? -30 : 0,
              opacity: addedToCart ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            Add to Cart
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            animate={{
              y: addedToCart ? 0 : 30,
              opacity: addedToCart ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            ✓ Added to Cart!
          </motion.div>
        </motion.button>
      </motion.div>

      {deliveryDate && (
        <motion.div
          className="bg-gradient-to-r from-[#038a9a]/20 to-[#72f5ff]/20 border border-[#038a9a]/30 rounded-xl p-6 backdrop-blur-sm"
          variants={itemVariants}
          whileHover={{
            borderColor: "rgba(4, 155, 172, 0.6)",
          }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#038a9a] to-[#72f5ff] flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <div>
              <p className="text-white font-bold mb-1">Free Delivery Available</p>
              <p className="text-slate-300 text-sm">Estimated delivery: {deliveryDate}</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div className="space-y-4" variants={itemVariants}>
        <h3 className="text-xl font-bold text-white uppercase tracking-wide">Features:</h3>
        <div className="space-y-3">
          {[
            "Hand-picked fresh flowers selected daily",
            "Same-day delivery available",
            "100% satisfaction guaranteed",
            "Eco-friendly packaging included",
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/40 transition-colors"
              whileHover={{
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                borderColor: "rgba(6, 182, 212, 0.4)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <motion.span className="text-cyan-400 font-bold text-lg" whileHover={{ scale: 1.3 }}>
                ✓
              </motion.span>
              <span className="text-slate-300 font-light">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
