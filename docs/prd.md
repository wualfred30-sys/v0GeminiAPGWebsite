# Part 2: Product Requirements Document

## 1. Sitemap & Navigation

The website will have the following pages:

*   /program
*   /admissions
*   /fleet
*   /careers
*   /testimonials
*   /contact

The header and footer navigation will include links to these pages, as well as social media links.

## 2. Page-by-Page Content Schemas

### /program

*   **Hero Section:** [IMAGE_HERO_PROGRAM], H1 Heading, Body copy, Button
*   **Content Cards:** [IMAGE_CARD], H2 Heading, Body copy, Link (x3)
*   **Form:** H2 Heading, Label, Input, Textarea, Button

### /admissions

*   **Hero Section:** [IMAGE_HERO_ADMISSIONS], H1 Heading, Body copy, Button
*   **Content Cards:** [IMAGE_CARD], H2 Heading, Body copy, Link (x3)
*   **Form:** H2 Heading, Label, Input, Textarea, Button

### /fleet

*   **Hero Section:** [IMAGE_HERO_FLEET], H1 Heading, Body copy, Button
*   **Content Cards:** [IMAGE_CARD], H2 Heading, Body copy, Link (x3)

### /careers

*   **Hero Section:** [IMAGE_HERO_CAREERS], H1 Heading, Body copy, Button
*   **Content Cards:** [IMAGE_CARD], H2 Heading, Body copy, Link (x3)
*   **Form:** H2 Heading, Label, Input, Textarea, Button

### /testimonials

*   **Hero Section:** [IMAGE_HERO_TESTIMONIALS], H1 Heading, Body copy, Button
*   **Content Cards:** [IMAGE_CARD], H2 Heading, Body copy, Link (x3)

### /contact

*   **Hero Section:** [IMAGE_HERO_CONTACT], H1 Heading, Body copy, Button
*   **Form:** H2 Heading, Label, Input, Textarea, Button
*   **Contact Details:** [CONTACT_PHONE], [CONTACT_EMAIL], [CONTACT_ADDRESS]

## 3. User Interaction (UI) Behavior

All interactive elements will have the following states:

*   **Default:** The default state of the element.
*   **Hover:** The state of the element when the user hovers over it with their mouse.
*   **Active:** The state of the element when the user clicks on it.
*   **Focus:** The state of the element when it is selected using the keyboard.

All transitions will use an `ease-in-out` timing function with a duration of `0.3s`.

## 4. Accessibility Compliance

The website will comply with WCAG 2.1 Level AA standards. This includes:

*   **Keyboard Navigation:** All interactive elements will be navigable using the keyboard.
*   **ARIA Roles:** All components will have appropriate ARIA roles.
*   **Color Contrast:** All text will have a minimum color contrast ratio of 4.5:1.