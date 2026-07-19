# Waypoint Machine Works — Site Development Guide

## Project Overview
Static interim landing site for **Waypoint Machine Works LLC**, a one-person precision
manufacturing company in Sanger, Texas (Denton County) that designs and machines its own
line of precision hard goods (titanium EDC tools, firearms accessories, vehicle/overlanding
hardware, reloading tools, camp/outdoor gear).

**Positioning rule (Strategy v3):** Waypoint is a **product company** — one brand, no
sub-brands, ever. Product line leads; engineering capability is secondary. Never add
job-shop/RFQ language ("machining services," "get a quote," "contract manufacturing,"
"private label"). See `docs/LANDING_SITE_AUDIT_v1.md` for the full rationale.

**Honesty rules:** Only list equipment physically on the shop floor. No numeric tolerance
claims unless verified by a measured artifact. Batch sizes are 10–25 units typical.
Firearms content = machined accessories only; NOT an FFL; no firearms, receivers,
serialized parts, or ammunition.

## Tech Stack
- Pure HTML/CSS/JS — no framework, no build step
- Fonts (Strategy v3 §2): Barlow Condensed (headings), Barlow (long-form), Inter (body), JetBrains Mono (UI/labels)
- Hosted on **Namecheap Stellar Plus** (Apache — `.htaccess` is live config). Upload site files to `public_html/`; do NOT upload `docs/` or `CLAUDE.md`.
- This legacy site stays live as the public face until the WooCommerce build passes its migration gate.
- Dev server: `npx http-server -p 8080`

## File Structure
```
├── index.html          # Homepage — product-first hero, product line, shop proof, materials, about-in-brief
├── about.html          # About — maker bio, shop, equipment, approach
├── capabilities.html   # Capabilities — floor equipment, materials, finishes (secondary to products)
├── wholesale.html      # Wholesale inquiry form (retail/distribution ONLY)
├── contact.html        # Contact form
├── 404.html            # Custom 404
├── submit.php          # Server-side form handler (both forms POST here; honeypot field: _gotcha)
├── .htaccess           # HTTPS, www-strip, /brands 301, clean URLs (legacy domains redirect at registrar)
├── css/                # reset, variables (tokens), base, layout, components, pages
├── js/
│   ├── nav.js          # Mobile nav toggle + header scroll effect
│   └── forms.js        # Form validation + fetch submit (expects .form-message el, _gotcha honeypot)
├── img/                # Logo SVG, favicon, topo-bg, shop/portrait/parts photos, og-image.jpg
└── docs/
    ├── LANDING_SITE_AUDIT_v1.md  # Audit that drove the current page structure
    └── archive/                  # Superseded BC-era docs — audit subject matter, NOT guidance
```

## Design Tokens (css/variables.css)
- **Background:** `#F4F1EB` (warm cream) / alt `#EDEAE4`
- **Text:** `#2C2C28`, `#555`, `#777`, `#999`
- **Accent:** `#C4713B` (warm copper)
- **Dark sections/footer:** `#2C2C28` / `#1E1E1C`
- Colors/radius/motion pending verification against STRATEGY.md §2 (doc not in repo — see audit §3)
- Spacing tokens are on the 8px grid; avoid introducing off-grid inline styles

## Important Notes
- **Logo links** use `href="index.html"` (not `/`)
- **Topo background** uses a `::before` pseudo-element at 35% opacity (img/topo-bg.png, 64-color quantized)
- **Footer SVG logo** uses `filter: invert(1) brightness(2)`
- **Forms** POST to `/submit.php` (mail() to info@waypointmachineworks.com). Honeypot input is `name="_gotcha"` — must match forms.js and submit.php. `.form-message` element required in each form for feedback.
- **`docs/archive/`** contains superseded BigCommerce-era strategy docs that reference retired sub-brands. Treat as historical record only — never as guidance.

## Remaining TODO
- [ ] Confirm actual floor equipment with owner (site currently lists conservatively: HAAS VF-2, fiber laser engraver, blast cabinet & tumbler, Mitutoyo inspection)
- [ ] Add verified tolerance number once a measured artifact exists
- [ ] Verify submit.php mail() delivery on Stellar Plus (SPF/DKIM for noreply@)
- [ ] Import STRATEGY.md + asset list from the Waypoint chat project (not accessible from Claude Code; owner must export)
- [ ] Add skip-nav link for screen readers (accessibility)
- [ ] Replace og-image.jpg (auto-cropped shop photo) with a designed 1200x630 when available
