import {
  Award,
  Calendar,
  Check,
  Download,
  Plane,
  Clock,
  Users,
} from "lucide-react"

import { AngledHero } from "@/components/angled-hero"
import { CtaRibbon } from "@/components/cta-ribbon"
import { DiagonalCard } from "@/components/diagonal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const programs = [
  {
    id: "ppl",
    title: "Private Pilot License (PPL)",
    subtitle: "Foundation of Aviation Excellence",
    duration: "6-8 months",
    flightHours: "40 hours minimum",
    groundHours: "120 hours",
    classSize: "12 students maximum",
    tuition: "₱850,000",
    outcome:
      "Graduate ready for personal flying and foundation for commercial training",
    description:
      "Begin your aviation journey with comprehensive training that covers every phase of private flight. Build disciplined fundamentals, gain confidence in single-engine aircraft, and prepare for next stages of your professional career.",
    requirements: [
      "Minimum age: 17 years old",
      "High school diploma or equivalent",
      "Class 2 Medical Certificate",
      "English proficiency (ICAO Level 4)",
      "Clean criminal background check",
    ],
    curriculum: [
      "Principles of Flight & Aerodynamics",
      "Aircraft Systems & Performance",
      "Navigation & Radio Communications",
      "Meteorology & Weather Systems",
      "Aviation Regulations & Procedures",
      "Flight Planning & Weight Balance",
      "Emergency Procedures & Safety",
    ],
    outcomes: [
      "Private pilot privileges for personal flying",
      "Foundation for commercial pilot training",
      "Confidence in single-engine aircraft operations",
      "Understanding of aviation fundamentals",
    ],
    financing: "₱85,000/month for 10 months available",
  },
  {
    id: "cpl",
    title: "Commercial Pilot License (CPL)",
    subtitle: "Professional Aviation Career Track",
    duration: "12-18 months",
    flightHours: "250 hours minimum",
    groundHours: "200 hours",
    classSize: "8 students maximum",
    tuition: "₱2,200,000",
    outcome: "Graduate ready for airline cadetship and commercial aviation careers",
    description:
      "Advance to commercial readiness with rigorous flight operations, multi-engine training, and airline-focused academics. This program is designed to position graduates for cadetships and charter opportunities immediately upon completion.",
    requirements: [
      "Valid Private Pilot License",
      "Minimum age: 18 years old",
      "Class 1 Medical Certificate",
      "200+ hours total flight time",
      "Instrument Rating (can be obtained during program)",
    ],
    curriculum: [
      "Advanced Commercial Maneuvers",
      "Multi-Engine Aircraft Systems",
      "Instrument Flight Rules (IFR)",
      "Crew Resource Management (CRM)",
      "Aviation Law & Regulations",
      "Airline Transport Pilot Theory",
      "Career Readiness Workshops",
    ],
    outcomes: [
      "Commercial pilot privileges with multi-engine rating",
      "Instrument rating certification",
      "Airline cadet program eligibility",
      "Career placement assistance",
    ],
    financing: "₱183,000/month for 12 months available",
  },
  {
    id: "airline",
    title: "Airline Preparation Program",
    subtitle: "Direct Pathway to Major Airlines",
    duration: "18-24 months",
    flightHours: "300+ hours",
    groundHours: "300 hours",
    classSize: "6 students maximum",
    tuition: "₱3,500,000",
    outcome: "Direct pathway to major airline cadet programs with guaranteed interviews",
    description:
      "Our premium track prepares graduates for immediate airline cockpit entry. Train on airline procedures, simulator profiles, and interview standards alongside mentorship from active airline captains.",
    requirements: [
      "Valid Commercial Pilot License",
      "Minimum age: 21 years old",
      "Class 1 Medical Certificate",
      "500+ hours total flight time",
      "Clean flight and disciplinary record",
      "University degree preferred",
    ],
    curriculum: [
      "Airline Transport Pilot License (ATPL) Theory",
      "Jet Orientation & Systems",
      "Advanced Crew Resource Management",
      "Multi-Crew Cooperation (MCC)",
      "Type Rating Preparation",
      "Airline Interview & Assessment Coaching",
      "Leadership & Communication Labs",
    ],
    outcomes: [
      "ATPL theory completion",
      "Jet aircraft simulator experience",
      "Guaranteed airline interview pipeline",
      "Direct cadet program placement & mentorship",
    ],
    financing: "₱292,000/month for 12 months available",
  },
]

export default function ProgramsPage() {
  return (
    <div className="space-y-16 pb-24">
      <div className="h-24 md:h-32 lg:h-40 w-full bg-[#e4ceb6]" />
      <AngledHero
        eyebrow={{
          label: "CAAP CERTIFIED PROGRAMS",
          icon: <Award className="size-4" />,
        }}
        title="Professional Pilot Training Programs"
        description="Choose from three guided pathways designed to accelerate your aviation career—from first solo flight through airline cockpit readiness."
        primaryAction={{
          label: "Apply Now – Limited Slots",
          href: "/apply",
          icon: <Plane className="size-4" />,
        }}
        secondaryAction={{
          label: "Download Brochure",
          href: "#programs",
          variant: "outline",
          icon: <Download className="size-4" />,
        }}
        backgroundImage="/FINAL DESIGN FINAL COPY.png"
        backgroundStyle="fullWidth"
      >
        <ul className="grid gap-3 text-left text-sm text-sky-light/85 sm:grid-cols-2">
          {[
            "Internationally aligned curriculum with CAAP oversight.",
            "Dedicated dispatch, simulator, and maintenance support teams.",
            "Airline partnership network across Southeast Asia and beyond.",
            "Flexible financing assistance and scholarship opportunities.",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 text-accent-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AngledHero>

      <section id="programs" className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <Tabs defaultValue="ppl" className="w-full space-y-12">
          <TabsList className="w-full flex flex-col sm:flex-row gap-1 rounded-full bg-gradient-to-r from-orange-500/90 to-red-500/90 p-1.5 shadow-lg">
            {programs.map((program) => (
              <TabsTrigger
                key={program.id}
                value={program.id}
                className="w-full flex-1 rounded-2xl bg-transparent text-sm font-medium text-slate-navy uppercase tracking-wide transition-all duration-300 data-[state=active]:bg-white/20 data-[state=active]:text-slate-navy data-[state=active]:shadow-md"
              >
                {program.title.split("(")[0].trim()}
              </TabsTrigger>
            ))}
          </TabsList>

          {programs.map((program) => {
            const quickStats = [
              {
                label: "Duration",
                value: program.duration,
                icon: <Clock className="size-4 text-aviation-red" />,
              },
              {
                label: "Flight Hours",
                value: program.flightHours,
                icon: <Plane className="size-4 text-aviation-red" />,
              },
              {
                label: "Ground School",
                value: program.groundHours,
                icon: <Award className="size-4 text-aviation-red" />,
              },
              {
                label: "Class Size",
                value: program.classSize,
                icon: <Users className="size-4 text-aviation-red" />,
              },
            ]

            return (
              <TabsContent key={program.id} value={program.id} className="space-y-10">
                <DiagonalCard
                  title={program.title}
                  eyebrow={program.subtitle}
                  icon={<Plane className="size-5 text-orange-500 -rotate-[15deg]" />}
                  accent="primary"
                  className="relative"
                >
                  <svg 
                    className="absolute top-6 right-8 w-24 h-12 opacity-20" 
                    viewBox="0 0 96 48" 
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="0" y="8" width="3" height="32" fill="currentColor" className="text-black" />
                    <rect x="8" y="8" width="2" height="32" fill="currentColor" className="text-black" />
                    <rect x="14" y="8" width="4" height="32" fill="currentColor" className="text-black" />
                    <rect x="22" y="8" width="2" height="32" fill="currentColor" className="text-black" />
                    <rect x="28" y="8" width="5" height="32" fill="currentColor" className="text-black" />
                    <rect x="37" y="8" width="3" height="32" fill="currentColor" className="text-black" />
                    <rect x="44" y="8" width="2" height="32" fill="currentColor" className="text-black" />
                    <rect x="50" y="8" width="4" height="32" fill="currentColor" className="text-black" />
                    <rect x="58" y="8" width="3" height="32" fill="currentColor" className="text-black" />
                    <rect x="65" y="8" width="2" height="32" fill="currentColor" className="text-black" />
                    <rect x="71" y="8" width="5" height="32" fill="currentColor" className="text-black" />
                    <rect x="80" y="8" width="3" height="32" fill="currentColor" className="text-black" />
                  </svg>
                  <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed text-sky-light/90">{program.description}</p>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {quickStats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-card-soft"
                          >
                            {stat.icon}
                            <div>
                              <p className="text-xs uppercase tracking-[0.12em] text-white/60">{stat.label}</p>
                              <p className="font-semibold text-white">{stat.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/5 p-6 text-white shadow-card-soft">
                      <p className="text-sm uppercase tracking-[0.18em] text-white/60">Tuition & Financing</p>
                      <p className="text-3xl font-semibold">{program.tuition}</p>
                      <p className="text-sm text-white/75">{program.financing}</p>
                      <div className="mt-auto flex flex-col gap-2 text-sm text-white/80">
                        <span className="font-semibold text-white">Career Outcome</span>
                        <p>{program.outcome}</p>
                      </div>
                    </div>
                  </div>
                </DiagonalCard>

                <div className="grid gap-6 lg:grid-cols-3">
                  <DiagonalCard title="Entry Requirements" accent="secondary">
                    <ul className="space-y-2 text-sm text-sky-light/90">
                      {program.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2">
                          <Check className="mt-1 size-4 text-accent-gold" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </DiagonalCard>

                  <DiagonalCard title="Curriculum Highlights" accent="accent">
                    <ul className="space-y-2 text-sm text-sky-light/90">
                      {program.curriculum.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aviation-red" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </DiagonalCard>

                  <DiagonalCard title="What You'll Achieve" accent="primary">
                    <ul className="space-y-2 text-sm text-sky-light/90">
                      {program.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2">
                          <Award className="mt-0.5 size-4 text-accent-gold" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </DiagonalCard>
                </div>

                <CtaRibbon
                  eyebrow="Ready for takeoff?"
                  title="Secure your seat in our next intake."
                  description="Demand is high and cohorts are intentionally small. Submit your application or schedule a campus visit to experience our fleet firsthand."
                  primaryAction={{
                    label: "Apply for this program",
                    href: "/apply",
                    icon: <Plane className="size-4" />,
                  }}
                  secondaryAction={{
                    label: "Schedule campus visit",
                    href: "/contact",
                    variant: "outline",
                    icon: <Calendar className="size-4" />,
                  }}
                />
              </TabsContent>
            )
          })}
        </Tabs>
      </section>
    </div>
  )
}
