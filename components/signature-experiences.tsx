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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d1fbf6_0%,#f4fffe_48%,#effcff_100%)]" />
      <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#8cf6ff] opacity-50 blur-[140px]" />
      <div className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-[#21cfd3] opacity-30 blur-[170px]" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-[0_10px_40px_rgba(13,179,187,0.2)] backdrop-blur"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Crafted Moments
          </motion.span>
          <motion.h2
            className="mt-6 bg-gradient-to-r from-[#0f9bb4] via-[#16c6c7] to-[#48f0d9] bg-clip-text font-serif text-4xl text-transparent md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Signature experiences that feel like a dream sequence.
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-slate-600"
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
          className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-10"
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
              className="group relative overflow-hidden rounded-[2.75rem] border border-white/60 bg-white/90 shadow-[0_35px_80px_rgba(11,169,184,0.18)] backdrop-blur-xl transition duration-500"
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
                  className="absolute inset-0 bg-gradient-to-t from-[rgba(4,42,44,0.92)] via-transparent to-transparent"
                  animate={{ opacity: prefersReducedMotion ? 0.75 : [0.7, 0.5, 0.7] }}
                  transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-gradient-to-r from-[#0cb0c0] to-[#4ee4da] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-[0_10px_30px_rgba(13,179,187,0.45)] backdrop-blur"
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
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-gradient-to-br from-[#0cb0c0] to-[#58e0d9] text-white shadow-[0_10px_25px_rgba(12,176,192,0.35)]">
                    {experience.icon}
                  </span>
                  <h3 className="font-serif text-2xl text-slate-900">{experience.title}</h3>
                </div>
                <p className="text-base text-slate-600">{experience.description}</p>
                <motion.div
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  whileHover={{ gap: prefersReducedMotion ? 8 : 12 }}
                >
                  Explore experience
                  <motion.span
                    className="inline-block h-px w-8 bg-gradient-to-r from-[#0cb0c0] to-[#72f1ff] opacity-80"
                    animate={{ width: prefersReducedMotion ? 32 : [32, 48, 32] }}
                    transition={{ duration: 2.2, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 overflow-hidden rounded-full border border-white/50 bg-white/80 py-4 shadow-[0_20px_50px_rgba(13,179,187,0.18)] backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden">
            <div
              role="presentation"
              className="flex gap-12 whitespace-nowrap text-sm uppercase tracking-[0.4em] text-primary/70 will-change-transform animate-marquee-ltr"
              style={marqueeStyle}
            >
              {EXPERIENCE_MARQUEE_ITEMS.map((label, index) => (
                <span key={`${label}-${index}`} className="py-1">
                  {label}
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/70 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
