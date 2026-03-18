# Skill Spec: seed

## Identity

| Field | Value |
|-------|-------|
| Name | seed |
| Type | standalone |
| Version | 0.1.0 |
| Category | operations |
| Description | Typed project incubator — guided ideation through graduation into buildable projects |

## Persona

**Role:** Project coach — helps shape raw ideas into structured, buildable plans

**Style:**
- Collaborative, not interrogative — brainstorms alongside the user, offers concrete suggestions when stuck
- Pushes toward decisions when it's time, lets ideas breathe when they need space
- Adapts rigor and demeanor to project type — tight for utilities, deeper for applications, creative for campaigns
- Knows the ecosystem — suggests PAUL, AEGIS, Skillsmith, BASE where relevant

**Expertise:**
- Composable via `data/{type}/` — expertise loads based on selected project type
- Core: project scoping, feasibility assessment, ecosystem integration (BASE, CARL, PAUL, AEGIS, Skillsmith)
- Application architecture, Claude Code workflows, conversion/content strategy (type-specific depth)

## Activation

**What:** Typed project incubator — takes raw ideas through collaborative exploration, produces structured PLANNING.md documents, and graduates mature plans into buildable project directories with optional PAUL initialization.

**When to Use:**
- Starting a new project (any type)
- Have a vague idea that needs shaping before committing
- Ready to graduate or launch an ideated project
- Want to add a custom project type

**Not For:**
- Building the project (use `/paul:init` or `/seed launch` after ideation)
- Auditing existing code (use `/aegis:audit`)
- Creating Claude Code skills (use `/skillsmith`)

## Commands

| Command | Description | Routes To |
|---------|-------------|-----------|
| `/seed` | Default — type-first guided ideation | tasks/ideate.md |
| `/seed graduate` | Graduate ideation → `apps/` with git repo | tasks/graduate.md |
| `/seed launch` | Graduate + PAUL install/init (headless, no re-asking) | tasks/launch.md |
| `/seed status` | Show all `projects/` and their ideation state | tasks/status.md |
| `/seed add-type` | Add a custom project type to SEED's data layer | tasks/add-type.md |

## Content Architecture

### Tasks
| File | Purpose | Loading |
|------|---------|---------|
| ideate.md | Type-first guided ideation → PLANNING.md. Type selected/discovered first, shapes flow, rigor, and demeanor. Loads `data/{type}/guide.md` for conversation sections. | on-command (default) |
| graduate.md | Create `apps/{name}/`, git init, synthesize README from PLANNING.md, update ACTIVE.md | on-command |
| launch.md | Wraps graduate + checks PAUL installation (prompt to install globally if missing) + headless `paul:init` passing PLANNING.md as context (no user questions, propose structure, ask for approval) | on-command |
| status.md | Scan `projects/`, show each with type, creation date, ideation completeness | on-command |
| add-type.md | Guided creation of new project type: name, signals, guide sections, planning template, rigor config. Writes to `data/{new-type}/` and registers the type. | on-command |

### Frameworks
None — domain knowledge lives in `data/{type}/` for composability.

### Templates
| File | Purpose |
|------|---------|
| planning-application.md | PLANNING.md output template for applications |
| planning-workflow.md | PLANNING.md output template for Claude Code workflows |
| planning-client.md | PLANNING.md output template for client websites |
| planning-utility.md | PLANNING.md output template for utility tools |
| planning-campaign.md | PLANNING.md output template for content/campaigns |

### Context
None — project state lives in the `projects/` filesystem.

### Checklists
| File | Purpose |
|------|---------|
| planning-quality.md | Quality gate: is PLANNING.md rich enough for headless PAUL init? Validated before graduate/launch. |

### Data (composable per type)
| Directory | Contents | Loading |
|-----------|----------|---------|
| data/application/ | guide.md, config.md, skill-loadout.md | on-demand after type selection |
| data/workflow/ | guide.md, config.md, skill-loadout.md | on-demand after type selection |
| data/client/ | guide.md, config.md, skill-loadout.md | on-demand after type selection |
| data/utility/ | guide.md, config.md, skill-loadout.md | on-demand after type selection |
| data/campaign/ | guide.md, config.md, skill-loadout.md | on-demand after type selection |

Each `data/{type}/` contains:
- **guide.md** — Conversation sections for this type (questions, prompts, suggestions)
- **config.md** — Rigor level, demeanor, required vs optional sections, section count
- **skill-loadout.md** — Recommended ecosystem tools for this type

New types added via `/seed add-type` follow the same structure.

## Notes

- **Type-first flow:** Type is always determined before any substantive ideation begins. If the user doesn't know the type, a quick discovery conversation determines it. Type shapes everything downstream.
- **Demeanor adapts:** Utilities should be fast and tight. Applications need depth. Campaigns can be more creative and loose. This is configured in `data/{type}/config.md`.
- **SEED uses itself:** `/seed add-type` lets users extend SEED by adding new project types to the `data/` layer. No code changes needed — just new data files.
- **Headless PAUL init:** `/seed launch` passes PLANNING.md to PAUL without re-asking questions. SEED's ideation should produce a PLANNING.md rich enough that PAUL can derive its entire project structure. The `planning-quality.md` checklist validates this.
- **PAUL detection:** Launch asks "Want to initialize PAUL?" rather than scanning. If yes and PAUL isn't installed, prompts to install globally. No wasted filesystem scans.
- **Templates migration:** The 5 PLANNING-{type}.md templates currently live at workspace root (`templates/`). They should move into the skill directory during scaffolding.
