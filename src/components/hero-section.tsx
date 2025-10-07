"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Check } from "lucide-react"
import Link from "next/link"

interface HeroVariant {
  headline: string
  subheadline: string
  bullets: string[]
  ctaPrimary: string
  ctaSecondary: string
}

const heroVariants: HeroVariant[] = [
  {
    headline: "Launch Your Airline Career",
    subheadline: "CAAP-certified training with 95% job placement rate. Graduate ready for airline cadetship.",
    bullets: ["CAAP Certified", "95% Placement", "Modern Fleet", "Flexible Financing"],
    ctaPrimary: "Apply Now",
    ctaSecondary: "Book Campus Tour",
  },
  {
    headline: "Become a Professional Pilot",
    subheadline: "Transform your aviation dreams into reality with the Philippines' premier flight training academy.",
    bullets: ["Private to Commercial", "Industry-Leading Safety", "Career Placement", "Scholarship Programs"],
    ctaPrimary: "Start Your Journey",
    ctaSecondary: "Download Brochure",
  },
  {
    headline: "Fly with the Best",
    subheadline: "Join hundreds of successful pilots who started their careers at APG International Aviation Academy.",
    bullets: [
      "20+ Years Excellence",
      "State-of-the-Art Facilities",
      "Airline Partnerships",
      "International Recognition",
    ],
    ctaPrimary: "Apply Today",
    ctaSecondary: "Schedule a Call",
  },
]

export default function HeroSection({ variant = 0 }: { variant?: number }) {
  const [currentVariant, setCurrentVariant] = useState(variant)
  const hero = heroVariants[currentVariant]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-10 pt-10">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 -top-10 bottom-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Recording%202025-09-29%20011903-HkbUNUXhcXVXk9C1PPXqdBbDRhjCui.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay on left half for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(33, 42, 54, 0.95) 0%, rgba(33, 42, 54, 0.85) 40%, rgba(10, 26, 47, 0.40) 60%, rgba(10, 26, 47, 0.20) 100%)",
          }}
        />
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{ paddingLeft: "5vw", paddingRight: "2vw", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="max-w-[560px] py-5">
          <h1 className="text-white mb-4 font-sans italic mt-0 font-extrabold py-2.5" style={{ fontSize: "48px", lineHeight: "1.1", fontWeight: 800 }}>
            {hero.headline}
          </h1>

          <p
            className="mb-4 py-px"
            style={{ fontSize: "18px", lineHeight: "1.5", fontWeight: 500, color: "rgba(255,255,255,0.90)" }}
          >
            {hero.subheadline}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {hero.bullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-center text-sm uppercase"
                style={{ letterSpacing: "0.5px", color: "rgba(255,255,255,0.85)" }}
              >
                <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mb-4 tracking-widest">
            <Button
              size="lg"
              className="text-white border-none hover:bg-[#C62828]"
              style={{ backgroundColor: "#E53935", borderRadius: "8px", padding: "14px 20px" }}
              asChild
            >
              <Link href="/apply">{hero.ctaPrimary}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white hover:border-white bg-transparent"
              style={{
                backgroundColor: "transparent",
                border: "2px solid rgba(255,255,255,0.85)",
                borderRadius: "8px",
                padding: "14px 20px",
              }}
              asChild
            >
              <Link href="/contact">{hero.ctaSecondary}</Link>
            </Button>
          </div>

          <div className="flex">
            <Button variant="ghost" className="text-white hover:text-white/80 transition-colors group p-0" asChild>
              <a href="https://www.youtube.com/watch?v=j1DnPrMbC2E" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
