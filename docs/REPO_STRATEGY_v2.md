# Repository Strategy — Waypoint Machine Works (v2)

> **v2 supersedes the v1 multi-repo map entirely.** v1 assumed a static corporate site on
> Namecheap plus up to five per-brand BigCommerce storefronts. That architecture is dead:
> there is one brand, one storefront, one theme. See `CLAUDE.md` §1 and
> `RECONCILIATION_LOG.md`.
>
> (Provided by owner 2026-07-19; committed to this repo for session context. The v1 doc it
> supersedes is preserved at `docs/archive/REPO_STRATEGY.md`.)

---

## Structure: Two Repos

```
GitHub (personal account or org)
│
├── waypoint-theme        ← BigCommerce Stencil theme (forked Cornerstone, `waypoint` variation)
│   ├── .stencil          (local config, gitignored — contains API tokens)
│   ├── config.json
│   ├── schema.json
│   ├── templates/
│   ├── assets/
│   ├── lang/
│   ├── design/           (Claude Design mockups — visual targets, not code)
│   ├── docs/             (CLAUDE.md, RECONCILIATION_LOG.md, this file)
│   └── README.md
│
└── waypoint-ops          ← Read-only reporting & business scripts
    ├── velocity/         (weekly BC Orders API → Excel velocity workbook)
    ├── reports/          (versioned output workbooks, or gitignored if large)
    ├── requirements.txt
    └── README.md
```

**Retired from the v1 map:** `waypoint-site` (static corporate site — content absorbed into
BC custom page templates), the five per-brand storefront repos, and the multi-brand
`brand-assets` repo. If any of these exist on GitHub, archive them (Settings → Archive)
rather than delete — the static-site copy and photography feed the BC custom pages.

Brand assets (logo SVGs, token specs) live in `waypoint-theme/assets/` — a separate asset
repo is overhead with one brand.

---

## Why Two Repos, Not One

- **Different toolchains.** The theme is Node/Stencil CLI with a deploy step; ops scripts
  are Python with a cron cadence. No shared code.
- **Different risk profiles.** Theme pushes touch the live store; velocity scripts are
  read-only. Keeping them separate means a careless theme session can't touch API
  credentials scoped for reporting, and vice versa.
- **Credential scoping.** `waypoint-theme` uses a BC API account with Content + Themes
  scopes. `waypoint-ops` uses a *separate* BC API account with read-only Orders + Products
  scopes. Never share tokens across repos.

## Why Not More Repos

One brand, one storefront, one theme. The v1 rationale (independent per-brand deployment,
contributor isolation per brand) evaporated with the multi-brand architecture.

---

## Branching (both repos)

- `main` — production. Merged after review.
- `develop` — staging (theme repo only; ops repo can work straight to main).
- `feature/[name]` — short-lived, deleted after merge.

Theme commit convention: `feat:` / `fix:` / `style:` / `refactor:` / `config:` /
`content:` / `release:`.

---

## .gitignore

### waypoint-theme

```
.stencil
secrets.stencil.json
config.stencil.json
node_modules/
parsed/
assets/dist/
.DS_Store
Thumbs.db
.vscode/
.idea/
*.log
```

### waypoint-ops

```
.env
venv/
__pycache__/
*.pyc
reports/*.xlsx     # optional — commit if you want versioned history in git
.DS_Store
.vscode/
*.log
```

Note: newer Stencil CLI versions store credentials in `secrets.stencil.json` — gitignore
both the legacy `.stencil` and the newer filenames.

---

## Deployment

- **Theme:** `stencil bundle` → `stencil push` → activate in BC Admin. Gates per
  `CLAUDE.md` §10.5. No hosting to manage.
- **Ops scripts:** run locally on a weekly schedule (Task Scheduler / cron). No server.
  If a script ever needs to run unattended off-machine, that's the moment to reconsider —
  not before.

---

*v2 — July 7, 2026. Supersedes v1 (multi-storefront map).*
