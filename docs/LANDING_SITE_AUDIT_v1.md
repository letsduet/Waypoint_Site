# Waypoint Machine Works — Legacy Landing Site Audit v1

**Date:** 2026-07-19
**Auditor:** Claude Code (review-only session)
**Audit basis:** `Waypoint_Landing_Site_Review_Prompt_v1.md` v1.0, run against repo `letsduet/Waypoint_Site` @ `685aba9`
**Deliverable status:** Complete, with one material caveat (§0)

---

## 0. Material caveat — the audit subject is not in this repo

Two facts change the shape of this audit. Neither is silently resolved; both are reported per session rules.

1. **The required reading does not exist in this repo.** `STRATEGY.md` (v3.x) and `RECONCILIATION_LOG.md` are absent from the working tree and from all git history (4 commits, 6 files total, ever). Every strategy-derived criterion in this report is therefore applied from the audit prompt's own restatement of those documents and is labeled **EST**, not DIRECT. No quotation from STRATEGY.md was possible. **(EST)**

2. **The legacy static site does not exist in this repo.** There is no `index.html`, `about.html`, `capabilities.html`, `brands.html`, `wholesale.html`, `contact.html`, no `css/`, `js/`, or `img/` directories, and no `.htaccess` — in the working tree or anywhere in history. **(VERIFIED** — `git ls-tree -r origin/main` and full-history inspection.**)** If a site is live at waypointmachineworks.com on Stellar Plus, its source is not under version control here. The audit prompt's page-by-page inventory was therefore run against what the repo actually contains: two React landing-page mockups, two superseded planning documents, a brand deck PDF, and a one-line README.

**Consequence:** The question "is the current site usable as-is?" cannot be answered from this repo alone. What *can* be answered — and is, below — is whether the design/content direction encoded in this repo is usable, and the answer is no without a rebuild: everything here is BigCommerce-era, multi-brand, and services-forward.

---

## 1. Executive summary

1. The repo contains **no deployable site** — only pre-pivot mockups and planning docs. A "one-day content pass" is impossible; there are no site files to pass over. **(VERIFIED)**
2. **Recommendation: build the interim landing page fresh** (outline in §5, scoped ≤1 day), rather than adapting any file here.
3. Every substantive file in the repo violates the one-brand rule: named sub-brands (Stratum Edge, Highpoint Trailworks, Cold Bore Collective) appear in copy, code, URLs, and a filename. **(VERIFIED, Lens B)**
4. The Waypoint mockup's identity is services-first — "precision CNC manufacturing operation," "contract machining inquiries welcome," wholesale-forward CTAs — exactly the framing that triggers Autodesk's service-provider exclusion. **(VERIFIED, Lens A)**
5. Capability claims exceed the floor: a Haas ST-20 lathe, press brake, CNC plasma table, and "500+ unit" capacity appear in repo content. **(VERIFIED as claims; floor list is EST from prompt)**
6. Location is internally contradictory: Muenster, TX (with coordinates) throughout both mockups vs. Sanger, TX in the prompt and one footer line. **(VERIFIED discrepancy)**
7. No ITAR/CUI/defense solicitation and no published service rates were found. Firearms exposure is limited to a sub-brand name/description and a "muzzle devices" line in a superseded doc — both flagged. **(VERIFIED)**
8. Design tokens: only JetBrains Mono survives contact with the §2 spec (Barlow / Barlow Condensed / Inter / JetBrains Mono, EST). Full delta in §3.
9. Lens E (redirects, HTTPS, forms, page weight) is **unverifiable from this repo** — no `.htaccess`, no live forms. Requires a live-host check (§6, Q1).
10. **Before the Autodesk application is submitted, someone must look at what is actually live at waypointmachineworks.com** — this repo is not it, and whatever is live is the reviewer's evidence.

---

## 2. Inventory (Step 1)

| File | Type | Purpose | Key claims / content | Internal links | Disposition |
|---|---|---|---|---|---|
| `README.md` | Markdown, 1 line | Repo title only ("# Waypoint_Sites") | None | None | Rewrite when repo becomes the interim-site repo |
| `REPO_STRATEGY.md` | Markdown, 176 lines | BC-era multi-repo architecture plan: 6+ repos, one per sub-brand BigCommerce storefront | BigCommerce Stencil, sub-brand storefront repos (`stratum-edge-storefront`, `highpoint-trailworks-storefront`, `cold-bore-storefront`, future camera/accessories brands) | N/A | Superseded material (audit subject only) |
| `CLAUDE_CODE_PROMPT.md` | Markdown, 389 lines | BC-era build spec for the 6-page static corporate site | 5-brand portfolio, contract manufacturing & private-label lead capture, equipment list incl. ST-20 / press brake / plasma, ±0.0005" tolerances, 500+ unit capacity, "muzzle devices" | Specifies the 6 HTML pages that were never committed here | Superseded material (audit subject only) |
| `waypoint-landing.jsx` | React mockup, 815 lines | Waypoint corporate landing page design (state: not deployable — JSX, no build tooling in repo) | "Precision CNC manufacturing operation," 3 named sub-brands with store URLs, "Three Brands. One Standard.", ST-20, .001" tolerance, Muenster TX + coordinates, contract machining welcome | All nav/footer links are `href="#"` stubs | Salvage tokens/section ideas only (§4) |
| `stratum-edge-landing.jsx` | React mockup, 907 lines | Sub-brand (Stratum Edge Co.) storefront landing design | Product cards with prices ($32–$149, incl. a "SOON" item), "RUN #001," Muenster TX, "A WAYPOINT MACHINE WORKS BRAND," 0.001" tolerance, cart/email-capture UI | `href="#"` stubs | Sub-brand asset — retire entirely; salvage voice/structure ideas only |
| `Brand Creative Brief.pdf` | PDF, 17 pp, 6.1 MB | Brand deck | **Unreviewable in this environment** — no text layer, no extractable raster images (vector export). Contents unknown. **(VERIFIED unreviewable; contents EST)** | N/A | Needs manual review (§6, Q6) |
| CSS / JS / `.htaccess` | — | — | **Absent from repo** | — | N/A |

---

## 3. Findings table (Step 2)

Severity: **BLOCKER** = plausibly triggers Autodesk service-provider exclusion, violates one-brand rule, or is a capability/compliance misrepresentation. **FIX** = should change before the application window. **NICE** = cleanup.

| ID | Page/File:Line | Lens | Finding | Severity | Recommendation |
|---|---|---|---|---|---|
| F-01 | repo root (all history) | A/E | No deployable site exists in the repo; the "valid company website" for the Autodesk application has no version-controlled source here | **BLOCKER** | Build interim page (§5) in this repo; confirm what is currently live (§6 Q1) |
| F-02 | `waypoint-landing.jsx:315-318` | A | Hero identity: "precision CNC manufacturing operation… premium hard goods across multiple brands" — manufacturer-of-services framing, multi-brand | **BLOCKER** | Replace with product-company hero: Waypoint-designed titanium EDC / vehicle / outdoor products, designed and machined in Sanger, Texas |
| F-03 | `waypoint-landing.jsx:281` | A | Eyebrow "PRECISION CNC MANUFACTURING — EST. 2026" leads the page with a services descriptor | **BLOCKER** | Lead with product line; capability moves below the fold as "engineering behind the products" |
| F-04 | `waypoint-landing.jsx:676` | A | "Retailers, distributors, and **contract machining inquiries** welcome" — direct job-shop solicitation | **BLOCKER** | Remove contract-machining solicitation from interim page entirely |
| F-05 | `waypoint-landing.jsx:322-323` | A | Both hero CTAs are "OUR BRANDS" / "WHOLESALE INQUIRY" — no product path, B2B-first | **BLOCKER** | Primary CTA → product line; secondary → contact |
| F-06 | `waypoint-landing.jsx:30-52` | B | `brands` array names Stratum Edge Co., Highpoint Trailworks, Cold Bore Collective with live store URLs | **BLOCKER** | Delete; one-brand rule (STRATEGY.md §14, EST) |
| F-07 | `waypoint-landing.jsx:542-646` | B | Entire "Brand Portfolio" section incl. "Three Brands. One Standard." (`:563`) and "VISIT STORE →" (`:642`) | **BLOCKER** | Delete section |
| F-08 | `waypoint-landing.jsx:339` | B | Stats bar advertises "3 BRANDS" | **BLOCKER** | Delete stat |
| F-09 | `waypoint-landing.jsx:214`, `:761` | B | Nav item "BRANDS" and footer link "Our Brands" | **BLOCKER** | Delete |
| F-10 | `stratum-edge-landing.jsx` (whole file) | B | Complete sub-brand storefront design; footer `:847` "A WAYPOINT MACHINE WORKS BRAND", `:891` "© 2026 STRATUM EDGE CO." | **BLOCKER** | Retire file (archive outside site repo); do not deploy any part under sub-brand identity |
| F-11 | `stratum-edge-landing.jsx` (filename) | B | Asset filename itself carries a sub-brand name | FIX | Remove/rename on cleanup; prompt forbids sub-brand names in asset filenames (EST, §14) |
| F-12 | `REPO_STRATEGY.md:38-62` | B | Repo map institutionalizes sub-brand storefront repos and BigCommerce multi-storefront architecture | FIX | Superseded; move to an archive location so it can't be mistaken for guidance |
| F-13 | `CLAUDE_CODE_PROMPT.md:80-94, 145-159, 214` | B | Build spec mandates 5-brand portfolio pages, brand cards, footer brand links | FIX | Superseded; archive. If the live site was built from this spec, the live site inherits every BLOCKER in this table (§6 Q1) |
| F-14 | `waypoint-landing.jsx:56` | B (capability) | "HAAS ST-20 CNC Lathe, 20\" swing, 2\" bar" — lathe not on the floor (floor list EST from prompt: no lathe, no press brake, no 4th axis) | **BLOCKER** | Remove until the machine is on the floor; contractual-representation standard |
| F-15 | `CLAUDE_CODE_PROMPT.md:101-108` | B (capability) | Equipment list incl. ST-20, CNC plasma table, press brake, 2–3 kW fiber laser welder | FIX (superseded doc) | Do not carry forward; interim page lists floor equipment only |
| F-16 | `waypoint-landing.jsx:339`; `stratum-edge-landing.jsx:743`; `CLAUDE_CODE_PROMPT.md:137-139` | B (capability) | Tolerance claims (".001\"", "±0.0005\" critical") with no measured-artifact verification on record (EST) | **BLOCKER** if published unverified | Publish no tolerance number until backed by a measured artifact; or phrase as equipment capability, attributed |
| F-17 | `CLAUDE_CODE_PROMPT.md:140` | B (capability) | "Production range: Prototype (1-off) through mid-volume (500+ units)" vs. one-person 10–25 unit batch reality (EST) | **BLOCKER** if carried forward | State honest batch scale: "small production batches (10–25 units)" |
| F-18 | `waypoint-landing.jsx:447` | B (capability) | "No outsourcing, no contract shops, no compromise" — absolute claim + superlative-adjacent voice | FIX | Rewrite factual: "designed, programmed, and machined in-house" |
| F-19 | `CLAUDE_CODE_PROMPT.md:124` | B (compliance) | Materials table lists "muzzle devices" as a stainless application | FIX | Do not carry forward. Keep to the standard: machined accessories only; not an FFL; no firearms, receivers, serialized parts, ammunition (EST) |
| F-20 | `waypoint-landing.jsx:48`; `CLAUDE_CODE_PROMPT.md:88` | B (compliance) | "Cold Bore Collective — Precision firearms accessories" — firearms-branded sub-brand named on the corporate site | **BLOCKER** (one-brand + AUP surface) | Delete with the rest of the portfolio; firearms *accessories* as a product category can remain, unbranded and clearly accessory-only |
| F-21 | `CLAUDE_CODE_PROMPT.md:172` | A/B | Wholesale form inquiry types: "Contract Manufacturing," "Private Label / White Label" | **BLOCKER** if live | Interim page's contact form takes general + wholesale interest only, no contract-manufacturing category during application window |
| F-22 | `waypoint-landing.jsx:265-267, 748, 792` vs `:807` and prompt | A/B | Location conflict: "MUENSTER, TX" + coordinates 33.6518°N 97.3742°W (Cooke County) in 5+ places vs. "SANGER, TX" in same file's footer bottom bar; strategy says Sanger (EST). Discrepancy reported, not resolved | FIX | Confirm with Jacques (§6 Q3); one location everywhere, with correct county/coords |
| F-23 | `stratum-edge-landing.jsx:40-44` | A | Product cards with prices for items incl. a "SOON" tag — risks fabricated-product optics | FIX | Interim page shows real product categories with "first production batches in progress"; no prices for unshipped SKUs |
| F-24 | `stratum-edge-landing.jsx:270` | E | Announcement bar "FREE SHIPPING ON ORDERS OVER $150" — commerce promise with no storefront | NICE (mockup) | Do not carry forward |
| F-25 | `.htaccess` (absent) | E | Cannot verify sub-brand-domain 301s, HTTPS enforcement, security headers, or form posting targets from this repo | FIX (verification gap) | Live-host check; ensure stratumedgeco.com / highpointtrailworks.com / coldborecollective.com (if registered) 301 → waypointmachineworks.com |
| F-26 | `waypoint-landing.jsx:76`; `stratum-edge-landing.jsx:55` | C/E | Google Fonts via CSS `@import` — render-blocking, third-party dependency, and non-spec families | NICE | Interim page: `<link rel="preconnect">` + spec families only, or self-host |
| F-27 | `Brand Creative Brief.pdf` | B | 17-page brand deck unreviewable here (no text layer); may contain sub-brand marks | FIX (verification gap) | Manual review before any asset from it is reused (§6 Q6) |
| F-28 | `waypoint-landing.jsx:281, 804` | D | "EST. 2026" / "© 2026" — plausible but unverified formation date | NICE | Confirm; a wrong founding date is an easy credibility ding for a reviewer |

**Not found (searched for, absent — good):** ITAR/CUI/defense-work solicitation; published hourly/service rates; serialized-parts or receiver content; ammunition content. **(VERIFIED)**

---

## 4. Token delta table (Lens C)

**Caveat:** STRATEGY.md §2 is unavailable (§0). Spec fonts and structural rules are EST from the audit prompt; spec **values** for color/radius/motion are UNKNOWN and left as fill-in slots so this table can seed `assets/css/tokens.css` in the Kadence child theme.

| Token | Spec value (STRATEGY.md §2) | Current value | File |
|---|---|---|---|
| `--font-display` | Barlow Condensed (EST) | Oswald | `waypoint-landing.jsx:76` |
| `--font-display` | Barlow Condensed (EST) | Bebas Neue | `stratum-edge-landing.jsx:55`, `CLAUDE_CODE_PROMPT.md:38` |
| `--font-heading` | Barlow (EST) | Oswald / Chakra Petch | both mockups |
| `--font-body` | Inter (EST) | Source Serif 4 / Space Mono / Chakra Petch | `waypoint-landing.jsx:76`, `stratum-edge-landing.jsx:55` |
| `--font-mono` | JetBrains Mono (EST) | JetBrains Mono ✔ (stratum mockup only); Space Mono (waypoint mockup) | `stratum-edge-landing.jsx:55` / `waypoint-landing.jsx:76` |
| `--color-bg` | *UNKNOWN — fill from §2* | `#F4F1EB` (waypoint) / `#0D0D0D` (stratum) | `waypoint-landing.jsx:71`, `stratum-edge-landing.jsx:50` |
| `--color-ink` | *UNKNOWN* | `#1A1A18` / `#2C2C28` (waypoint); `#E8E4DE` (stratum) | mockups |
| `--color-accent` | *UNKNOWN* | `#B87333` copper (stratum, and waypoint's Stratum tab); `#C4802D` (superseded prompt) | `stratum-edge-landing.jsx:61`, `CLAUDE_CODE_PROMPT.md:48` |
| `--color-surface` | *UNKNOWN* | `#EDEAE4`, `#E8E4DD`, `#2C2C28`, `#1E1E1C` (waypoint); `#161616`, `#222` (stratum) | mockups |
| `--space-*` (8px scale) | 8px base grid (EST) | Mixed: 8px-multiples alongside off-grid values (6, 10, 14, 18, 20, 28, 36px paddings) | throughout both mockups; `CLAUDE_CODE_PROMPT.md:321-329` *does* define a clean 8px scale |
| `--radius` | *UNKNOWN* | 0 (square corners) except `border-radius: 50%` decorative circles, 2px scrollbar | mockups |
| Motion | *UNKNOWN rules* | 0.8–0.9s fade-up on IntersectionObserver, translateY 30–40px, cubic-bezier(0.16,1,0.3,1); hover translateY(-1 to -4px); scroll-linked rotation | `waypoint-landing.jsx:82-90`, `stratum-edge-landing.jsx:63-71, 294` |

**Net:** nothing in the implemented CSS can be assumed conformant except JetBrains Mono usage in one mockup and the superseded prompt's 8px spacing scale. Treat tokens as green-field for the interim page; fill the UNKNOWN rows from STRATEGY.md §2 before writing `tokens.css`.

---

## 5. Migration ledger (Lens D)

KEEP bar (EST, STRATEGY.md §14): no superlatives; name the machine (floor equipment only); full alloy designations; "Sanger, Texas"; specs before story.

| Item | Source | Verdict | Rationale |
|---|---|---|---|
| Materials table with full alloy designations (6AL-4V, 6061-T6, 17-4 PH, C360) | `waypoint-landing.jsx:61-66` | **KEEP** | Exactly the §14 voice: designation, name, use — carry structure and data into Phase 6 Materials page |
| Equipment spec-card format (machine name + type + envelope spec) | `waypoint-landing.jsx:54-59` | **REWRITE** | Format is right; contents must shrink to floor equipment only (drop ST-20, F-14) |
| "Designed, programmed, fixtured, and machined by one person… same hands, same building" | `stratum-edge-landing.jsx:596-600` | **REWRITE** | The honest one-person provenance story is the strongest copy in the repo; rebrand to Waypoint, Sanger, drop "No overseas. No middlemen." punchiness to plain fact |
| Hero line "Where Raw Billet Becomes Something Worth Carrying" | `waypoint-landing.jsx:293-303` | **REWRITE** | Product-adjacent and evocative without superlatives, but must be re-anchored to Waypoint-designed products, not the machining operation |
| Spec-readout aesthetic (mono eyebrows, datum marks, coordinates, "RUN #001" batch language) | both mockups | **KEEP** (idea) | Distinctive, honest, machinist-literate; batch numbering ("Run #") dovetails with "first production batches in progress" |
| Trust-strip pattern (origin / alloy / machine / shipping) | `stratum-edge-landing.jsx:399-418` | **REWRITE** | Good compact proof bar; entries must be floor-true and Sanger-true |
| "No stock photos — honest placeholders until real shop photography" principle | `CLAUDE_CODE_PROMPT.md:59-61, 385` | **KEEP** (principle) | Aligns with §14 honesty; the only part of the superseded prompt worth quoting |
| 8px spacing scale + container/breakpoint scaffold | `CLAUDE_CODE_PROMPT.md:309-340` | **KEEP** (structure) | Conforms to 8px token rule; values portable into `tokens.css` |
| `.htaccess` template (HTTPS force, clean URLs, security headers, caching) | `CLAUDE_CODE_PROMPT.md:269-303` | **REWRITE** | Sound mechanics for Stellar Plus; add sub-brand-domain 301s, verify header module availability |
| Photography | (none exists — placeholders only) | — | Nothing to migrate; real shop photos are the single highest-leverage content gap for Autodesk credibility |
| Brand portfolio section, brand tabs, "Three Brands. One Standard." | `waypoint-landing.jsx:542-646` | **KILL** | One-brand rule (F-06/F-07) |
| Stats "3 BRANDS", "OUR BRANDS" nav/CTAs | `waypoint-landing.jsx:214, 322, 339` | **KILL** | One-brand rule |
| Contract machining / private-label solicitation | `waypoint-landing.jsx:676`; `CLAUDE_CODE_PROMPT.md:165-172` | **KILL** | Autodesk exclusion trigger (F-04, F-21) |
| Entire Stratum Edge storefront design as a brand property | `stratum-edge-landing.jsx` | **KILL** | Sub-brand (F-10); salvage only the two REWRITE/KEEP ideas above |
| "Muzzle devices" materials line | `CLAUDE_CODE_PROMPT.md:124` | **KILL** | Compliance surface (F-19) |
| Muenster, TX + coordinates | both mockups | **KILL** | Location per strategy is Sanger, Texas (EST; confirm §6 Q3) |
| Tolerance stats (.001" / ±0.0005") | mockups + prompt | **KILL** (until measured) | Contractual-representation standard (F-16) |
| 500+ unit capacity claim | `CLAUDE_CODE_PROMPT.md:140` | **KILL** | Capacity misrepresentation (F-17) |
| REPO_STRATEGY.md multi-repo plan | whole file | **KILL** (archive) | Superseded platform architecture |

---

## 6. Recommended interim landing page outline (Lens A-compliant, ≤1 day)

Single `index.html` + one CSS file + `.htaccess`, static, no JS beyond optional nav toggle. Every section is buildable with text and existing/placeholder imagery — no new assets block launch.

1. **Hero — the company designs products.**
   Intent: an Autodesk reviewer's 5-second read is "product company."
   Direction: "Waypoint Machine Works designs and machines titanium EDC tools and vehicle, reloading, and camp hardware in Sanger, Texas. First production batches in progress." Primary CTA → product line strip; secondary → contact. No "manufacturing services," no quote language, no tolerance stat.

2. **Product line strip.**
   Intent: make the product identity concrete without fabricating SKUs.
   Direction: five category cards — titanium EDC tools · firearms accessories (accessories only) · vehicle & overlanding · reloading · camp & outdoor — each one line of what's being designed, tagged "Run #001 — in progress" where true. No prices. No store links.

3. **Shop / process proof.**
   Intent: credibility through specifics, positioned as engineering capability *behind the product line* — never as a service offer.
   Direction: floor equipment only, named (per §14); materials table with full alloy designations (6AL-4V titanium, 6061-T6 aluminum, 17-4 PH stainless, C360 brass); design-to-machining workflow in one sentence ("designed in CAD/CAM, programmed and machined in-house"). No tolerances until measured; no capacity claims.

4. **About in brief.**
   Intent: real person, real shop, provenance.
   Direction: 2–3 sentences — engineer-founder, one-person shop in Sanger, Texas, designs every product and runs every machine. Specs before story; no life story, no superlatives.

5. **Contact.**
   Intent: single low-key channel; wholesale interest allowed, services solicitation absent.
   Direction: email link or minimal form (name / email / message, honeypot). "Retail and wholesale interest in the product line welcome." No inquiry-type dropdown, no "request a quote."

Footer: legal name, "Sanger, Texas," © year — nothing else. `.htaccess`: HTTPS force, security headers, sub-brand-domain 301s (if domains are registered), custom 404.

Estimated effort: 0.5–1 day including deploy to Stellar Plus.

---

## 7. Open questions for Jacques

1. **What is currently live at waypointmachineworks.com?** This repo has no site source. If something built from `CLAUDE_CODE_PROMPT.md` is live, it carries the multi-brand + contract-machining framing an Autodesk reviewer will see. Need the live source (or FTP snapshot) before the application goes in.
2. **Where do STRATEGY.md v3 and RECONCILIATION_LOG.md live?** They're not in this repo, so this audit's strategy criteria are EST from the prompt. Should they be added here (or the interim site moved to the repo that has them)?
3. **Sanger vs. Muenster.** Mockups say Muenster, TX (Cooke Co., 33.6518°N 97.3742°W) throughout; strategy and one footer line say Sanger (Denton Co.). Which is the shop's actual current location? (Business decision + a facts question — the site must state one.)
4. **Sub-brand domains** (stratumedgeco.com, highpointtrailworks.com, coldborecollective.com): which are actually registered? Registered ones need 301s to waypointmachineworks.com; unregistered ones should not be referenced anywhere.
5. **Floor equipment truth list.** The prompt implies the ST-10/press brake/4th axis are *not* on the floor; the mockups claim an ST-20. Please confirm exactly what is on the floor today (VF-2? fiber laser? inspection equipment?) so the interim page names machines truthfully.
6. **Brand Creative Brief.pdf** could not be read in this environment (vector-only, no text layer). Does it contain sub-brand marks or claims that need the same retirement treatment?
7. **Formation date** — is "EST. 2026 / © 2026" correct for the LLC?
8. **Disposition of superseded files** (`REPO_STRATEGY.md`, `CLAUDE_CODE_PROMPT.md`, the two `.jsx` mockups, the PDF): archive branch, `/archive` directory, or delete? They currently sit at repo root where a future session could mistake them for guidance — the exact failure mode the prompt's Note 3 warns about.

---

## Appendix — label key

- **VERIFIED** — checked directly against repo contents / git history in this session.
- **EST** — sourced from the audit prompt's restatement of strategy documents that are absent from this repo, or otherwise estimated.
- **DIRECT** — none used; no strategy document was available to quote (see §0).
