"use client"

import { useMemo, useRef, type PointerEvent as ReactPointerEvent } from "react"
import Link from "next/link"
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

const HERO_STATS = [
  { label: "Same-day hand delivery", value: "London · Paris · Dubai" },
  { label: "Master florists on call", value: "24/7 concierge design" },
  { label: "Sustainably sourced", value: "Traceable farms & growers" },
]

const GALLERY_TAGS = ["Bespoke bouquets", "Artful installations", "Editorial styling"]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const { prefersReducedMotion } = useMotionPreferences()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end center"],
  })

  const rawPointerX = useMotionValue(0)
  const rawPointerY = useMotionValue(0)
  const pointerX = useSpring(rawPointerX, { stiffness: 120, damping: 20 })
  const pointerY = useSpring(rawPointerY, { stiffness: 120, damping: 20 })
  const rotateX = useTransform(pointerY, [-180, 180], [12, -12])
  const rotateY = useTransform(pointerX, [-180, 180], [-12, 12])
  const imageLift = useTransform(scrollYProgress, [0, 1], [0, -140])
  const textDrift = useTransform(scrollYProgress, [0, 1], [0, -80])
  const haloShift = useTransform(scrollYProgress, [0, 1], [0, 120])

  const gradientPositions = useMemo(
    () => [
      { top: "-10%", left: "10%", size: 380, opacity: 0.5 },
      { top: "30%", left: "70%", size: 280, opacity: 0.45 },
      { top: "70%", left: "15%", size: 320, opacity: 0.4 },
    ],
    []
  )

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !imageRef.current) return
    const bounds = imageRef.current.getBoundingClientRect()
    const relativeX = event.clientX - (bounds.left + bounds.width / 2)
    const relativeY = event.clientY - (bounds.top + bounds.height / 2)
    rawPointerX.set(relativeX)
    rawPointerY.set(relativeY)
  }

  const resetPointer = () => {
    rawPointerX.set(0)
    rawPointerY.set(0)
  }

  const motionValueOrStatic = (value: MotionValue<number>, fallback: number) => (prefersReducedMotion ? fallback : value)

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-28 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background/60"
          style={{ y: motionValueOrStatic(haloShift, 0) }}
          animate={{ opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        {gradientPositions.map((gradient, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-gradient-to-br from-[#0cb0c0]/30 via-white/5 to-transparent"
            style={{
              width: gradient.size,
              height: gradient.size,
              top: gradient.top,
              left: gradient.left,
              opacity: gradient.opacity,
              filter: "blur(50px)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 14 + index * 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[80vh] flex-col justify-center px-4">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr),minmax(0,1.3fr)]">
          <motion.div
            className="space-y-10"
            style={{ y: motionValueOrStatic(textDrift, 0) }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Haute Floral Atelier
            </motion.span>

            <motion.h1
              className="font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
            >
              Extraordinary floral stories crafted for unforgettable celebrations.
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
            >
              From intimate soirees to iconic events, our artisans orchestrate lush, multi-sensory environments using
              rare blooms, avant-garde compositions, and couture-worthy details that linger long after the moment.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
            >
              <Link href="/shop">
                <motion.button
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-lg font-medium text-background shadow-lg shadow-foreground/10 transition-colors"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
                >
                  View Collections
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.button>
              </Link>

              <motion.button
                className="rounded-full border border-foreground/30 px-8 py-3 text-lg font-medium text-foreground transition-colors hover:border-foreground/60"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                Meet Your Concierge
              </motion.button>
            </motion.div>

            <motion.div
              className="grid gap-6 border-t border-foreground/10 pt-8 sm:grid-cols-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.65 },
                },
              }}
            >
              {HERO_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-medium text-foreground">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="relative w-full"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <motion.div
              className="absolute -inset-y-24 right-[-32%] hidden rounded-[4rem] bg-[radial-gradient(circle_at_top,rgba(203,116,230,0.45),rgba(253,186,116,0.25)_35%,rgba(0,0,0,0)_80%)] blur-3xl lg:block"
              style={{ y: motionValueOrStatic(imageLift, 0) }}
              animate={prefersReducedMotion ? { opacity: 0.45 } : { opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: prefersReducedMotion ? 0 : 18, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <motion.div
              className="relative mx-auto flex w-full max-w-[28rem] justify-center sm:max-w-[30rem] lg:max-w-[36rem] xl:max-w-[40rem] lg:justify-end"
              style={{ y: motionValueOrStatic(imageLift, 0) }}
            >
              <motion.figure
                className="group relative aspect-[5/6] w-full overflow-hidden rounded-[2.75rem] border border-white/12 bg-gradient-to-br from-white/12 via-white/6 to-black/20 shadow-[0_55px_140px_-70px_rgba(203,116,230,0.65)]"
                style={{
                  rotateX: motionValueOrStatic(rotateX, 0),
                  rotateY: motionValueOrStatic(rotateY, 0),
                  transformPerspective: 1600,
                }}
                initial={{ opacity: 0, y: 45, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
              >
                <motion.img
                  src="/luxury-elegant-flower-arrangement-professional-pho.jpg"
                  alt="Signature Bloom atelier arrangement"
                  className="h-full w-full object-cover object-[52%_32%] saturate-[1.08] contrast-[1.04] transition duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  animate={{ scale: prefersReducedMotion ? 1 : [1, 1.03, 1.01, 1] }}
                  transition={{ duration: prefersReducedMotion ? 0 : 26, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-5 py-2 text-[0.55rem] uppercase tracking-[0.28em] text-white/75 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                  Aurora Series 2024
                </div>
                <div className="absolute bottom-6 left-6 right-6 space-y-4 text-white">
                  <div className="flex items-center justify-between text-[0.58rem] uppercase tracking-[0.32em] text-white/65">
                    <span>Peony</span>
                    <span>Phalaenopsis</span>
                    <span>Gardenia</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-medium uppercase tracking-[0.3em]">
                    <span>Celestial bloom</span>
                    <span>Edition No. 08</span>
                  </div>
                </div>
              </motion.figure>

              <motion.div
                className="pointer-events-auto absolute -left-28 top-14 hidden w-56 flex-col rounded-[2.5rem] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-2xl shadow-[0_35px_110px_-55px_rgba(253,186,116,0.65)] lg:flex"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-[0.55rem] uppercase tracking-[0.4em] text-white/70">Palette study</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-[#c6fffb]" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/80">Peony blush</p>
                      <p className="text-[0.65rem] text-white/55">#C6FFFB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-[#9df5ff]" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/80">Champagne silk</p>
                      <p className="text-[0.65rem] text-white/55">#9DF5FF</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-full bg-[#58d8d8]" />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/80">Orchid haze</p>
                      <p className="text-[0.65rem] text-white/55">#58D8D8</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="pointer-events-auto absolute -right-12 bottom-[-5rem] hidden w-64 rounded-[2.25rem] border border-white/15 bg-black/60 p-6 text-white backdrop-blur-2xl shadow-[0_40px_120px_-60px_rgba(0,0,0,0.7)] lg:block"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
              >
                <p className="text-[0.55rem] uppercase tracking-[0.38em] text-white/65">Concierge insight</p>
                <p className="mt-3 font-serif text-lg leading-tight text-white">
                  Designed for champagne-lit ballrooms and private couture unveilings.
                </p>
                <div className="mt-5 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.32em] text-white/60">
                  <span>Lead time 48h</span>
                  <span>Worldwide install</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground md:flex"
        animate={{ y: prefersReducedMotion ? 0 : [0, 8, 0] }}
        transition={{ duration: 2.8, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        Immerse &nbsp;•&nbsp; Discover &nbsp;•&nbsp; Indulge
      </motion.div>
    </section>
  )
}
