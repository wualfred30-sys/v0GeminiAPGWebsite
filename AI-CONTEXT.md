# AI Development Context - APG Aviation Academy

## 🚫 FORBIDDEN ADDITIONS

### Never Add These:
- ❌ Socket.IO or WebSocket libraries
- ❌ Firebase or authentication libraries  
- ❌ Additional Radix UI components beyond the 24 approved
- ❌ CSS-in-JS libraries (styled-components, emotion)
- ❌ State management libraries (Redux, Zustand)

### Never Do These:
- ❌ Create custom server files
- ❌ Use inline styles
- ❌ Import from external CDNs
- ❌ Add dependencies without approval

## ✅ APPROVED TECH STACK

### Core (DO NOT CHANGE)
- Next.js 14.2.33 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 4.1.9

### UI Components (ONLY THESE 24)
```
button, card, badge, input, label, textarea, select, checkbox,
tabs, separator, toast, toaster, carousel, form, alert-dialog,
command, dialog, sidebar, sheet, calendar, pagination, 
toggle-group, toggle, accordion
```

### Color Palette (ONLY THESE)
```css
--aviation-red: #E53935    /* Primary CTA, accents */
--slate-navy: #212A36      /* Dark backgrounds, text */
--white: #FFFFFF           /* Light backgrounds, text */
```

### Chronicle HQ Colors (For subtle depth)
```css
--solid-1 to --solid-12    /* Grayscale system */
```

## 📋 COMPONENT PATTERNS

### Standard Component
```typescript
"use client"  // If using hooks

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Props {
  title: string
}

export function Component({ title }: Props) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-navy">
          {title}
        </h2>
      </div>
    </section>
  )
}
```

## 🎯 QUALITY CHECKLIST

Before submitting code:
- [ ] Uses only approved UI components (24 total)
- [ ] Uses only 3-color palette
- [ ] Styled with Tailwind classes (no inline styles)
- [ ] TypeScript types are explicit (no `any`)
- [ ] Responsive design (mobile-first)
- [ ] No new dependencies added

## 📚 FILE STRUCTURE

```
/src
  /app              # Pages (App Router)
  /components       # React components
    /ui             # 24 approved UI components
  /lib              # Utilities (utils.ts only)
  /data             # Static data
  /hooks            # Custom hooks
```

## 🔒 SECURITY RULES

- ✅ Input validation on all forms
- ✅ Environment variables for secrets
- ✅ HTTPS only in production
- ❌ No hardcoded credentials
- ❌ No dangerouslySetInnerHTML without sanitization
