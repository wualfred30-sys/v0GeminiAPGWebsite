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