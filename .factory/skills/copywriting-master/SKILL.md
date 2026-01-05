---
name: copywriting-master
description: >
  Conversion copy + messaging/offer architecture for agents. Use when creating or auditing marketing copy:
  headlines, ads, landing pages, sales pages, email sequences, offers, positioning, and CRO rewrites.
---

# Copywriting Master

This skill is the persuasion + copycraft layer.
General reasoning/optimization protocols live in `first-principles-thinking`.

## Hard constraints (do not violate)

- No manufactured urgency/scarcity.
- No hidden material terms (price, risk, constraints, eligibility, renewals/cancellation).
- No borrowed authority (“proven”, “scientific”, “experts say”) without verifiable sourcing.
- No implied guarantees; disclose conditions and variance.
- Preserve agency at the decision point.

## Required inputs (ask if missing; never invent)

- Offer facts: what it is, what’s included, price + terms, guarantee, key constraints, onboarding/prereqs, who it’s not for.
- Audience: ICP, Voice-of-Customer (verbatim quotes), top pains/desires, top objections, alternatives.
- Proof: demo/data/mechanism/docs/case studies/testimonials (with context).
- Channel + placement + constraints: platform, character limits, traffic temperature, step in funnel.
- Brand voice constraints (if any) + compliance notes (health/finance/legal/etc).

If inputs are missing, ask for them explicitly instead of “filling gaps.”

## Core artifacts (build internally; output the ones requested)

1. VoC Bank (quotes clustered by theme)
2. Objection Matrix (objection → fear underneath → honest answer → proof)
3. Proof Inventory (claim → proof → safest truthful phrasing)
4. Mechanism Statement: “It works because **, which means **, as long as \_\_.”
5. Fit Filters (for / not for / prerequisites / honest costs)

Deep refs:

- `references/research-pipeline.md`
- `references/psychological-foundations.md`

## Strategy selectors (choose once; enforce Rule of One)

- Primary driver: LF8 (1–8)
- Awareness: Schwartz 5
- Market sophistication: 1–5
- Lead archetype: Offer / Promise / Problem–Solution / Secret / Proclamation / Story
- One Good Idea + one core benefit + one CTA

Deep ref: `references/persuasion-architecture.md`

## Workflows

### A) Create new copy (default)

1. Produce a `Copy Brief`.
2. Produce a `Messaging Map`.
3. Draft the asset (match channel constraints).
4. Run QA gates.
5. Output: Copy + Claim Ledger (and variants only if asked).

### B) Rewrite existing copy

1. Diagnose failure mode(s): awareness mismatch, unclear offer, weak proof, scattered benefit, fog language, hidden costs/terms, overclaims.
2. Rewrite in 2 passes:
   - Pass 1: structure + clarity (make it understandable).
   - Pass 2: persuasion + rhythm (make it compelling without adding untruth).
3. Output: Revised copy + short “What changed” bullets + Claim Ledger.

### C) Audit (when asked)

Output a `Copy Audit Report` with:

- Rule of One verdict (what the one thing is / should be)
- Trust risks (claims, implied guarantees, urgency/scarcity, hidden terms)
- Proof gaps (what must be shown or softened)
- 5–10 concrete edits (quote → fix)

Optional: run `scripts/copy-audit.sh` on the draft.

## QA gates (run every time)

- Truth Gate (claims): `references/truth-gate.md`
- Open loops + clarity anchors: `references/mystery-integrity.md`
- Lever integrity mapping: `references/derivation-atlas.md`
- Readability: target Flesch 60–70; short sentences/paragraphs

## Output templates (default)

### Copy Brief

- Asset type + channel + placement:
- Offer (what it is, what’s included):
- Price + key terms + guarantee (material terms):
- Who it’s for / not for:
- Primary VoC pain (verbatim):
- Primary desire (verbatim):
- Primary objection + fear underneath:
- Mechanism statement:
- Proof available (top 3):
- CTA (single):
- Compliance notes:

### Messaging Map

- LF8 driver:
- Awareness level:
- Lead archetype:
- One Good Idea (1 sentence):
- One core benefit (Dream Outcome):
- One reason to believe (mechanism + proof):
- 3 supporting bullets (concrete + conditioned):
- Objection handling (top 3 → answer → proof):
- Fit filter line:
- Urgency/scarcity (only if real; else “none”):

### Claim Ledger (required for any draft)

| Claim | Type (outcome/time/compare/scarcity/authority/testimonial/guarantee) | Proof | Conditions disclosed? | Safe phrasing | Risk flag |
| ----- | -------------------------------------------------------------------- | ----- | --------------------- | ------------- | --------- |

## Reference map

- Core discipline: `references/truth-gate.md`, `references/research-pipeline.md`
- Psychology: `references/psychological-foundations.md`
- Strategy + leads: `references/persuasion-architecture.md`, `examples/lead-archetypes.md`
- Systems: `references/copywriting-systems.md`, `references/marketing-systems.md`, `examples/email-sequences.md`
- Integrity tactics: `references/derivation-atlas.md`, `references/mystery-integrity.md`
- Tooling: `scripts/copy-audit.sh`
