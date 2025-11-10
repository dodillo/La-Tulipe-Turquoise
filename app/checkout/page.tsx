"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { useCart } from "@/hooks/use-cart"

export default function CheckoutPage() {
  const { items, total } = useCart()
  const [step, setStep] = useState<"shipping" | "payment" | "review" | "complete">("shipping")
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!orderComplete || !confettiCanvasRef.current) return

    const canvas = confettiCanvasRef.current
    const ctx = canvas.getContext("2d")!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      size: number
      color: string
      rotation: number
      rotationSpeed: number
    }> = []

    // Create burst of confetti particles
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2
      const speed = 5 + Math.random() * 8

      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 1,
        size: Math.random() * 8 + 3,
        color: ["#d946ef", "#06b6d4", "#6366f1", "#f97316"][Math.floor(Math.random() * 4)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.2 // gravity
        p.life -= 0.01
        p.rotation += p.rotationSpeed

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          ctx.globalAlpha = p.life
          ctx.fillStyle = p.color
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }
      })

      ctx.globalAlpha = 1

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [orderComplete])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "shipping") {
      setStep("payment")
    } else if (step === "payment") {
      setStep("review")
    } else if (step === "review") {
      setStep("complete")
      setOrderComplete(true)
    }
  }

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ]

  const stepIndex = steps.findIndex((s) => s.id === step)

  return (
    <PageTransition>
      <main className="min-h-screen bg-background py-12 relative overflow-hidden">
        <motion.div
          className="fixed top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          style={{
            background: "linear-gradient(135deg, #d946ef 0%, #06b6d4 100%)",
          }}
        />

        {orderComplete && <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => {
                const isCompleted = stepIndex > idx
                const isActive = step === s.id

                return (
                  <motion.div key={s.id} className="flex-1 flex items-center relative" layout>
                    {/* Step circle with glow */}
                    <motion.div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 border-2 transition-all ${
                        isCompleted || isActive
                          ? "border-magenta-500 bg-gradient-to-r from-magenta-600 to-cyan-600 text-white"
                          : "border-slate-600 bg-slate-800/50 text-slate-300"
                      }`}
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        boxShadow: isActive ? "0 0 30px rgba(217, 70, 239, 0.8)" : "none",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? (
                        <motion.span
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          ✓
                        </motion.span>
                      ) : (
                        idx + 1
                      )}
                    </motion.div>

                    {/* Label */}
                    <span className="ml-3 font-bold text-white hidden sm:inline text-sm md:text-base">{s.label}</span>

                    {/* Connector line */}
                    {idx < steps.length - 1 && (
                      <motion.div
                        className="flex-1 h-1 mx-4 rounded-full bg-slate-700/50"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: 1,
                          background: isCompleted
                            ? "linear-gradient(90deg, #d946ef 0%, #06b6d4 100%)"
                            : "rgb(55, 65, 81)",
                        }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {step === "complete" ? (
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated success icon */}
              <motion.div
                className="mb-8 flex justify-center"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                  <motion.svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </motion.svg>
                </motion.div>
              </motion.div>

              <motion.h1
                className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-cyan-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Order Confirmed!
              </motion.h1>

              <motion.p
                className="text-xl text-slate-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your beautiful flowers will bloom at your doorstep within 24 hours. Thank you for choosing us!
              </motion.p>

              {/* Order details */}
              <motion.div
                className="bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8 mb-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-4 text-left">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                    <span className="text-slate-400">Order Total:</span>
                    <span className="text-2xl font-bold text-cyan-400">${(total() * 1.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Estimated Delivery:</span>
                    <span className="text-white font-bold">Tomorrow or Today</span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                onClick={() => (window.location.href = "/")}
                className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-magenta-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-magenta-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                key={step}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <AnimatePresence mode="wait">
                      {step === "shipping" && (
                        <motion.div
                          key="shipping"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <h2 className="text-3xl font-black text-white mb-8">Shipping Address</h2>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { key: "firstName", label: "First Name", cols: 1 },
                              { key: "lastName", label: "Last Name", cols: 1 },
                              { key: "email", label: "Email", cols: 2 },
                              { key: "address", label: "Address", cols: 2 },
                              { key: "city", label: "City", cols: 1 },
                              { key: "zip", label: "ZIP Code", cols: 1 },
                            ].map((field) => (
                              <motion.input
                                key={field.key}
                                type={field.key === "email" ? "email" : "text"}
                                placeholder={field.label}
                                value={formData[field.key as keyof typeof formData]}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    [field.key]: e.target.value,
                                  })
                                }
                                className={`col-span-2 sm:col-span-${field.cols} px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                                whileFocus={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {step === "payment" && (
                        <motion.div
                          key="payment"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <h2 className="text-3xl font-black text-white mb-8">Payment Method</h2>
                          <div className="space-y-4">
                            {[
                              { id: "card", label: "Credit Card", icon: "💳" },
                              { id: "paypal", label: "PayPal", icon: "₹" },
                              { id: "apple", label: "Apple Pay", icon: "◆" },
                            ].map((method, idx) => (
                              <motion.button
                                key={method.id}
                                type="button"
                                className="w-full p-5 border-2 border-slate-600 rounded-xl hover:border-cyan-500 bg-slate-700/30 text-white font-bold transition-all hover:bg-slate-700/50 group"
                                whileHover={{
                                  scale: 1.02,
                                  borderColor: "rgba(6, 182, 212, 0.8)",
                                  boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                                }}
                                whileTap={{ scale: 0.96 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <span className="text-2xl mr-4">{method.icon}</span>
                                {method.label}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {step === "review" && (
                        <motion.div
                          key="review"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <h2 className="text-3xl font-black text-white mb-8">Order Review</h2>
                          <p className="text-slate-300 text-lg">
                            Review your order details below. Once you confirm, your flowers will be prepared and shipped
                            immediately.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-magenta-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-magenta-500/50 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {step === "review" ? "Place Order" : "Continue"}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="sticky top-6">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                  <h2 className="text-2xl font-black text-white mb-8">Order Summary</h2>

                  <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                    {items.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        className="flex justify-between items-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        whileHover={{ backgroundColor: "rgba(51, 65, 85, 0.5)" }}
                      >
                        <div>
                          <p className="text-white font-bold">{item.name}</p>
                          <p className="text-slate-400 text-sm">x{item.quantity}</p>
                        </div>
                        <span className="text-cyan-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="border-t border-slate-600 pt-8 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex justify-between text-slate-300">
                      <span>Subtotal</span>
                      <span>${total().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Shipping</span>
                      <span className="text-green-400 font-bold">Free</span>
                    </div>
                    <div className="flex justify-between text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta-400 to-cyan-400 pt-4 border-t border-slate-600">
                      <span>Total</span>
                      <span>${(total() * 1.1).toFixed(2)}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
