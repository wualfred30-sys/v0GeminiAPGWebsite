import HeroSection from "@/components/hero-section"
import CarouselSection from "@/components/carousel-section"
import { ProgramsPreview } from "@/components/programs-preview"
import { TrustSignals } from "@/components/trust-signals"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection variant={0} />
      <CarouselSection />
      <TrustSignals />
      <ProgramsPreview />
    </div>
  )
}
