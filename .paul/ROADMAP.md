# Roadmap: seed

## Overview

Build the SEED skill from a confirmed Skillsmith spec. Each phase creates a layer of the skill, building from the entry point outward to data files, with integration testing at the end. The skill must be Skillsmith-compliant and independently functional (PAUL integration is additive, not required).

## Current Milestone

**v0.1 Initial Release** (v0.1.0)
Status: In progress
Phases: 2 of 5 complete

## Phases

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Entry Point & Structure | 1 | Complete | 2026-03-17 |
| 2 | Core Tasks | 3 | Complete | 2026-03-18 |
| 3 | Data Layer & Templates | 2 | Not started | - |
| 4 | Supporting Tasks & Checklist | 2 | Not started | - |
| 5 | Integration & Installation | 1 | Not started | - |

## Phase Details

### Phase 1: Entry Point & Structure

**Goal:** Compliant entry point (seed.md) with correct YAML frontmatter, all 5 XML sections, and proper routing
**Depends on:** Nothing (first phase)
**Research:** Unlikely (Skillsmith specs are defined)

**Scope:**
- seed.md entry point with activation, persona, commands, routing, greeting
- Validate against Skillsmith entry-point spec

**Plans:**
- [x] 01-01: Generate seed.md entry point from SKILL-SPEC.md

### Phase 2: Core Tasks

**Goal:** The two primary tasks that define SEED's value — ideate and graduate
**Depends on:** Phase 1 (entry point defines routing)
**Research:** Unlikely (logic exists in current commands, needs restructuring)

**Scope:**
- tasks/ideate.md — type-first guided ideation with composable data loading
- tasks/graduate.md — project graduation to apps/ with git init and README synthesis
- tasks/launch.md — graduate + PAUL detection/install/headless init

**Plans:**
- [x] 02-01: Create tasks/ideate.md (type-first flow, wait points, data layer loading)
- [x] 02-02: Create tasks/graduate.md (adapted from existing command)
- [x] 02-03: Create tasks/launch.md (graduate wrapper + PAUL integration)

### Phase 3: Data Layer & Templates

**Goal:** Composable type-specific data files and PLANNING.md templates for all 5 default types
**Depends on:** Phase 2 (tasks reference data/ files)
**Research:** Unlikely (templates exist at workspace root, data layer structure defined in spec)

**Scope:**
- data/{type}/guide.md — conversation sections per type
- data/{type}/config.md — rigor level, demeanor, required sections
- data/{type}/skill-loadout.md — recommended ecosystem tools
- templates/planning-{type}.md — migrate and adapt from workspace root

**Plans:**
- [ ] 03-01: Create data/ files for all 5 types (15 files)
- [ ] 03-02: Migrate and adapt 5 PLANNING templates into skill

### Phase 4: Supporting Tasks & Checklist

**Goal:** Status, add-type tasks and the planning quality checklist
**Depends on:** Phase 3 (add-type writes to data/)
**Research:** Unlikely

**Scope:**
- tasks/status.md — scan projects/, display pipeline
- tasks/add-type.md — guided creation of new project types
- checklists/planning-quality.md — quality gate for graduate/launch

**Plans:**
- [ ] 04-01: Create tasks/status.md and tasks/add-type.md
- [ ] 04-02: Create checklists/planning-quality.md

### Phase 5: Integration & Installation

**Goal:** Install as command, test invocation, validate full pipeline
**Depends on:** Phase 4 (all files exist)
**Research:** Unlikely

**Scope:**
- Install seed as slash command in workspace
- Test /seed invocation and routing
- Test /seed graduate flow
- Validate Skillsmith compliance (entry point + tasks)

**Plans:**
- [ ] 05-01: Install, test, validate

---
*Roadmap created: 2026-03-17*
*Last updated: 2026-03-18*
