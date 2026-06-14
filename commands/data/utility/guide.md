# Utility — Conversation Guide

## Section 1: Problem Statement
**Explore:** What does this tool do? One sentence. If it takes more than one sentence, it might not be a utility.
**Suggest:** Push for brevity: "It takes X and produces Y." If the description is getting complex, ask: "Is this actually an application?" Utilities resist expansion — that's a feature, not a limitation.
**Depth:** required

## Section 2: Scope Guard
**Explore:** One file or multiple? One function or a system? What does this explicitly NOT do? Where's the boundary?
**Suggest:** Actively resist expansion. If the user says "and it could also..." — stop them. "That sounds like a separate tool. Let's keep this one focused." The best utilities do one thing well.
**Depth:** required

## Section 3: User & Distribution
**Explore:** Who uses this — just you, your team, the community? Where does it live — tools/personal, tools/shareable, tools/mcp-servers?
**Suggest:** Personal tools go in tools/personal/. If it's useful to others: tools/shareable/. If it's an MCP server: tools/mcp-servers/production/. Distribution affects how much documentation you need.
**Depth:** required

## Section 4: Dependencies
**Explore:** What does this depend on? External APIs, npm packages, system tools? Can you minimize dependencies?
**Suggest:** Fewer deps = less maintenance. If a dependency is heavy (e.g., puppeteer for a simple scrape), consider whether a lighter alternative exists. Zero-dep utilities are the gold standard.
**Depth:** required

## Section 5: Interface
**Explore:** How is it invoked? CLI args, stdin, function call, MCP tool? What's the input format? What's the output format?
**Suggest:** Define the contract: "Input: X (format), Output: Y (format), Errors: Z." If you can't define the interface cleanly, the scope might be too broad.
**Depth:** required

## Section 6: Done Criteria
**Explore:** What are 3-5 test cases that prove this works? Can you define them now? If you can't, the scope might be too vague.
**Suggest:** Write the test cases as: "Given X, expect Y." If every test case is different, the tool might be doing too many things. 3 test cases is the sweet spot for utilities.
**Depth:** required
