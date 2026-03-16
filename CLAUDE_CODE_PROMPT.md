# Claude Code — Waypoint Machine Works Corporate Site

## Project Context

You are building the corporate website for **Waypoint Machine Works LLC**, a precision CNC manufacturing company in Sanger, Texas (Denton County). This is NOT an e-commerce store. It is a corporate credibility and brand-routing site that serves four audiences:

1. **Customers who find the maker's mark** — They see "Made by Waypoint Machine Works — Muenster, TX" on a product and want to know who made it
2. **Wholesale/B2B buyers** — Retailers or distributors looking to stock products or commission contract machining
3. **Investors/partners** — People evaluating the business (the company has two passive family investors)
4. **Press/media** — Journalists or content creators covering the maker/manufacturing space

The site has **one job**: move visitors to a brand store or capture a wholesale lead. Every page should have a visible path to one of those two outcomes within one click. There is no shopping cart, no product catalog, and no email newsletter.

---

## Technical Stack

- **Type:** Static site — plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no CMS.
- **Hosting:** Namecheap Stellar Plus shared hosting (cPanel, Apache, PHP available for form handler only)
- **Domain:** waypointmachineworks.com (waypointmw.com redirects via 301)
- **Forms:** Either Formspree (free tier, 50 submissions/month) or a single PHP mail script (`submit.php`) on the server for contact/wholesale forms
- **Deployment:** Upload files via SFTP or cPanel File Manager. No build step required.
- **Repo:** Git repository. The entire site is what gets deployed — no compilation, no dist folder, no node_modules.

### Why Static HTML
This is a 6-page brochure site with two contact forms. WordPress adds unnecessary attack surface (admin login, database, plugin dependencies) for a site whose content changes maybe twice a year. React/Next.js adds a build pipeline and SSR complexity for a site with zero interactivity beyond form submissions. Static HTML is the fastest, most secure, and simplest option for this use case. It loads instantly on shared hosting with zero server-side processing.

---

## Brand Identity & Design Direction

### Aesthetic
- **Industrial, utilitarian, permanent.** This should look like it belongs stamped on the side of a building that's been making things for decades.
- **Dark, confident, grounded.** Not flashy. Not startup. Not agency.
- **Wordmark-forward.** The company name IS the brand. No abstract icons unless derived from machining/engineering imagery (datum targets, geometric tolerance symbols, tool path geometry).

### Typography
- **Primary heading:** Bebas Neue (load via Google Fonts) — condensed, geometric, industrial. Used for page titles, hero text, section headers.
- **Technical/spec callouts:** JetBrains Mono (Google Fonts) — monospaced, used for equipment specs, material grades, tolerances, stat bars. Makes data feel like a CNC program readout.
- **Body text:** Source Serif 4 or system serif stack — readable, grounded, not flashy. For paragraphs and longer descriptive text.
- **Navigation/UI:** Oswald or system sans-serif — condensed, clean, functional.

### Color Palette (CSS custom properties)
```css
:root {
  --color-black: #1A1A1A;
  --color-dark: #3D3D5C;
  --color-accent: #C4802D;
  --color-warm-bg: #F5F0EB;
  --color-text: #333333;
  --color-white: #FFFFFF;
  --color-gray: #666666;
  --color-light-gray: #E8E8E8;
  --color-steel: #2A2A3A;
}
```

### Photography Direction
- Until real shop photography is available, use **solid color blocks, subtle noise/grain textures, or geometric placeholder areas** with descriptive text like "[Shop interior photo — VF-2 in operation]"
- **Absolutely no stock photos.** No generic machine shop imagery. No smiling people in hard hats. The site should feel honest — if we don't have photos yet, show clean placeholders that make that obvious rather than faking it.
- When real photos are added later, they should be: high contrast, warm lighting, shallow depth of field on details (titanium chips, coolant spray, caliper measurements, finished parts)

---

## Site Architecture — 6 Pages

### Page 1: Home (`index.html`)
**Purpose:** Establish credibility in 5 seconds. Route visitors to brands or wholesale.

**Content blocks (top to bottom):**

1. **Hero section** — Full-width, dark background (near-black with subtle texture or grain overlay). Large heading: company name in Bebas Neue. Subheading: "Precision CNC Manufacturing — Sanger, Texas" in JetBrains Mono. Two CTA buttons: "Our Brands" (→ brands.html) and "Wholesale Inquiries" (→ wholesale.html). Keep it stark and confident — no carousel, no animation, no noise.

2. **Capability stat bar** — Horizontal strip, slightly different background shade. 4 stats in JetBrains Mono with small labels:
   - "Grade 5 Titanium" (material)
   - "±0.001\" Tolerance" (precision)
   - "Haas CNC" (equipment)
   - "Sanger, Texas" (origin)

3. **Brand portfolio section** — Section heading: "Our Brands." Grid of 3–5 cards. Each card:
   - Placeholder for brand logo (solid color block with brand name text until logos are finalized)
   - Brand name
   - One-line description
   - "Visit Store →" link (external, opens in new tab)
   - Cards for:
     - **Stratum Edge Co.** — "EDC tools & accessories" → stratumedgeco.com
     - **Highpoint Trailworks** — "Overlanding & off-road accessories" → highpointtrailworks.com
     - **Cold Bore Collective** — "Precision firearms accessories" → coldborecollective.com
     - **Camera Brand** — "Photo/video mounting hardware" → "Coming Soon" (no link)
     - **Accessories Brand** — "Sheaths, holsters & carry systems" → "Coming Soon" (no link)

4. **Manufacturing callout** — Brief 2–3 sentence section: "One shop. Five brands. Every product designed, machined, and shipped from a single building in north Texas." Link to About page.

5. **Footer** — See universal elements below.

### Page 2: About (`about.html`)
**Purpose:** Manufacturing provenance. The "real person, real machine, real shop" narrative.

**Content:**
- **Section: The Maker** — Owner is a mechanical/manufacturing engineer with ~10 years of experience across aerospace, automotive, plastics, consumer electronics, and food & beverage. Designs every product. Runs every machine. Ships every order. Keep this brief and factual — 2-3 short paragraphs, not a life story.
- **Section: The Shop** — 30×40×14' metal building in Sanger, TX (Denton County). Photo placeholder area. Equipment list formatted as a spec table or clean list:
  - Haas VF-2 Vertical Machining Center
  - Haas ST-20 CNC Lathe
  - 2–3kW Fiber Laser Cutter/Welder
  - CNC Plasma Table
  - Press Brake
  - Fiber Laser Engraver
  - Supporting: blast cabinet, tumbler, inspection tools
- **Section: The Approach** — Short statement of principles. Quality over quantity. US-made. In-house engineering and manufacturing. Rapid iteration without vendor lead times. No buzzwords.
- **CTA:** "See Our Full Capabilities" → capabilities.html

### Page 3: Capabilities (`capabilities.html`)
**Purpose:** Technical credibility for B2B and wholesale prospects. This page should feel like reading a machine shop's spec sheet, not a marketing brochure.

**Content — structured as technical data, not prose:**

- **Equipment table** — Clean table or card grid. Each piece of equipment: name, type, key specs (work envelope, spindle speed, capacity). Format in JetBrains Mono for the spec values.
  
- **Materials section** — Table format:
  | Material | Grade | Common Applications |
  |----------|-------|-------------------|
  | Titanium | 6AL-4V (Grade 5) | EDC tools, pry bars, cookware, rings |
  | Aluminum | 6061-T6 | Mounting hardware, brackets, optics risers |
  | Stainless Steel | 303 / 304 / 17-4 PH | Fasteners, muzzle devices, camp kitchen |
  | Brass | C360 | Lanyard beads, accents, decorative hardware |
  | Kydex | Various | Sheaths, holsters, carry systems |

- **Finishing capabilities** — List with brief descriptions:
  - Stonewash tumble
  - Bead blast
  - Flame anodize (titanium)
  - Type II / Type III hard anodize (aluminum)
  - Cerakote
  - DLC coating
  - Raw machined

- **Tolerances & capacity** — Clean stat block:
  - Standard tolerance: ±0.001"
  - Critical features: ±0.0005"
  - Production range: Prototype (1-off) through mid-volume (500+ units)
  - Lead time: Quoted per project

- **CTA:** "Request a Quote" → wholesale.html

### Page 4: Brands (`brands.html`)
**Purpose:** Directory page linking to all consumer brand storefronts. Expanded version of the home page brand cards.

**Content — one section per brand:**

Each brand gets a full-width section with:
- Logo placeholder (left or top)
- Brand name (heading)
- 2–3 sentence description explaining what the brand sells and who it's for
- Product categories listed (e.g., "Knives | Pry Tools | Clips | Pens | Lanyard Beads")
- Hero product image placeholder
- "Visit [Brand Name] →" button (external link, new tab)
- For Camera and Accessories brands: "Coming Soon" overlay/badge, no link

The sections should visually hint at each brand's identity (Stratum Edge = warm/industrial, Highpoint = earth tones, Cold Bore = dark/tactical) but stay within Waypoint's overall design language. Subtle background color shifts per section work well for this.

### Page 5: Wholesale (`wholesale.html`)
**Purpose:** Inbound lead capture for retailers, distributors, and contract machining.

**Content:**
- **Intro paragraph:** "Waypoint Machine Works offers wholesale pricing for retailers and distributors, as well as contract CNC manufacturing services. Tell us about your project and we'll follow up within two business days."

- **Form fields:**
  - Company Name (text, required)
  - Contact Name (text, required)
  - Email (email, required)
  - Phone (tel, optional)
  - Inquiry Type (select dropdown: "Wholesale / Retail" | "Contract Manufacturing" | "Private Label / White Label" | "Other")
  - Message (textarea, required)
  - Submit button: "Send Inquiry"

- **Form handling:** POST to Formspree endpoint (or a local `submit.php` file that sends an email via PHP `mail()` to info@waypointmachineworks.com). Include a hidden honeypot field for spam prevention.

- **Below form:** "What to expect" section — "We review every inquiry personally and typically respond within 2 business days. For product-specific questions, please visit the relevant brand store directly."

### Page 6: Contact (`contact.html`)
**Purpose:** General inquiries, press, partnerships.

**Content:**
- **Simple form:**
  - Name (text, required)
  - Email (email, required)
  - Subject (select: "General Inquiry" | "Press / Media" | "Partnership" | "Other")
  - Message (textarea, required)
  - Submit button: "Send Message"

- **Contact info (beside or below form):**
  - Email: info@waypointmachineworks.com
  - Location: Sanger, TX 76266
  - No phone number
  - "For product questions, warranty, or order support, please contact the brand store directly." with links to brand stores.

- **Form handling:** Same approach as wholesale form (Formspree or PHP).

---

## Universal Elements

### Header / Navigation
- **Logo area:** "WAYPOINT MACHINE WORKS" as text in Bebas Neue, letterspaced. No image logo needed — the text IS the mark. Optionally a small geometric element (thin line, datum target symbol) beside the name.
- **Nav items:** About | Capabilities | Brands | Wholesale | Contact
- **Behavior:** Sticky on scroll with a subtle background opacity transition. Minimal height — don't eat viewport space.
- **Mobile:** Hamburger menu that opens a full-screen overlay or slide-in panel. Simple, no animation overkill.
- **Active state:** Current page nav item gets the accent color underline or text color.

### Footer
- **Three-column layout (desktop), stacked on mobile:**
  - Left: "Waypoint Machine Works LLC" + "Precision CNC Manufacturing — Sanger, Texas"
  - Center: Page links (About, Capabilities, Brands, Wholesale, Contact)
  - Right: Brand store links (external): Stratum Edge Co., Highpoint Trailworks, Cold Bore Collective
- **Bottom bar:** "© 2026 Waypoint Machine Works LLC. All rights reserved." Left-aligned. No social media icons unless/until the company has active accounts.

### SEO & Meta
Each page needs:
- Unique `<title>` tag (e.g., "Capabilities — Waypoint Machine Works | CNC Manufacturing, Sanger TX")
- Meta description (unique per page, 150–160 chars)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) for social sharing
- Canonical URL
- Structured data (LocalBusiness schema in JSON-LD on the home page)

---

## File Structure

```
waypoint-site/
├── index.html              (Home)
├── about.html
├── capabilities.html
├── brands.html
├── wholesale.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── css/
│   ├── reset.css           (minimal CSS reset / normalize)
│   ├── variables.css       (CSS custom properties — colors, spacing, type scale)
│   ├── base.css            (typography, body defaults, links)
│   ├── layout.css          (grid, containers, responsive breakpoints)
│   ├── components.css      (buttons, cards, forms, tables, nav, footer)
│   └── pages.css           (page-specific styles if needed)
├── js/
│   ├── nav.js              (mobile menu toggle, sticky header)
│   └── forms.js            (form validation, submission handling)
├── img/
│   └── (placeholder files or empty — real photos added later)
├── fonts/                  (local font files if not using Google Fonts CDN)
├── submit.php              (optional — server-side form handler if not using Formspree)
├── .htaccess               (301 redirects, caching headers, security headers)
├── .gitignore
└── README.md
```

### .gitignore
```
.DS_Store
Thumbs.db
.vscode/
.idea/
*.log
```

### .htaccess (for Namecheap Apache hosting)
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove .html extensions (clean URLs)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.*)$ $1.html [L]

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Custom 404
ErrorDocument 404 /404.html

# Block directory browsing
Options -Indexes
```

---

## CSS Architecture Notes

### Responsive Breakpoints
```css
/* Mobile first — base styles are mobile */
/* Tablet */
@media (min-width: 768px) { }
/* Desktop */
@media (min-width: 1024px) { }
/* Wide */
@media (min-width: 1280px) { }
```

### Spacing Scale (use consistently)
```css
:root {
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 1rem;      /* 16px */
  --space-md: 2rem;      /* 32px */
  --space-lg: 4rem;      /* 64px */
  --space-xl: 6rem;      /* 96px */
  --space-2xl: 8rem;     /* 128px */
}
```

### Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-sm);
}
```

---

## Development Phases

### Phase 1: Foundation + Home page
- Create file structure
- Set up CSS architecture (reset, variables, base typography, layout grid)
- Build header and footer components
- Build the complete Home page (hero, stat bar, brand cards, manufacturing callout)
- Test responsive behavior at all breakpoints
- Verify on a local server (`python -m http.server` or similar)

### Phase 2: Inner pages
- About page
- Capabilities page (focus on the spec-sheet layout — tables, data presentation)
- Brands page (brand sections with visual differentiation)
- Ensure consistent heading hierarchy and spacing across all pages

### Phase 3: Forms + Contact pages
- Wholesale inquiry form (with validation)
- Contact form (with validation)
- Form submission handling (Formspree integration or PHP handler)
- Success/error states
- Honeypot spam prevention field

### Phase 4: Polish + Deploy
- 404 page
- SEO meta tags on every page
- Open Graph tags
- JSON-LD structured data (LocalBusiness)
- robots.txt and sitemap.xml
- .htaccess configuration (HTTPS redirect, clean URLs, caching, security headers)
- Favicon
- Final accessibility check (contrast ratios, ARIA labels, keyboard navigation, focus states)
- Upload to Namecheap via SFTP
- Verify live site

---

## Important Constraints

- **No JavaScript frameworks.** Vanilla JS only, and only where actually needed (mobile nav toggle, form validation). Most of the site should work with JS disabled.
- **No build tools.** No webpack, no Vite, no npm scripts. The files in the repo ARE the site. What you edit is what gets deployed.
- **No stock photos.** Use solid backgrounds, subtle CSS textures (noise, grain, gradients), or clearly-labeled placeholder blocks. Honest > polished.
- **No CMS.** Content is edited by changing HTML files directly. For a 6-page site that changes twice a year, this is correct.
- **External links to brand stores open in new tabs** (`target="_blank" rel="noopener noreferrer"`). Visitors are leaving the Waypoint site and going to a separate BigCommerce storefront.
- **Performance target:** < 1 second load time. With no database, no PHP rendering, and minimal assets, this should be trivial on shared hosting.
- **Content tone:** Direct, confident, technically literate. No buzzwords. No "premium quality" or "best in class" or "world-class craftsmanship." State what the shop does, what equipment it uses, what materials it works with. Let the work speak. Write like a machinist talking to another machinist, not like a marketing agency talking to investors.
