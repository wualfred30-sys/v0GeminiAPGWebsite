# Part 1: Design Brief

## 1. Full Color Palette

The color palette is derived from the existing homepage's minimalist, monochrome aesthetic with a single vibrant accent color.

| Role          | Color         | Hex       |
|---------------|---------------|-----------|
| Primary       | Black         | `#000000` |
| Secondary     | White         | `#FFFFFF` |
| Accent        | Aviation Red  | `#dc2626` |
| Neutral (Dark)| Slate Gray    | `#0f172a` |
| Neutral (Light)| Light Gray    | `#f8fafc` |

## 2. Typography System

The typography system uses the "Inter" sans-serif font for its clean, modern aesthetic.

| Element      | Font Family | Weight | Size (rem) | Line Height |
|--------------|-------------|--------|------------|-------------|
| H1           | Inter       | 700    | 3.0        | 1.2         |
| H2           | Inter       | 600    | 2.5        | 1.3         |
| H3           | Inter       | 500    | 2.0        | 1.4         |
| Body Copy    | Inter       | 400    | 1.0        | 1.6         |
| Links        | Inter       | 500    | 1.0        | 1.6         |
| Blockquotes  | Inter       | 400    | 1.2        | 1.5         |

## 3. Core Design Principles

The design is guided by a minimalist aesthetic, with a focus on clean lines, generous white space, and a responsive layout.

*   **Grid System:** A responsive 12-column grid system will be used for all layouts.
*   **Spacing:** All spacing (margins, padding) will be based on a 4px grid system.
*   **Layout Conventions:** All layouts will be clean and uncluttered, with a clear visual hierarchy.

## 4. Component Library Wireframes

### Global Header

**Mobile:**
```
+--------------------------------------------------+
| [Logo]                                [Menu Icon]|
+--------------------------------------------------+
```

**Tablet & Desktop:**
```
+--------------------------------------------------+
| [Logo] [Home] [About] [Services] [Contact]       |
+--------------------------------------------------+
```

### Global Footer

**Mobile:**
```
+--------------------------------------------------+
| [Logo]                                           |
| [Home] [About] [Services] [Contact]              |
| [Social Media Icons]                             |
| [Copyright]                                      |
+--------------------------------------------------+
```

**Tablet & Desktop:**
```
+--------------------------------------------------+
| [Logo] [Home] [About] [Services] [Contact] [Copyright] |
+--------------------------------------------------+
```

### Hero Sections

**All Devices:**
```
+--------------------------------------------------+
| [IMAGE_HERO]                                     |
|                                                  |
| # H1 Heading                                     |
|                                                  |
| Body copy                                        |
|                                                  |
| [Button]                                         |
+--------------------------------------------------+
```

### Content Cards

**All Devices:**
```
+--------------------------------------------------+
| [IMAGE_CARD]                                     |
|                                                  |
| ## H2 Heading                                    |
|                                                  |
| Body copy                                        |
|                                                  |
| [Link]                                           |
+--------------------------------------------------+
```

### Forms

**All Devices:**
```
+--------------------------------------------------+
|                                                  |
| ## H2 Heading                                    |
|                                                  |
| [Label]                                          |
| [Input]                                          |
|                                                  |
| [Label]                                          |
| [Textarea]                                       |
|                                                  |
| [Button]                                         |
+--------------------------------------------------+
```

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

# Part 3: HTML and CSS Code

## CSS

```css
@import "tailwindcss";

:root {
  --color-primary: #000000;
  --color-secondary: #FFFFFF;
  --color-accent: #dc2626;
  --color-neutral-dark: #0f172a;
  --color-neutral-light: #f8fafc;

  --font-family-sans: "Inter", sans-serif;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --font-size-h1: 3.0rem;
  --font-size-h2: 2.5rem;
  --font-size-h3: 2.0rem;
  --font-size-body: 1.0rem;
  --font-size-link: 1.0rem;
  --font-size-blockquote: 1.2rem;

  --line-height-h1: 1.2;
  --line-height-h2: 1.3;
  --line-height-h3: 1.4;
  --line-height-body: 1.6;
  --line-height-link: 1.6;
  --line-height-blockquote: 1.5;
}

body {
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  color: var(--color-primary);
  background-color: var(--color-secondary);
}

h1, h2, h3 {
  font-family: var(--font-family-sans);
}

h1 {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-h1);
  line-height: var(--line-height-h1);
}

h2 {
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-h2);
  line-height: var(--line-height-h2);
}

h3 {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-h3);
  line-height: var(--line-height-h3);
}

a {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-link);
  line-height: var(--line-height-link);
  color: var(--color-accent);
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: var(--color-primary);
}

blockquote {
  font-size: var(--font-size-blockquote);
  line-height: var(--line-height-blockquote);
  border-left: 4px solid var(--color-accent);
  padding-left: 1rem;
  margin-left: 1rem;
}

.header {
  background-color: var(--color-secondary);
  border-bottom: 1px solid var(--color-neutral-light);
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.header__logo {
  font-weight: var(--font-weight-bold);
  font-size: 1.5rem;
  color: var(--color-primary);
  text-decoration: none;
}

.header__nav {
  display: none;
}

@media (min-width: 768px) {
  .header__nav {
    display: block;
  }
}

.header__list {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.header__link {
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.header__link:hover {
  color: var(--color-accent);
}

.footer {
  background-color: var(--color-neutral-dark);
  color: var(--color-secondary);
  padding: 4rem 2rem;
}

.footer__container {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer__container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer__logo {
  font-weight: var(--font-weight-bold);
  font-size: 1.5rem;
  color: var(--color-secondary);
  text-decoration: none;
}

.footer__nav {
  display: none;
}

@media (min-width: 768px) {
  .footer__nav {
    display: block;
  }
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
}

.footer__link {
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  color: var(--color-secondary);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.footer__link:hover {
  color: var(--color-accent);
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link img {
  width: 24px;
  height: 24px;
}

.footer__copyright {
  font-size: 0.875rem;
  color: var(--color-neutral-light);
}
```

## HTML

### Header

```html
<header class="header">
  <div class="header__container">
    <a href="/" class="header__logo">
      APG
    </a>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item">
          <a href="/program" class="header__link">
            Program
          </a>
        </li>
        <li class="header__item">
          <a href="/admissions" class="header__link">
            Admissions
          </a>
        </li>
        <li class="header__item">
          <a href="/fleet" class="header__link">
            Fleet
          </a>
        </li>
        <li class="header__item">
          <a href="/careers" class="header__link">
            Careers
          </a>
        </li>
        <li class="header__item">
          <a href="/testimonials" class="header__link">
            Testimonials
          </a>
        </li>
        <li class="header__item">
          <a href="/contact" class="header__link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

### Footer

```html
<footer class="footer">
  <div class="footer__container">
    <a href="/" class="footer__logo">
      APG
    </a>
    <nav class="footer__nav">
      <ul class="footer__list">
        <li class="footer__item">
          <a href="/program" class="footer__link">
            Program
          </a>
        </li>
        <li class="footer__item">
          <a href="/admissions" class="footer__link">
            Admissions
          </a>
        </li>
        <li class="footer__item">
          <a href="/fleet" class="footer__link">
            Fleet
          </a>
        </li>
        <li class="footer__item">
          <a href="/careers" class="footer__link">
            Careers
          </a>
        </li>
        <li class="footer__item">
          <a href="/testimonials" class="footer__link">
            Testimonials
          </a>
        </li>
        <li class="footer__item">
          <a href="/contact" class="footer__link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
    <div class="footer__social">
      <a href="#" class="footer__social-link">
        <img src="[ICON_FACEBOOK]" alt="Facebook" />
      </a>
      <a href="#" class="footer__social-link">
        <img src="[ICON_TWITTER]" alt="Twitter" />
      </a>
      <a href="#" class="footer__social-link">
        <img src="[ICON_INSTAGRAM]" alt="Instagram" />
      </a>
    </div>
    <p class="footer__copyright">
      &copy; 2023 APG. All rights reserved.
    </p>
  </div>
</footer>```

### Program Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_PROGRAM]" alt="Program" />
    <h1>Program</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="content-cards">
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 1</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 2</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 3</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
  </section>
  <section class="form">
    <h2>Form</h2>
    <form>
      <label>Label</label>
      <input type="text" />
      <label>Label</label>
      <textarea></textarea>
      <button>Button</button>
    </form>
  </section>
</main>
```

### Admissions Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_ADMISSIONS]" alt="Admissions" />
    <h1>Admissions</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="content-cards">
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 1</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 2</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 3</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
  </section>
  <section class="form">
    <h2>Form</h2>
    <form>
      <label>Label</label>
      <input type="text" />
      <label>Label</label>
      <textarea></textarea>
      <button>Button</button>
    </form>
  </section>
</main>
```

### Fleet Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_FLEET]" alt="Fleet" />
    <h1>Fleet</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="content-cards">
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 1</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 2</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 3</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
  </section>
</main>
```

### Careers Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_CAREERS]" alt="Careers" />
    <h1>Careers</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="content-cards">
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 1</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 2</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 3</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
  </section>
  <section class="form">
    <h2>Form</h2>
    <form>
      <label>Label</label>
      <input type="text" />
      <label>Label</label>
      <textarea></textarea>
      <button>Button</button>
    </form>
  </section>
</main>
```

### Testimonials Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_TESTIMONIALS]" alt="Testimonials" />
    <h1>Testimonials</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="content-cards">
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 1</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 2</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
    <div class="card">
      <img src="[IMAGE_CARD]" alt="Card" />
      <h2>Card 3</h2>
      <p>Body copy</p>
      <a href="#">Link</a>
    </div>
  </section>
</main>
```

### Contact Page

```html
<main>
  <section class="hero">
    <img src="[IMAGE_HERO_CONTACT]" alt="Contact" />
    <h1>Contact</h1>
    <p>Body copy</p>
    <button>Button</button>
  </section>
  <section class="form">
    <h2>Form</h2>
    <form>
      <label>Label</label>
      <input type="text" />
      <label>Label</label>
      <textarea></textarea>
      <button>Button</button>
    </form>
  </section>
  <section class="contact-details">
    <p>[CONTACT_PHONE]</p>
    <p>[CONTACT_EMAIL]</p>
    <p>[CONTACT_ADDRESS]</p>
  </section>
</main>