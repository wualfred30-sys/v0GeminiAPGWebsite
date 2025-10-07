import { Award, Users, Plane, Trophy, TrendingUp, Calendar, Heart, Star, MapPin } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const alumniMilestones = [
  {
    year: "2000",
    title: "Our Foundation",
    description: "APG Aviation Academy opened its doors",
    image: "/placeholder-user.jpg",
    quote: "We started with a dream to create world-class pilots"
  },
  {
    year: "2005",
    title: "First 100 Graduates",
    description: "Milestone achievement in aviation education",
    image: "/placeholder-user.jpg",
    quote: "100 dreams took flight from our classrooms"
  },
  {
    year: "2010",
    title: "CAAP Recognition",
    description: "Official certification for excellence",
    image: "/placeholder-user.jpg", 
    quote: "Recognized for setting industry standards"
  },
  {
    year: "2015",
    title: "1000+ Alumni",
    description: "A decade of transforming lives",
    image: "/placeholder-user.jpg",
    quote: "Over 1000 pilots now flying globally"
  },
  {
    year: "2020",
    title: "Digital Innovation",
    description: "Advanced training technology integration",
    image: "/placeholder-user.jpg",
    quote: "Modernizing aviation education for the future"
  },
  {
    year: "2024",
    title: "3000 Graduates",
    description: "24 years of aviation excellence",
    image: "/placeholder-user.jpg",
    quote: "3000 success stories and counting"
  }
]

const featuredAlumni = [
  {
    name: "Captain Maria Santos",
    graduation: "2008",
    current: "Philippine Airlines A320 Captain",
    image: "/placeholder-user.jpg",
    story: "From student to airline captain in 10 years"
  },
  {
    name: "First Officer James Chen", 
    graduation: "2015",
    current: "Cebu Pacific First Officer",
    image: "/placeholder-user.jpg",
    story: "Living the dream of commercial aviation"
  },
  {
    name: "Captain Sarah Rodriguez",
    graduation: "2012", 
    current: "AirAsia Philippines Captain",
    image: "/placeholder-user.jpg",
    story: "Breaking barriers as a female pilot leader"
  },
  {
    name: "First Officer Miguel Tan",
    graduation: "2020",
    current: "Philippine Airlines First Officer", 
    image: "/placeholder-user.jpg",
    story: "Fast-tracked to airline success"
  }
]

export default function StatsSection() {
  return (
    <>
      {/* Main Milestones Section */}
      <section 
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#212A36" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(229, 57, 53, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 80%, rgba(217, 119, 6, 0.3) 0%, transparent 50%)`
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            {/* Heartfelt Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E53935]/10 border border-[#E53935]/20 px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#E53935]" />
              <span className="text-sm font-semibold text-[#E53935] uppercase tracking-wider">
                Our Legacy
              </span>
            </div>

            {/* Cinematic Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif italic" 
                style={{ 
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  lineHeight: "1.1"
                }}>
              Milestones
            </h2>

            {/* Personal Story Subheadline */}
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 font-medium"
               style={{ lineHeight: "1.6" }}>
              Since 2000, we've had the privilege of helping <span className="text-[#E53935] font-bold">3,000+ students</span> achieve their dreams of flight. 
              Each number represents a life transformed, a family proud, and a dream realized.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-4 h-4 text-[#d97706]" />
                <span className="text-sm font-medium">24 Years of Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-[#d97706]" />
                <span className="text-sm font-medium">3000+ Graduates</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Star className="w-4 h-4 text-[#d97706]" />
                <span className="text-sm font-medium">Countless Success Stories</span>
              </div>
            </div>
          </div>

          {/* Timeline Journey */}
          <div className="mb-20">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#E53935] via-[#d97706] to-[#E53935]" />
              
              {/* Timeline Events */}
              <div className="space-y-12">
                {alumniMilestones.map((milestone, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="group relative">
                        {/* Year Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#E53935]/10 border border-[#E53935]/20 px-3 py-1 rounded-full mb-2">
                          <span className="text-sm font-bold text-[#E53935]">{milestone.year}</span>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-lg font-semibold text-white mb-1">{milestone.title}</h3>
                        <p className="text-sm text-white/70 mb-2">{milestone.description}</p>
                        <p className="text-xs text-[#d97706] italic">"{milestone.quote}"</p>
                      </div>
                    </div>
                    
                    {/* Center Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#E53935] rounded-full border-4 border-[#212A36] z-10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Alumni Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8 font-serif">
              Success Stories in Focus
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAlumni.map((alumni, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Alumni Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-[#E53935]/20 to-[#d97706]/20 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white/50" />
                    </div>
                    
                    {/* Graduation Year Badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#212A36]/80 backdrop-blur-sm">
                      <span className="text-xs text-white font-semibold">Class of {alumni.graduation}</span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Alumni Info */}
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-1">{alumni.name}</h4>
                    <p className="text-[#d97706] text-xs font-medium mb-2">{alumni.current}</p>
                    <p className="text-white/60 text-xs italic">"{alumni.story}"</p>
                  </div>
                  
                  {/* Success Indicator */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-[#E53935] rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                 style={{
                   background: "rgba(229, 57, 53, 0.1)",
                   border: "1px solid rgba(229, 57, 53, 0.2)"
                 }}>
              <Heart className="w-5 h-5 text-[#E53935]" />
              <span className="text-white font-medium">
                Join our family of 3000+ aviation professionals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Visual Separator */}
      <div className="relative h-20 bg-gradient-to-b from-[#212A36] to-muted overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d97706] to-transparent opacity-50" />
      </div>

      {/* Community Photo Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#E53935] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d97706] rounded-full filter blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4 font-serif">
              Our Aviation Family
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A community built on shared dreams, mutual support, and the love of aviation
            </p>
          </div>

          {/* Photo Collage Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg aspect-square">
                <div className="w-full h-full bg-gradient-to-br from-[#E53935]/10 to-[#d97706]/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-white/30" />
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-[#E53935]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                
                {/* Year Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-[#212A36]/80 backdrop-blur-sm rounded">
                  <span className="text-xs text-white">
                    {2000 + Math.floor(Math.random() * 24)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Community Message */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Users className="w-5 h-5 text-[#E53935]" />
              <span className="text-foreground font-medium">
                Every face tells a story of determination, sacrifice, and ultimate success
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}