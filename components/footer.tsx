"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const footerSections = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ],
  Service: [
    { name: "Contact", href: "/contact" },
    { name: "Delivery Info", href: "/delivery" },
    { name: "FAQ", href: "/faq" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Returns", href: "/returns" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Bloom</h3>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              Handcrafted floral arrangements for life's most important moments.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: "f", label: "Facebook" },
                { icon: "I", label: "Instagram" },
                { icon: "X", label: "Twitter" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center text-foreground hover:text-accent transition-colors text-xs font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerSections).map(([section, links], idx) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors text-sm font-light"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-border my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "left" }}
        />

        {/* Bottom */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-xs font-light">
            Copyright 2025 Bloom. All rights reserved. Premium floral delivery.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-accent transition-colors text-xs font-light"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-accent transition-colors text-xs font-light"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
