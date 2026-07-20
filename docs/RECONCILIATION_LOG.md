# Reconciliation Log — Documentation Update v2.0
**Date:** July 7, 2026
**Scope:** `CLAUDE.md` (v1 → v2.0), `REPO_STRATEGY.md` (v1 → v2), `CLAUDE_CODE_PROMPT.md` (→ superseded marker)
**Rule applied:** newest confirmed decision wins; every conflict logged here rather than silently overwritten.

> (Provided by owner 2026-07-19; committed to this repo for session context. The `CLAUDE.md`
> referenced in this log is the WooCommerce/BigCommerce-era project doc, not this repo's
> `CLAUDE.md`.)

The document set spanned three vintages: (A) the static-site / multi-storefront era
(`CLAUDE_CODE_PROMPT.md`, `REPO_STRATEGY.md` v1, `BigCommerce_Development_Plan.md`,
`Waypoint_Site_Architecture.docx`); (B) the April 2026 single-storefront-with-sub-brand-
collections era (`CLAUDE.md` v1); and (C) the current single-brand test-and-scale strategy
(July 2026 platform re-evaluation + business brief). The business brief supplied for this
update is itself mixed-vintage — it contains both current facts and items that predate later
decisions. Where the brief conflicted with newer confirmed decisions, the newer decision won
and the conflict is logged below.

---

## 1. Resolved by newest decision (documents updated)

| # | Item | Conflicting positions | Resolution in v2.0 | Basis |
|---|---|---|---|---|
| 1.1 | Brand architecture | Brief + CLAUDE.md v1: sub-brands as named product-line collections, one "legally a separate LLC." Vintage-A docs: five separate storefronts. | ONE brand. Sub-brand identities retired to reserve as spin-out vehicles only; no sub-brand names anywhere on the storefront; categories are functional (EDC / Firearms / Reloading / Vehicle & Overlanding / Camp & Outdoor). | July 2026 strategy decision |
| 1.2 | Payment architecture | CLAUDE.md v1 §8/§16 and the brief: firearms SKUs route to Authorize.Net, everything else on BC default, via "BC Payment Method Rules." | **The routing mechanism does not exist** — BigCommerce runs one active credit-card gateway per store. Entire catalog runs on a single firearms-friendly Authorize.Net merchant account (two written quotes; full catalog disclosed at underwriting). No PayPal/Braintree/Stripe/Square anywhere. | Platform re-evaluation, July 7, 2026 — factual error in v1 |
| 1.3 | OTF knife ("The Shift") | Brief: FTO search recommended. CLAUDE.md v1: "hold until FTO clearance completes." | **Shelved.** FTO research archived; not in the test-batch pool. No PDP, category, or teaser. | Recent decision (post-dates brief) |
| 1.4 | Batch sizes / production model | CLAUDE.md v1 §16: "batch sizes in the 40–200 range per SKU." | Test batches of **10–25 units**; proven SKUs rerun at velocity-determined quantities. SKU add/kill is weekly and must stay a two-minute operation. | July 2026 test-and-scale strategy |
| 1.5 | Product import plan | CLAUDE.md v1 §11: three fixed waves over 14 months from Tier1 catalog (24 SKUs), Wave 2 gated on a "Firearms category payment rule." | Rolling test-batch cadence sourced from `Product_Ideas_Master_v10_SmallBatch.xlsx` (731 rows, seven-criterion scoring). Firearms cohort gated on the merchant account being live. Tier1 catalog marked historical. | July 2026 strategy |
| 1.6 | Reviews | CLAUDE.md v1 §6.2: Judge.me or Stamped.io. | BC native reviews + Klaviyo review-request flow at +14 days. Third-party platform deferred until volume justifies it. | Platform re-evaluation |
| 1.7 | Email platform | v1: "Klaviyo or BC native," Mailchimp in vintage-A docs. | Klaviyo, free tier, explicitly. Mailchimp excluded (deactivation risk for firearms-adjacent senders). No SMS at launch (SHAFT compliance overhead). | Platform re-evaluation |
| 1.8 | Repo structure | REPO_STRATEGY v1: seven repos. Brief: "separate Git repos per site." | Two repos: `waypoint-theme` and `waypoint-ops`, with separately-scoped BC API credentials. Old repos archived, not deleted. | Follows from 1.1 |
| 1.9 | Corporate site | CLAUDE_CODE_PROMPT.md: full 6-page static HTML site on Namecheap Stellar Plus. Brief: "to be rebuilt entirely on BigCommerce." | Static site retired; content absorbed into BC custom page templates. `CLAUDE_CODE_PROMPT.md` replaced with a superseded marker. | Both sources agree |
| 1.10 | Theme identity | Brief: "Cornerstone Bold recommended." CLAUDE.md v1: forked Cornerstone, custom `waypoint` variation, tokens implemented. | Keep the existing `waypoint` Cornerstone fork; the brief's recommendation predates the fork work. | Existing work wins over stale recommendation |
| 1.11 | New lifecycle metadata | Not present in any prior document. | `batch` and `status` (test-batch / proven / retiring) custom fields; batch/status callout component; kill = hide-never-delete; low-stock thresholds at rerun-decision quantity; weekly read-only Python velocity workbook against BC Orders API. | Platform re-evaluation |
| 1.12 | Ops stack | Scattered/absent in v1. | CLAUDE.md §9: ShipStation (native), Zoho Books via Zoho Flow/Skylio (Zoho Inventory as upgrade path), manual per-channel stock allocation until a SKU is proven multichannel, no Zapier/Make. | Platform re-evaluation |
| 1.13 | Ownership structure | CLAUDE_CODE_PROMPT.md: generic "two passive family investors." Brief: co-Managing Members at 75%, investors 12.5% each, Let's Duet LLC holds the building. | Brief's version adopted. **Note:** Operating Agreement v2 draft names a sole Managing Member — co-MM structure requires an OA amendment; flagged for attorney/CPA. | Brief (current) + open legal item |
| 1.14 | Shop location error | CLAUDE_CODE_PROMPT.md referenced "Muenster, TX." | Sanger, TX (Denton County) everywhere. | Factual correction |
| 1.15 | Equipment claims in copy | CLAUDE_CODE_PROMPT.md and CLAUDE.md v1 §6.4/§12 reference the ST-20 lathe (and press brake) as present equipment. | ST-20 and press brake are future acquisitions. Brand-voice rule updated: only name equipment on the floor; future equipment listed as "planned" or omitted. | Brief (current equipment list) |

## 2. Items in the brief that appear to predate current state (no document change required)

| # | Brief says | More recent status | Note |
|---|---|---|---|
| 2.1 | "Proceeding with a 200A single-phase service application to CoServ… 2/0 AWG Cu… two 2" conduits" | 200A service **installed** — as-built was 4/0 Al direct-burial; burial depth, driveway conduit sleeve, and second-conduit upgrade path were open items at installation | Pre-installation snapshot. As-built record matters for the CPA fixed-asset register and any future 320A upgrade; the electrical binder is where the discrepancy resolves. Verify what actually went in the trench. |
| 2.2 | "7.5 hp air compressor (in process)" | ELGi EN4-125 rotary screw compressor commissioned and converted to 230V 3-phase, with matched dryer | Same vintage issue |
| 2.3 | "Haas CNC lathe (Future)" / equipment list generally | VF-2 commissioned with WIPS, Kurt D688 vises, tooling procurement at v18; MOPA fiber laser on the differentiator list | Brief understates commissioning state; no e-commerce doc impact except the equipment-claims rule (1.15) |
| 2.4 | HVAC decision detail (2× MRCOOL 24K) | Not contradicted; assumed current | No action |
| 2.5 | "SVG logos exist for all four brands; Illustrator refinement recommended" | Sub-brands retired (1.1) | Only the Waypoint wordmark needs production refinement. Reserve-brand SVGs sit in cold storage. |
| 2.6 | "Google Workspace… brand domains set as domain aliases; eight functional Google Groups planned" | Domains 301 to primary; alias/group structure not contradicted | If the eight groups were scoped around sub-brands, rescope to functions (info@, wholesale@, orders@, etc.). |
| 2.7 | "Xometry partner program… as bridge revenue" | Consistent with current plan | Out of scope for the theme docs |

## 3. Judgment calls made (review these)

| # | Call | Rationale | Reverse by |
|---|---|---|---|
| 3.1 | Retired-domain 301 targets: root domain, not category paths | With sub-brands retired, category-path redirects imply a brand↔category mapping that no longer exists publicly. | Editing CLAUDE.md §1 and Phase 10 for category-path targets |
| 3.2 | Camera / lifestyle / maker categories removed from launch nav | Current catalog scope doesn't include them; categories open on demand | Add tiles back when SKUs exist |
| 3.3 | Free-shipping threshold left at $75 in the trust strip | v1 value; no newer decision found | Change one line in §6.1 item 3 |
| 3.4 | `waypoint-ops` as a second repo rather than a folder in the theme repo | Credential-scoping argument | Collapse to one repo if preferred |
| 3.5 | Kept §6/§7 visual and spec-table specs essentially verbatim from v1 | They reflect implemented design-token work; no newer decision touches them | — |

## 4. Superseded documents — disposition

| Document | Disposition |
|---|---|
| `CLAUDE_CODE_PROMPT.md` | Replaced with superseded marker |
| `REPO_STRATEGY.md` v1 | Replaced with v2 |
| `BigCommerce_Development_Plan.md` | **Not rewritten** — marked "superseded, do not follow." Still describes Halo One, BC Plus, multi-storefront, and the WordPress corporate site. |
| `Waypoint_Site_Architecture.docx` | Same treatment; its conversion-flow thinking was absorbed into CLAUDE.md. |
| `Waypoint_Consolidated_Development_Plan.docx` | Referenced in v1 §14 but not present in the current project file set — "historical context" only. |
