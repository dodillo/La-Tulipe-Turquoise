"use client"

import { useMemo, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Droplet, Sparkle, Wind } from "lucide-react"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

const STORIES = [
  {
    title: "Aurora Reverie",
    subtitle: "Private rooftop proposal · Reykjavik",
    description:
      "An ethereal palette of ice-blue delphiniums, frost-tipped roses, and mirrored vessels reflecting the northern lights. Each guest received hand-blown glass vials with glacier mist.",
    image: "/neon-cyan-bright-flowers-arrangement-modern.jpg",
    highlights: ["Polar mist diffusion", "Hand-etched lucite plinths", "Scent: crystalline juniper"],
  },
  {
    title: "Midnight Botanica",
    subtitle: "Museum gala installation · Paris",
    description:
      "Suspended florals orbiting a central chandelier, accompanied by a live string quartet. Guests walked through perfumed fog infused with tonka and black orchid.",
    image: "/dark-purple-flowers-arrangement-luxury.jpg",
    highlights: ["Levitation rigging", "Projection-mapped petals", "Scent: noir orchid"],
  },
  {
    title: "Celestial Tides",
    subtitle: "Immersive dinner · Maldives",
    description:
      "A tide-responsive tablescape with bioluminescent accents and softly pulsing light sequences. Waves triggered synchronized bloom openings using temperature reactive petals.",
    image: "/soft-pastel-flowers-peaceful.jpg",
    highlights: ["Reactive petals", "Underwater audio", "Scent: sea salt neroli"],
  },
]

export function ImmersiveStories() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { prefersReducedMotion } = useMotionPreferences()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundShift = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "-15%"])
  const shimmerOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.45])

  const badges = useMemo(
    () => [
      { label: "Multi-sensory direction", icon: <Sparkle className="h-4 w-4" /> },
      { label: "Atmospheric engineering", icon: <Wind className="h-4 w-4" /> },
      { label: "Hydroponic artistry", icon: <Droplet className="h-4 w-4" /> },
    ],
    []
  )

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"
          style={{ y: backgroundShift }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,70,239,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(251,191,36,0.12),transparent_60%)]"
          style={{ opacity: shimmerOpacity }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mb-16 flex flex-col gap-6 text-center">
          <motion.span
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-5 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Immersive narratives
          </motion.span>
          <motion.h2
            className="font-serif text-4xl text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
          >
            Three stories where flowers became living theatre.
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            {badges.map((badge) => (
              <span key={badge.label} className="inline-flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2">
                <span className="text-accent">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="space-y-20">
          {STORIES.map((story, index) => (
            <motion.article
              key={story.title}
              className="relative overflow-hidden rounded-[2.75rem] border border-foreground/10 bg-background/70 shadow-xl shadow-magenta-500/10 backdrop-blur"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 * index, duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-white/0"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: [0.2, 0.35, 0.2] }
                }
                transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <div className="grid gap-8 p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:p-12">
                <div className="relative overflow-hidden rounded-[2rem] border border-foreground/15">
                  <motion.img
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full object-cover"
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { scale: [1, 1.04, 1] }
                    }
                    transition={{ duration: prefersReducedMotion ? 0 : 16, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{story.subtitle}</p>
                    <p className="mt-1 font-serif text-2xl">{story.title}</p>
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center gap-6">
                  <p className="text-base text-muted-foreground">{story.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {story.highlights.map((highlight) => (
                      <span key={highlight} className="rounded-full border border-foreground/15 px-4 py-2">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    whileHover={{ gap: prefersReducedMotion ? 8 : 12 }}
                  >
                    Request the full production dossier
                    <motion.span
                      className="inline-block h-px w-10 bg-foreground/40"
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { width: [40, 64, 40] }
                      }
                      transition={{ duration: 2.4, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
