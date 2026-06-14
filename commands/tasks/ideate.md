<purpose>
Guide a user through type-aware collaborative ideation, producing a populated PLANNING.md document ready for graduation or PAUL-managed build.
</purpose>

<user-story>
As a builder with a raw idea, I want guided exploration shaped by my project type, so that I produce a structured PLANNING.md without missing critical design decisions.
</user-story>

<when-to-use>
- Starting a new project and need to shape the idea before building
- Have a vague concept that needs structure and scoping
- Want type-specific guidance (app vs utility vs campaign needs different depth)
- Ready to produce a PLANNING.md for `/seed graduate` or `/seed launch`
</when-to-use>

<context>
@seed.md
@data/{type}/guide.md (loaded after type selection)
@data/{type}/config.md (loaded after type selection)
@data/{type}/skill-loadout.md (loaded during skill loadout step)
@templates/planning-{type}.md (loaded during output generation)
@checklists/planning-quality.md (referenced as quality gate before output)
</context>

<steps>

<reference name="seed_state_format">
## SEED-STATE.md Checkpoint Format

When saving checkpoints during ideation, write `projects/{name}/SEED-STATE.md` in this format:

```markdown
# SEED State: {name}

## Meta
- **Type:** {type}
- **Started:** {ISO timestamp}
- **Last Updated:** {ISO timestamp}
- **Position:** Section {N} of {total} — "{section_name}"
- **BASE v2:** {true|false}

## Gathered Data

### Project Name
{name}

### Core Description
{description from early conversation}

### Sections Completed
| Section | Status | Summary |
|---------|--------|---------|
| {section_name} | complete | {1-2 line summary of what was decided} |
| {section_name} | complete | {summary} |
| {section_name} | pending | — |

### Raw Responses
{section_name}: {user's response text or summarized key points}
{section_name}: {response}
```

This captures enough to restore full conversation state without replaying it.
</reference>

<step name="detect_base" priority="early">
## Detect BASE Version

Check for BASE v2 (Rust binary) for ecosystem integration.

1. Check for base binary:
   ```bash
   which base 2>/dev/null
   ```

2. **If base binary found:**
   ```bash
   base --version 2>/dev/null
   ```
   - If output contains a semver (e.g., "base 0.1.0") → Rust binary (v2) detected
     - Store `base_v2_available = true`
     - Silent pass — continue
   - If output is empty, errors, or doesn't match semver → v1/Python detected
     - **HARD STOP.** Display:
       ```
       ════════════════════════════════════════
       ⛔ BASE v1 detected — not compatible with SEED v1.0+
       ════════════════════════════════════════

       BASE v1 (Python/MCP) is no longer supported.
       SEED now integrates with BASE v2 (Rust) for the
       full Agentic OS experience.

       Upgrade: https://chrisai.cv/skool

       SEED · Chris AI Systems
       ════════════════════════════════════════
       ```
     - Do NOT proceed

3. **If no base binary on PATH:**
   - Store `base_v2_available = false`
   - Display:
     ```
     ℹ️ BASE not detected. SEED works standalone, but for the
     full Agentic OS — workspace intelligence, proactive context,
     knowledge graph — get BASE v2: https://chrisai.cv/skool
     ```
   - Continue with ideation (not a hard stop)

4. **Additional v1 artifact check** (even if no base binary):
   - Check for `.base/data/*.json` files (v1's JSON store):
     ```bash
     ls .base/data/*.json 2>/dev/null
     ```
   - If found: display v1 warning (same hard stop as step 2)
</step>

<step name="check_resume" priority="early">
## Check for Resumable Ideations

Scan `projects/` for directories containing `SEED-STATE.md`:
```bash
find projects/*/SEED-STATE.md 2>/dev/null
```

**If none found:** Skip silently — proceed to `determine_type`.

**If found:** Parse each SEED-STATE.md for name, type, position, and last updated timestamp. Present:

```
Resumable ideations found:

[1] {name} ({type}) — stopped at "{section_name}" ({date})
[2] {name} ({type}) — stopped at "{section_name}" ({date})
[3] Start fresh

Which one?
```

Wait for response.

**If resume chosen:**
1. Read `projects/{name}/SEED-STATE.md` fully
2. Restore: type, project name, `base_v2_available` flag, all gathered section data
3. Load type context — read `data/{type}/guide.md` and `data/{type}/config.md`
4. Adopt coach persona as normal
5. Skip directly to the first section marked `pending` in the Sections Completed table
6. Acknowledge the resume briefly: "Picking up where we left off on **{name}**. We covered {N} sections — next up is **{section_name}**."
7. Continue `guided_conversation` from that point

**If start fresh:** Proceed to `determine_type` as normal. Do NOT delete existing SEED-STATE.md files — the user may return to them later.
</step>

<step name="determine_type" priority="first">
## Determine Project Type

Check `$ARGUMENTS` for a type match:

| Input | Type |
|-------|------|
| `application`, `app` | application |
| `workflow` | workflow |
| `client` | client |
| `utility`, `tool` | utility |
| `campaign`, `content` | campaign |

**If match found:** Confirm with user — "Sounds like an **{type}** project. That right?"

**If no match or empty:** Ask the user to describe what they're building in a sentence or two. Then suggest the best-fit type with reasoning:

> "Based on what you described, this sounds like a **{type}** project — {one-line reason}. Does that fit?"

Use these signals to route:

| Type | Signals |
|------|---------|
| Application | Has UI, data model, API, deployment — software people use |
| Workflow | Commands, hooks, domains, templates — Claude Code tooling |
| Client | Website for a client — business context, conversion, content |
| Utility | Small tool, script, single-purpose — resists expansion |
| Campaign | Content, marketing, launches — timeline-driven, not code-driven |

Wait for response before proceeding.

**Checkpoint:** After type is confirmed, write initial `projects/{name}/SEED-STATE.md` (if project name is already known from `$ARGUMENTS`) or queue for write after `get_project_name`.
</step>

<step name="get_project_name">
## Get Project Name

Ask for a project name — lowercase, hyphenated. This becomes the directory name under `projects/`.

Check if `projects/{name}/` already exists:
- **If exists:** "There's already a `projects/{name}/` directory. Want to continue that existing ideation, or pick a different name?"
- **If new:** Create `projects/{name}/` directory.

Wait for response.

**Checkpoint:** After project directory is created and type is confirmed, write initial `projects/{name}/SEED-STATE.md` with type, project name, and timestamp. All sections marked `pending`.
</step>

<step name="load_type_context">
## Load Type Context

Read the composable data files for the selected type:

1. Read `data/{type}/guide.md` — conversation sections for this type
2. Read `data/{type}/config.md` — rigor level, demeanor, required vs optional sections

**Adopt the coach persona for the rest of this session:**

You are a project coach. Brainstorm alongside the user — offer concrete suggestions when they're stuck, push toward decisions when it's time, let ideas breathe when they need space. You are NOT an interrogator firing questions. You're a thinking partner who happens to know the ecosystem.

Adapt your approach based on config.md:
- **Tight rigor** (utilities): Move fast, resist scope creep, keep it small
- **Standard rigor** (workflows, clients): Balanced exploration, clear boundaries
- **Deep rigor** (applications): Thorough exploration, architecture matters
- **Creative rigor** (campaigns): Loose, generative, timeline-focused
</step>

<step name="guided_conversation">
## Guided Exploration

Work through the sections defined in `data/{type}/guide.md`. These are conversation prompts, not a questionnaire.

**Rules of engagement:**
- Present 1-2 related sections at a time, not all at once
- Adapt based on discussion flow — skip sections the user has already addressed naturally
- Circle back to sections that need more depth
- Offer concrete suggestions: "For this type of app, most teams use X because..." or "Given your audience, you might consider Y"
- If the user is stuck, propose a direction: "Here's one way this could work: ..."
- If the user is going too broad, gently constrain: "That's ambitious — what's the minimum slice that proves the concept?"

**Section groups (from guide.md):**

Work through the guide sections in logical groups. After presenting each group and discussing:

Wait for response.

**Checkpoint:** After each section group response, silently update `projects/{name}/SEED-STATE.md` — mark completed sections, store response summaries, advance position. No user notification needed.

Continue until all required sections (per config.md) are covered, or the user signals they're ready to wrap up.

<if condition="user signals readiness before all sections covered">
Check config.md for required vs optional sections. If required sections are missing, note them: "We haven't covered {section} yet — that's usually important for {type} projects. Want to hit that quickly, or skip it?"
</if>
</step>

<step name="skill_loadout">
## Skill Loadout

Read `data/{type}/skill-loadout.md` for recommended ecosystem tools.

Present the recommended skills for this project type:

> "For a **{type}** project, these tools from the ecosystem are worth considering:"
> - {skill 1} — {why}
> - {skill 2} — {why}

Ask if any resonate or if they want to note specific tools for the build phase.

Wait for response.
</step>

<step name="generate_planning">
## Generate PLANNING.md

When the user is ready (all sections covered or user signals completion):

1. Read `templates/planning-{type}.md` for output structure
2. Reference `checklists/planning-quality.md` — verify the content is rich enough for headless PAUL init
3. Populate the template with content from the conversation
4. Write to `projects/{name}/PLANNING.md`
5. Fill in the metadata block (Type, Skill Loadout, Quality Gates)

Present the completed PLANNING.md to the user for review.

> "Here's the PLANNING.md I've drafted from our conversation. Take a look — anything to adjust before we lock it in?"

Wait for response.

<if condition="user requests changes">
Apply edits and re-present. Repeat until user approves.
</if>

**Cleanup:** After user approves PLANNING.md, delete the checkpoint — state has graduated:
```bash
rm projects/{name}/SEED-STATE.md 2>/dev/null
```
Silent — no user notification needed.
</step>

<step name="update_tracking">
## Update Tracking & Report

After user approves the PLANNING.md:

1. **If `base_v2_available`:** Register the ideation project in the graph:
   ```bash
   base project add --name "{name}" --path "projects/{name}"
   ```
   This makes the project visible in `base project list` and the BASE dashboard.

2. **If not `base_v2_available`:** Skip graph registration silently (promotion was already shown at session start).

3. Report completion:
   ```
   Created: projects/{name}/PLANNING.md ({type} template)
   {if base_v2_available: "Registered: {name} in BASE graph"}

   Next steps:
   - `/seed graduate {name}` — move to apps/ with git init
   - `/seed launch {name}` — graduate + initialize PAUL for managed build

   SEED v1.0 · Chris AI Systems · https://chrisai.cv/skool · https://youtube.com/@chris-ai-systems
   ```
</step>

</steps>

<output>
- `projects/{name}/PLANNING.md` — populated type-specific planning document
- BASE graph entity (if BASE v2 available)
- Location: `projects/{name}/`
</output>

<acceptance-criteria>
- [ ] BASE v2 detection runs before ideation begins
- [ ] BASE v1 triggers hard stop with upgrade link
- [ ] No BASE shows promotion message then continues
- [ ] Type determined before any substantive ideation begins
- [ ] Type-specific data files loaded and used to shape conversation
- [ ] Conversation is collaborative (coach), not interrogative (questionnaire)
- [ ] Wait points present at every user input boundary
- [ ] Existing project detection prevents silent overwrites
- [ ] PLANNING.md generated from type-specific template
- [ ] Planning quality checklist referenced before output
- [ ] Graph registration on completion (if BASE v2 available)
- [ ] SEED-STATE.md checkpoint written after type selection, project name, and each section group
- [ ] Resumable ideations detected and offered on re-entry
- [ ] Resume restores type, persona, gathered data, and skips to next pending section
- [ ] SEED-STATE.md deleted after PLANNING.md is approved (cleanup)
</acceptance-criteria>
