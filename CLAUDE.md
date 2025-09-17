# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lenz-Web is a Go web application that serves digitized historical letters. It's built with:
- Go 1.24 using Fiber web framework
- Custom templating engine with hot reload for development
- Git-based content management (clones/updates from remote repository)
- XML parsing for letter metadata and content
- Static asset serving with compression and ETags

## Development Commands

### Build and Run
```bash
go build                    # Build the application
./lenz-web                  # Run the built binary
go run .                    # Build and run directly
```

### Docker
```bash
docker-compose up           # Run with Docker (exposes port 8085)
docker build .              # Build Docker image
```

### Testing
The project does not currently have automated tests. Check for `*_test.go` files before assuming test frameworks.

## Architecture

### Main Application Flow (lenz.go:30-69)
1. Loads configuration from JSON files and environment variables
2. Clones/opens Git repository containing letter data
3. Parses XML models from the repository
4. Sets up templating engine with custom functions
5. Configures Fiber web server with routes and middleware
6. In debug mode, enables file watchers for hot reload

### Core Components

**Configuration (config/)**
- `config.go`: Configuration management with JSON files, environment variables, and defaults
- Uses `KGPZ_` prefix for environment variables
- Default config file: `config.dev.json`

**Templating (templating/)**
- Custom template engine with layout and route registries
- WebSocket-based hot reload in debug mode
- Template functions for XML data processing

**Controllers (controllers/)**
- Route handlers for web endpoints
- `routes.go`: Route registration and URL constants
- Main routes: `/`, `/briefe`, `/brief/:letter`, static pages

**XML Models (xmlmodels/)**
- Parses historical letter data from XML files
- Provides template functions for data access
- Core models: Library, Letter, Traditions, References

**File Watching (watcher.go)**
- Custom file watcher with debouncing (300ms)
- Two watch modes:
  - REFRESH_CHANGES: `./views/assets` (clears cache, sends refresh signal)
  - RESET_CHANGES: `./views/layouts`, `./views/routes` (clears cache, reloads templates)

### Key Directories
- `views/`: Frontend templates, layouts, and static assets
- `helpers/`: Utility functions and middleware
- `server/`: Fiber server configuration and caching
- `git/`: Git repository management

## Configuration

Configuration is loaded in order: JSON files → environment variables → defaults

Key settings:
- `debug`: Enables hot reload and verbose logging
- `git_url`: Repository URL for letter content
- `base_dir`: Cache directory (default: `_cache`)
- `port`: Server port (default: `8085`)
- `webhook_secret`: GitHub webhook integration

Environment variables use `KGPZ_` prefix (e.g., `KGPZ_DEBUG=true`).

## Views Directory Structure

The `views/` directory contains all frontend templates and assets:

```
views/
├── assets/           # Static files (CSS, JS, fonts, images)
├── layouts/          # Base layout templates
│   ├── components/   # Reusable layout components (_header, _footer, _menu, etc.)
│   └── default/      # Default layout (root.gohtml)
└── routes/           # Page-specific templates
    ├── brief/        # Individual letter view (head.gohtml, body.gohtml)
    ├── briefe/       # Letter listing view
    ├── components/   # Page components (_letterhead, _letterlist, _lettertrad)
    ├── datenschutz/  # Privacy page
    ├── edition/      # Edition info pages
    └── kontakt/      # Contact page
```

### Template System Architecture

**Build-Time Embedding vs Development**
- Production: Templates embedded via `//go:embed` directives in `views/embed.go`
- Development: Direct filesystem access via `views/embed_dev.go` (when built with `-tags dev`)
- File watchers enable hot reload in debug mode

**Template Structure**
Each route directory contains:
- `head.gohtml`: `<head>` section content for the page
- `body.gohtml`: Main page content

**Layout System (templating/engine.go)**
- Base layout: `views/layouts/default/root.gohtml`
- Uses Go template blocks: `{{ block "head" . }}`, `{{ block "body" . }}`, etc.
- Layout registry loads and caches layouts with template functions
- Template registry loads route-specific templates

**Template Functions Available**
Core functions (templating/engine.go:118-131):
- `Safe`: Render HTML without escaping
- `Today`: Current date
- `GetMonth`: Month name from number
- `Minus`: Subtraction for template math

XML Data Functions (added from xmlmodels/library.go):
- `Person`: Get person data by reference ID
- `Place`: Get location data by reference ID
- `ParseGeneric`: Parse and render letter text with markup

**Template Data Flow**
1. Controllers pass `fiber.Map` data to templates
2. Engine merges with `GlobalData` (debug flags, etc.)
3. Layout loaded and cloned from registry
4. Route templates added to layout clone
5. Combined template executed with merged data

**Hot Reload System**
- WebSocket server on port 9000 for live reload in debug mode
- File watchers trigger different actions:
  - `./views/assets` changes: Clear cache + browser refresh signal
  - `./views/layouts`, `./views/routes` changes: Clear cache + reload templates
- 300ms debounce to prevent excessive reloads

### Working with Templates

**Template Syntax**
- Standard Go template syntax with custom functions
- Variables: `{{ $model := . }}` for cleaner references
- Conditionals: `{{ if .isDev }}...{{ end }}`
- Loops: `{{ range $item := .items }}...{{ end }}`
- Components: `{{ template "_letterhead" .meta }}`

**Debugging Templates**
- Enable debug mode in config: `"debug": true`
- Templates reload automatically on file changes
- Browser refreshes automatically via WebSocket
- Console shows reload notifications

**Letter Data Templates**
Letter pages have access to rich XML data:
- `.meta`: Letter metadata (dates, persons, places)
- `.text`: Parsed letter content with markup
- `.prev/.next`: Navigation to adjacent letters
- Navigation uses custom functions like `Person` and `Place` to resolve references

## Development Notes

- File watchers only active in debug mode
- Templates are cached; use debug mode for development
- Static assets served with compression and ETags
- Git repository is cloned to `base_dir/git_path` on startup
- WebSocket endpoint available for live reload in debug mode
- Template files use `.gohtml` extension for proper syntax highlighting