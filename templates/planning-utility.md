# {Tool Name}

> {One sentence. If you need two, this might not be a utility.}

**Created:** {date}
**Type:** Utility Tool
**Location:** tools/{personal|shareable|mcp-servers}/
**Skill Loadout:** {usually minimal}
**Quality Gates:** {done criteria pass}

---

## Problem Statement

{What specific problem does this solve? One sentence. If you can't say it in one sentence, it might not be a utility tool.}

---

## Scope Guard

{Actively resist expansion.}

- **Can this be one file?** {yes/no — if no, why not?}
- **Can this be one function?** {yes/no — if no, why not?}
- **Single script or project structure?** {script / project — justify if project}

### What This Does
- {capability 1}
- {capability 2}

### What This Does NOT Do
- {explicitly excluded — resist feature creep}

---

## User & Distribution

- **Audience:** {just me / Skool community / Claude Code users / MCP consumers}
- **Location:** {tools/personal/ | tools/shareable/ | tools/mcp-servers/production/}
- **Packaging:** {standalone script / npm package / MCP server / slash command}

---

## Dependencies

{Minimize ruthlessly. If dependencies are heavy, this might be an Application, not a Utility.}

| Dependency | Why | Can We Avoid It? |
|-----------|-----|-----------------|
| {e.g., node-fetch} | {HTTP requests} | {no — core need} |

---

## Interface

- **Invocation:** {CLI args / MCP tool call / slash command / import}
- **Input:** {format, required args, optional args}
- **Output:** {format, stdout, file, return value}

### Examples
```
{example invocation and expected output}
```

---

## Done Criteria

{3-5 concrete test cases. If you can't define done criteria easily, scope is too big.}

- [ ] {Test case 1: input → expected output}
- [ ] {Test case 2: input → expected output}
- [ ] {Test case 3: edge case → expected behavior}

---

## Design Decisions

1. **{Decision}**: {choice} — {rationale}

---

## Open Questions

1. {Question}

---

## Next Actions

- [ ] {First concrete step — probably "just build it"}

---

## References

- {Links, related files, prior art}

---

### PAUL Decision

{Does this need PAUL?}
- < 200 lines, single file → **Just build it, no PAUL**
- Multiple files, tests needed → Light PAUL (1 milestone, 1-2 phases)
- Complex with integrations → Probably an Application, not a Utility

**Decision:** {Just build it / Light PAUL / Reclassify as Application}

---

*Last updated: {date}*
