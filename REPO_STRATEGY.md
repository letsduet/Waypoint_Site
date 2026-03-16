# Repository Strategy — Waypoint Machine Works Portfolio

## Recommended Structure: Separate Repos

### Why Not a Monorepo

Your sites span two fundamentally different platforms (static HTML on Namecheap and
BigCommerce Stencil themes), have different deployment targets (Namecheap SFTP vs
BigCommerce CLI push), and different development cycles. A monorepo adds coupling with
zero benefit — there's no shared code between a static HTML site and a BigCommerce
Handlebars/Stencil theme.

The one exception would be shared design assets (brand logos, color tokens, font files),
but those are static files that can be managed via a simple shared asset repo or just
copied where needed.

---

## Repository Map

```
GitHub Organization: waypoint-machine-works (or your personal account)
│
├── waypoint-site                    ← Static HTML/CSS/JS site for waypointmachineworks.com
│   ├── index.html
│   ├── about.html
│   ├── capabilities.html
│   ├── brands.html
│   ├── wholesale.html
│   ├── contact.html
│   ├── css/
│   ├── js/
│   ├── img/
│   ├── .htaccess
│   ├── .gitignore
│   └── README.md
│
├── stratum-edge-storefront          ← BigCommerce Stencil theme for stratumedgeco.com
│   ├── .stencil                     (local config, gitignored)
│   ├── templates/
│   ├── assets/
│   ├── lang/
│   └── config.stencil.json
│
├── highpoint-trailworks-storefront  ← BigCommerce Stencil theme for highpointtrailworks.com
│   └── (same structure as above)
│
├── cold-bore-storefront             ← BigCommerce Stencil theme for coldborecollective.com
│   └── (same structure as above)
│
├── camera-brand-storefront          ← BigCommerce Stencil theme (future, name TBD)
│   └── (same structure as above)
│
├── accessories-brand-storefront     ← BigCommerce Stencil theme (future, name TBD)
│   └── (same structure as above)
│
└── brand-assets                     ← (Optional) Shared SVG logos, font files, color specs
    ├── waypoint/
    ├── stratum-edge/
    ├── highpoint/
    ├── cold-bore/
    └── README.md
```

---

## Why This Structure Works

1. **Independent deployment** — Upload the Waypoint static site to Namecheap without
   touching any BigCommerce theme. Deploy a BigCommerce theme update to one storefront
   without risking the others.

2. **Independent versioning** — Stratum Edge (first to launch) will have 50+ commits
   before Cold Bore has its first. Separate repos keep history clean and meaningful.

3. **Claude Code works per-repo** — When you open Claude Code pointed at `waypoint-site/`,
   it has full context of that project — just HTML, CSS, and JS files with no framework
   noise. Same isolation when working on any BigCommerce storefront.

4. **BigCommerce Stencil CLI expects one theme per project** — The `stencil init`,
   `stencil start`, and `stencil push` commands operate on the current directory.
   Each storefront theme needs to be its own project root.

5. **Contributor isolation** — If you ever bring on a contractor to help with one brand's
   storefront, you can grant access to just that repo without exposing the others.

---

## BigCommerce Theme Approach

Each BigCommerce storefront starts from the same base premium theme (e.g., Cornerstone or
your chosen paid theme), then gets customized for its brand. The customization is what
lives in each repo — not the entire base theme.

Workflow:
1. Purchase theme from BigCommerce marketplace
2. Download theme source via Stencil CLI (`stencil pull` or download from marketplace)
3. Initialize repo with the theme files
4. Customize: colors, typography, layouts, brand-specific page templates
5. Deploy via `stencil push` to the specific storefront channel

Each brand's visual identity is different enough (dark/tactical for Cold Bore, clean/white
for Camera, earth tones for Highpoint) that shared base customizations would actually slow
you down vs. just customizing each independently.

---

## .gitignore Recommendations

### Static Site (waypoint-site)
```
# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
```

### BigCommerce Stencil (per storefront)
```
# Stencil local config (contains API tokens)
.stencil

# Node modules
node_modules/

# Build artifacts
parsed/
assets/dist/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

---

## Deployment Notes

### Waypoint Static Site → Namecheap
Options (simplest to most automated):
1. **Manual SFTP** — Edit locally, push to git, upload files via FileZilla/Cyberduck
2. **cPanel File Manager** — Direct upload through Namecheap's web interface
3. **GitHub Actions** — Auto-deploy on push to `main` via SFTP action
   (e.g., `SamKirkland/FTP-Deploy-Action`)

No build step. The files in the repo are the site. Upload the entire project
to `public_html/` on Namecheap and it's live.

### BigCommerce Storefronts → BigCommerce Platform
- Stencil CLI handles deployment: `stencil push` uploads the theme
- Each storefront gets its own Stencil CLI config pointing to its channel
- No hosting to manage — BigCommerce handles everything

---

## Sequencing

1. **Now:** Set up `waypoint-site` repo. Build the static HTML site.
2. **Next:** Set up `stratum-edge-storefront` repo when BigCommerce account is active.
3. **Later:** Clone stratum-edge structure as starting point for subsequent brand repos,
   then customize per brand.
4. **Future:** Camera and Accessories repos created when those brands are named and ready.

The `brand-assets` repo is optional but useful once you have finalized SVG logos and want
a single source of truth for all brand marks across projects.
