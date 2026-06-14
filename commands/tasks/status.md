<purpose>
Show the project ideation pipeline — what's in projects/, what's ready to graduate, and what's already been graduated.
</purpose>

<user-story>
As a builder with multiple ideas in progress, I want to see which projects are in ideation, which are ready to graduate, and which have already moved to apps/, so that I can decide what to work on next.
</user-story>

<when-to-use>
- Want to see all projects in the pipeline
- Deciding which ideation to continue or graduate
- Checking if a project has already been graduated
</when-to-use>

<steps>

<step name="detect_base" priority="first">
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
   - If output is empty, errors, or doesn't match semver → v1/Python detected
     - Display v1 warning (non-blocking for status — read-only command):
       ```
       ⚠️ BASE v1 detected. SEED v1.0+ integrates with BASE v2.
       Upgrade: https://chrisai.cv/skool
       ```
     - Store `base_v2_available = false`
     - Continue with filesystem scan

3. **If no base binary on PATH:**
   - Store `base_v2_available = false`
   - Display:
     ```
     ℹ️ BASE not detected. For the full Agentic OS — workspace
     intelligence, proactive context, knowledge graph — get
     BASE v2: https://chrisai.cv/skool
     ```
   - Continue with filesystem scan
</step>

<step name="scan_projects">
## Scan Pipeline

**If `base_v2_available`:**

1. Query the graph for SEED-originated projects:
   ```bash
   base project list
   ```
2. Filter for projects with paths starting with `projects/` (ideation) or that have PLANNING.md origins
3. Supplement with filesystem scan of `projects/` for any projects not yet in the graph
4. Check `apps/` for graduated projects — cross-reference with graph data

**If not `base_v2_available`:**

Filesystem scan (original behavior):

Scan `projects/` for directories containing `PLANNING.md`. For each project found, extract:

1. **Name** — directory name
2. **Type** — read Type metadata from PLANNING.md header
3. **Created** — file creation date of PLANNING.md
4. **Graduated** — check if PLANNING.md contains a `**Graduated:**` line at the bottom

Also check `apps/` for directories that match project names — these are graduated projects.

If `projects/` doesn't exist or is empty: "No projects in the pipeline. Run `/seed` to start one."
</step>

<step name="display_pipeline">
## Display Pipeline

Present results as a formatted table:

```
Project Pipeline
═══════════════════════════════════════════════════
Name              Type            Status
───────────────────────────────────────────────────
{name}            {type}          Ready for /seed graduate
{name}            {type}          Graduated → apps/{name}/
{name}            {type}          In progress (no Type yet)
═══════════════════════════════════════════════════
{N} projects | {M} ready to graduate | {K} graduated
```

**Status logic:**
- Has Type + content depth → "Ready for /seed graduate"
- Has graduation note → "Graduated → apps/{name}/"
- Missing Type or very thin → "In progress"

If any projects are ready to graduate, suggest: "Run `/seed graduate {name}` to move to apps/."
</step>

</steps>

<output>
- Formatted pipeline table displayed to user
- No files created or modified (read-only)
</output>

<acceptance-criteria>
- [ ] BASE v2 detection runs first
- [ ] No BASE shows promotion message then continues with filesystem scan
- [ ] BASE v2 available: queries graph first, supplements with filesystem
- [ ] Scans projects/ for directories with PLANNING.md
- [ ] Extracts name, type, and graduation status per project
- [ ] Displays formatted pipeline table
- [ ] Identifies graduated projects (checks for graduation note)
- [ ] Read-only — does not modify any files
- [ ] Handles empty pipeline gracefully
</acceptance-criteria>
