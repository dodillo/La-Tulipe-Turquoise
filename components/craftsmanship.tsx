"use client"

import { motion } from "framer-motion"
import { Flower2, Leaf, Palette, Sparkle, Truck } from "lucide-react"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

const JOURNEY_STEPS = [
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Sourced at dawn from rare growers",
    description:
      "We hand-select seasonal blooms from regenerative farms in Kyoto, Ecuador, and the South of France within hours of cutting.",
    detail: "Each stem is scanned for vitality and conditioned in mineral-rich water for 24 hours before design.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Couture design in our atelier",
    description:
      "Our master florists compose moodboards, color harmonies, and signature vessels tailored to your story, lighting, and setting.",
    detail: "Arrangements are sculpted layer by layer with precision wiring, hand-dyed silk ribbons, and bespoke fragrance blends.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Concierge delivery & staging",
    description:
      "We arrive in climate-controlled transport with a stylists toolkit to place, steam, and photograph every piece in situ.",
    detail: "Your concierge leaves care rituals, a QR-guided soundtrack, and a handwritten note sealed in perfumed wax.",
  },
]

export function Craftsmanship() {
  const { prefersReducedMotion } = useMotionPreferences()

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background via-background/70 to-transparent"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.12),transparent_55%)]"
          animate={{ rotate: prefersReducedMotion ? 0 : [0, 5, -3, 0] }}
          transition={{ duration: 22, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Sparkle className="h-3.5 w-3.5 text-accent" />
            The Bloom Ritual
          </motion.span>
          <motion.h2
            className="mt-6 font-serif text-4xl text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
          >
            Every arrangement is an immersive, five-sense narrative.
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Follow the journey from flower field to finale. Our atelier orchestrates each moment with couture precision,
            sustainability in mind, and a little bit of theatre.
          </motion.p>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-magenta-500/40 via-foreground/10 to-transparent md:block" />

          <div className="space-y-10">
            {JOURNEY_STEPS.map((step, index) => (
              <motion.article
                key={step.title}
                className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/70 p-8 shadow-lg shadow-magenta-500/5 backdrop-blur"
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 * index, duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-gradient-to-br from-magenta-500/15 via-white/5 to-transparent blur-2xl"
                  animate={{
                    scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
                    rotate: prefersReducedMotion ? 0 : [0, 6, -4, 0],
                  }}
                  transition={{ duration: 18, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-foreground/10 bg-background/80 text-foreground shadow-inner">
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-magenta-500/20 via-transparent to-cyan-500/20 blur-lg"
                      animate={{ opacity: prefersReducedMotion ? 0.4 : [0.25, 0.5, 0.25] }}
                      transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <span className="relative text-accent">{step.icon}</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-foreground/15" />
                      <span>Chapter</span>
                    </div>
                    <h3 className="font-serif text-2xl text-foreground md:text-3xl">{step.title}</h3>
                    <p className="text-base text-muted-foreground">{step.description}</p>
                    <p className="text-sm text-muted-foreground/80">{step.detail}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-foreground/10 bg-background/70 px-6 py-8 text-center shadow-lg shadow-magenta-500/5 backdrop-blur md:flex-row md:text-left"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">For signature events</p>
            <p className="mt-3 font-serif text-2xl text-foreground">
              Customize your Bloom ritual with a private floral fitting in our atelier.
            </p>
          </div>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
          >
            Reserve a consultation
            <Flower2 className="h-4 w-4 text-accent" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
