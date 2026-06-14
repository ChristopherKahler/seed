<purpose>
Graduate a project and initialize PAUL in one step — the "easy button" from ideation to managed build.
</purpose>

<user-story>
As a builder ready to start building, I want to graduate my project and set up PAUL in a single command, so that I don't have to run separate graduation and initialization steps.
</user-story>

<when-to-use>
- Ideation is complete and you want to start building immediately
- You want PAUL-managed development (structured phases, plans, progress tracking)
- You prefer one command over running `/seed graduate` then `/paul:init` separately
</when-to-use>

<context>
@seed.md
@tasks/graduate.md (delegation target — launch wraps this flow)
</context>

<steps>

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
   - Continue with launch (not a hard stop)

4. **Additional v1 artifact check** (even if no base binary):
   - Check for `.base/data/*.json` files (v1's JSON store):
     ```bash
     ls .base/data/*.json 2>/dev/null
     ```
   - If found: display v1 warning (same hard stop as step 2)

**Note:** `base_v2_available` is passed through to the graduate delegation and to the PAUL init step so paul.toml gets domain tags if BASE is present.
</step>

<step name="run_graduation" priority="first">
## Run Graduation

Execute the full graduation flow from `tasks/graduate.md` first.

All validation, quality checks, README synthesis, git init, and tracking updates happen there. Do NOT duplicate that logic here — delegate entirely.

Pass `$ARGUMENTS` through as the project name.

After graduation completes successfully, proceed to PAUL integration below.

<if condition="graduation fails or user exits during graduate flow">
Stop here. Do not proceed to PAUL integration. The graduate task handles its own error reporting.
</if>
</step>

<step name="offer_paul">
## Offer PAUL Integration

After graduation is complete, ask the user:

> "Project graduated to `apps/{name}/`. Want to initialize PAUL for a managed build?"
>
> PAUL gives you structured milestones, phases, plans, and progress tracking. Your PLANNING.md has enough detail to set up PAUL without re-answering questions.
>
> **Yes** — initialize PAUL now
> **No** — just the graduation is fine (you can run `/paul:init` later)

Wait for response.

<if condition="user declines">
Report graduation-only result:

> "Graduated: `apps/{name}/`"
> "Run `/paul:init` in `apps/{name}/` if you change your mind."

Exit.
</if>
</step>

<step name="check_paul_availability">
## Check PAUL Availability

Check if PAUL is installed via multiple paths:

1. **Skill path (preferred):**
   ```bash
   ls ~/.claude/commands/paul/plan.md 2>/dev/null
   ```

2. **Legacy framework path (fallback):**
   ```bash
   ls ~/.claude/paul-framework/ 2>/dev/null
   ```

<if condition="either path found">
Check for v1.4+ features (paul.toml support):
```bash
grep -l "paul.toml\|paul-toml" ~/.claude/commands/paul/*.md 2>/dev/null || grep -l "paul.toml\|paul-toml" ~/.claude/paul-framework/src/templates/*.md 2>/dev/null
```

- **If paul.toml references found:** PAUL v1.4+ detected. Pass `base_v2_available` context to PAUL init so it can set domain tags and create paul.toml (not paul.json).
- **If not found:** PAUL pre-v1.4 detected. Display:
  ```
  ⚠️ PAUL detected but may be an older version. For full Agentic OS
  integration (paul.toml, BASE v2 graph sync, domain tags), update PAUL:
  npx paul-framework@latest

  Proceeding with init using current version.
  ```
  Continue with init.
</if>

<if condition="neither path found">
Inform the user:

> "PAUL isn't installed yet."
>
> ```
> Install: npx paul-framework
> ```
>
> "Want to install it now, or skip PAUL for now? You can run `/paul:init` later."

Wait for response.

If user wants to install: run `npx paul-framework --global` then proceed.
If user declines: exit gracefully with graduation-only result.
</if>
</step>

<step name="headless_paul_init">
## Headless PAUL Init

Run `/paul:init` in the graduated `apps/{name}/` directory with headless context:

1. Read `apps/{name}/README.md` (synthesized from PLANNING.md during graduation)
2. Also read the original `projects/{name}/PLANNING.md` for full depth

Pass this context to PAUL init with the instruction:

> "Use the PLANNING.md and README.md as the project brief. Derive milestones, phases, and project structure from them. Do NOT re-ask questions that SEED already answered during ideation — the answers are in these documents. Propose the project structure and ask for approval."

PAUL will propose a structure (milestones, phases, tech stack). The user reviews and approves — headless means no redundant questions, NOT no approval.

Wait for response (user approves or adjusts PAUL's proposed structure).
</step>

<step name="report_completion">
## Report Completion

After PAUL initialization is approved:

```
Launched: {name}
Location: apps/{name}/
PAUL: Initialized with {milestone} — {N} phases

Your project is ready for managed development.
Run /paul:plan to start Phase 1.

SEED v1.0 · Chris AI Systems · https://chrisai.cv/skool · https://youtube.com/@chris-ai-systems
```
</step>

</steps>

<output>
- Everything from tasks/graduate.md (app directory, git repo, README, tracking)
- `.paul/` directory in `apps/{name}/` (PROJECT.md, ROADMAP.md, STATE.md)
- Project ready for `/paul:plan`
</output>

<acceptance-criteria>
- [ ] Delegates to tasks/graduate.md without duplicating logic
- [ ] Asks user about PAUL (not filesystem scan for decision)
- [ ] Checks PAUL framework availability before attempting init
- [ ] Prompts installation if PAUL not found
- [ ] Headless PAUL init passes PLANNING.md as context
- [ ] User still approves PAUL's proposed structure
- [ ] Graceful exit if user declines PAUL at any point
- [ ] Wait points at PAUL offer and structure approval
</acceptance-criteria>
