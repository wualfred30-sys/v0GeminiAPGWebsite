# AI Guidelines & Context for APG International Aviation Academy Website
> **Last Updated**: December 8, 2025
> **Version**: 1.0.0
> **Purpose**: Single source of truth for all AI interactions with this project
---
## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [User Profile & Communication Style](#user-profile--communication-style)
3. [AI Character & Role](#ai-character--role)
4. [Design System & Brand Identity](#design-system--brand-identity)
5. [Technical Architecture](#technical-architecture)
6. [Code Standards & Security](#code-standards--security)
7. [Deployment Information](#deployment-information)
8. [Design Inspiration: Chronicle HQ](#design-inspiration-chronicle-hq)
9. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
10. [Implementation Patterns](#implementation-patterns)
11. [Changelog](#changelog)
---
## 🎯 Project Overview
### Mission
Building a modern, aesthetically pleasing, and intuitive website for **APG International Aviation Academy** - a professional flight training institution.
### Target Audience
- Prospective aviation students
- Career changers interested in pilot training
- International students seeking FAA certification
- Aviation enthusiasts exploring career paths
### Current Status
- ✅ Homepage hero section (fully functional)
- ✅ Navigation and footer
- 🚧 Carousel section (Chronicle HQ-style, in progress)
- 📋 Additional pages (programs, admissions, contact) - planned
### Project Goals
1. **Fast & Efficient**: Lean, secure code with optimal performance
2. **Responsive**: Seamless experience on desktop and mobile
3. **Modern Design**: Inspired by Chronicle HQ's aesthetic
4. **Accessible**: WCAG compliant, keyboard navigation, screen reader support
5. **Secure**: Protection against common web vulnerabilities
---
## 👤 User Profile & Communication Style
### User's Programming Experience
**Level**: Non-programmer (no coding background)
**What This Means**:
- User understands concepts but not technical jargon
- Needs explanations in plain, everyday language
- Benefits from analogies and real-world comparisons
- Requires step-by-step guidance with clear reasoning
### How to Communicate
#### ✅ DO:
- **Use analogies**: "Think of the carousel like a film strip..."
- **Explain WHY**: Don't just say what to do, explain the reasoning
- **Break down concepts**: Complex ideas → simple building blocks
- **Use visual metaphors**: Aviation-related examples work great
- **Be patient**: Repeat explanations in different ways if needed
- **Provide context**: "This is important because..."
#### ❌ DON'T:
- Use technical jargon without explanation
- Assume prior knowledge of programming concepts
- Skip steps in explanations
- Use abbreviations without defining them first
- Rush through complex topics
#### Example: Good vs Bad Explanation
**❌ BAD**:
> "We need to refactor the component to use the useCallback hook for memoization to prevent unnecessary re-renders."
**✅ GOOD**:
> "We need to optimize this component (think of it like tuning an aircraft engine for better fuel efficiency). Right now, it's doing extra work every time the page updates. We'll use a React feature called `useCallback` - it's like putting frequently-used tools in an easy-to-reach toolbox instead of searching for them every time. This makes the website faster and smoother."
---
## 🤖 AI Character & Role
### Persona
**World-class fullstack enterprise software engineer** with expertise in:
- Modern web development (React, Next.js, TypeScript)
- Beautiful, responsive UI/UX design
- Performance optimization and security
- Accessibility standards
- Aviation industry website design
### Responsibilities
1. **Technical Consultant**: Guide design and implementation decisions
2. **Patient Teacher**: Explain concepts in educational, accessible language
3. **Quality Guardian**: Ensure code is secure, performant, and maintainable
4. **Design Expert**: Maintain consistency with Chronicle HQ inspiration
5. **Problem Solver**: Debug issues with thorough Context7 research
### Consultation Approach
- **Ask clarifying questions** before implementation
- **Provide options** with recommendations (A, B, C format)
- **Explain trade-offs** for each decision
- **Iterate collaboratively** - this is a conversation, not a one-way directive
- **Use Context7 research** for every scoped task to ensure 100% functional code
### Context7 Research Requirement
**MANDATORY**: For each implementation task, perform thorough research:
1. ✅ Read relevant source files
2. ✅ Check package versions and compatibility
3. ✅ Research best practices (web search if needed)
4. ✅ Verify integration points
5. ✅ Test for common pitfalls
**Goal**: Deliver fully functional code **100% of the time** on first output.
---
## 🎨 Design System & Brand Identity
### Color Palette (3 Main Colors)
#### Primary Colors
```css
--aviation-navy: #212a36    /* Dark navy blue - primary background */
--aviation-red: #e53935     /* Aviation red - accents, CTAs, highlights */
--white: #ffffff            /* White - text, cards, contrast */
```
Usage Guidelines
Navy (#212a36): Backgrounds, sections, professional foundation
Red (#e53935): Call-to-action buttons, hover effects, brand accents, glow effects
White: Primary text, card backgrounds, high contrast elements
Additional Shades (Chronicle HQ-inspired)
For subtle variations and depth:

```css
--solid-1: #050505   /* Darkest - deep backgrounds */
--solid-2: #151515
--solid-3: #212121   /* Card backgrounds */
--solid-4: #292929
--solid-5: #2f2f2f
--solid-6: #3a3a3a
--solid-7: #484848
--solid-8: #606060
--solid-9: #666666
--solid-10: #a3a3a3
--solid-11: #b3b3b3
--solid-12: #f3f3f3  /* Lightest - subtle text */
```
Typography
Font Family
Primary: Inter (Google Fonts)
Fallback: system-ui, -apple-system, sans-serif

Why Inter?
Chronicle HQ uses Roobert (premium font). Inter is the closest free alternative - clean, modern, professional.

Font Weights
400: Regular body text
500: Medium emphasis
600: Subheadings
700: Bold headings, CTAs
Typography Scale
```css
/* Responsive sizing using clamp() */
font-size: clamp(1.4rem, 0.18vw + 1.34rem, 1.6rem);
line-height: 1.4;
letter-spacing: -0.02em;  /* Tight, modern spacing */
```
Text Rendering
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```
Visual Style
Card Design
Rounded corners: border-radius: 12px
Subtle elevation: box-shadow: 0 4px 20px rgba(0,0,0,0.15)
Border: border: 1px solid rgba(255,255,255,0.1)
Background: Slightly lighter than page background
Hover effect: Scale (1.05) + red glow + pause animations
Spacing
Section padding: py-24 (96px vertical)
Container max-width: 1400px
Card gaps: gap-4 (16px) on mobile, gap-6 (24px) on desktop
Animations
Duration: 300ms (quick), 500ms (medium), 700ms (slow)
Easing: cubic-bezier(0.4, 0, 0.2, 1) (ease-out)
Fade effects: Opacity + blur transitions
Hover: Smooth scale and shadow transitions
## 🛠️ Technical Architecture
Tech Stack
Core Framework
Next.js 14: React framework with App Router
React 18: UI library
TypeScript: Type-safe JavaScript
Styling
Tailwind CSS 3.4: Utility-first CSS framework
shadcn/ui: Component library (Radix UI primitives)
CSS Variables: For theming and consistency
Carousel
Embla Carousel: Lightweight (3KB), smooth animations
embla-carousel-react: React integration
embla-carousel-auto-scroll: Continuous scroll (Chronicle HQ style)
Icons
Lucide React: Primary icon library
Phosphor Icons: Secondary (experimental)
**Backend Features**:
Currently: Frontend-only static site with no backend services
Future: May add API routes or database as needed
File Structure
/home/user/GeminiAPGWEBSITE1/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── [routes]/          # Additional pages
│   ├── components/            # React components
│   │   ├── carousel-section.tsx
│   │   ├── hero-section.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── data/                  # Static data files
│   │   └── carousel-cards.ts
│   ├── lib/                   # Utilities
│   │   └── utils.ts
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
│   ├── apg-aircraft-fleet.avif
│   └── success-track-record.avif
├── docs/                      # Documentation
├── tailwind.config.ts         # Tailwind configuration
└── AI-GUIDELINES.md          # This file
Key Dependencies
```json
{
  "next": "^15.1.4",
  "react": "^19.0.0",
  "tailwindcss": "^3.4.17",
  "embla-carousel-react": "^8.5.1",
  "embla-carousel-auto-scroll": "^8.6.0",
  "lucide-react": "^0.468.0"
}
```
## 🔒 Code Standards & Security
Security Requirements
Always Implement
Input Validation: Sanitize all user inputs
XSS Prevention: React's built-in protection + CSP headers
CSRF Protection: Token-based validation for forms
SQL Injection Prevention: Parameterized queries (when DB added)
Environment Variables: Never commit secrets (use .env.local)
HTTPS Only: Enforce secure connections in production
Rate Limiting: Prevent abuse of API endpoints
Security Checklist
 No hardcoded credentials
 Environment variables for sensitive data
 Input sanitization on all forms
 CORS properly configured
 Dependencies regularly updated
 No dangerouslySetInnerHTML without sanitization
Responsive Design Standards
Breakpoints (Tailwind)
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```
Mobile-First Approach
Default styles for mobile (320px+)
Use md: prefix for tablet adjustments
Use lg: prefix for desktop enhancements
Testing Requirements
Test on:

✅ Mobile (375px - iPhone SE)
✅ Tablet (768px - iPad)
✅ Desktop (1920px - Full HD)
✅ Touch devices (swipe gestures)
✅ Keyboard navigation
Code Quality Standards
TypeScript
Strict mode enabled: No any types without justification
Explicit return types: For functions and components
Interface over type: For object shapes
React Best Practices
Functional components: No class components
Hooks: Use built-in hooks properly (useEffect, useMemo, useCallback)
Component composition: Small, reusable components
Props validation: TypeScript interfaces for all props
Naming Conventions
Components: PascalCase (CarouselSection.tsx)
Files: kebab-case (carousel-section.tsx)
Variables: camelCase (carouselCards)
Constants: UPPER_SNAKE_CASE (API_BASE_URL)
CSS classes: Tailwind utilities (no custom classes unless necessary)
## 🚀 Deployment Information
Platform
Vercel - Official Next.js hosting platform

Deployment Process
Push to GitHub: Code changes trigger automatic deployment
Vercel builds: Runs npm run build
Preview deployments: Every PR gets a unique URL
Production: Merges to main branch deploy to production
### Environment Variables

**Current Status**: No environment variables required

The application runs as a static Next.js site with no backend dependencies. If future features require environment variables (API keys, database URLs), they will be documented here.
Build Configuration
File: next.config.mjs

```javascript
{
  images: {
    unoptimized: false,  // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  swcMinify: true,
}
```
Performance Targets
Lighthouse Score: 90+ (all categories)
First Contentful Paint: < 1.5s
Time to Interactive: < 3.5s
Cumulative Layout Shift: < 0.1
## 🎨 Design Inspiration: Chronicle HQ
What We're Borrowing
Chronicle HQ (chroniclehq.com) is a modern SaaS platform with exceptional design. We're adopting their:

1. Color System
12-shade grayscale for subtle depth and hierarchy:

Solid 1-3: Dark backgrounds
Solid 4-6: Card backgrounds, borders
Solid 7-9: Muted text, icons
Solid 10-12: Primary text, highlights
Plus alpha variants (0.04 to 0.88 opacity) for layering.

2. Typography
Font: Roobert (we use Inter as free alternative)
Letter spacing: -0.02em (tight, modern)
Responsive sizing: clamp() for fluid typography
Line height: 1.4 (comfortable reading)
3. Carousel Behavior
Continuous scroll: Smooth, seamless motion (not snap-based)
Direction: Horizontal scroll to the right
Speed: Slow (20-30 seconds for full loop)
Pause on hover: Stops auto-scroll when user hovers
No visible controls: Clean, minimal (no arrows/dots)
Drag support: Manual control via mouse/touch
4. Card Design
Horizontal layout: Image left (40%), content right (60%)
Rounded corners: 12px border radius
Subtle elevation: Soft shadows, not harsh
Hover effects: Slight lift (scale 1.05) + glow
Content structure: Badge → Title → Description → Stats
5. Animation Patterns
Fade + blur: Elements fade in with blur effect
Smooth transitions: 300-600ms cubic-bezier easing
Hardware acceleration: CSS transforms for performance
Reduced motion: Respects user preferences
Implementation Details
Carousel Plugin
Chronicle HQ uses: Swiper.js
We use: Embla Carousel with embla-carousel-auto-scroll

Why Embla?

Lighter (3KB vs 40KB)
Better React integration
Same visual result
Continuous Scroll Configuration
```javascript
AutoScroll({
  playOnInit: true,
  speed: 1,                    // Pixels per frame (slow)
  stopOnMouseEnter: true,      // Pause on hover
  stopOnInteraction: false,    // Resume after manual scroll
})
```
Card Styling Pattern
```tsx
<div className={cn(
  "rounded-xl overflow-hidden transition-all duration-300",
  "border border-white/10 bg-solid-3",
  "hover:scale-105 hover:shadow-[0_8px_30px_rgba(229,57,53,0.3)]"
)}>
```
## ⚠️ Common Pitfalls & Solutions
Problem: Port 3000 Already in Use
Symptoms:

Terminal asks to install fuser
Server won't start
"EADDRINUSE" error
Solution:

```bash
# Kill process using port 3000
kill -9 $(lsof -ti:3000)
# Then restart
npm run dev
```
Prevention: Add auto-kill to server.ts:

```typescript
async function killPortProcess(port: number) {
  try {
    const { stdout } = await execAsync(`lsof -ti:${port}`);
    if (stdout.trim()) {
      await execAsync(`kill -9 ${stdout.trim()}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    // Port is free
  }
}
```
Problem: Embla Carousel Plugin Not Working
Symptoms:

Internal server error
Carousel doesn't scroll
Plugin initialization fails
Root Cause: shadcn's Carousel wrapper doesn't support plugins properly.

Solution: Use raw Embla hook:

```tsx
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
const [emblaRef, emblaApi] = useEmblaCarousel(
  { loop: true, align: 'start', dragFree: true },
  [AutoScroll({ playOnInit: true, speed: 1 })]
)
```
Prevention: Always use raw Embla hook for advanced features.

Problem: Cards Displaying Vertically Instead of Horizontally
Symptoms:

Cards stack vertically
Carousel looks like a list
Root Cause: Missing display: flex or incorrect flex-basis.

Solution:

```tsx
// Container
<div className="flex -ml-4">
  
// Cards
<div className="pl-4 flex-[0_0_400px] min-w-0">
```
Prevention: Always verify flex container and item properties.

Problem: Infinite Loop in AI Execution
Symptoms:

AI keeps retrying same solution
No progress after multiple attempts
Same error repeats
Prevention Strategies:

Context7 Research First: Always research before implementing
Verify File Paths: Check files exist before modifying
Test Incrementally: Small changes, test, then proceed
Error Analysis: Read full error messages, don't guess
Fallback Plans: If solution A fails, try solution B (don't retry A)
When Stuck:

Stop and ask user for clarification
Provide diagnostic steps for user to run
Request error logs/screenshots
Suggest alternative approaches
Problem: Image Optimization Disabled
Symptoms:

Slow image loading
Large file sizes
Poor Lighthouse scores
Root Cause: next.config.mjs has unoptimized: true

Solution:

```javascript
// next.config.mjs
export default {
  images: {
    unoptimized: false,  // Enable optimization
    formats: ['image/avif', 'image/webp'],
  },
}
```
## 🔄 Implementation Patterns
Component Structure
```tsx
'use client'  // If using hooks or browser APIs
import * as React from 'react'
import { cn } from 'lib/utils'

interface ComponentProps {
  // Props with TypeScript
}
export default function Component({ prop }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = React.useState()
  
  // Event handlers
  const handleClick = () => {}
  
  // Effects
  React.useEffect(() => {}, [])
  
  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  )
}
```
Styling Pattern (Tailwind)
```tsx
// Use cn() for conditional classes
<div className={cn(
  "base classes always applied",
  condition && "conditional classes",
  "hover:state-classes focus:state-classes"
)}>
```
Data Structure Pattern
```typescript
// src/data/carousel-cards.ts
export type CardType = 'graduate' | 'aircraft' | 'testimonial' | 'program' | 'location' | 'achievement'
export interface CarouselCard {
  id: string
  type: CardType
  title: string
  description: string
  badge: string
  image?: string
  icon: LucideIcon
  stats?: {
    label: string
    value: string
  }
}
export const carouselCards: CarouselCard[] = [
  // Data
]
```
## 📝 Changelog
Version 1.0.0 - December 8, 2025
Initial Release

Added:

Complete AI guidelines and context documentation
Design system specification (3-color palette + Chronicle HQ inspiration)
Technical architecture overview
Code standards and security requirements
Deployment information (Vercel)
Common pitfalls and solutions
Implementation patterns
Design Decisions:

Adopted Chronicle HQ's design aesthetic (grayscale system, typography, animations)
Chose Inter font as free alternative to Roobert
Selected Embla Carousel over Swiper for lighter bundle size
Implemented continuous scroll carousel (Chronicle HQ style)
Established 3-color brand palette: Navy (#212a36), Red (#e53935), White
Technical Decisions:

Next.js 14 with App Router
Tailwind CSS for styling
TypeScript for type safety
Embla Carousel with auto-scroll plugin
Custom Next.js server with Socket.io (for future features)
Vercel for deployment
## 🎯 Quick Reference
Colors
Navy: #212a36 (backgrounds)
Red: #e53935 (accents)
White: #ffffff (text)
Fonts
Primary: Inter (Google Fonts)
Weights: 400, 500, 600, 700
Breakpoints
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Carousel
Plugin: embla-carousel-auto-scroll
Speed: 1 pixel/frame
Cards: 400px × 280px (horizontal)
Visible: 4-5 desktop, 1 mobile
Deployment
Platform: Vercel
Build: npm run build
Dev: npm run dev
## 📞 Support & Resources
Documentation
Next.js: https://nextjs.org/docs
Tailwind CSS: https://tailwindcss.com/docs
Embla Carousel: https://www.embla-carousel.com/
shadcn/ui: https://ui.shadcn.com/
Design Inspiration
Chronicle HQ: https://chroniclehq.com/
Upstash: https://upstash.com/ (color scheme reference)
Tools
Vercel Dashboard: https://vercel.com/dashboard
Google Fonts: https://fonts.google.com/

End of AI Guidelines
