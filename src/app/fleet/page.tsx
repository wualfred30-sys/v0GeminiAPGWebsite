import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Shield, Wrench, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const aircraft = [
  {
    id: "cessna-172",
    name: "Cessna 172 Skyhawk",
    type: "Single Engine Trainer",
    quantity: 8,
    year: "2018-2022",
    usage: "Primary Training",
    features: ["Glass Cockpit (G1000)", "Dual Controls", "IFR Equipped", "GPS Navigation"],
    specifications: {
      engine: "Lycoming IO-360-L2A",
      horsepower: "180 HP",
      maxSpeed: "140 knots",
      range: "640 nautical miles",
      ceiling: "14,200 feet",
    },
    description:
      "Our primary training aircraft, perfect for students beginning their aviation journey. Modern avionics and excellent safety record.",
    image: "/placeholder.svg?height=300&width=400&text=Cessna+172",
  },
  {
    id: "piper-warrior",
    name: "Piper PA-28 Warrior",
    type: "Single Engine Trainer",
    quantity: 4,
    year: "2019-2021",
    usage: "Advanced Training",
    features: ["Traditional Instruments", "Dual Controls", "VFR/IFR Capable", "Low Wing Design"],
    specifications: {
      engine: "Lycoming O-320-D3G",
      horsepower: "160 HP",
      maxSpeed: "127 knots",
      range: "596 nautical miles",
      ceiling: "12,650 feet",
    },
    description:
      "Excellent for building advanced flying skills with different flight characteristics from high-wing aircraft.",
    image: "/placeholder.svg?height=300&width=400&text=Piper+Warrior",
  },
  {
    id: "beechcraft-baron",
    name: "Beechcraft Baron 58",
    type: "Multi-Engine Trainer",
    quantity: 2,
    year: "2020-2021",
    usage: "Multi-Engine Training",
    features: ["Twin Engine", "Retractable Gear", "Advanced Avionics", "Pressurized Cabin"],
    specifications: {
      engines: "2x Continental IO-550-C",
      horsepower: "300 HP each",
      maxSpeed: "200 knots",
      range: "1,480 nautical miles",
      ceiling: "20,688 feet",
    },
    description:
      "Professional multi-engine training aircraft for commercial pilot license and instrument rating training.",
    image: "/placeholder.svg?height=300&width=400&text=Beechcraft+Baron",
  },
  {
    id: "diamond-da40",
    name: "Diamond DA40 Star",
    type: "Advanced Single Engine",
    quantity: 1,
    year: "2022",
    usage: "Advanced & Instrument Training",
    features: ["Diesel Engine", "Glass Cockpit", "Composite Construction", "Excellent Fuel Economy"],
    specifications: {
      engine: "Austro Engine AE 300",
      horsepower: "168 HP",
      maxSpeed: "147 knots",
      range: "750 nautical miles",
      ceiling: "16,400 feet",
    },
    description: "State-of-the-art training aircraft with modern diesel technology and advanced avionics systems.",
    image: "/placeholder.svg?height=300&width=400&text=Diamond+DA40",
  },
]

const maintenanceStats = [
  {
    icon: Shield,
    title: "100% Safety Record",
    description: "Zero accidents in 20+ years of operation",
  },
  {
    icon: Wrench,
    title: "Certified Maintenance",
    description: "CAAP-approved maintenance facility on-site",
  },
  {
    icon: Clock,
    title: "Regular Inspections",
    description: "100-hour and annual inspections completed on schedule",
  },
  {
    icon: Award,
    title: "Modern Avionics",
    description: "Latest GPS and glass cockpit technology",
  },
]

export default function FleetPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent/10 via-background to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-semibold mb-4">
              <Plane className="w-4 h-4 mr-2" />
              MODERN TRAINING FLEET
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Train on Modern, Well-Maintained Aircraft
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our diverse fleet of 15 aircraft provides students with comprehensive training experience across different
              aircraft types and advanced avionics systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-aviation-primary" asChild>
                <Link href="/contact">Schedule Fleet Tour</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/apply">Start Training</Link>
              </Button>
            </div>
          </div>

          {/* Fleet Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm font-semibold text-foreground">Total Aircraft</div>
              <div className="text-xs text-muted-foreground">Modern fleet</div>
            </div>
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm font-semibold text-foreground">Aircraft Types</div>
              <div className="text-xs text-muted-foreground">Diverse training</div>
            </div>
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2022</div>
              <div className="text-sm font-semibold text-foreground">Average Year</div>
              <div className="text-xs text-muted-foreground">Latest models</div>
            </div>
            <div className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm font-semibold text-foreground">Availability</div>
              <div className="text-xs text-muted-foreground">Ready to fly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Aircraft Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {aircraft.map((plane) => (
              <Card key={plane.id} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Aircraft Image */}
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={plane.image || "/placeholder.svg"}
                      alt={plane.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">{plane.quantity} Aircraft Available</Badge>
                    </div>
                  </div>

                  {/* Aircraft Details */}
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-foreground font-serif">{plane.name}</h3>
                        <Badge variant="outline">{plane.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{plane.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Year: {plane.year}</span>
                        <span>•</span>
                        <span>Usage: {plane.usage}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {plane.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Specifications</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(plane.specifications).map(([key, value]) => (
                          <div key={key}>
                            <div className="font-medium text-foreground capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </div>
                            <div className="text-muted-foreground">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance & Safety */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              Safety & Maintenance Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to safety is unwavering. Every aircraft in our fleet undergoes rigorous maintenance and
              inspection procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {maintenanceStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4 font-serif">Experience Our Fleet</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Schedule a campus tour to see our aircraft up close and meet our certified maintenance team. Discover
                why our modern fleet gives students the best training experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-aviation-primary" asChild>
                  <Link href="/contact">Book Fleet Tour</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/programs">View Training Programs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
