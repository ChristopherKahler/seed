<purpose>
Graduate a completed ideation from projects/{name}/ into apps/{name}/ with its own git repo, type-aware README, and workspace tracking updates.
</purpose>

<user-story>
As a builder with a completed PLANNING.md, I want to graduate my project into a proper app directory with git and a synthesized README, so that I can start building without manual setup.
</user-story>

<when-to-use>
- Ideation is complete and PLANNING.md exists in projects/{name}/
- Ready to move from planning to building
- Want a clean app directory with git repo and project brief
</when-to-use>

<context>
@seed.md
@checklists/planning-quality.md (quality gate — loaded before graduation)
</context>

<steps>

<step name="validate_input" priority="first">
## Validate Project

Check `$ARGUMENTS` for a project name.

**If no argument provided:**
Scan `projects/` for directories containing PLANNING.md. List them:

> "Available projects ready for graduation:"
> - {name} ({type from PLANNING.md})
> - {name} ({type})
>
> "Which one? Or provide a name."

Wait for response.

**If argument provided:**
1. Confirm `projects/{name}/PLANNING.md` exists — if not: "No PLANNING.md found at `projects/{name}/`. Run `/seed` to create one first."
2. Confirm `apps/{name}/` does NOT exist — if it does: "`apps/{name}/` already exists. This project was already graduated."
3. If either check fails, stop.
</step>

<step name="quality_check">
## Quality Gate

Read `projects/{name}/PLANNING.md` and extract:
- **Type** metadata field (application, workflow, client, utility, campaign)
- Overall content depth

Reference `checklists/planning-quality.md` to assess whether the PLANNING.md is rich enough for a clean graduation and potential headless PAUL init.

<if condition="Type metadata is missing">
Infer type from content, or ask: "I can't find a Type field in this PLANNING.md. What type of project is this? (application, workflow, client, utility, campaign)"

Wait for response.
</if>

<if condition="PLANNING.md appears too thin">
Warn the user:

> "This PLANNING.md looks light — it may not have enough detail for a strong README or future PAUL init. Want to go back to `/seed` to flesh it out, or graduate as-is?"

Wait for response. If user wants to proceed, continue. If not, exit with suggestion to run `/seed`.
</if>
</step>

<step name="create_app_directory">
## Create App Directory

1. Create the app directory:
   ```bash
   mkdir -p apps/{name}
   ```

2. Initialize git repo:
   ```bash
   cd apps/{name}
   git init -b main
   ```
</step>

<step name="synthesize_readme">
## Synthesize README

Read `projects/{name}/PLANNING.md` fully. Generate `apps/{name}/README.md` by **synthesizing** (not copying) a clean project brief.

**Common sections (all types):**
- Title and one-line description
- Type, Skill Loadout, Quality Gates metadata
- Overview — concise summary of what and why
- Design Decisions — resolved decisions (numbered)
- Implementation Phases — phase breakdown (or "N/A" for small projects)
- Open Questions — unresolved items
- References

**Type-specific sections to add:**

| Type | Additional Sections |
|------|-------------------|
| Application | Stack, Deploy, Data Model, API Surface, Architecture, UI/UX |
| Workflow | Scope Definition, Integration Map, Interaction Design, Output Artifacts |
| Client | Client name, Business Context, Conversion Strategy, Timeline, Tech Approach |
| Utility | Location, Interface (invocation/input/output), Done Criteria |
| Campaign | Goal, Deliverables List, Timeline, Success Metrics |

**Synthesis guidelines:**
- Remove brainstorming artifacts, iteration history, abandoned ideas
- Keep all resolved design decisions
- Keep technical architecture details
- Keep implementation phases
- Preserve tables and structured data (information-dense)
- Preserve Type and Skill Loadout metadata — PAUL uses this for configuration
- The README should be comprehensive enough to run `/paul:init` against

Present the generated README to the user:

> "Here's the README I synthesized from your PLANNING.md. Take a look — anything to adjust?"

Wait for response.

<if condition="user requests changes">
Apply edits and re-present until approved.
</if>
</step>

<step name="finalize">
## Finalize Graduation

1. **Write README.md** to `apps/{name}/README.md`

2. **Initial commit:**
   ```bash
   cd apps/{name}
   git add README.md
   git commit -m "Initial commit: project brief from graduation"
   ```

3. **Update ACTIVE.md** — find the project entry and update:
   - Location: `apps/{name}/`
   - Status: `Graduated — ready for /paul:init`
   - If no entry exists, ask user which section to add it under

4. **Note graduation in PLANNING.md** — append to `projects/{name}/PLANNING.md`:
   ```
   ---
   **Graduated:** {today's date}
   **Location:** `apps/{name}/`
   **README:** `apps/{name}/README.md`
   ```

5. **Report:**
   ```
   Graduated: projects/{name}/ → apps/{name}/
   README: apps/{name}/README.md
   Git: Initialized with initial commit

   Next steps:
   - `/paul:init` in apps/{name}/ to start a managed build
   - `/seed launch {name}` does this automatically (graduate + PAUL init)
   ```
</step>

</steps>

<output>
- `apps/{name}/` — new app directory with git repo
- `apps/{name}/README.md` — type-aware synthesized project brief
- Updated `ACTIVE.md` entry
- Graduation note appended to `projects/{name}/PLANNING.md`
</output>

<acceptance-criteria>
- [ ] Input validated: PLANNING.md exists, apps/ doesn't
- [ ] Quality gate checked before graduation
- [ ] Type extracted from PLANNING.md metadata
- [ ] README synthesized with type-specific sections (not copied verbatim)
- [ ] Git repo initialized with initial commit
- [ ] ACTIVE.md updated with graduated location
- [ ] Graduation date noted in original PLANNING.md
- [ ] Wait points present at key decisions (quality warning, README review)
</acceptance-criteria>
