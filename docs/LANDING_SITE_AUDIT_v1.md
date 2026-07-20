# LANDING SITE AUDIT v1 — Legacy Waypoint Static Site vs. Strategy v3

**File:** docs/LANDING_SITE_AUDIT_v1.md · **Version:** 1.0 · **Date:** 2026-07-19
**Scope:** Full audit of the legacy static HTML/CSS/JS site (Namecheap Stellar Plus) against Strategy v3, per `Waypoint_Landing_Site_Review_Prompt_v1.md`.
**Session rule compliance:** Review-only. No site files modified. This document is the sole deliverable.

---

## ⚠ Source-document discrepancy (read first)

The audit prompt requires reading **STRATEGY.md (v3.x)** and **RECONCILIATION_LOG.md §18–§24** before auditing. **Neither file exists in this repository, in any branch, in any commit in git history, or in the connected Google Drive.** [VERIFIED — repo-wide glob, `git log --all --name-only`, Drive full-text search]

Per session rules this discrepancy is flagged, not silently resolved. The audit proceeds using the strategy requirements **quoted inside the prompt itself** (one-brand rule, product-first hierarchy, §14 voice guardrails, §2 font/spacing tokens, floor-equipment list, compliance standard). Where the prompt quotes STRATEGY.md, findings cite it as DIRECT (via prompt). Where only STRATEGY.md itself could confirm a spec value (exact color hex, radius, motion rules), the token table marks the spec **UNKNOWN** and the table is structured so real values can be dropped in.

**Consequence:** Lens C is partially blocked; Lenses A, B, D, E are fully executable. See Open Questions #1.

A second discrepancy: the in-repo `CLAUDE.md` describes the site as "Hosted via GitHub Pages," while the prompt (authoritative) says Namecheap Stellar Plus — and the presence of a functional `.htaccess` supports the Apache/Namecheap account. `CLAUDE.md` is stale, BC-era-adjacent guidance and is treated as audit subject matter only. [VERIFIED]

---

## 1. Executive summary

The current site is **not usable for the Autodesk Fusion for Startups application as-is, and a one-day content pass on the existing pages is not enough — it needs the rebuilt interim landing page**, though the rebuild fits in one day because the design system, photography, and most copy blocks carry forward.

Three independent blocker classes force this: (1) the site is architected around **three named sub-brands plus two "coming soon" brands** — nav item, dedicated page, homepage portfolio section, footer links, JS, and metadata — a direct violation of the one-brand rule and a mess of dead outbound links to storefronts that don't exist; (2) the wholesale page and homepage CTA **explicitly solicit "Contract Manufacturing" and "Private Label / White Label" work with "Request a Quote" CTAs** — the exact service-provider profile Autodesk excludes; (3) **capability misrepresentation**: a CNC lathe, press brake, plasma table, and "1–500+ units" capacity are claimed against a floor that (per the prompt's floor list) has none of the first three, plus unverified tolerance numbers on three pages. Both public forms also post to a placeholder Formspree ID, so a reviewer who tries to contact the company hits a dead form.

The good news: the visual system (topo/coordinate motif, corner brackets, data tables, equipment cards), the shop photography, and the "One Engineer. Every Product." narrative are strong, on-voice, and product-company-compatible. Recommended path: build the interim landing page from the outline in §5 (≤1 day), 301 the removed pages, then submit the application.

---

## 2. Findings table

Severity: **BLOCKER** = would plausibly trigger Autodesk's service-provider exclusion, violates the one-brand rule, or misrepresents capability/compliance. **FIX** = should be corrected in the interim pass. **NICE** = defer if time-boxed.

### Lens A — Autodesk eligibility optics

| ID | Page/File:Line | Finding | Severity | Recommendation |
|----|----------------|---------|----------|----------------|
| A-01 | wholesale.html:6–7 | Title/meta: "Contract Manufacturing… Contract CNC manufacturing and private label services. Request a quote." Job-shop-first metadata visible in search results and link previews. | BLOCKER | Remove contract-manufacturing/private-label language entirely from the interim site. |
| A-02 | wholesale.html:73 | Hero label "RETAIL • DISTRIBUTION • CONTRACT MANUFACTURING". | BLOCKER | Drop "Contract Manufacturing" from the page (or 301 wholesale → contact during the application window; see Open Q #6). |
| A-03 | wholesale.html:114–119 | Inquiry-type dropdown offers "Contract Manufacturing" and "Private Label / White Label" as selectable services. | BLOCKER | Remove both options; keep "Wholesale / Retail" (product resale is fine — it's a product-company activity). |
| A-04 | wholesale.html:141 | Sidebar: "Contract manufacturing quoted per project." | BLOCKER | Remove. |
| A-05 | wholesale.html:83–85 | Intro copy: "…a company in need of contract CNC manufacturing, we'd like to hear from you." | BLOCKER | Rewrite to retailer/distributor audience only. |
| A-06 | index.html:259–264 | Homepage CTA: "Retailers, distributors, and contract machining inquiries welcome. Tell us about your project." — "tell us about your project" is RFQ-forward hero-adjacent copy. | BLOCKER | Replace with product-line CTA ("Stock Waypoint products" / "Get in touch"). |
| A-07 | capabilities.html:199–201 | "Request a Quote →" is the page's sole CTA — reads as a job-shop RFQ funnel. | BLOCKER | Recast capabilities as "the engineering behind the product line"; CTA → products or contact. |
| A-08 | capabilities.html:7, 11 | Meta: "Prototype through mid-volume production" — services framing ("we'll make your prototypes"). | FIX | Rewrite metadata product-first. |
| A-09 | index.html:6–10 | Title/meta lead with "Precision CNC Manufacturing" and "machining for five consumer brands" — process-first, not product-first; no Waypoint-designed product named anywhere in the hero. | FIX | Retitle: products first, e.g. "Precision Hard Goods, Designed & Machined in Sanger, Texas." |
| A-10 | index.html:101–106 | Hero body opens "…is a precision CNC manufacturing operation" — a reviewer reads the noun, not the verb "design" buried mid-sentence. | FIX | Rewrite per §5 hero direction. |
| A-11 | index.html:27–45 | Schema.org `LocalBusiness` with `priceRange: "$$"` frames the company as a local service business. | NICE | Switch to `Organization`/`Brand`, drop priceRange. |

### Lens B — Strategy v3 conformance

**One brand.** [DIRECT via prompt, STRATEGY.md §14: "no sub-brand names, ever"] — 37 sub-brand references exist across HTML/CSS/JS/assets [VERIFIED via grep]. Principal instances:

| ID | Page/File:Line | Finding | Severity | Recommendation |
|----|----------------|---------|----------|----------------|
| B-01 | brands.html (entire file) | Dedicated sub-brand page: Stratum Edge Co., Highpoint Trailworks, Cold Bore Collective, plus two "COMING SOON" brands (lines 187–208), each with logo, copy, and "Visit Store" links. | BLOCKER | Delete page; 301 `/brands` → `/`. |
| B-02 | index.html:217–254 | Homepage "Three Brands. One Standard." portfolio section + brand tab switcher. | BLOCKER | Replace with single-brand product-line strip (§5). |
| B-03 | index.html:63, 78, 108; footer on all 6 pages | "Brands" nav links and "Our Brands" footer links sitewide. | BLOCKER | Remove nav/footer entries. |
| B-04 | index.html:125–127 | Stat bar "3 / BRANDS". | BLOCKER | Replace stat (§5). |
| B-05 | index.html:7, 10 vs. brands.html:7, 73 | "five consumer brands" (index meta) vs. "3 BRANDS" (stat bar) vs. "Five brands, one shop" (brands meta) — internally inconsistent *and* all non-compliant. | BLOCKER | Removed with the sub-brand purge. |
| B-06 | about.html:94 | "Every product sold under the Waypoint family of brands…" | BLOCKER | "…sold under the Waypoint name…" |
| B-07 | contact.html:131–148 | "Product Support" sidebar linking all three sub-brand storefronts. | BLOCKER | Remove; route support to info@ email. |
| B-08 | js/brands.js (entire file) | Brand names, taglines, domains, brand colors in JS. | BLOCKER | Delete file + its `<script>` tag (index.html:313). |
| B-09 | css/variables.css:18–21 | `--stratum-color`, `--highpoint-color`, `--coldbore-color` tokens. | FIX | Delete tokens. |
| B-10 | img/ (6 files) | `Stratum/Highpoint/Coldbore Logo Only Mockup.jpg`, `product-stratum-edge/highpoint/cold-bore.jpg` — brand names in deployed asset filenames. | FIX | Remove from deploy; product photos may be re-used un-branded if the parts are real Waypoint designs (Open Q #10). |
| B-11 | Repo root | `REPO_STRATEGY.md` (BigCommerce multi-storefront plan), `CLAUDE_CODE_PROMPT.md`, `CLAUDE.md`, `Brand Creative Brief.pdf` (6 MB) sit in the web root. Deployment method is "upload the entire project to public_html" [DIRECT, REPO_STRATEGY.md Deployment Notes], so superseded strategy docs — including all sub-brand names and the BC-era plan — are plausibly **publicly downloadable** at waypointmachineworks.com/REPO_STRATEGY.md etc. | FIX | Exclude non-site files from deploy (verify what's actually on the server — Open Q #8); per STRATEGY.md §16 remove superseded docs from the repo or move to a non-deployed /docs-archive. |

**Two revenue lines, one storefront.** The site predates the v3 model: there is no products page for the test-and-scale line and no Track A/Track B services articulation — wholesale.html conflates retail wholesale with contract work (A-03). This is a **gap, not a defect to fix here**: Phase 6 of STRATEGY.md §12 builds Products/Capabilities-hub/Wholesale/FAQ properly [DIRECT via prompt]. The interim page needs only the §5 outline, not Phase 6 content.

**Capability inflation** (contractual-representation standard; floor list per prompt = no lathe on floor ["ST-10 lathe" named as not-on-floor], no press brake, no 4th axis):

| ID | Page/File:Line | Finding | Severity | Recommendation |
|----|----------------|---------|----------|----------------|
| B-12 | index.html:166–169; about.html:146–149; capabilities.html:90–93 | "HAAS ST-20 CNC Lathe — 8" chuck, 20" max turning, 4,000 RPM, live tooling capable" claimed on three pages. Prompt lists an "ST-10 lathe" as *not on the floor*; the site claims a larger ST-20. [EST: no CNC lathe is on the floor — see Open Q #2] | BLOCKER | Remove all lathe claims until a lathe is installed. |
| B-13 | about.html:158–161; capabilities.html:105–109 | Press brake claimed with "custom forming dies." Prompt explicitly lists press brake as not on the floor. [DIRECT via prompt] | BLOCKER | Remove. |
| B-14 | capabilities.html:88 | VF-2 listed as "4th axis ready." 4th axis is not on the floor [DIRECT via prompt]; "ready" invites the inference. | FIX | Drop the phrase. |
| B-15 | index.html:120–122; capabilities.html:7, 11, 181–188 | Tolerance claims: `.001"` stat, "±0.001"" standard, "±0.0005"" critical features (also in page metadata). No measured artifact verifies these [EST]. | BLOCKER | Remove numeric tolerance claims until verified; "machined to drawing tolerances, inspected with Mitutoyo instruments" is honest. |
| B-16 | capabilities.html:189–192 | "Production Range: 1–500+ Units" — implies capacity far beyond a one-person shop running 10–25 unit batches [DIRECT via prompt]. | BLOCKER | State small-batch reality: "Small-batch production, typically 10–25 units per run." |
| B-17 | about.html:150–157; capabilities.html:95–104 | "Fiber laser 2–3kW cutter/welder" and "CNC plasma table 4'×8'" — not in the prompt's floor list either way; unverified. [EST] | FIX | Confirm with Jacques (Open Q #2); remove anything not installed. |
| B-18 | capabilities.html:161–170 | Finishing wall lists Cerakote, DLC coating, Type II/III anodize alongside footer/brand claims of "finished in-house" — DLC and anodize are almost certainly outsourced processes for a shop this size. [EST] | FIX | Keep only in-house finishes (tumble, bead blast, flame anodize?) or label outsourced ones as "via finishing partners." |
| B-19 | about.html:7 | Meta description still says "a single 30x40 building" — shop dimensions were deliberately removed from body copy (commit 6cf6998 "remove shop dimensions") but survive in metadata. | NICE | Scrub the meta. |
| B-20 | index.html:171–174 | Fiber laser card: "Deep etch & **serialization**." | FIX | See D-02. |

**Compliance surface:**

| ID | Page/File:Line | Finding | Severity | Recommendation |
|----|----------------|---------|----------|----------------|
| D-01 | brands.html:151–185; index.html:235–238 | Firearms brand content: "FIREARMS" category tab, "Cold Bore Collective," "muzzle devices, scope mounts, M-LOK accessories." The copy *does* include the right disclaimers ("No serialized parts. No NFA items. No FFL required" — brands.html:163–165), and the products named are machined accessories, inside the compliance standard. Goes away with B-01 regardless. | FIX | On the interim page, list the category as machined firearms *accessories* with the not-an-FFL/no-serialized-parts standard stated once. |
| D-02 | index.html:174 | "Serialization" as an advertised laser capability — in a firearms-adjacent context this implies marking serialized (regulated) parts. | FIX | Change to "part marking & engraving." |
| D-03 | Sitewide | No ITAR/CUI/defense solicitation and no published rates found. [VERIFIED — grep for rate/defense/ITAR terms and manual read] | — | Clean. Keep it that way. |

### Lens E — Interim-page mechanics

| ID | Page/File:Line | Finding | Severity | Recommendation |
|----|----------------|---------|----------|----------------|
| E-01 | contact.html:82; wholesale.html:89 | Both forms post to `https://formspree.io/f/YOUR_FORM_ID` — a placeholder. Every submission fails. An Autodesk reviewer (or wholesale buyer) who tries to make contact hits a dead form. | BLOCKER | Set the real Formspree ID or point at submit.php (Open Q #5). |
| E-02 | js/forms.js:18 vs. contact.html:110–113, wholesale.html:128–131; submit.php:17 | Honeypot mismatch: HTML field is `name="website"`, but forms.js and submit.php check `_gotcha`. The anti-spam honeypot is inert on both layers. | FIX | Align on one field name. |
| E-03 | js/forms.js:81–88 | `showMessage()` targets `.form-message`, which exists in **no** HTML file [VERIFIED via grep] — users never see success or error feedback. | FIX | Add the element to both forms. |
| E-04 | .htaccess:6–8 | Only `waypointmw.com` is 301'd to the primary domain. **No redirect rules exist for stratumedgeco.com, highpointtrailworks.com, or coldborecollective.com** — the prompt expects all sub-brand domains 301 → waypointmachineworks.com. Whether those domains even point at this hosting account is unverifiable from the repo. [EST] | FIX | If the domains are parked on Stellar Plus, add HTTP_HOST rules; if elsewhere, redirect at the registrar (Open Q #4). |
| E-05 | brands.html:99, 135, 171; contact.html:139–145; index.html:248 | Nine outbound links to the three sub-brand storefronts, which do not exist as live stores [EST]. Dead "Visit Store" links are exactly what makes a reviewer doubt the company is real. | BLOCKER | Removed with the sub-brand purge (B-01/B-07). |
| E-06 | All pages, og:image | `img/og-image.jpg` referenced on every page; file does not exist [VERIFIED — img/ listing]. Broken social/link previews. | FIX | Ship a real 1200×630 og-image in the interim pass. |
| E-07 | img/ | Page weight: about-portrait.jpg **1.77 MB**, about-shop.jpg **796 KB**, topo-bg.png **663 KB**; about.html serves ~3.3 MB of images with zero `loading="lazy"` [VERIFIED]. | FIX | Recompress/resize (target <200 KB each, WebP with JPG fallback), lazy-load below-fold. |
| E-08 | .htaccess:1–4, 19–23, 26–46 | HTTPS force-redirect, www-strip, security headers, caching, compression, custom 404, no directory listing: all present and correct. [VERIFIED] | — | Keep verbatim. |
| E-09 | sitemap.xml | Lists `/brands`; will need regeneration after the purge, and lastmod is stale (2026-03-16). | NICE | Regenerate with the interim page. |
| E-10 | submit.php | Orphaned server-side handler (nothing posts to it); functional but unwired, and its honeypot is also `_gotcha` (see E-02). | NICE | Wire it as the form action (no third-party dependency) or delete. |
| E-11 | CLAUDE.md | Claims GitHub Pages hosting and Formspree-only forms — contradicts the Stellar Plus reality and submit.php. Stale guidance will misdirect future sessions. | FIX | Rewrite CLAUDE.md after the interim pass (out of scope today). |

**Reviewer-contradiction check (Lens A ∩ E):** the application-facing risks a reviewer can hit in two clicks are E-05 (dead store links), A-01…A-07 (service solicitation), and E-01 (dead contact form). All are covered above; nothing else on the site contradicts a product-company application — the about-page narrative actively supports it.

---

## 3. Token delta table (Lens C)

Spec column: values stated in the audit prompt are marked [DIRECT via prompt]; everything else is **UNKNOWN** because STRATEGY.md §2 is unavailable (see discrepancy note). Structured for copy-forward into `assets/css/tokens.css` — fill the Spec column from STRATEGY.md §2 and the third column becomes the delta worklist.

| Token | Spec (STRATEGY.md §2) | Current value | File |
|-------|----------------------|---------------|------|
| Font — headings | Barlow Condensed [DIRECT via prompt] | Oswald | css/base.css:17; loaded on every page `<head>` |
| Font — body | Barlow / Inter (role split TBD from §2) [DIRECT via prompt] | Space Mono (body) + Source Serif 4 (long-form) | css/base.css:2, 31 |
| Font — mono/UI | JetBrains Mono [DIRECT via prompt] | Space Mono | css/base.css:2, 56; components.css:176, 628 |
| Spacing grid | 8px base [DIRECT via prompt] | Token file conforms: 0.5/1/2/4/6/8 rem = 8–128px multiples of 8 (variables.css:24–29). **But** ~40 inline `style=""` values across pages use 20px/60px/48px etc. off-grid | css/variables.css:24–29; inline styles in all .html |
| Color — background | UNKNOWN | `#F4F1EB` / alt `#EDEAE4` | variables.css:3–4 |
| Color — text | UNKNOWN | `#2C2C28`, `#555`, `#777`, `#999` | variables.css:7–10 |
| Color — accent | UNKNOWN | `#C4713B` (hover `#D8854E`) | variables.css:14–15 |
| Color — dark surfaces | UNKNOWN | `#2C2C28` / `#1E1E1C` | variables.css:5–6 |
| Color — borders | UNKNOWN | `#DDD8D0` / `#E8E4DD` | variables.css:11–12 |
| Sub-brand colors | **Must not exist** (one-brand rule) | `#B87333`, `#7A8B5C`, `#8B7355` | variables.css:19–21 — delete (B-09) |
| Radius | UNKNOWN | Effectively 0 sitewide; single `border-radius: 50%` decorative dot | components.css:403 |
| Motion | UNKNOWN (§2 motion rules unavailable) | 0.3s ease / 0.4s & 0.9s `cubic-bezier(0.16,1,0.3,1)` | variables.css:43–46 |
| Type scale | UNKNOWN | 11/13/15/18/24/32/36/42/72 px | variables.css:32–40 |

**Net Lens C verdict:** the font stack is a wholesale swap (three families → four different families); the spacing *tokens* already sit on the 8px grid but page markup bypasses them with inline styles; every color/radius/motion judgment is blocked on the real §2. The current palette is coherent and print-friendly — whether it survives depends entirely on the unavailable spec.

---

## 4. Migration ledger (Lens D)

KEEP bar = §14 voice [DIRECT via prompt]: no superlatives, name the machine (floor equipment only), full alloy designations, "Sanger, Texas," specs before story.

| Asset / Copy block | Verdict | Rationale |
|---|---|---|
| Materials data table (6AL-4V / 6061-T6 / 17-4 PH / C360 with use-cases) — index:192–213, capabilities:125–151 | **KEEP** | Exactly §14: full alloy designations, spec-first, zero adjectives. Verify KYDEX row belongs (capabilities:146–150). |
| "One Engineer. Every Product." + maker copy — about.html:83–103 | **KEEP** | "designed, programmed, machined, finished, and shipped by the same person… a real person making real things in a real shop" — honest, product-company-native, Autodesk-aligned. Swap "family of brands" phrase (B-06). |
| Equipment-card component pattern | **KEEP** | Name-the-machine format is §14-native — restock with floor-only equipment. |
| Topo background + coordinate motif (33.3518° N, 97.1742° W / SANGER, TX) | **KEEP** | Distinctive, literal "waypoint" identity; carries to Kadence build. |
| Waypoint-SVG.svg logo, favicon.svg | **KEEP** | Brand marks. |
| Shop/process photography (about-shop.jpg, about-parts.jpg, about-portrait.jpg) | **KEEP** | Real shop, real person — the strongest eligibility evidence on the site. Recompress first (E-07). |
| .htaccess | **KEEP** | Solid hygiene (E-08); add sub-brand domain 301s. |
| 404.html | **KEEP** | Fine as-is (minus footer Brands link). |
| Corner-bracket image frames, data-table/stat-bar/spec-block components | **KEEP** | Structural ideas worth porting to Phase 6. |
| Hero headline "Where Raw Billet Becomes Something Worth Carrying." | **REWRITE** | Right sensibility, but hero must name the products (Lens A); keep the billet-to-product arc in support copy. |
| Stat bar concept — index:115–132 | **REWRITE** | Keep the furniture; replace "3 BRANDS" and unverified ".001″ TOLERANCE" with honest stats (primary alloy, batch size, est. year, county). |
| "How We Work" approach copy — about:185–199 | **REWRITE** | Core is good; cut "compete with companies ten times its size" (superlative-adjacent) and keep "Made in Sanger, Texas. Made by the person who designed it." |
| Capabilities page structure (Equipment/Materials/Finishing/Specs) | **REWRITE** | Becomes Phase 6 Capabilities hub — floor equipment only, verified numbers only, no RFQ CTA. |
| Wholesale form + "What to Expect" sidebar | **REWRITE** | Keep form mechanics (minus A-03 options), fix honeypot/feedback (E-02/03); sidebar minus "contract manufacturing quoted per project." |
| Product category vocabulary from brands copy ("titanium EDC tools," "vehicle-specific accessories for Tacoma/4Runner/Bronco/Jeep," "muzzle devices, scope mounts, M-LOK") | **REWRITE** | Category language survives as the *one-brand* product-line strip; brand wrappers die. |
| brands.html page, brand tab system (js/brands.js), brand logos/marks | **KILL** | One-brand rule (§14). No salvage. |
| "Coming soon" camera/accessories brand teasers — brands:187–208 | **KILL** | Sub-brands + vaporware signaling. |
| "built to last longer than you'll carry it" (brands:94), "think about what goes in their pockets the same way an architect…" (brands:90–92) | **KILL** | Superlative/lifestyle-metaphor voice; fails §14. |
| Sub-brand color tokens | **KILL** | B-09. |
| "five consumer brands" metadata, "Three Brands. One Standard." | **KILL** | B-05. |
| submit.php | **REWRITE** | Wire it (fix honeypot) or delete for Formspree — Open Q #5. |

---

## 5. Recommended interim landing page (≤1 day build)

Approach: rework `index.html`, keep `about.html`/`capabilities.html`/`contact.html` with targeted scrubs, delete `brands.html` (301 → `/`), decide wholesale's fate (Open Q #6). No new architecture — this is copy surgery plus one new homepage section.

**§1 Hero** — *Intent: a reviewer's first five seconds say "product company."*
Label: `PRECISION HARD GOODS — DESIGNED & MACHINED IN SANGER, TEXAS`. Headline direction: "Titanium EDC tools. Firearms accessories. Vehicle and field hardware." Support line: "Designed, machined, and shipped from our own shop in Sanger, Texas — from raw billet to finished product, under one roof." CTAs: `See the Product Line` (anchor) / `About the Shop`. Keep coords, topo, ghost text.

**§2 Product line strip** — *Intent: Waypoint-designed products lead the hierarchy; honest about stage.*
Five category cards, no sub-brand names, no fake SKUs: Titanium EDC tools · Firearms accessories (machined accessories — not an FFL; no serialized parts) · Vehicle & overlanding hardware · Reloading tools · Camp & outdoor. Each: one spec-first line ("Machined from 6AL-4V Grade 5 titanium") + shared status line: **"First production batches in progress — direct sales opening soon."** [Per prompt: honest and sufficient; fabricate nothing.]

**§3 Shop & process proof** — *Intent: design+manufacture evidence for Lens A.*
about-shop.jpg full-bleed (recompressed), equipment cards restocked with **confirmed floor equipment only** (HAAS VF-2 confirmed; balance pending Open Q #2), then the materials data table verbatim (KEEP). Copy direction: "Every product starts as a CAD model and ends as a machined part — same building, same hands."

**§4 Engineering capability, secondary** — *Intent: services exist but sit behind the product line, per strategy hierarchy.*
One short block, no RFQ language: "The same engineering and machining capability behind Waypoint products is available to select partners." Link to capabilities page. No quote CTA, no rates, no "your parts."

**§5 About-in-brief** — *Intent: the one-engineer story is the credibility engine.*
Portrait + three sentences from the KEEP block (about:93–98). Link to full About.

**§6 Contact** — *Intent: a working contact path (fixes E-01).*
Real form endpoint + visible `form-message` feedback + aligned honeypot, or a plain `info@waypointmachineworks.com` mailto if the endpoint decision is pending. Footer: drop "Our Brands," keep coordinates.

Mechanics bundled into the same day: brands.html 301, sitemap regen, og-image, image compression, honeypot/feedback fix, sub-brand color token deletion.

---

## 6. Open questions for Jacques

1. **Where does STRATEGY.md v3.x live?** It's not in this repo, its history, or Drive. The audit ran on the prompt's embedded quotes; Lens C's spec column and §14's full guardrail text need the real document. Should it be committed to this repo (non-deployed folder) or is there a separate strategy repo this session can't see?
2. **Definitive floor list, today.** Prompt implies: VF-2 yes; ST-10 lathe no; press brake no; 4th axis no. The site claims an ST-20 lathe, 2–3kW fiber laser cutter/welder, CNC plasma table, blast cabinet & tumbler, fiber laser engraver, Mitutoyo instruments. Which of these are physically on the floor right now?
3. **Tolerance number:** is there any measured-artifact-verified tolerance to publish, or do we drop numerics entirely for the interim page?
4. **Sub-brand domains** (stratumedgeco.com, highpointtrailworks.com, coldborecollective.com): still registered? Pointed where? 301s belong in .htaccess only if they resolve to Stellar Plus; otherwise registrar-level forwarding.
5. **Form backend:** real Formspree ID, or wire the existing submit.php (no third party, needs the honeypot fix)? One decision, five-minute implementation either way.
6. **Wholesale page during the application window:** scrub it (remove contract/private-label, keep retail wholesale) or 301 → contact until Phase 6 builds it properly?
7. **Firearms category label on the interim page:** "Firearms accessories" (accurate, currently used) vs. softer phrasing for host AUP comfort — Namecheap AUP review risk is low for accessories-only, but it's your name on the account.
8. **Public web root contents:** confirm whether REPO_STRATEGY.md, CLAUDE_CODE_PROMPT.md, and Brand Creative Brief.pdf were uploaded to public_html with the site (B-11). If yes, delete from the server today — independent of the audit.
9. **og-image:** is there an approved 1200×630 asset, or should the interim pass compose one from the shop photography?
10. **Product photos** (`product-*.jpg`): are these real Waypoint-designed parts? If so they can be reshot/renamed and used un-branded in the product line strip; if mockups, they're out.
11. **Finishing claims:** which finishes are genuinely in-house (tumble/blast/flame anodize?) vs. outsourced (Cerakote, DLC, Type II/III anodize)? Determines B-18 wording.

---

*Audit performed 2026-07-19 against commit 86e636d. Label key: [DIRECT] quoted from a strategy document (via the audit prompt where noted), [VERIFIED] confirmed by direct inspection in this session, [EST] estimated/assumed, pending confirmation.*
