# Project: seed

## What This Is

SEED (Structured Evaluation & Engineering Design) is a Claude Code skill that serves as a typed project incubator. It takes raw ideas through collaborative, type-aware exploration and produces structured PLANNING.md documents. When ready, it graduates mature plans into buildable project directories with optional PAUL initialization. It's a companion tool to the BASE/CARL/PAUL/AEGIS ecosystem.

## Core Value

Builders can go from vague idea to structured, PAUL-ready project plan through guided collaborative exploration — without missing critical design decisions for their project type.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | 0.1.0 |
| Status | In Development |
| Last Updated | 2026-03-18 |

## Requirements

### Validated (Shipped)

- ✓ Entry point (seed.md) — thin, Skillsmith-compliant — Phase 1
- ✓ Task: ideate.md — type-first guided ideation — Phase 2
- ✓ Task: graduate.md — move to apps/ with git — Phase 2
- ✓ Task: launch.md — graduate + PAUL install/init (headless) — Phase 2

### Active (In Progress)

- [ ] Task: status.md — show projects pipeline
- [ ] Task: add-type.md — user-extensible type system
- [ ] Data layer: 5 default types (application, workflow, client, utility, campaign)
- [ ] Templates: 5 PLANNING-{type}.md templates
- [ ] Checklist: planning-quality.md

### Out of Scope

- Building projects (PAUL handles that)
- Auditing code (AEGIS handles that)
- Creating skills (Skillsmith handles that)

## Target Users

**Primary:** Claude Code builders using the ecosystem (BASE, CARL, PAUL)
- Have ideas that need structure before committing to a build
- Want type-aware guidance (app vs utility vs campaign needs different questions)
- Value collaborative exploration over interrogation

**Secondary:** Claude Code users without the full ecosystem
- Can use ideate + graduate standalone
- PAUL integration is opt-in, not required

## Constraints

### Technical Constraints
- Must be a Skillsmith-compliant skill (entry point + XML sections + tasks)
- Composable data layer — new types added via data/ files, not code changes
- Must work without PAUL installed (PAUL integration is additive)

### Design Constraints
- Persona is a coach, not an interrogator
- Rigor adapts per type (tight for utilities, deeper for apps, creative for campaigns)
- Type selection happens FIRST — shapes entire downstream flow

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Name: SEED | Matches lifecycle metaphor (plant, grow, graduate). Softer than framework names — correct for companion tool weight. | 2026-03-17 | Active |
| Composable data/ layer | New types added by dropping files, not modifying entry point or tasks. Future-proof extensibility. | 2026-03-17 | Active |
| Headless PAUL init in launch | SEED's ideation captures everything PAUL would ask. Re-asking is friction. | 2026-03-17 | Active |
| Coach persona, not interrogator | Users need brainstorming partner that suggests, not just questions. | 2026-03-17 | Active |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Format | Skillsmith-compliant markdown skill | Entry point + tasks + data + templates |
| Integration | PAUL (optional) | Headless init from PLANNING.md |
| Integration | BASE (optional) | ACTIVE.md updates |

---
*PROJECT.md — Updated when requirements or context change*
*Last updated: 2026-03-18 after Phase 2*
