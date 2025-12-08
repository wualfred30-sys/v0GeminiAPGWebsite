"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Briefcase,
  Calendar,
  Download,
  Check,
  FileText,
  GraduationCap,
  Headphones,
  Plane,
  Upload,
} from "lucide-react"

import { AngledHero } from "@/components/angled-hero"
import { CtaRibbon } from "@/components/cta-ribbon"
import { DiagonalCard } from "@/components/diagonal-card"
import { ProgressStepper } from "@/components/progress-stepper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Step = 0 | 1 | 2 | 3 | 4

const applicationSteps = [
  {
    title: "Personal Profile",
    description: "Demographics & contact information",
    icon: <FileText className="size-4" />,
  },
  {
    title: "Education History",
    description: "High school, collegiate, certifications",
    icon: <GraduationCap className="size-4" />,
  },
  {
    title: "Program Selection",
    description: "Choose desired pathway and intake",
    icon: <Plane className="size-4" />,
  },
  {
    title: "Documents",
    description: "Upload identification and credentials",
    icon: <Upload className="size-4" />,
  },
  {
    title: "Review & Submit",
    description: "Confirm details and accept policies",
    icon: <Check className="size-4" />,
  },
]

export default function AdmissionsPage() {
  const [currentStep, setCurrentStep] = useState<Step>(0)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    highSchool: "",
    highSchoolYear: "",
    college: "",
    degree: "",
    graduationYear: "",
    program: "",
    startDate: "",
    financing: "",
    validID: null as File | null,
    diploma: null as File | null,
    medical: null as File | null,
    termsAccepted: false,
    privacyAccepted: false,
  })

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <DiagonalCard title="Personal Information" accent="primary">
            <p className="text-sm text-sky-light/85">
              Provide your legal name and contact details as they appear on government-issued identification.
            </p>
            <div className="grid gap-4 mt-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, firstName: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, lastName: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(event) => setFormData((prev) => ({ ...prev, dateOfBirth: event.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  placeholder="e.g., Filipino"
                  value={formData.nationality}
                  onChange={(event) => setFormData((prev) => ({ ...prev, nationality: event.target.value }))}
                  required
                />
              </div>
            </div>
          </DiagonalCard>
        )
      case 1:
        return (
          <DiagonalCard title="Educational Background" accent="secondary">
            <p className="text-sm text-sky-light/85">
              Admissions requires proof of secondary education. If you have collegiate experience, enter it for scholarship
              consideration.
            </p>
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="highSchool">High School *</Label>
                  <Input
                    id="highSchool"
                    value={formData.highSchool}
                    onChange={(event) => setFormData((prev) => ({ ...prev, highSchool: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highSchoolYear">Graduation Year *</Label>
                  <Input
                    id="highSchoolYear"
                    type="number"
                    placeholder="2020"
                    value={formData.highSchoolYear}
                    onChange={(event) => setFormData((prev) => ({ ...prev, highSchoolYear: event.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="college">College / University (optional)</Label>
                  <Input
                    id="college"
                    value={formData.college}
                    onChange={(event) => setFormData((prev) => ({ ...prev, college: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree / Course</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(event) => setFormData((prev) => ({ ...prev, degree: event.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2 md:max-w-sm">
                  <Label htmlFor="graduationYear">Graduation Year (or Expected)</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    placeholder="2024"
                    value={formData.graduationYear}
                    onChange={(event) => setFormData((prev) => ({ ...prev, graduationYear: event.target.value }))}
                  />
                </div>
              </div>
            </div>
          </DiagonalCard>
        )
      case 2:
        return (
          <DiagonalCard title="Program Selection" accent="accent">
            <p className="text-sm text-sky-light/85">
              Select the pathway that matches your current credentials and long-term aviation goals.
            </p>
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="program">Training Program *</Label>
                <Select
                  value={formData.program}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, program: value }))}
                  required
                >
                  <SelectTrigger id="program">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ppl">Private Pilot License (PPL)</SelectItem>
                    <SelectItem value="cpl">Commercial Pilot License (CPL)</SelectItem>
                    <SelectItem value="airline">Airline Preparation Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Preferred Start Date *</Label>
                  <Select
                    value={formData.startDate}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, startDate: value }))}
                  >
                    <SelectTrigger id="startDate">
                      <SelectValue placeholder="Select intake" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="march-2025">March 2025 Intake</SelectItem>
                      <SelectItem value="june-2025">June 2025 Intake</SelectItem>
                      <SelectItem value="september-2025">September 2025 Intake</SelectItem>
                      <SelectItem value="december-2025">December 2025 Intake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="financing">Financing Preference *</Label>
                  <Select
                    value={formData.financing}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, financing: value }))}
                  >
                    <SelectTrigger id="financing">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Payment (5% discount)</SelectItem>
                      <SelectItem value="installment">Monthly Installment Plan</SelectItem>
                      <SelectItem value="scholarship">Scholarship Application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </DiagonalCard>
        )
      case 3:
        return (
          <DiagonalCard title="Upload Documents" accent="neutral">
            <p className="text-sm text-sky-light/85">
              Upload crisp scans or photos (PDF/JPG, max 5&nbsp;MB each). You can return later to update optional files.
            </p>
            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="validID">Valid Government ID *</Label>
                <Input
                  id="validID"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      validID: event.target.files?.[0] ?? null,
                    }))
                  }
                  required
                />
                <p className="text-xs text-sky-light/65">
                  Accepted: Passport, Driver's License, or National ID.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diploma">High School Diploma / Transcript *</Label>
                <Input
                  id="diploma"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      diploma: event.target.files?.[0] ?? null,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medical">Medical Certificate (optional)</Label>
                <Input
                  id="medical"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      medical: event.target.files?.[0] ?? null,
                    }))
                  }
                />
                <p className="text-xs text-sky-light/65">
                  Submit a CAAP-accredited Class&nbsp;1 or Class&nbsp;2 medical assessment. If pending, you may upload later.
                </p>
              </div>
            </div>
          </DiagonalCard>
        )
      case 4:
        return (
          <DiagonalCard title="Review & Submit" accent="primary">
            <p className="text-sm text-sky-light/85">
              Confirm your entries and acknowledge the enrollment policies before submitting. You will receive a confirmation
              email within minutes.
            </p>
            <div className="mt-6 grid gap-4 text-sm text-sky-light/90 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-white/60">Applicant</p>
                <p className="font-semibold text-white">
                  {formData.firstName || "—"} {formData.lastName || ""}
                </p>
                <p>{formData.email || "—"}</p>
                <p>{formData.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-white/60">Selected Path</p>
                <p className="font-semibold text-white">{programLabel(formData.program)}</p>
                <p>{startDateLabel(formData.startDate)}</p>
                <p>{financingLabel(formData.financing)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, termsAccepted: Boolean(checked) }))
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed text-sky-light/85">
                  I agree to the Terms & Conditions and understand the program requirements, tuition, and refund policies.
                </Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, privacyAccepted: Boolean(checked) }))
                  }
                  required
                />
                <Label htmlFor="privacy" className="text-sm leading-relaxed text-sky-light/85">
                  I consent to the collection and processing of my personal data as outlined in the Privacy Policy.
                </Label>
              </div>
            </div>
          </DiagonalCard>
        )
      default:
        return null
    }
  }, [currentStep, formData])

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4) as Step)
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0) as Step)

  return (
    <div className="space-y-16 pb-24">
      <AngledHero
        eyebrow={{
          label: "Admissions",
          icon: <GraduationCap className="size-4" />,
        }}
        title="Apply to APG International"
        description="Chart your aviation career with a guided five-step admissions experience. Our team is ready to help you at every checkpoint."
        primaryAction={{
          label: "Talk to Admissions",
          href: "/contact",
          icon: <Headphones className="size-4" />,
        }}
        secondaryAction={{
          label: "Download Requirements",
          href: "/docs/APG-Admissions-Checklist.pdf",
          variant: "outline",
          icon: <Download className="size-4" />,
        }}
        media={
          <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
            <div className="absolute inset-0 bg-gradient-to-tr from-aviation-red/60 to-transparent" />
            <Image
              src="/aviation-training-aircraft-on-runway.jpg"
              alt="Students preparing for flight training"
              width={520}
              height={380}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        }
      >
        <div className="text-sm text-sky-light/80">
          <p>
            Admissions decisions are typically released within five business days. Successful applicants receive onboarding
            materials, simulator orientation schedules, and visa assistance (for international students) immediately after
            confirmation.
          </p>
        </div>
      </AngledHero>

      <section className="mx-auto w-full max-w-5xl space-y-10 px-6 sm:px-8">
        <ProgressStepper steps={applicationSteps} currentIndex={currentStep} />

        <Card className="border-white/10 bg-slate-navy/75 text-white shadow-card-lift">
          <CardHeader className="space-y-2">
            <CardTitle className="font-serif text-2xl">
              {applicationSteps[currentStep]?.title ?? "Application Step"}
            </CardTitle>
            <CardDescription className="text-sky-light/80">
              {applicationSteps[currentStep]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">{stepContent}</CardContent>
          <CardFooter className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="sm:w-auto">
              Back
            </Button>
            {currentStep < applicationSteps.length - 1 ? (
              <Button onClick={nextStep} className="sm:w-auto">
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                className="sm:w-auto"
                disabled={!formData.termsAccepted || !formData.privacyAccepted}
              >
                Submit Application
              </Button>
            )}
          </CardFooter>
        </Card>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 sm:px-8 lg:grid-cols-2">
        <DiagonalCard
          title="Admissions Requirements Checklist"
          accent="secondary"
          footer={
            <div className="flex flex-col gap-2 text-sm text-sky-light/80">
              <p>Submit digital copies or bring originals during campus visit.</p>
              <Link href="/docs/APG-Admissions-Checklist.pdf" className="inline-flex items-center gap-2 text-white underline">
                <Download className="size-4" />
                Download checklist PDF
              </Link>
            </div>
          }
        >
          <ul className="space-y-2 text-sm text-sky-light/90">
            {[
              "Valid government-issued identification",
              "High school diploma / transcript (certified copy)",
              "Birth certificate and proof of address",
              "Medical certificate (Class 1 or Class 2 — can follow-up)",
              "2x2 ID photos (3 pieces)",
              "NBI or police clearance (within last 6 months)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-1 size-4 text-accent-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </DiagonalCard>

        <DiagonalCard title="Key Dates & Support" accent="accent">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm shadow-card-soft">
              <Calendar className="size-5 text-aviation-red" />
              <div>
                <p className="font-semibold text-white">Rolling Intakes</p>
                <p className="text-sky-light/80">
                  March, June, September, and December cohorts. Submit early to secure preferred aircraft schedule.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm shadow-card-soft">
              <Headphones className="size-5 text-aviation-red" />
              <div>
                <p className="font-semibold text-white">Admissions Hotline</p>
                <p className="text-sky-light/80">
                  +63&nbsp;(02)&nbsp;1234&nbsp;5678 • admissions@atpflightacademy.ph
                </p>
                <p className="text-sky-light/80">Weekdays 08:00–18:00 PHT</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm shadow-card-soft">
              <Briefcase className="size-5 text-aviation-red" />
              <div>
                <p className="font-semibold text-white">Financing & Scholarships</p>
                <p className="text-sky-light/80">
                  Flexible monthly plans, industry scholarships, and sponsor support available upon request.
                </p>
              </div>
            </div>
          </div>
        </DiagonalCard>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-8 px-6 sm:px-8">
        <Card className="border-white/10 bg-white/5 text-white shadow-card-soft">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription className="text-sky-light/80">
              Top inquiries from future pilots. Reach out for anything more.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-sky-light/90">
            {[
              {
                question: "How long does the review take?",
                answer:
                  "Complete applications are typically reviewed within 3–5 business days. You will receive a decision along with next-step instructions via email.",
              },
              {
                question: "Do you accept international applicants?",
                answer:
                  "Yes. Our international desk supports visa processing, accommodation options, and medical scheduling. Submit your passport copy during the document stage.",
              },
              {
                question: "Are scholarships available?",
                answer:
                  "Merit- and need-based scholarships are offered for PPL and CPL pathways, covering up to 50% of tuition. Indicate your interest in the financing step and upload academic records.",
              },
              {
                question: "Can I schedule a campus tour?",
                answer:
                  "Absolutely. After submitting your application—or anytime beforehand—contact admissions to arrange a hangar and simulator tour.",
              },
            ].map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-card-soft">
                <p className="font-semibold text-white">{item.question}</p>
                <p className="mt-2 text-sm">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <CtaRibbon
        eyebrow="Need Guidance?"
        title="Connect with an admissions advisor today."
        description="We’ll help you map prerequisites, choose the ideal intake, and guide you through financing, visa support, and housing."
        primaryAction={{
          label: "Schedule a call",
          href: "/contact",
          icon: <Headphones className="size-4" />,
        }}
        secondaryAction={{
          label: "Email admissions@atpflightacademy.ph",
          href: "mailto:admissions@atpflightacademy.ph",
          variant: "outline",
        }}
        className="mx-auto max-w-5xl px-6 sm:px-8"
      />
    </div>
  )
}

function programLabel(value: string) {
  switch (value) {
    case "ppl":
      return "Private Pilot License (PPL)"
    case "cpl":
      return "Commercial Pilot License (CPL)"
    case "airline":
      return "Airline Preparation Program"
    default:
      return "Program not selected"
  }
}

function startDateLabel(value: string) {
  switch (value) {
    case "march-2025":
      return "March 2025 Intake"
    case "june-2025":
      return "June 2025 Intake"
    case "september-2025":
      return "September 2025 Intake"
    case "december-2025":
      return "December 2025 Intake"
    default:
      return "Start date not selected"
  }
}

function financingLabel(value: string) {
  switch (value) {
    case "full":
      return "Full Payment (5% discount)"
    case "installment":
      return "Monthly installment plan"
    case "scholarship":
      return "Applying for scholarship"
    default:
      return "Financing not selected"
  }
}
