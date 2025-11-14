# Agents

This codebase powers the born-digital edition of Johann Jacob Lenz’s correspondence. Every package acts like an agent in the editorial pipeline: ingesting the XML corpus, enriching it with scholarly context, and presenting the material on the public website. This document inventories those agents, how they cooperate, and where to extend them.

## System lineage
- **Entry point (`lenz.go`)** – boots with `config`, clones or reuses the corpus Git repo via `git/`, parses TEI-like XML into memory (`xmlmodels`), wires the templating engine and cache, then starts the Fiber server.
- **Data origin** – XML, references, and tradition files live inside the checked-out repository (`config.BaseDIR` + `config.GITPath`). Changes arrive either through CLI restarts, filesystem watchers (dev), or GitHub webhooks (`controllers/webhook.go`).
- **Request flow** – Fiber receives HTTP traffic (`server/`), routes it through the controllers (`controllers/*.go`), pulls structured data from `xmlmodels`, renders Go templates (`templating/`, `views/`), and serves static assets through the custom filesystem middleware.

## Agent catalog

### 1. Configuration & boot agent
- **Scope** – `config/`, `lenz.go`.
- **Responsibilities**
  - Merge `config.dev.json`, `config.json`, and `KGPZ_*` env vars, then enforce defaults for cache directories, bind address, webhook endpoint, etc.
  - Shape the runtime: debug mode flips Fiber logging on, turns on hot reloaders, and exposes the WebSocket live-reload port.
  - Stage the working directories (`_cache/git`, `_cache/gnd`, `_cache/geo`, `_cache/search`, `data_bilder`).
- **Extension hooks**
  - Add new configuration knobs to `config.Config`, plumb them through `ConfigProvider`, then surface them inside `controllers` via `ctx.Locals("cfg", cfg)`.
  - Update `Dockerfile` or `docker-compose.*` when the runtime contract changes (ports, binaries, base path).

### 2. Corpus sync agent
- **Scope** – `git/git.go`, `_cache/git`, `controllers/webhook.go`.
- **Responsibilities**
  - Clone, validate, and update the corpus repository (default `https://github.com/Theodor-Springmann-Stiftung/lenz-briefe`) while keeping branch and hash bookkeeping (`gitprovider.Commit`).
  - Expose two lifecycle calls: `OpenOrClone` (during boot) and `Pull` (during webhook), each guarded by a global mutex to avoid concurrent git state.
  - On webhook delivery, verify `X-Hub-Signature-256`, pull the branch, trigger `xmlmodels.Parse`, and reset the cache store so visitors immediately see the update.
- **Extension hooks**
  - Add new repo validation rules by extending `ValidateBranch` or the webhook handler (e.g., topic filtering).
  - Emit observability metrics or notifications after `Pull` and parse success.

### 3. XML modeling agent
- **Scope** – `xmlmodels/`, `xmlparsing/`.
- **Responsibilities**
  - Parse `data/xml/meta.xml`, `briefe.xml`, `references.xml`, and `traditions.xml` concurrently into strongly typed structs (`Meta`, `Letter`, `Tradition`, `PersonDef`, `LocationDef`, etc.).
  - Provide a singleton `Library` (`xmlmodels.Set/Get`) that caches derived artefacts (`sync.Map` for year groupings, person/place lookups) and exposes helpers like `NextPrev`, `Years`, and `Tradition`.
  - Offload streaming tokenization, entity resolution, optional booleans, and TEI-ish constructs to `xmlparsing` (see `parser.go`, `resolver.go`, `optionalbool.go`, `xmlsort.go`).
- **Extension hooks**
  - Add new TEI registers by amending `xmlmodels/library.go` and `xmlmodels/roots.go`, then plugging in an `xmlparsing.XMLParser` for the new structure.
  - When introducing derived caches, use the built-in `sync.Map` to avoid reprocesing across requests.

### 4. Text rendering agent
- **Scope** – `helpers/functions/textparse.go`, `helpers/functions/*.go`.
- **Responsibilities**
  - Convert `Letter.Content` (inner XML) into semantic HTML fragments consumable by the templates: inline sidenotes, block notes, insertion markers, manuscript hands, printable line/pagination counters, etc.
  - Offer template-safe utilities (date math, slicing, string helpers, HTML escaping, embedder functions) injected via `templating.Engine.AddFunc` and `Library.FuncMap()`.
- **Extension hooks**
  - Support new TEI tags or editorial conventions by updating the `switch` in `Parse` and by introducing helper `Tokens` operations when needed.
  - Register the helper with templates through `templating.Engine.AddFunc("NewFunc", fn)` to keep the template surface area explicit.

### 5. Presentation & asset agent
- **Scope** – `templating/`, `views/`, `helpers/middleware`.
- **Responsibilities**
  - Maintain the custom Go template engine (`templating.Engine`): layout registry, route registry, live-reload WebSocket (port 9000), and debug refresh/reset watchers (see `watcher.go`).
  - Deliver static artefacts (`views/assets`, fonts, paged.js bundle) through the fiber-aware filesystem middleware with cache-control + optional weak ETags.
  - Organize the view layer: `views/layouts/default/root.gohtml` for the shell, `views/routes/**/head.gohtml` & `body.gohtml` pairs for routes, `views/routes/components` for partials, and `views/public` as embeddable snippets/XSLT.
  - Ship the CSS/JS toolchain (Tailwind 4, DaisyUI, Vite) via `views/package.json`, `vite.config.js`, and `transform/site.css`, producing the compiled `assets/` bundle that gets embedded at build time (`views/embed*.go`).
- **Extension hooks**
  - When adding routes, create a new directory under `views/routes/<slug>/` with `head` and `body` templates and call `c.Render("/<slug>/", data)` from the matching controller.
  - For new global data, use `Engine.Globals` so layouts gain the values without per-controller plumbing.
  - In dev, use `cfg.Debug=true` so `SetupRefreshWatcher` reloads templates when files under `views/routes` or `views/layouts` change.

### 6. Delivery agent (HTTP server & controllers)
- **Scope** – `server/`, `controllers/`.
- **Responsibilities**
  - Configure Fiber with shared middlewares (compression, cache, logging/recover, custom cache key generator) and expose the `Server` struct that owns the `templating.Engine` and memory-backed cache store (`github.com/gofiber/storage/memory`).
  - Register web routes:
    - `/` redirects to `/briefe`.
    - `/briefe` lists letters grouped into historic ranges (see `controllers/uebersicht.go`).
    - `/brief/:letter` renders an individual letter with prev/next navigation, parsed body, and tradition apparatus (`controllers/brief.go`).
    - `/datenschutz`, `/ausgabe/zitation`, `/ausgabe/edition`, `/kontakt` render mostly static material via the template partials.
    - `/assets/**` serves CSS/JS/images with compression + ETag (middleware).
  - Expose Go structs (e.g., `DateRange`) to the templates so grouping logic stays in Go rather than HTML.
- **Extension hooks**
  - Add future APIs (e.g., JSON endpoints) inside `controllers` while reusing `xmlmodels` for data access.
  - Extend caching strategy by tweaking `server/cache.go` or `CacheFunc` (e.g., to drop caching for preview routes).

### 7. Update, cache & observability agent
- **Scope** – `watcher.go`, `server/cache.go`, `controllers/webhook.go`.
- **Responsibilities**
  - Implement hot-reload in debug builds: watchers monitor `./views/assets` for refreshes and `./views/layouts`, `./views/routes` for full reloads, then call `Engine.Refresh()` or `Engine.Reload()` and reset the in-memory cache.
  - Provide manual cache reset helpers (`ResetFunction`, `RefreshFunction`) that controllers or tooling can reuse.
  - Support GitHub webhook-triggered cache invalidation (see agent 2).
- **Extension hooks**
  - Watch additional directories (e.g., content markdown) by appending to `REFRESH_CHANGES` / `RESET_CHANGES`.
  - Integrate metrics by instrumenting `server.Server.Start/Stop` and the webhook handler.

## Data contracts

| Type | File | Purpose |
| --- | --- | --- |
| `xmlmodels.Meta` | `data/xml/meta.xml` | Chronological metadata per letter (sent/received actions, person/place refs, proofing flags). Supplies the timeline, filters, and prev/next logic. |
| `xmlmodels.Letter` | `data/xml/briefe.xml` | Carries the full textual content, pagination hints, and handwriting markers. Parsed into HTML via the text rendering agent. |
| `xmlmodels.Tradition` | `data/xml/traditions.xml` | Encodes the apparatus (`Apps`) for each letter so the UI can show textual variants and transmission notes. |
| `xmlmodels.PersonDef`, `LocationDef`, `AppDef` | `data/xml/references.xml` | Lookup tables for persons, places, and apparatus definitions, surfaced through the template func map (`Person`, `Place`, `App`). |

All XML parsing goes through `xmlparsing.XMLParser[T]`, so new record types only require defining a struct with `xml` tags plus a corresponding root type in `xmlmodels/roots.go`.

## Request lifecycle (TL;DR)
1. **Startup** – `config.Get()` → `gitprovider.OpenOrClone()` → `xmlmodels.Parse()` populates the singleton library and caches.
2. **Serve** – `server.New()` builds Fiber + templating + cache; `controllers.Register()` binds routes.
3. **Handle request** – Controller retrieves data from `xmlmodels.Get()`, optionally transforms it (sorting, grouping), and renders a template. The templating engine merges controller data with globals and layout fragments, optionally injecting the live-reload script in debug mode.
4. **Deliver** – Responses are cached in memory (unless `CacheFunc` opts out) and static assets flow through the filesystem middleware with compression + weak validators.
5. **Update corpus** – GitHub webhook or manual restart pulls new XML content, re-runs `xmlmodels.Parse`, clears caches, and future requests see the updated edition.

## Development workflow
- **Go server** – `go run .` (or `air`, etc.). Ensure `_cache/git` is writable; config defaults to `_cache` relative to repo root.
- **Frontend assets** – `cd views && npm install && npm run dev` during template work, or `npm run build` to regenerate `views/assets`. The Go build embeds the compiled assets unless built with `-tags dev`.
- **Debugging** – Set `debug` to `true` in `config.dev.json`. That turns on verbose logs, template reloaders, the WebSocket refresher, and disables static caching so CSS/JS changes land instantly.
- **Deployment** – `Dockerfile` builds a static binary (`go build`) and exposes port 8085. Mount `_cache` as a volume (or bake in) so git clones persist across container restarts.

Together these agents ensure that the scholarly corpus, textual enrichment logic, and presentation layer remain decoupled yet synchronized, making it straightforward to add new editorial features or publish new findings about Lenz’s letters.
