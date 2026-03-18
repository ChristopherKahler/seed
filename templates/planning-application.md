# {Project Name}

> {One-line description of what this application does}

**Created:** {date}
**Type:** Application
**Stack:** {framework + language + db + cache + deployment}
**Skill Loadout:** ui-ux-pro-max, /paul:audit, sonarqube scan
**Quality Gates:** test coverage, security scan, accessibility, performance

---

## Problem Statement

{What does this solve? Who's it for (solo, team, public)? Why build vs buy?}

---

## Tech Stack

{Framework, language, database, caching, deployment platform. Include "Why this stack?" rationale.}

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | {e.g., Next.js, React, Vue} | {why} |
| Backend | {e.g., Laravel, Node, Python} | {why} |
| Database | {e.g., SQLite, Postgres, MySQL} | {why} |
| Cache | {e.g., Redis, none} | {why} |
| Deployment | {e.g., Docker, Vercel, VPS} | {why} |

### Research Needed
{If exploring unfamiliar tech: what's known, what needs research, what reference architectures exist.}

---

## Data Model

{Core entities and relationships. Can be rough at ideation stage — refine during PAUL planning.}

### Entities

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| {e.g., User} | {id, email, role} | {has many Projects} |

### Notes
- {JSON column candidates, polymorphic relationships, soft deletes, etc.}

---

## API Surface

{Key route groups, auth strategy, versioning approach.}

### Auth Strategy
{Sanctum, JWT, session, API key — and why}

### Route Groups

| Group | Methods | Auth | Purpose |
|-------|---------|------|---------|
| {e.g., /api/users} | {GET, POST} | {required} | {description} |

### Internal vs External
- **Public endpoints:** {list}
- **Internal/admin endpoints:** {list}
- **MCP integration points:** {if applicable}

---

## Deployment Strategy

### Local Development
{Docker Compose services, dev server setup, seed data}

| Service | Image/Runtime | Port | Purpose |
|---------|--------------|------|---------|
| {e.g., app} | {node:20} | {3000} | {main application} |

### Staging / Production
{CI/CD approach, environment management, hosting}

---

## Security Considerations

{Per-app security concerns — not a generic checklist. What's specific to THIS application?}

- **Auth/Authz model:** {description}
- **Input validation:** {key areas}
- **OWASP concerns:** {relevant items for this app}
- **Secrets management:** {approach}
- **Rate limiting:** {if applicable}

---

## UI/UX Needs

{Frontend requirements, design approach, key views.}

### Design System
{Tailwind, shadcn, custom components — and why}

### Key Views / Pages

| View | Purpose | Complexity |
|------|---------|------------|
| {e.g., Dashboard} | {primary workspace} | {high — real-time data} |

### Real-Time Requirements
{WebSockets, SSE, polling — if applicable}

### Responsive Needs
{Desktop-first, mobile-first, both, or desktop-only}

---

## Integration Points

{External APIs, MCP servers, webhooks, third-party services.}

| Integration | Type | Purpose | Auth |
|------------|------|---------|------|
| {e.g., Stripe} | {API} | {payments} | {API key} |

---

## Phase Breakdown

{Independently shippable milestones. Each phase: what's built, what's testable, what's the user-facing outcome. Maps directly to PAUL milestones.}

### Phase 1: {Name}
- **Build:** {what gets built}
- **Testable:** {what can be verified}
- **Outcome:** {user-facing result}

### Phase 2: {Name}
- **Build:** {what gets built}
- **Testable:** {what can be verified}
- **Outcome:** {user-facing result}

---

## Skill Loadout & Quality Gates

### Skills Used During Build

| Skill | When It Fires | Purpose |
|-------|--------------|---------|
| ui-ux-pro-max | Frontend phases | Design system, component quality |
| /paul:audit | End of each milestone | Architecture review |
| sonarqube scan | End of each phase | Code quality, vulnerabilities |

### Quality Gates

| Gate | Threshold | When |
|------|-----------|------|
| Test coverage | {e.g., 80%} | {each phase} |
| Security scan | {pass} | {each phase} |
| Accessibility | {WCAG AA} | {frontend phases} |
| Performance | {e.g., LCP < 2s} | {final milestone} |

---

## Design Decisions

{Numbered list of resolved decisions. Each entry: what was decided and why.}

1. **{Decision}**: {choice} — {rationale}

---

## Open Questions

{Unresolved items that need answers before or during build.}

1. {Question}

---

## Next Actions

- [ ] {First concrete step}

---

## References

- {Links, related files, prior art}

---

*Last updated: {date}*
