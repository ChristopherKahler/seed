# Workflow — Conversation Guide

## Section 1: Problem Statement
**Explore:** What workflow pain or gap does this solve? What's the current process, and where does it break down? Is this a new capability or improving an existing one?
**Suggest:** Frame it as "before vs after" — what does the user do today vs what they'll do with this workflow. If it's replacing manual steps, list them.
**Depth:** required

## Section 2: Scope Definition
**Explore:** What components does this include? Commands, skills, CARL domains, hooks, MCP tools, templates? What's the boundary — what does this workflow NOT do?
**Suggest:** Use a checklist: "Does this need a slash command? A CARL domain? An MCP server? A hook?" Most workflows are 2-3 of these, not all. If they're building all of them, the scope may be too big.
**Depth:** required

## Section 3: Integration Map
**Explore:** What existing systems does this touch? BASE, CARL, PAUL, AEGIS? What files does it read or write? What doesn't it touch?
**Suggest:** Draw the integration map as a table: System | Reads | Writes | Why. If touching more than 3 systems, consider whether this is really one workflow or two.
**Depth:** required

## Section 4: Interaction Design
**Explore:** What's the entry point? User says X, Claude does Y. What's the conversation flow? Where are the decision points? What does "done" look like?
**Suggest:** Write 2-3 example interactions: "User runs /command, Claude responds with..., user confirms..., Claude produces..." This is the spec that drives implementation.
**Depth:** required

## Section 5: Output Artifacts
**Explore:** What files get created or modified? What format? Where do they live? Are outputs consumed by other workflows?
**Suggest:** Table it: File | Format | Location | Consumed By. If outputs feed other systems, that's an integration point — note it.
**Depth:** required

## Section 6: Downstream Handoff
**Explore:** How does the output of this workflow connect to the next stage? Does it feed into PAUL, BASE, another command? Is there a manual step between?
**Suggest:** If the handoff is manual, consider whether it should be automated. If it feeds PAUL, ensure the output format matches what PAUL expects.
**Depth:** optional

## Section 7: Tool Discovery
**Explore:** What's missing from the ecosystem that would make this workflow better? Any MCP servers needed? Any skills that should exist but don't?
**Suggest:** Check existing tools first — search MCP servers, slash commands, skills. Don't build what already exists. If something is missing, note it as a dependency or future work.
**Depth:** optional

## Section 8: Edge Cases & Constraints
**Explore:** What shouldn't this workflow do? What happens with bad input? What if a dependency is missing? What's the failure mode?
**Suggest:** List 3-5 "what ifs" and how the workflow handles each. If you can't answer a "what if," that's a design gap to resolve now.
**Depth:** required
