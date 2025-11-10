"use client"

import { useCallback, useMemo, useRef, type PointerEvent as ReactPointerEvent } from "react"
import Link from "next/link"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

type Collection = {
  id: number
  name: string
  description: string
  image: string
  price: string
  palette: string[]
}

const COLLECTIONS: Collection[] = [
  {
    id: 1,
    name: "Romantic Roses",
    description: "Crimson Ecuadorian roses cascading with vanilla orchids and hand-dyed silk ribbon.",
    image: "/romantic-red-roses-bouquet-arrangement-elegant-pro.jpg",
    price: "From $95",
    palette: ["#f97316", "#d946ef", "#9333ea"],
  },
  {
    id: 2,
    name: "Seasonal Blooms",
    description: "A rotating curation of rare seasonal stems, wild grasses, and aromatic herbs.",
    image: "/seasonal-mixed-flowers-bouquet-arrangement-profess.jpg",
    price: "From $75",
    palette: ["#0ea5e9", "#14b8a6", "#facc15"],
  },
  {
    id: 3,
    name: "Luxury Premium",
    description: "Statement arrangements with preserved elements, architectural branches, and custom vessels.",
    image: "/luxury-premium-exotic-flowers-arrangement-professi.jpg",
    price: "From $150",
    palette: ["#f43f5e", "#f97316", "#38bdf8"],
  },
]

function CollectionCard({ collection }: { collection: Collection }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const { prefersReducedMotion } = useMotionPreferences()

  const gradient: MotionValue<string> = useMotionTemplate`radial-gradient(420px circle at ${glowX}px ${glowY}px, rgba(217,70,239,0.18), rgba(59,130,246,0.1) 45%, transparent 70%)`

  const setGlowPosition = useCallback(
    (x: number, y: number) => {
      glowX.set(x)
      glowY.set(y)
    },
    [glowX, glowY]
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return
      const bounds = ref.current.getBoundingClientRect()
      setGlowPosition(event.clientX - bounds.left, event.clientY - bounds.top)
    },
    [prefersReducedMotion, setGlowPosition]
  )

  const handlePointerLeave = useCallback(() => {
    if (!ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    setGlowPosition(bounds.width / 2, bounds.height / 2)
  }, [setGlowPosition])

  return (
    <motion.article
      ref={ref}
      className="group relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-background/70 p-6 shadow-lg shadow-magenta-500/10 backdrop-blur transition-all duration-500 hover:border-foreground/20"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: prefersReducedMotion ? undefined : gradient }}
      />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-foreground/10">
        <motion.img
          src={collection.image}
          alt={collection.name}
          className="h-72 w-full object-cover"
          whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
          animate={{ opacity: prefersReducedMotion ? 0.6 : [0.55, 0.45, 0.55] }}
          transition={{ duration: 7, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white backdrop-blur"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Signature curation
        </motion.div>
      </div>

      <div className="relative mt-6 space-y-4">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span>Collection</span>
          <span className="h-px flex-1 bg-foreground/10" />
          <span className="text-accent">{collection.price}</span>
        </div>

        <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors duration-300">
          {collection.name}
        </h3>

        <p className="text-sm text-muted-foreground md:text-base">{collection.description}</p>

        <div className="flex items-center gap-2">
          {collection.palette.map((color, index) => (
            <span key={index} className="h-2 w-8 rounded-full" style={{ background: color }} />
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-foreground/10 pt-5">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">View collection</span>
          <Link href={`/collection/${collection.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            <motion.span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 transition-colors"
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.08 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.96 }}
            >
              &gt;
            </motion.span>
            <motion.span
              whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
              className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground sm:inline-flex"
            >
              View details
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export function FeaturedCollections() {
  const { prefersReducedMotion } = useMotionPreferences()

  const headerHighlights = useMemo(
    () => ["Art-direction ready palettes", "72-hour hydration guarantee", "Ethically sourced botanicals"],
    []
  )

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our Collections</p>
          <h2 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">
            Curated series designed to set the tone of your celebration.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Select a signature collection or begin a bespoke journey. Each concept is continually refined by our atelier
            based on seasonality, texture, and fragrance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {headerHighlights.map((highlight) => (
              <span key={highlight} className="rounded-full border border-foreground/10 px-4 py-1">
                {highlight}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        animate={{ opacity: prefersReducedMotion ? 0.8 : [0.8, 0.6, 0.8] }}
        transition={{ duration: 10, repeat: prefersReducedMotion ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </section>
  )
}
