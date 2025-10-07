import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import { ProgramsPreview } from "@/components/programs-preview"
import { TrustSignals } from "@/components/trust-signals"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection variant={0} />
      <StatsSection />
      <TrustSignals />
      <ProgramsPreview />
    </div>
  )
}
