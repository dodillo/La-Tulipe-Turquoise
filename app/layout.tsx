import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MotionProvider } from "@/components/motion-provider"
import { AmbientBackground } from "@/components/ambient-background"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { CustomCursor } from "@/components/custom-cursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bloom Flowers - Premium Floral Delivery",
  description: "Discover beautiful, handcrafted flower arrangements delivered with care",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <MotionProvider>
          <div className="relative min-h-screen overflow-hidden bg-background">
            <AmbientBackground />
            <ScrollIndicator />
            <CustomCursor />
            <Header />
            {children}
            <Footer />
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
