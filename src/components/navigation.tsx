"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/admissions", label: "Admissions" },
    { href: "/fleet", label: "Fleet" },
    { href: "/careers", label: "Careers" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className="fixed top-10 left-0 right-0 z-50 mx-auto max-w-7xl bg-[rgba(33,42,54,0.85)] backdrop-blur-sm"
    >
      {/* Main navigation */}
      <div className="px-4 sm:px-6 lg:px-8 py-0">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/apg-logo.png"
                alt="APG International Aviation Academy"
                fill
                className="object-contain font-medium"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-white font-sans text-center text-sm">{"INTERNATIONAL"}</div>
              <div className="uppercase tracking-wide font-mono text-xs text-white">Aviation Academy</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-white/80 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Button className="bg-[#E53935] hover:bg-[#C62828] text-white" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/20 bg-[#212A36]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-white/80 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Button className="w-full bg-[#E53935] hover:bg-[#C62828] text-white" asChild>
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
