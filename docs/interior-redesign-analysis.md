# ATP Interior Redesign Analysis – 2025-10-09

## Shared System Objectives
- Fortify the design token layer in [tailwind.config.ts](tailwind.config.ts) to expose glassmorphic surfaces (`bg-glass-night`), glow shadows (`shadow-glow-primary`), tight tracking utilities, and Inter font weights tuned for light typography.
- Extend atmospheric layering helpers in [src/app/globals.css](src/app/globals.css) with gradient overlays and diagonal clip-path utilities to support the hero and subhero treatments.
- Replace Lucide imports with Phosphor icons across interior pages by introducing `@phosphor-icons/react` in [package.json](package.json) and migrating icon usages within shared components such as [src/components/diagonal-card.tsx](src/components/diagonal-card.tsx).
- Update shared primitives (e.g., [src/components/cta-ribbon.tsx](src/components/cta-ribbon.tsx) and [src/components/progress-stepper.tsx](src/components/progress-stepper.tsx)) to consume the new tokens and present glass layers consistent with the home page aesthetic.

### Programs
**Current structure.** [ProgramsPage()](src/app/programs/page.tsx:131) anchors content with `<AngledHero>` (lines 134-176), tabbed program details (lines 179-311), and `DiagonalCard` clusters for requirements and outcomes (lines 257-289) plus a `CtaRibbon` (lines 292-307).

**Redesign direction.**
- Swap the hero media container for a double-layered diagonal frame that echoes the ATP Story banner (requires new `angled-mask` utility).
- Convert the tab group into a glass segmented control with glowing active states and add subtle motion cues (e.g., spring-based indicator).
- Re-skin stat and tuition blocks with translucent cards, gradient borders, and Phosphor glyphs.

**Planned code updates.**
- Replace the Lucide imports in lines 4-11 with Phosphor equivalents using the shared icon mapping helper once added.
- Introduce a `glass-panel` class on cards and add gradient border utility classes applied to the stat badges (lines 229-248).
- Inject new motion wrappers around `<TabsList>` and `<TabsTrigger>` using a small `FramerMotionTabs` adapter to animate the active pill.
- Enrich the CTA section with diagonal background layers leveraging a `bg-diagonal-strata` utility defined in [src/app/globals.css](src/app/globals.css).

### Admissions
**Current structure.** [AdmissionsPage()](src/app/admissions/page.tsx:60) combines `<AngledHero>` (lines 402-441), a `ProgressStepper` with form step cards (lines 444-475), checklist/overview cards (lines 477-542), FAQ list (lines 544-582), and `CtaRibbon` (lines 584-599).

**Redesign direction.**
- Wrap the hero and stepper segments in layered diagonal canvases with soft motion between steps.
- Convert form cards to glassmorphic containers with floating labels and inline validation states.
- Transform the checklist and support cards into angled, split-pane compositions with iconography anchored to diagonal badges.

**Planned code updates.**
- After updating `ProgressStepper`, propagate the new glow trail props into line 444 usage.
- Restructure each `DiagonalCard` child to include background gradient overlays and alternate icon + copy stacking aligned to the diagonal grid.
- Introduce responsive column ordering to keep the stepper and form visually linked on mobile, using CSS grid template updates inside `CardContent`.

### Fleet
**Current structure.** [FleetPage()](src/app/fleet/page.tsx:108) renders a gradient hero (lines 112-160), aircraft cards (lines 163-227), maintenance stats (lines 232-256), and CTA card (lines 258-274) using Shadcn `Card` and `Badge` primitives.

**Redesign direction.**
- Replace the generic hero with an `AngledHero` variant to align with other pages, adding layered hangar imagery and diagonal overlays.
- Convert the aircraft cards into a staggered grid with alternating diagonal backgrounds, incorporating transparent data bands and motion on hover.
- Rebuild maintenance stats into a diagonal timeline presentation with icon nodes connected by a glowing trajectory.

**Planned code updates.**
- Swap hero markup for `<AngledHero>` pulling CTA actions from existing buttons; adjust supporting text to live in the hero children slot.
- Introduce a reusable `FleetSpecCard` component that consumes the aircraft data and applies `glass-panel` styling plus animated overlays.
- Replace the maintenance grid with `DiagonalCard` instances so styles remain consistent, and add timeline connectors using CSS pseudo-elements in [src/app/globals.css](src/app/globals.css).

### Testimonials
**Current structure.** [TestimonialsPage()](src/app/testimonials/page.tsx:116) provides a gradient hero (lines 120-157), testimonial card grid (lines 161-233), and CTA panel (lines 238-262).

**Redesign direction.**
- Introduce a diagonal split hero with layered testimonial imagery and animated quote carousels.
- Present testimonials as stacked glass panels with angled top edges, integrating motion-driven quote transitions and rating badges.
- Replace the closing CTA with a dynamic diagonal banner mirroring the home page stats aesthetic.

**Planned code updates.**
- Swap hero markup to `<AngledHero>` and feed aggregated stats into the hero children for quick scanning.
- Create a `TestimonialCarousel` component leveraging `Framer Motion` or `keen-slider` to cycle quotes with diagonal masks.
- Apply `glass-panel` classes and gradient borders to each `Card`, adjusting Avatar containers to use Phosphor icons for placeholders.

### Contact
**Current structure.** [ContactPage()](src/app/contact/page.tsx:15) includes a gradient hero (lines 40-56), contact detail column (lines 61-159), form card (lines 162-284), tour options (lines 289-360), and map block (lines 365-390).

**Redesign direction.**
- Rebuild the hero as an angled layout featuring layered map imagery and contact stats.
- Organize the information column into diagonal info tiles with glass surfaces and icon chips.
- Convert the form into a two-column glass sheet with floating labels and integrated motion for focus states.
- Transform the tour offerings into diagonal split cards with alternating imagery panels.

**Planned code updates.**
- Replace static hero structure with `<AngledHero>` and include new CTA actions for direct call/chat.
- Refactor contact detail blocks into reusable `InfoTile` components that adopt `glass-panel` tokens and diagonal markers.
- Restructure the tour section as a responsive `grid` using `DiagonalCard` wrappers with background imagery slots.

### Apply
**Current structure.** [ApplyPage()](src/app/apply/page.tsx:18) renders a badge-styled header (lines 77-87), `Tabs` for application vs tracker (lines 89-433), a multi-section form with Shadcn `Card`s (lines 98-409), and an `ApplicationTracker` view (lines 429-431).

**Redesign direction.**
- Align the header with `AngledHero` to unify hero treatments and introduce a progress summary overlay.
- Transform the tab switcher into a glowing segmented control matching the Programs redesign.
- Apply glassmorphic styling and diagonal section dividers within the form cards.
- Enhance the tracker tab with diagonal milestones, motion cues, and glass surfaces.

**Planned code updates.**
- Replace the badge header with `<AngledHero>` usage and update `TabsList` to use the shared motion component created for Programs.
- Introduce shared form field components that encapsulate floating labels, focus glows, and validation states leveraging new utilities from [src/app/globals.css](src/app/globals.css).
- Refine `ApplicationTracker` to consume diagonal timeline styling, ensuring iconography sources Phosphor assets.

## Next Implementation Steps
1. Implement the shared token and utility updates in [tailwind.config.ts](tailwind.config.ts) and [src/app/globals.css](src/app/globals.css), alongside `@phosphor-icons/react` wiring in [package.json](package.json).
2. Update shared components (`AngledHero`, `DiagonalCard`, `CtaRibbon`, `ProgressStepper`) to support diagonal overlays, glass surfaces, and glow states before touching page-level code.
3. Refactor each interior page sequentially (Programs → Admissions → Fleet → Testimonials → Contact → Apply), leveraging the refreshed components and maintaining visual parity with the home page aesthetic.
4. After refactors, run accessibility and responsive QA, then update lint configurations if additional imports or utilities affect existing rules.