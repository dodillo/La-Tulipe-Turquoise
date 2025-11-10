"use client"

import { HeroSection } from "@/components/hero-section"
import { FeaturedCollections } from "@/components/featured-collections"
import { SignatureExperiences } from "@/components/signature-experiences"
import { Craftsmanship } from "@/components/craftsmanship"
import { ImmersiveStories } from "@/components/immersive-stories"
import { EasterEgg } from "@/components/easter-egg"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <EasterEgg />
      <HeroSection />
      <SignatureExperiences />
      <ImmersiveStories />
      <FeaturedCollections />
      <Craftsmanship />
    </main>
  )
}
