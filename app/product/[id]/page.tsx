"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { ProductGallery } from "@/components/product-gallery"
import { ProductDetails } from "@/components/product-details"

// Sample product data
const product = {
  id: "1",
  name: "Romantic Rose Garden",
  price: 89.99,
  rating: 4.8,
  reviews: 128,
  images: ["/placeholder.svg?key=4u6bd", "/placeholder.svg?key=e2xgc", "/placeholder.svg?key=gfav0"],
  description:
    "A stunning arrangement of premium red roses hand-selected for their beauty and longevity. Each stem is carefully arranged with eucalyptus and greenery to create a timeless expression of love and appreciation. Perfect for anniversaries, proposals, or any occasion that calls for elegance.",
  inStock: true,
  deliveryDate: "Tomorrow or Today",
}

export default function ProductPage() {
  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ProductGallery images={product.images} />
              </motion.div>

              {/* Product Details */}
              <ProductDetails
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={product.reviews}
                description={product.description}
                inStock={product.inStock}
                deliveryDate={product.deliveryDate}
              />
            </motion.div>
          </div>
        </section>

        {/* Related Products Section */}
        <section className="py-16 md:py-24 bg-secondary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="aspect-square bg-card rounded-lg border border-border/50"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Placeholder for related product */}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
