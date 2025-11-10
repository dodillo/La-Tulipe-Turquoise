"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { ProductsGrid } from "@/components/products-grid"

export default function ShopPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        {/* Hero section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Our Collections</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore our carefully curated selection of premium floral arrangements, each crafted with passion and
                delivered with care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <ProductsGrid />
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
