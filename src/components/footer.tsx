import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Award } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">APG</span>
              </div>
              <div>
                <div className="font-bold text-foreground text-base italic">{"INTERNATIONAL"}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Aviation Academy</div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              CAAP-certified aviation academy preparing the next generation of Filipino pilots for successful airline
              careers.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-secondary" />
              <span className="font-semibold text-foreground">CAAP Certified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-muted-foreground hover:text-primary transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Services
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Student Success
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+63 2 8123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@apgaviation.ph</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Aviation Drive
                  <br />
                  Pasay City, Metro Manila
                  <br />
                  Philippines 1300
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest news about programs, admissions, and aviation industry updates.
            </p>
            <div className="space-y-2">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full bg-[#E53935] hover:bg-[#C62828] text-white font-semibold">Subscribe</Button>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground text-sm">
              © 2025 APG International Aviation Academy. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
