'use client'
import * as React from 'react'
import Image from 'next/image'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { 
  Plane, 
  GraduationCap, 
  MessageSquare, 
  BookOpen, 
  MapPin, 
  Trophy,
  type LucideIcon 
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { carouselCards, type CardType } from '@/data/carousel-cards'

const getCardIcon = (type: CardType): LucideIcon => {
  switch(type) {
    case 'graduate': return GraduationCap
    case 'aircraft': return Plane
    case 'testimonial': return MessageSquare
    case 'program': return BookOpen
    case 'location': return MapPin
    case 'achievement': return Trophy
    default: return Trophy
  }
}

export default function CarouselSection() {
  // ✅ Embla with AutoScroll - LEFT TO RIGHT direction
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      containScroll: false,
    },
    [
      AutoScroll({ 
        playOnInit: true,
        speed: 1,
        direction: 'backward',  // ← LEFT TO RIGHT scroll
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      })
    ]
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const autoScrollPlugin = emblaApi.plugins()?.autoScroll
      if (autoScrollPlugin) autoScrollPlugin.stop()
    }

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="w-full py-24 bg-solid-1 overflow-hidden relative" aria-label="Your Future in Aviation">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E53935]/5 via-solid-1 to-solid-1 pointer-events-none" />
      
      {/* Header - Full width container */}
      <div className="container relative z-10 mx-auto px-4 mb-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white max-w-4xl leading-tight tracking-tight">
            Your Future in <span className="text-[#E53935]">Aviation</span> Starts Here.
          </h2>
          
          <p className="text-xl text-solid-11 max-w-3xl leading-relaxed tracking-tight">
            Our programs are engineered for success, providing you with the skills, experience, 
            and connections to launch a rewarding career in the skies.
          </p>
        </div>
      </div>

      {/* Carousel - FULL WIDTH, NO CONTAINER */}
      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {carouselCards.map((card) => {
              const Icon = getCardIcon(card.type)
              
              return (
                <div 
                  key={card.id} 
                  className="flex-[0_0_500px] min-w-0 px-3"
                >
                  <div 
                    className={cn(
                      "group relative rounded-xl overflow-hidden transition-all duration-300",
                      "border border-white/10 bg-solid-3 backdrop-blur-sm",
                      "hover:scale-105 hover:shadow-[0_8px_30px_rgba(229,57,53,0.3)] hover:border-[#E53935]/40",
                      "h-[320px] w-full"
                    )}
                  >
                    {/* HORIZONTAL LAYOUT: Image LEFT (40%), Content RIGHT (60%) */}
                    <div className="flex h-full">
                      {/* Left: Image/Icon Section (40% width) */}
                      <div className="relative w-[40%] overflow-hidden">
                        {card.image ? (
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#E53935]/20 to-solid-2/40 flex items-center justify-center">
                            <Icon className="w-16 h-16 text-white/30 group-hover:text-[#E53935]/50 transition-colors duration-500" />
                          </div>
                        )}
                        
                        {/* Badge Overlay */}
                        <div className="absolute top-4 left-4 bg-[#E53935] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          {card.badge}
                        </div>
                      </div>

                      {/* Right: Content Section (60% width) - MORE WHITESPACE */}
                      <div className="w-[60%] p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3 text-[#E53935] text-xs font-bold uppercase tracking-wider">
                          <Icon className="w-4 h-4" />
                          <span>{card.type}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 leading-tight tracking-tight">
                          {card.title}
                        </h3>
                        
                        <p className="text-sm text-solid-11 line-clamp-3 mb-4 leading-relaxed">
                          {card.description}
                        </p>
                        
                        {card.stats && (
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                            <span className="text-xs text-solid-10 font-medium tracking-tight">
                              {card.stats.label}
                            </span>
                            <span className="text-sm text-[#E53935] font-bold">
                              {card.stats.value}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ARIA Live Region */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {carouselCards[selectedIndex]?.title || `Slide ${selectedIndex + 1}`}
        </div>
      </div>
    </section>
  )
}
