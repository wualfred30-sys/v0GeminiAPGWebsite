import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-sans",
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-serif",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "APG International Aviation Academy | CAAP Certified Pilot Training Philippines",
  description:
    "Premier CAAP-certified aviation academy in the Philippines. Professional pilot training programs with 95% job placement rate. Start your airline career today.",
  keywords:
    "aviation academy Philippines, pilot training, CAAP certified, commercial pilot license, private pilot license, airline career",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
