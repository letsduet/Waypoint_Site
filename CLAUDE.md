# Waypoint Machine Works — Site Development Guide

## Project Overview
Static corporate site for **Waypoint Machine Works LLC**, a one-person precision CNC manufacturing shop in Sanger, Texas (Denton County). The owner designs, machines, and ships products across three consumer brands.

## Tech Stack
- Pure HTML/CSS/JS — no framework, no build step
- Fonts: Oswald (headings), Space Mono (UI/labels), Source Serif 4 (body)
- Hosted via GitHub Pages
- Dev server: `npx http-server -p 8080 -s`

## File Structure
```
├── index.html          # Homepage — hero, stat bar, capabilities, materials, brands, CTA
├── about.html          # About — maker bio, shop interior, equipment, approach
├── brands.html         # Brands — Stratum Edge, Highpoint Trailworks, Cold Bore Collective
├── capabilities.html   # Capabilities — equipment, tolerances, materials, finishes
├── wholesale.html      # Wholesale inquiry form
├── contact.html        # Contact form (Formspree — needs real form ID)
├── 404.html            # Custom 404
├── css/
│   ├── reset.css       # CSS reset
│   ├── variables.css   # Design tokens (colors, spacing, type scale)
│   ├── base.css        # Typography, links, section labels
│   ├── layout.css      # Grid, sections, topo background
│   ├── components.css  # Header, footer, buttons, cards, forms, etc.
│   └── pages.css       # Page-specific overrides
├── js/
│   ├── nav.js          # Mobile nav toggle + header scroll effect
│   └── brands.js       # Homepage brand tab switcher
└── img/
    ├── Waypoint-SVG.svg              # Compass rose logo (transparent bg, #333 strokes)
    ├── favicon.svg                   # Browser tab icon
    ├── topo-bg.png                   # Topographic contour background (3000x1500 RGBA)
    ├── about-portrait.jpg            # Owner portrait
    ├── about-shop.jpg                # Shop interior (used on homepage AND about page)
    ├── about-parts.jpg               # CNC machining detail shot
    ├── product-stratum-edge.jpg      # Stratum Edge product shot
    ├── product-highpoint.jpg         # Highpoint Trailworks product shot
    ├── product-cold-bore.jpg         # Cold Bore Collective product shot
    ├── Stratum Logo Only Mockup.jpg  # Stratum Edge brand logo
    ├── Highpoint Logo Only Mockup.jpg # Highpoint Trailworks brand logo
    └── Coldbore Logo Only Mockup.jpg # Cold Bore Collective brand logo
```

## Design Tokens (css/variables.css)
- **Background:** `#F4F1EB` (warm cream)
- **Text:** `#2C2C28` (near-black), `#555` (body), `#777` (muted), `#999` (faint)
- **Accent:** `#C4713B` (warm copper/orange)
- **Dark sections/footer:** `#2C2C28` / `#1E1E1C`
- **Type scale:** xs=11px, sm=13px, base=15px, lg=18px, xl=24px

## Important Notes
- **Logo links** use `href="index.html"` (not `/`) for GitHub Pages compatibility
- **Topo background** uses a `::before` pseudo-element at 35% opacity
- **Footer SVG logo** uses `filter: invert(1) brightness(2)` to show light on dark bg
- **about-shop.jpg** is shared between homepage and about page (same file, not duplicated)
- **Contact form** action is placeholder: `https://formspree.io/f/YOUR_FORM_ID` — needs real endpoint
- **Brand logos** have spaces in filenames (e.g., `Stratum Logo Only Mockup.jpg`)

## Brands
| Brand | Category | URL | Color |
|-------|----------|-----|-------|
| Stratum Edge Co. | EDC / Everyday Carry | stratumedgeco.com | `#B87333` |
| Highpoint Trailworks | Overlanding / Off-Road | highpointtrailworks.com | `#7A8B5C` |
| Cold Bore Collective | Firearms Accessories | coldborecollective.com | `#8B7355` |

## Remaining TODO
- [ ] Replace `og-image.jpg` placeholder in meta tags with real social share image (1200x630)
- [ ] Set real Formspree form ID in contact.html
- [ ] Consider adding `loading="lazy"` to below-fold images
- [ ] Brand tabs should use `role="tab"` / `tabindex` for keyboard accessibility
- [ ] Add skip-nav link for screen readers
