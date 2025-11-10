"use client"

import { motion } from "framer-motion"
import { PageTransition } from "@/components/page-transition"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <motion.h1
            className="text-4xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Shopping Cart
          </motion.h1>

          {items.length === 0 ? (
            <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 flex gap-6">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                        <p className="text-primary font-bold mb-4">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-4 py-2 hover:bg-secondary transition-colors"
                            >
                              −
                            </button>
                            <span className="px-6 py-2 border-l border-r border-border font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-4 py-2 hover:bg-secondary transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6 sticky top-6 space-y-4">
                  <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                  <div className="space-y-3 border-b border-border pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(total() * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${(total() * 1.1).toFixed(2)}</span>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}
