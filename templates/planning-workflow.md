# {Project Name}

> {One-line description of what this workflow does}

**Created:** {date}
**Type:** Claude Code Workflow
**Skill Loadout:** {skills relevant to building this — e.g., /paul:audit}
**Quality Gates:** {quality checks — e.g., governance review, integration testing}

---

## Problem Statement

{What workflow pain or gap does this solve? Be specific about what's broken, slow, or missing.}

---

## Scope Definition

{What components make up this workflow? Check all that apply and describe each.}

### Components
- [ ] Slash command(s): {list}
- [ ] Skill(s): {list}
- [ ] CARL domain(s): {new or modified}
- [ ] Hook(s): {list}
- [ ] MCP server tool(s): {list}
- [ ] Templates / file generators: {list}
- [ ] Modifications to existing commands: {list}

### Out of Scope
- {Explicitly excluded items}

---

## Integration Map

### Systems Touched

| System | How It's Touched | Changes Needed |
|--------|-----------------|----------------|
| {e.g., CARL} | {e.g., new domain, rule updates} | {specific changes} |
| {e.g., PAUL} | {e.g., new input format} | {specific changes} |
| {e.g., Existing commands} | {e.g., /graduate modification} | {specific changes} |

### Systems NOT Touched
- {List systems explicitly unaffected to prevent scope creep}

---

## Interaction Design

{Map the user experience as conversation flows.}

### Entry Point
```
User: /{command}
Claude: {what happens}
```

### Conversation Flow
{Step-by-step: what Claude asks, what user provides, what Claude does with it. Include branching logic if applicable.}

### Session End
{What artifacts are produced? What does Claude report? What's the next step prompt?}

---

## Output Artifacts

| Artifact | Location | Purpose |
|----------|----------|---------|
| {file/command/domain} | {path} | {what it does} |

---

## Downstream Handoff

{How does the output connect to the next stage? What metadata travels? What does the next tool expect?}

---

## Skill/Tool Discovery

{Skills or tools that could enhance this workflow but don't exist yet.}

| Skill | When It Would Fire | What It Would Do |
|-------|-------------------|-----------------|
| {name} | {trigger} | {description} |

---

## Edge Cases & Constraints

{What shouldn't this workflow do? When does it NOT apply? What happens with unexpected input?}

- {Edge case and how to handle it}

---

## Design Decisions

1. **{Decision}**: {choice} — {rationale}

---

## Open Questions

1. {Question}

---

## Next Actions

- [ ] {First concrete step}

---

## References

- {Links, related files, prior art}

---

*Last updated: {date}*
