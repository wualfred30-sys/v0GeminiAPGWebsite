import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight, Calendar, Sparkle } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  variant: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ variant }) => {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-black to-[#1a1a1a] text-white -mt-[80px] pt-[80px]">
      {/* Background elements */}
      <div className="absolute inset-y-0 inset-x-0 w-full">
        <Image
          src="/aviation-training-aircraft-on-runway.jpg"
          alt="APG Aircraft Fleet"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto w-full"
        style={{ paddingLeft: "5vw", paddingRight: "2vw", paddingTop: "80px" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20 md:py-32">
          {/* Left Column - Text Content */}
          <div className="lg:w-3/5 text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-500/20 mb-6">
              <Sparkle className="h-4 w-4 mr-2" />
              Your Future, Takes Flight.
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Pioneering Aviation Training in Southeast Asia
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Join APG International and embark on a world-class journey to
              become a certified pilot. With cutting-edge facilities,
              experienced instructors, and a proven track record, your dreams
              of the sky start here.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                asChild
              >
                <Link href="/programs">
                  Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white border-2 text-white bg-transparent hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                asChild
              >
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" /> Book a Visit
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Image/Graphic */}
          <div className="lg:w-2/5 flex justify-center lg:justify-end">
            {/* Placeholder for a graphic or another image if needed */}
            {/* <Image src="/placeholder.jpg" alt="Pilot" width={500} height={300} className="rounded-lg shadow-xl" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
