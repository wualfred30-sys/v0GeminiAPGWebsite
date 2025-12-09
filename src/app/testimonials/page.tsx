import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Plane, Award, Users } from "lucide-react"
import Link from "next/link"

const testimonials = [
  {
    id: 1,
    name: "Captain Maria Santos",
    position: "First Officer, Philippine Airlines",
    program: "Commercial Pilot License",
    graduationYear: "2019",
    currentRole: "Flying A320 aircraft on domestic and international routes",
    testimonial:
      "APG International gave me the foundation I needed to succeed in my airline career. The instructors were experienced airline pilots who shared real-world knowledge that I use every day. The training was thorough, and the job placement assistance helped me land my dream job with Philippine Airlines.",
    image: "/placeholder.svg?height=80&width=80&text=MS",
    rating: 5,
    highlights: ["Excellent instructors", "Real-world training", "Job placement support"],
  },
  {
    id: 2,
    name: "Captain Juan Dela Cruz",
    position: "Captain, Cebu Pacific",
    program: "Airline Preparation Program",
    graduationYear: "2018",
    currentRole: "A330 Captain with over 8,000 flight hours",
    testimonial:
      "The Airline Preparation Program at APG was exactly what I needed to transition from general aviation to airline operations. The CRM training, jet orientation, and interview preparation were invaluable. I was hired by Cebu Pacific within 3 months of graduation.",
    image: "/placeholder.svg?height=80&width=80&text=JD",
    rating: 5,
    highlights: ["Airline-focused training", "Quick job placement", "Professional development"],
  },
  {
    id: 3,
    name: "Sarah Chen",
    position: "Commercial Pilot, Helicopter Tours",
    program: "Private Pilot License",
    graduationYear: "2020",
    currentRole: "Building hours for airline applications",
    testimonial:
      "Starting with my PPL at APG was the best decision I made. The safety culture and attention to detail gave me confidence as a new pilot. I'm now working as a commercial pilot and planning to return for my ATPL. The family atmosphere at APG made learning enjoyable.",
    image: "/placeholder.svg?height=80&width=80&text=SC",
    rating: 5,
    highlights: ["Safety-focused", "Supportive environment", "Great foundation"],
  },
  {
    id: 4,
    name: "Lieutenant Miguel Rodriguez",
    position: "Philippine Air Force Pilot",
    program: "Commercial Pilot License",
    graduationYear: "2017",
    currentRole: "Military transport pilot, C-130 aircraft",
    testimonial:
      "The discipline and professionalism at APG prepared me well for military aviation. The multi-engine training on the Baron was excellent preparation for flying larger aircraft. The instructors' military backgrounds helped bridge civilian and military aviation concepts.",
    image: "/placeholder.svg?height=80&width=80&text=MR",
    rating: 5,
    highlights: ["Military preparation", "Multi-engine expertise", "Professional standards"],
  },
  {
    id: 5,
    name: "Anna Reyes",
    position: "Flight Instructor, APG International",
    program: "Commercial Pilot License + CFI",
    graduationYear: "2021",
    currentRole: "Building experience as certified flight instructor",
    testimonial:
      "APG not only trained me to be a pilot but also gave me the opportunity to grow as an instructor. The mentorship program and ongoing support have been incredible. I'm building my hours here while helping the next generation of pilots achieve their dreams.",
    image: "/placeholder.svg?height=80&width=80&text=AR",
    rating: 5,
    highlights: ["Career growth", "Mentorship program", "Teaching opportunities"],
  },
  {
    id: 6,
    name: "Captain Robert Kim",
    position: "International Cargo Pilot",
    program: "Airline Preparation Program",
    graduationYear: "2016",
    currentRole: "Flying B747 freighters across Asia-Pacific",
    testimonial:
      "The international perspective at APG was crucial for my career in cargo aviation. The English proficiency training and international procedures prepared me for flying worldwide routes. Eight years later, I still recommend APG to aspiring pilots.",
    image: "/placeholder.svg?height=80&width=80&text=RK",
    rating: 5,
    highlights: ["International focus", "Language training", "Long-term success"],
  },
]

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

const successStats = [
  {
    icon: Users,
    value: "500+",
    label: "Graduates Flying",
    description: "Professional pilots worldwide",
  },
  {
    icon: Plane,
    value: "95%",
    label: "Job Placement Rate",
    description: "Within 6 months",
  },
  {
    icon: Award,
    value: "4.9/5",
    label: "Student Rating",
    description: "Average satisfaction score",
  },
  {
    icon: Star,
    value: "98%",
    label: "Would Recommend",
    description: "To friends and family",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              STUDENT SUCCESS STORIES
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Our Graduates Are Flying High
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Hear from our successful graduates who are now flying with major airlines, military forces, and aviation
              companies around the world. Their success is our pride.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-aviation-primary" asChild>
                <Link href="/apply">Join Our Success Stories</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>
          </div>

          {/* Success Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {successStats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">What Our Graduates Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from real pilots who started their careers at APG International Aviation Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full border border-border bg-primary/5 flex items-center justify-center text-lg font-semibold text-primary shadow-sm">
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-foreground">{testimonial.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">{testimonial.position}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {testimonial.program}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Class of {testimonial.graduationYear}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground italic pl-6">{testimonial.testimonial}</p>
                  </div>

                  {/* Current Role */}
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-sm font-medium text-foreground mb-1">Current Role:</div>
                    <div className="text-sm text-muted-foreground">{testimonial.currentRole}</div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Key Highlights:</div>
                    <div className="flex flex-wrap gap-2">
                      {testimonial.highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join hundreds of successful pilots who started their aviation careers at APG International. Your journey
                to the cockpit begins with a single application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-aviation-primary" asChild>
                  <Link href="/apply">Start Your Application</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Speak with a Graduate</Link>
                </Button>
              </div>
              <div className="mt-8 text-sm text-muted-foreground">
                <p>Limited slots available for next intake • Apply now to secure your spot</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
