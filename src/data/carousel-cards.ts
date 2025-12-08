export type CardType = 'graduate' | 'aircraft' | 'testimonial' | 'program' | 'location' | 'achievement'

export interface CarouselCard {
  id: string
  type: CardType
  title: string
  description: string
  badge: string
  image?: string
  stats?: { label: string; value: string }
}

export const carouselCards: CarouselCard[] = [
  {
    id: '1',
    type: 'graduate',
    title: 'Captain Sarah Jenkins',
    description: 'From zero hours to airline captain in record time. Now flying for a major carrier.',
    badge: 'Class of 2019',
    image: '/success-track-record.avif',
    stats: { label: 'Career Path', value: 'First Officer' }
  },
  {
    id: '2',
    type: 'aircraft',
    title: 'Boeing 737 NG Simulator',
    description: 'State-of-the-art flight training device for advanced jet orientation.',
    badge: 'Advanced Training',
    image: '/apg-aircraft-fleet.avif',
    stats: { label: 'Fidelity', value: 'Level D' }
  },
  {
    id: '3',
    type: 'testimonial',
    title: 'Michael Chen',
    description: '"The instructors at APG pushed me to be my best. I felt ready for my checkride."',
    badge: 'Student Pilot',
    stats: { label: 'Rating', value: '5/5 Stars' }
  },
  {
    id: '4',
    type: 'program',
    title: 'Professional Pilot Program',
    description: 'Comprehensive curriculum designed to take you from student to professional.',
    badge: 'Most Popular',
    stats: { label: 'Duration', value: '12 Months' }
  },
  {
    id: '5',
    type: 'location',
    title: 'Subic Bay International',
    description: 'Train in complex airspace with diverse weather conditions and runway options.',
    badge: 'Primary Base',
    stats: { label: 'Runway', value: '9,000ft' }
  },
  {
    id: '6',
    type: 'achievement',
    title: 'Excellence in Training',
    description: 'Recognized for maintaining highest safety standards in flight operations.',
    badge: 'Award 2024',
    stats: { label: 'Safety', value: '100%' }
  },
  {
    id: '7',
    type: 'graduate',
    title: 'David Wilson',
    description: 'Transitioned from military to commercial aviation seamlessly with APG.',
    badge: 'Class of 2021',
    image: '/success-track-record.avif',
    stats: { label: 'Current', value: 'Captain' }
  },
  {
    id: '8',
    type: 'aircraft',
    title: 'Cessna 172S Skyhawk',
    description: 'The world\'s most popular trainer, equipped with Garmin G1000 avionics.',
    badge: 'Primary Trainer',
    image: '/apg-aircraft-fleet.avif',
    stats: { label: 'Fleet', value: 'Standard' }
  },
  {
    id: '9',
    type: 'testimonial',
    title: 'Elena Rodriguez',
    description: '"Training here gave me the confidence to handle any situation in the cockpit."',
    badge: 'Private Pilot',
    stats: { label: 'Rating', value: '5/5 Stars' }
  },
  {
    id: '10',
    type: 'program',
    title: 'Instrument Rating',
    description: 'Master flight by reference to instruments alone. Essential for career pilots.',
    badge: 'Advanced',
    stats: { label: 'Module', value: 'IFR' }
  },
  {
    id: '11',
    type: 'location',
    title: 'Modern Facilities',
    description: 'Briefing rooms, flight planning stations, and student lounge for optimal learning.',
    badge: 'Campus',
    stats: { label: 'Capacity', value: '200+' }
  },
  {
    id: '12',
    type: 'achievement',
    title: 'Fleet Modernization',
    description: 'Continuous investment in new aircraft and avionics technology.',
    badge: 'Milestone',
    stats: { label: 'Year', value: '2025' }
  }
]
