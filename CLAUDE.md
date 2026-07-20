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

**Honesty rules:** Site lists capabilities (not asset inventories), backed by the fixed
asset register (owner's copy; not in repo). In service: Haas VF-2 (3-axis, CAT40, 8,100
RPM, 20-tool ATC, Renishaw WIPS), Langmuir CrossFire CNC plasma table, MOPA fiber laser
marker, MIG/TIG welder, horizontal bandsaw. NOT in service (do not claim): lathe, press
brake, tumbler/bead-blast (planned/confirm). No numeric tolerance claims unless verified
by a measured artifact. Batch sizes are 10–25 units typical. Firearms content = machined
accessories only; NOT an FFL; no firearms, receivers, serialized parts, or ammunition.

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
├── img/                # Logo SVG, favicon, topo-bg, portrait/parts photos, og-image.jpg (designed card)
└── docs/
    ├── LANDING_SITE_AUDIT_v1.md  # Audit that drove the current page structure
    ├── REPO_STRATEGY_v2.md       # Current repo strategy (two-repo BC-era plan; this repo is the interim site)
    ├── RECONCILIATION_LOG.md     # Decision record — newest decision wins; equipment rule at §1.15
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
- [ ] Confirm tumbler + bead blast cabinet status (register: "Planned/Confirm") — if in service, restore stonewash/bead-blast finishing claims
- [ ] Add verified tolerance number once a measured artifact exists
- [ ] Verify submit.php mail() delivery on Stellar Plus (SPF/DKIM for noreply@)
- [ ] STRATEGY.md §2 design tokens (colors/radius/motion) still unverified — REPO_STRATEGY v2 + RECONCILIATION_LOG received, but not the token spec
- [ ] Add skip-nav link for screen readers (accessibility)
- [ ] New product/shop photography when first batches complete (shop wide-shot removed by owner decision 2026-07-19)
