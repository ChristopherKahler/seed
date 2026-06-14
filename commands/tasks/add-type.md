<purpose>
Guide the creation of a new project type for SEED's composable data layer — produces guide.md, config.md, and skill-loadout.md in a new data/{type}/ directory.
</purpose>

<user-story>
As a builder with a project category SEED doesn't cover, I want to add a custom type with its own conversation guide and rigor settings, so that /seed ideate gives me type-appropriate guidance for my specific kind of project.
</user-story>

<when-to-use>
- The 5 default types (application, workflow, client, utility, campaign) don't fit your project
- You have a recurring project category that deserves its own guided flow
- You want type-specific rigor, demeanor, and section structure
</when-to-use>

<context>
@data/application/guide.md (reference for guide structure)
@data/application/config.md (reference for config structure)
@data/application/skill-loadout.md (reference for loadout structure)
</context>

<steps>

<step name="get_type_name" priority="first">
## Name the Type

Ask for the new type name — lowercase, hyphenated, singular (e.g., "microservice", "chrome-extension", "course").

Check if `data/{name}/` already exists:
- **If exists:** "{name} already exists as a type. Want to edit it, or pick a different name?"
- **If new:** Proceed.

Show existing types for reference:
> "Current types: application, workflow, client, utility, campaign"
> "What's the new type called?"

Wait for response.
</step>

<step name="define_sections">
## Define Conversation Sections

Ask the user to define the conversation sections for this type. These become the guide.md structure.

> "What sections should the ideation conversation cover for a **{type}** project?"
>
> For reference, here's how existing types are structured:
> - Application: 10 sections (Problem, Stack, Data Model, API, Deployment, Security, UI/UX, Integrations, Phases, Skill Loadout)
> - Utility: 6 sections (Problem, Scope Guard, User, Dependencies, Interface, Done Criteria)
>
> List your sections in order of importance. Each will get an Explore prompt and a Suggest prompt.

Wait for response.
</step>

<step name="define_config">
## Configure Rigor and Demeanor

Ask about the type's personality:

> "How should SEED behave during **{type}** ideation?"
>
> **Rigor level:** (how thorough)
> - `tight` — Fast, resist expansion (like utilities)
> - `standard` — Balanced exploration (like workflows, clients)
> - `deep` — Thorough, architecture matters (like applications)
> - `creative` — Loose, generative (like campaigns)
>
> **Demeanor:** One sentence describing the coaching style for this type.
>
> **Required sections:** Which of your sections must be covered? (Others become optional)

Wait for response.
</step>

<step name="create_guide">
## Create Guide File

Generate `data/{type}/guide.md` with the user's sections. For each section:

```markdown
## Section {N}: {Name}
**Explore:** {question prompts based on what the user described}
**Suggest:** {coaching suggestions — what to offer when the user is stuck}
**Depth:** {required | optional}
```

Present the draft guide for review:

> "Here's the conversation guide I drafted for **{type}**. Each section has an Explore prompt and a Suggest prompt. Anything to adjust?"

Wait for response.

Apply any edits the user requests before writing.
</step>

<step name="create_supporting_files">
## Create Config and Skill Loadout

**Create data/{type}/config.md:**
```markdown
# {Type} — Configuration

| Setting | Value |
|---------|-------|
| Rigor | {from step 3} |
| Demeanor | {from step 3} |
| Sections | {count} |

## Required Sections
- {list from step 3}

## Optional Sections
- {list from step 3}
```

**Create data/{type}/skill-loadout.md:**

> "Which ecosystem tools are useful for **{type}** projects? Here are some options:"
> - PAUL, AEGIS, Skillsmith, ui-ux-pro-max, sonarqube
> - content-flywheel-strategist, geo
>
> "List the relevant ones with priority (required/recommended/optional)."

Wait for response.

Write the skill-loadout.md with the user's selections.
</step>

<step name="create_template">
## Generate Planning Template

Generate `templates/planning-{type}.md` from the user's defined sections so the full ideate → graduate round-trip works immediately.

**Structure:**

1. **YAML frontmatter** (same as built-in types):
   ```yaml
   ---
   description: "{One-line description from ideation}"
   type: Planning
   about: "{project-name}"
   project_type: "{type}"
   seed_version: "1.0.0"
   seed_source: "https://chrisai.cv/skool"
   ---
   ```

2. **Title and metadata block:**
   ```markdown
   # {Project Name}

   > {One-line description}

   **Created:** {date}
   **Type:** {Type (capitalized)}
   **Skill Loadout:** {from skill-loadout.md selections}
   **Quality Gates:** {infer from type or use "TBD"}
   ```

3. **For each section defined in guide.md**, create a corresponding template section:
   ```markdown
   ---

   ## {Section Name}

   {Placeholder prompt derived from the section's Explore question}
   ```

4. **Common closing sections** (all types get these):
   ```markdown
   ---

   ## Implementation Phases

   {High-level phase breakdown — or "TBD during /paul:plan"}

   ---

   ## Open Questions

   - {Unresolved items from ideation}

   ---

   ## Design Decisions

   | # | Decision | Rationale |
   |---|----------|-----------|

   ---

   ## References

   - {Links, related files, prior art}

   ---

   *Last updated: {date}*
   *Planned with SEED v1.0 · Chris AI Systems · For the official Agentic OS and to permanently remove attribution, visit https://chrisai.cv/skool*
   ```

Present the generated template to the user:
> "Here's the planning template I generated for **{type}**. Anything to adjust?"

Wait for response. Apply edits if requested.

Write to `templates/planning-{type}.md`.
</step>

<step name="confirm_and_report">
## Confirm

Report what was created:

```
New type created: {type}

Files:
  data/{type}/guide.md             ({N} sections)
  data/{type}/config.md            (rigor: {level})
  data/{type}/skill-loadout.md
  templates/planning-{type}.md     ({N} sections from guide)

The type is immediately available. Run /seed {type} to try it.
Template, guide, config, and skill loadout — full round-trip ready.

SEED v1.0 · Chris AI Systems · https://chrisai.cv/skool · https://youtube.com/@chris-ai-systems
```
</step>

</steps>

<output>
- `data/{type}/guide.md` — conversation sections with Explore + Suggest
- `data/{type}/config.md` — rigor, demeanor, required/optional sections
- `data/{type}/skill-loadout.md` — ecosystem tool recommendations
- `templates/planning-{type}.md` — PLANNING.md template with frontmatter and sections from guide
</output>

<acceptance-criteria>
- [ ] New type name validated (lowercase, no collision)
- [ ] Guide created with Explore + Suggest per section
- [ ] Config created with rigor level and required/optional sections
- [ ] Skill loadout created with prioritized tool recommendations
- [ ] Planning template auto-generated from guide sections with standard frontmatter
- [ ] Template includes provenance footer
- [ ] Wait points at every user input boundary
- [ ] New type immediately usable — full ideate → graduate round-trip works
- [ ] Existing types shown as reference during creation
</acceptance-criteria>
