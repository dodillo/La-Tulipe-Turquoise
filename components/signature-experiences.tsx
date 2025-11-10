import { useEffect, useState, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { Camera, Gift, Wand2 } from "lucide-react"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

const EXPERIENCES = [
  {
    title: "The Bespoke Salon",
    description:
      "Design an arrangement in real time with our florists via live video, complete with curated music and a virtual scent pairing.",
    image: "/pink-white-cherry-blossoms.jpg",
    icon: <Wand2 className="h-5 w-5" />,
    badge: "Interactive design ritual",
  },
  {
    title: "Gifting Couture",
    description:
      "Hand-delivered presentations with etched crystal vessels, perfumed silk ribbons, and handwritten letters sealed in wax.",
    image: "/luxury-flower-bouquet-arrangement.jpg",
    icon: <Gift className="h-5 w-5" />,
    badge: "Concierge delivery",
  },
  {
    title: "Immersive Installations",
    description:
      "Transform venues with architectural blooms, kinetic petals, diffused lighting, and cinematic documentation of the reveal.",
    image: "/colorful-mixed-flowers-celebration.jpg",
    icon: <Camera className="h-5 w-5" />,
    badge: "For grand celebrations",
  },
]

const EXPERIENCE_TICKER_ITEMS = ["Floral scenography", "Scented rituals", "Live art direction", "Keepsake photography"]
const EXPERIENCE_MARQUEE_ITEMS = Array.from({ length: 4 }, () => EXPERIENCE_TICKER_ITEMS).flat()

export function SignatureExperiences() {
  const { prefersReducedMotion } = useMotionPreferences()
  const [marqueeDuration, setMarqueeDuration] = useState(26)

  useEffect(() => {
    const updateDuration = () => {
      const width = window.innerWidth
      if (width < 480) {
        setMarqueeDuration(8) // Fastest on very small screens like phones in portrait
      } else if (width < 640) {
        setMarqueeDuration(12) // Faster for small screens like phones in landscape
      } else if (width < 1024) {
        setMarqueeDuration(18) // Moderate speed for tablets
      } else {
        setMarqueeDuration(26) // Default for larger screens like desktops
      }
    }

    updateDuration()
    window.addEventListener("resize", updateDuration)
    return () => window.removeEventListener("resize", updateDuration)
  }, [])

  const marqueeStyle: CSSProperties = { ["--marquee-duration" as const]: `${marqueeDuration}s` }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground backdrop-blur"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Crafted Moments
          </motion.span>
          <motion.h2
            className="mt-6 font-serif text-4xl text-foreground md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Signature experiences that feel like a dream sequence.
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Choose an experience or combine them to choreograph an unforgettable reveal. Each tier can be tailored to
            your story, palette, and desired atmosphere.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.12, duration: 0.6, ease: "easeOut" },
            },
          }}
        >
          {EXPERIENCES.map((experience) => (
            <motion.article
              key={experience.title}
              className="group relative overflow-hidden rounded-[2.5rem] border border-foreground/10 bg-background/60 shadow-xl shadow-magenta-500/10 backdrop-blur"
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: prefersReducedMotion ? 0 : -12 }}
            >
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={experience.image}
                  alt={experience.title}
                  className="h-full w-full object-cover transition-transform duration-700"
                  animate={{ scale: prefersReducedMotion ? 1 : [1, 1.06, 1] }}
                  transition={{ duration: prefersReducedMotion ? 0 : 18, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"
                  animate={{ opacity: prefersReducedMotion ? 0.75 : [0.7, 0.5, 0.7] }}
                  transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur"
                  initial={{ opacity: 0, y: -12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                >
                  {experience.badge}
                </motion.span>
              </div>

              <div className="flex h-full flex-col gap-6 px-8 py-10">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-background/80 text-foreground">
                    {experience.icon}
                  </span>
                  <h3 className="font-serif text-2xl text-foreground">{experience.title}</h3>
                </div>
                <p className="text-base text-muted-foreground">{experience.description}</p>
                <motion.div
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  whileHover={{ gap: prefersReducedMotion ? 8 : 12 }}
                >
                  Explore experience
                  <motion.span
                    className="inline-block h-px w-8 bg-foreground/40"
                    animate={{ width: prefersReducedMotion ? 32 : [32, 48, 32] }}
                    transition={{ duration: 2.2, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 overflow-hidden rounded-full border border-foreground/10 bg-background/70 py-4 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden">
            <div
              role="presentation"
              className="flex gap-12 whitespace-nowrap text-sm uppercase tracking-[0.4em] text-muted-foreground will-change-transform animate-marquee-ltr"
              style={marqueeStyle}
            >
              {EXPERIENCE_MARQUEE_ITEMS.map((label, index) => (
                <span key={`${label}-${index}`} className="py-1">
                  {label}
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background via-background/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background via-background/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
