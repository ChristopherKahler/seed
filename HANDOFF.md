# SEED — Session Handoff

**Date:** 2026-03-17
**Project:** apps/seed/
**PAUL State:** Phase 1 complete, Phase 2 ready to plan

## What Happened This Session

1. **Ecosystem review** — evaluated BASE/CARL/PAUL/AEGIS as a stack, discussed adding Skillsmith + Ideate as companion tools
2. **Named the tool SEED** — Structured Evaluation & Engineering Design. Companion tool, not a framework. Softer name matches its weight.
3. **Ran Skillsmith audit** on existing `/ideate` and `/graduate` commands — 0% compliance, functional but raw
4. **Ran Skillsmith discover** — full 5-phase discovery producing SKILL-SPEC.md with:
   - Type: standalone, Category: operations
   - Persona: project coach (NOT interrogator), collaborative, adapts rigor per type
   - 5 commands: /seed, /seed graduate, /seed launch, /seed status, /seed add-type
   - Composable data/ layer (guide.md, config.md, skill-loadout.md per type)
   - Type-first flow — type shapes everything downstream
5. **Updated Skillsmith scaffold** — added location choice (apps/ with git), PAUL integration (10+ files → offer managed build), install prompt if PAUL missing
6. **Ran updated scaffold** — created apps/seed/, git init, PAUL init from spec (headless, no re-asking)
7. **Completed Phase 1** — seed.md entry point created, 81 lines, 7/7 AC passed

## Key Design Decisions

- **Coach, not interrogator** — brainstorms alongside user, offers suggestions, pushes to decisions appropriately
- **Type-first** — type selected before anything else, shapes rigor/demeanor/questions
- **Composable data/** — new types added by dropping files, not code changes
- **Headless PAUL init** — /seed launch passes PLANNING.md to PAUL, skips all questions SEED already answered
- **PAUL is additive** — /seed graduate works standalone, /seed launch adds PAUL on top
- **PAUL detection** — asks rather than scanning, prompts global install if missing

## Resume Instructions

```
cd apps/seed
/paul:plan
```

This will create Phase 2 Plan 02-01 for `tasks/ideate.md` — the most complex task file. The existing `/ideate` command at `.claude/commands/ideate.md` has the logic to adapt from.

## Remaining Phases

| Phase | What | Plans | Status |
|-------|------|-------|--------|
| 1 | Entry point (seed.md) | 1 | Complete |
| 2 | Core tasks (ideate, graduate, launch) | 3 | Next |
| 3 | Data layer + templates (15 data files, 5 templates) | 2 | Pending |
| 4 | Supporting tasks + checklist (status, add-type, planning-quality) | 2 | Pending |
| 5 | Integration + installation testing | 1 | Pending |

## Files Created

```
apps/seed/
├── seed.md                    ✓ (entry point — Phase 1)
├── SKILL-SPEC.md              ✓ (reference from discovery)
├── HANDOFF.md                 ✓ (this file)
├── .paul/                     ✓ (PAUL initialized)
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   ├── STATE.md
│   ├── paul.json
│   └── phases/
│       └── 01-entry-point/
│           ├── 01-01-PLAN.md
│           └── 01-01-SUMMARY.md
├── tasks/                     (empty — Phase 2)
├── templates/                 (empty — Phase 3)
├── checklists/                (empty — Phase 4)
└── data/                      (dirs created, files Phase 3)
    ├── application/
    ├── workflow/
    ├── client/
    ├── utility/
    └── campaign/
```

## Also This Session

- Skillsmith scaffold task updated at `.claude/commands/skillsmith/tasks/scaffold.md` — added location choice + PAUL integration steps
- SEED spec saved at `projects/seed/SKILL-SPEC.md`
