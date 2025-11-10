"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useMotion as useMotionPreferences } from "@/components/motion-provider"

const navLinks = [
  { name: "Collections", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { prefersReducedMotion } = useMotionPreferences()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/60 shadow-[0_10px_30px_rgba(15,15,35,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="hidden border-b border-border/50 bg-background/80 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
        <div className="container mx-auto flex items-center justify-between px-4">
          <span className="hidden sm:inline">Haute floral artistry - Hand delivery in 3 cities</span>
          <span>Concierge: +44 20 1234 5678</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 md:py-5">
          <Link href="/" className="flex flex-col leading-tight">
            <motion.span
              className="font-serif text-2xl font-semibold text-foreground"
              whileHover={prefersReducedMotion ? undefined : { letterSpacing: "0.12em" }}
              transition={{ duration: 0.3 }}
            >
              Bloom
            </motion.span>
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
              Signature floristry
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="group relative overflow-hidden py-1">
                <span className="text-sm font-medium tracking-wide text-foreground transition-colors duration-200 group-hover:text-accent">
                  {link.name}
                </span>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/60 hover:text-foreground md:inline-flex"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              Reserve consultation
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            <motion.button
              className="hidden p-2 text-foreground transition-colors hover:text-accent md:inline-flex"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.button>

            <motion.button
              className="relative p-2 text-foreground transition-colors hover:text-accent"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
              aria-label="Cart"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <motion.span
                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[0.6rem] font-semibold text-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                0
              </motion.span>
            </motion.button>

            <motion.button
              className="md:hidden rounded-full border border-border p-2 text-foreground"
              onClick={() => setMobileMenuOpen((open) => !open)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </motion.button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <motion.div
            className="space-y-2 border-t border-border py-4 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.div
                  className="rounded-lg px-2 py-2 text-foreground transition-colors hover:bg-muted/20"
                  whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
            <motion.button
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/60"
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.97 }}
            >
              Reserve consultation
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </header>
  )
}
