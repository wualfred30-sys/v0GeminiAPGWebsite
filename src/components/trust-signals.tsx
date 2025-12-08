"use client"

import { useState } from "react"
import { Check, ShieldCheck, Award, Users } from "lucide-react"

export function TrustSignals() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const signals = [
    {
      icon: ShieldCheck,
      text: "Safety First Culture",
      subtext: "100% Safety Record"
    },
    {
      icon: Award,
      text: "CAAP Certified",
      subtext: "Approved Training Org"
    },
    {
      icon: Users,
      text: "Airline Partners",
      subtext: "Direct Career Pathways"
    }
  ]

  return (
    <section className="py-8 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {signals.map((signal, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`p-2 rounded-full ${hoveredFeature === index ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                <signal.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{signal.text}</p>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{signal.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
