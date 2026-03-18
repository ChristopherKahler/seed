# Application — Conversation Guide

## Section 1: Problem Statement
**Explore:** What does this solve? Who's it for — just you, a team, the public? Why build it instead of buying something off the shelf? What's the pain point that makes this worth the effort?
**Suggest:** If the user is vague, try: "What's the one thing a user would do in their first 5 minutes?" If they're solving their own problem, that's valid — note it as "dogfooding" and move on.
**Depth:** required

## Section 2: Tech Stack
**Explore:** Do you have a stack in mind, or are you exploring? What's the deployment target — local, cloud, edge? Any constraints from the team or existing infrastructure? Why this stack over alternatives?
**Suggest:** For solo builders: Next.js + SQLite is fast to ship. For teams: consider what everyone knows. If they mention unfamiliar tech, suggest `/paul:discover` for research before committing.
**Depth:** required

## Section 3: Data Model
**Explore:** What are the core things this app tracks? How do they relate to each other? What's the most important entity — the one everything else connects to?
**Suggest:** Start with 3-5 entities max. Draw the relationships: "A User has many X, each X belongs to one Y." If it's getting complex, suggest starting with the minimum viable schema and evolving.
**Depth:** required

## Section 4: API Surface
**Explore:** What endpoints does this need? Is there auth? Internal-only or public API? REST, GraphQL, or tRPC? What's the most critical endpoint — the one that delivers core value?
**Suggest:** For MVPs: REST is fastest to build. Auth: start with JWT or session-based, don't over-engineer. If they need real-time: consider SSE over WebSockets for simplicity.
**Depth:** required

## Section 5: Deployment Strategy
**Explore:** Where does this run? Local dev setup, staging, production — what's the plan for each? Docker or bare metal? CI/CD pipeline needed?
**Suggest:** For solo projects: Railway or Vercel for zero-config deploys. For Docker: suggest a compose file early. If they need a database: managed > self-hosted for MVPs.
**Depth:** required

## Section 6: Security Considerations
**Explore:** What's the auth model? What data is sensitive? Any compliance requirements (HIPAA, SOC2, GDPR)? What are the OWASP risks specific to THIS app?
**Suggest:** At minimum: input validation, parameterized queries, CSRF protection, rate limiting. If handling PII: encryption at rest. Don't over-engineer security for internal tools.
**Depth:** required

## Section 7: UI/UX Needs
**Explore:** What does the user see? Key views/pages? Design system or freestyle? Mobile-responsive needed? Any real-time UI requirements (dashboards, notifications)?
**Suggest:** For MVPs: Tailwind + shadcn/ui gets you 80% there. If they have design ideas, suggest ui-ux-pro-max for implementation. If not, suggest starting with a wireframe conversation.
**Depth:** required

## Section 8: Integration Points
**Explore:** What external systems does this talk to? APIs, webhooks, MCP servers, third-party services? What happens if an integration is down?
**Suggest:** List each integration with: what data flows, which direction, what auth is needed. For MCP servers: check if one already exists in the workspace before building new.
**Depth:** optional

## Section 9: Phase Breakdown
**Explore:** What's the minimum slice that proves the concept? What comes after that? Can you ship something useful in 3-5 phases? What's the "it works" moment for each phase?
**Suggest:** Phase 1 should be the smallest thing that delivers value. Each phase should be independently testable. If they're planning more than 7 phases, the scope might be too big.
**Depth:** required

## Section 10: Skill Loadout
**Explore:** Which ecosystem tools make sense for this build? Need code quality scanning? UI design help? Structured development workflow?
**Suggest:** Load skill-loadout.md recommendations. For most applications: PAUL (required for managed build), AEGIS (recommended post-build audit), ui-ux-pro-max (if frontend-heavy).
**Depth:** optional
