# Planning Quality Checklist

Quality gate for `/seed graduate` and `/seed launch`. Determines if a PLANNING.md is rich enough for clean graduation and headless PAUL initialization.

## Universal Checks (All Types)

- [ ] **Type metadata** present in header (Application, Workflow, Client, Utility, Campaign, or custom)
- [ ] **Problem statement** is specific — names the problem, the audience, and why it matters
- [ ] **Design decisions** documented — at least 1 resolved decision with rationale
- [ ] **Open questions** section exists (even if "None")
- [ ] **Next actions** defined — at least 1 concrete next step
- [ ] **Skill Loadout** noted — which ecosystem tools apply to this build

## Type-Specific Checks

Reference `data/{type}/config.md` for the authority on required vs optional sections.

- [ ] **All required sections** (per config.md) have substantive content — not just headers or placeholders
- [ ] **Optional sections** either covered or explicitly marked as N/A
- [ ] **Section depth matches rigor** — tight types (utility) can be brief; deep types (application) need thorough coverage

### Quick Reference

| Type | Required Sections | Rigor |
|------|------------------|-------|
| Application | 8 of 10 | deep — thorough coverage expected |
| Workflow | 6 of 8 | standard — balanced |
| Client | 6 of 7 | standard — business-focused |
| Utility | 6 of 6 | tight — all required, but brief |
| Campaign | 6 of 7 | creative — can be loose, but measurable goal required |

## PAUL-Readiness Checks (for /seed launch)

These are only required if the user intends to run `/seed launch` (graduate + PAUL init). Skip for `/seed graduate` alone.

- [ ] **Phase breakdown** exists with independently shippable milestones
- [ ] **Each phase** has build, testable, and outcome defined
- [ ] **Tech stack decisions** are resolved — no critical "TBD" items
- [ ] **Enough detail** that PAUL can derive milestones, phases, and structure without re-asking questions

## Assessment

| Result | Criteria | Action |
|--------|----------|--------|
| **Pass** | All universal checks + all required type-specific sections | Proceed with graduation |
| **Warn** | Missing optional sections or thin content in some areas | Note gaps, ask user if they want to flesh out or proceed |
| **Fail** | Missing required sections or no problem statement | Recommend returning to `/seed` to complete ideation |

## Usage

This checklist is referenced by:
- `tasks/graduate.md` — step `quality_check` (before creating app directory)
- `tasks/launch.md` — inherited via graduate delegation

It is NOT a scorecard with numbers. It's a qualitative assessment that the coach persona uses to decide whether to warn the user or proceed.
