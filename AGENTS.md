# AGENTS.md

This file documents the AGI monorepo structure and conventions for AI agents.

## Monorepo Structure

```
/
├── apps/
│   ├── hisoles/          # Next.js 16 e-commerce storefront
│   ├── job-automator/    # CLI/library for browser automation jobs
│   ├── control-panel/    # Next.js 16 dashboard for monitoring agents
│   └── intent-relay/     # Telegram → Factory Droid relay (remote AGI intent)
├── packages/
│   ├── automation-core/  # Stagehand v3 + Browserbase integration
│   ├── integrations/     # Whop & Shopify API clients
│   ├── ui/               # Shared React UI primitives (Button, Card)
│   └── tsconfig/         # Shared TypeScript configurations
├── AGI/                  # AGI mission system (subproject)
├── atlas/                # Atlas project (subproject)
└── scripts/              # Automation and utility scripts
```

## Tech Stack (January 2026)

- **Runtime**: Bun 1.3+
- **Monorepo**: Turborepo 2.7+
- **Framework**: Next.js 16.1 with React 19, React Compiler
- **Language**: TypeScript 5.9, ESM-only
- **Browser Automation**: Stagehand v3.0.7, Browserbase SDK v2.6.0
- **AI/LLM**: Vercel AI SDK v6.0.27
- **Validation**: Zod 4.2+

## AI Models (Latest as of Jan 2026)

| Provider | Model ID | Use Case |
|----------|----------|----------|
| Google | `gemini-3-pro-preview` | Browser automation, agent orchestration |
| OpenAI | `gpt-5.2-pro` | Fallback/planner in orchestrator |
| Anthropic | `claude-opus-4-5-20251101` | Programmatic code generation |

**Note**: These models are for *programmatic* use (automation agents, orchestrator).
Interactive development uses Factory/Droid which handles model selection automatically.

## Shared Packages

### @agi/automation-core

Browser automation using Stagehand v3 + Browserbase.

```typescript
import { createStagehand, createAutomationAgent } from "@agi/automation-core"

const stagehand = createStagehand({ profile: "max_success_stealth" })
await stagehand.init()

const page = stagehand.context.pages()[0]
await page.goto("https://example.com")

// Stagehand v3: methods on stagehand instance, not page
await stagehand.act("click the login button")
const data = await stagehand.extract("extract the page title")

await stagehand.close()
```

**Profiles**:
- `max_success_stealth` — Maximum anti-detection, slower
- `max_speed_repeatable` — Fast execution, less stealth
- `cua_break_glass` — Emergency/debugging mode

### @agi/integrations

API clients for Whop and Shopify.

```typescript
import { createWhopClient, createShopifyClient } from "@agi/integrations"

// Whop payments
const whop = createWhopClient({
  apiKey: process.env.WHOP_API_KEY!,
  webhookSecret: process.env.WHOP_WEBHOOK_SECRET,
})
const event = await whop.verifyWebhook(body, headers)

// Shopify GraphQL (2026-01 API version)
const shopify = createShopifyClient({
  shop: "store.myshopify.com",
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
})
const order = await shopify.createOrder({
  lineItems: [{ variantId: "gid://shopify/ProductVariant/123", quantity: 1 }],
  email: "customer@example.com",
  financialStatus: "PAID",
})
```

## Coding Conventions

- No semicolons, double quotes, trailing commas (ES5)
- Prefer `import type` for type-only imports (Biome enforces this)
- Use `.js` extensions in imports for ESM compatibility
- All packages use `moduleResolution: "NodeNext"`

## Verification Gates

All changes must pass:

```bash
bun run check      # Biome lint + Prettier format + TypeScript
bun run build      # Build all packages and apps
```

CI runs on every push/PR to main via `.github/workflows/ci.yml`.

## Factory Droid GitHub Integration

Factory Droid is integrated via GitHub Actions for automated assistance:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `droid.yml` | `@droid` tag in issues/PRs/comments | AI task execution on demand |
| `droid-review.yml` | PR opened/ready | Automatic AI code review |

**Setup**: Add `FACTORY_API_KEY` to GitHub repo secrets (Settings → Secrets → Actions).

**Usage**: Tag `@droid` in any issue or PR comment to trigger autonomous task execution.

## External Integrations

- **Whop**: Checkout embed via `@whop/checkout/react`
- **Meta Pixel**: Tracking scripts on offer page
- **Browserbase**: Cloud browser infrastructure for automation

## Remote AGI Intent Delivery

The `apps/intent-relay` app enables remote AGI execution via Telegram. Send ANY prompt from your phone, and it executes via Factory Droid directly on your Mac.

By default, prompts are injected into a **persistent** tmux-backed interactive `droid` session (so context/memory carries across messages).

### Architecture (SOTA Jan 2026 - No VPS Needed!)

```
┌─────────────┐                    ┌─────────────────────────────────┐
│  Telegram   │ ─────────────────► │  Mac (24/7)                     │
│    Bot      │                    │  ├─ Telegram Bot (Grammy)       │
│  (Phone)    │ ◄───────────────── │  ├─ Factory Droid (full caps)   │
└─────────────┘      Response      │  ├─ caffeinate (no sleep)       │
                                   │  └─ Tailscale (remote access)   │
                                   └─────────────────────────────────┘
```

**Why no VPS?**
- Mac runs 24/7 with caffeinate (no sleep)
- Telegram bot uses polling (no webhook/static IP needed)
- Full Droid capabilities (stdio MCP, Ralph loops, IDE, browser automation)
- **$0/month** instead of $6/month
- Zero latency for droid execution

### Full Capabilities on Mac

| Capability | Status |
|------------|--------|
| stdio MCP servers | ✅ (Browserbase browser automation) |
| Ralph loops | ✅ |
| IDE integration | ✅ |
| File system access | ✅ |
| Browser automation | ✅ |
| Session memory | ✅ (via tmux) |
| Sub-agents | ✅ |
| Git push/pull | ✅ |

### Setup (Mac-Native)

1. **Create Telegram bot**: Message @BotFather, create bot, get token
2. **Get your user ID**: Message @userinfobot to get your Telegram ID
3. **Set environment variables**:
   ```bash
   export TELEGRAM_BOT_TOKEN=your_token
   export ALLOWED_USER_ID=your_id
   export DROID_AUTO_LEVEL=high
   ```
4. **Run setup scripts**:
   ```bash
   ./scripts/setup-caffeinate.sh      # Prevent Mac sleep
   ./scripts/setup-intent-relay-mac.sh # Install as launchd service
   ```

### Usage

Send any message to your Telegram bot:
- `Build a landing page for runners` → Full droid execution
- `Research competitors in insole market` → Uses all MCP servers
- `/ralph Implement auth flow` → Starts Ralph loop
- `Check git status` → Quick commands

### Service Management

```bash
# Logs
tail -f ~/logs/intent-relay.log

# Attach to the persistent Droid session (optional)
tmux -L agi attach -t droid

# Stop
launchctl unload ~/Library/LaunchAgents/com.agi.intent-relay.plist

# Start
launchctl load ~/Library/LaunchAgents/com.agi.intent-relay.plist
```

### Why Telegram (Not WhatsApp)

- **[F]** Meta banned general-purpose AI bots on WhatsApp (Jan 15, 2026)
- **[F]** Telegram Bot API is simple (1 API call vs WhatsApp Business API)
- **[F]** No approval process required

## Ralph - Autonomous Development Loop

This repo uses **Pure Ralph** for autonomous task execution, based on [Geoffrey Huntley's pattern](https://ghuntley.com/ralph/):

```bash
while :; do cat PROMPT.md | claude-code ; done
```

### Core Philosophy

- **State lives in the prompt**: No external task tracker. The LLM manages its own task breakdown and progress.
- **Deterministically bad**: Predictable failure modes that can be tuned via "signs" in the prompt.
- **Eventual consistency**: Keep running, it will converge.
- **Simplicity**: One loop, one prompt file, maximum autonomy.

### Proven Results

| Case Study | Result | Source |
|------------|--------|--------|
| Contract delivery | $50k contract for $297 API cost | Geoffrey Huntley, Jul 2025 |
| YC hackathon | 6 repos, ~1100 commits, ~$800 total | RepoMirror field report |
| CURSED language | Full programming language in 3 months | ghuntley.com/cursed |

### Why No Task Master?

First-principles analysis concluded that for 100% autonomous AGI with zero human involvement:

1. **Task Master's observability has no audience** - If no humans are observing, there's no value in external state tracking.
2. **AI planning features are redundant** - Droid sub-agents do research; Task Master's AI features duplicate this.
3. **Coordination overhead** - MCP round-trips for every state change add latency without proportional value.
4. **Proven at scale** - Pure Ralph built a programming language, shipped 6 repos overnight at YC hackathon.

### How Ralph Works

1. `/ralph <task>` creates `.factory/ralph-loop.local.md` with the task
2. Stop hook prevents session exit, feeding SAME PROMPT back for next iteration
3. LLM plans in the prompt, tracks progress there
4. Verification gates: `bun run check` + `bun run build` must pass
5. Output `<promise>COMPLETE</promise>` (only when true) to exit

### Prompt Simplicity (Critical)

**Keep prompts under 150 words.** YC hackathon discovered that expanding from 103 words to 1,500 words made agents "slower and dumber". Simple prompts outperform complex ones.

### Signs (Guardrails)

Signs are constraints added to the prompt **reactively** when failures occur. The playground metaphor: Ralph builds well but falls off slides. Add signs like "SLIDE DOWN, DON'T JUMP" until Ralph internalizes guardrails.

```markdown
SIGNS (guardrails - add more when failures occur):
- SLIDE DOWN: Don't skip verification. Run feedback loops.
- LOOK AROUND: Check existing patterns before creating new ones.
```

### Feedback Loops (Mandatory)

Before committing, ALL must pass:
1. `bun run check` (TypeScript + lint)
2. `bun run build`
3. Browser verification (if UI changed)

### Task Sizing

Each task must be completable in ONE iteration (one context window). If you can't describe it in 2-3 sentences, it's too big.

### Priority Order

1. Architectural decisions / core abstractions
2. Integration points between modules
3. Unknown unknowns / spike work
4. Standard features
5. Polish / cleanup / quick wins

### Completion Gates (100% Autonomous)

For autonomous AGI, **if it can't be machine-verified, it's not a completion gate.**

| Gate | Verifies | Machine-Verified |
|------|----------|------------------|
| `bun run check` | Types, lint, format | Yes |
| `bun run build` | Production build | Yes |
| `bun run test` | Acceptance criteria | Yes (if tests exist) |
| Browser automation | UI functionality | Yes |
| Verification stamp | All gates passed | Yes |

**The principle**: Convert acceptance criteria into executable tests. Then completion becomes mathematically provable.

```
Task → Acceptance Criteria → Executable Tests → Pass/Fail → Completion
         (human intent)        (agent writes)    (machine)   (autonomous)
```

Human involvement: **Only at the INITIAL INTENT level**. Everything after is autonomous.

## Full Remote Droid Capabilities (SOTA Jan 2026)

**Mac runs everything directly** - no VPS needed. Tailscale provides optional remote access.

### Why This Architecture is Optimal

| Aspect | Mac-Native | VPS-Based (old) |
|--------|------------|-----------------|
| Monthly cost | **$0** | $6+ |
| Droid latency | **0ms** | 50-200ms |
| stdio MCP | **✅** | ❌ |
| Ralph loops | **✅** | ❌ |
| IDE integration | **✅** | ❌ |
| Browser automation | **✅** | ❌ |
| Setup complexity | **Low** | High |

### Factory API Limitations

**[F]** No REST API for session creation - must use CLI (`droid exec`) or integrations
**[F]** Machine Templates API exists for workspace config, not execution
**[F]** Remote triggers: GitHub Actions (`@droid`), Slack (`@Factory`), Linear (assign Factory)

### Setup Scripts

Run in order on your Mac:
```bash
./scripts/setup-caffeinate.sh        # 1. Prevent sleep
./scripts/setup-intent-relay-mac.sh  # 2. Install Telegram bot as service
```

### Environment Variables

```bash
export TELEGRAM_BOT_TOKEN=your_token
export ALLOWED_USER_ID=your_id
export DROID_AUTO_LEVEL=high
export PROJECT_DIR=~/dev/hisoles
```

## Key Files

| File | Purpose |
|------|---------|
| `turbo.json` | Turborepo task configuration |
| `biome.json` | Linting and formatting rules |
| `.factory/mcp.json` | Factory MCP server configuration |
| `.factory/scripts/ralph-verify.sh` | Ralph verification script |
| `.factory/ralph-loop.local.md` | Current Ralph loop state (prompt-based) |
| `scripts/setup-caffeinate.sh` | Prevent Mac sleep |
| `scripts/setup-intent-relay-mac.sh` | Install Telegram bot as Mac launchd service |
