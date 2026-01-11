/**
 * AGI Intent Relay Server
 *
 * Receives messages from Telegram and executes them via Factory Droid.
 * Runs directly on Mac with FULL Droid capabilities.
 *
 * Architecture (SOTA Jan 2026):
 *   Telegram → Mac (Telegram Bot + Full Droid)
 *
 * Full capabilities:
 *   - stdio MCP servers (Browserbase browser automation)
 *   - Ralph autonomous loops
 *   - IDE integration
 *   - File system access
 *   - Session memory (via tmux)
 *
 * No VPS needed! Mac runs 24/7 with:
 *   - caffeinate (prevent sleep)
 *   - Tailscale (access from anywhere)
 */

import { Bot } from "grammy"
import { promises as fs } from "node:fs"
import path from "node:path"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID
const DROID_AUTO_LEVEL = process.env.DROID_AUTO_LEVEL || "high"
const PROJECT_DIR = process.env.PROJECT_DIR || process.cwd()

const TMUX_SERVER = process.env.TMUX_SERVER || "agi"
const TMUX_SESSION = process.env.TMUX_SESSION || "droid"
const TMUX_WINDOW = process.env.TMUX_WINDOW || "droid"

const HOME_DIR = process.env.HOME || PROJECT_DIR
const LOG_DIR = process.env.LOG_DIR || path.join(HOME_DIR, "logs")
const TMUX_LOG_FILE =
  process.env.TMUX_LOG_FILE || path.join(LOG_DIR, "droid-tmux.log")

const TMUX_LOG_MAX_BYTES = envInt("TMUX_LOG_MAX_BYTES", 5 * 1024 * 1024)
const TMUX_MAX_WAIT_MS = envInt("TMUX_MAX_WAIT_MS", 15 * 60 * 1000)
const TMUX_IDLE_DONE_MS = envInt("TMUX_IDLE_DONE_MS", 6000)

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error("TELEGRAM_BOT_TOKEN is required")
}

if (!ALLOWED_USER_ID) {
  throw new Error("ALLOWED_USER_ID is required")
}

const bot = new Bot(TELEGRAM_BOT_TOKEN)

type CommandResult = {
  stdout: string
  stderr: string
  exitCode: number
}

function envInt(name: string, defaultValue: number): number {
  const raw = process.env[name]
  if (!raw) return defaultValue
  const parsed = Number.parseInt(raw, 10)
  if (!Number.isFinite(parsed) || parsed <= 0) return defaultValue
  return parsed
}

function shellQuote(value: string): string {
  return "'" + value.replaceAll("'", "'\\''") + "'"
}

async function runCommand(
  cmd: string,
  args: string[],
  options?: { cwd?: string }
): Promise<CommandResult> {
  const proc = Bun.spawn([cmd, ...args], {
    cwd: options?.cwd,
    stdout: "pipe",
    stderr: "pipe",
  })

  const stdout = await new Response(proc.stdout).text()
  const stderr = await new Response(proc.stderr).text()
  const exitCode = await proc.exited

  return { stdout, stderr, exitCode }
}

async function tmux(args: string[]): Promise<CommandResult> {
  return runCommand("tmux", ["-L", TMUX_SERVER, ...args])
}

function tmuxPaneTarget(): string {
  return `${TMUX_SESSION}:${TMUX_WINDOW}.0`
}

async function ensureTmuxDroidSession(): Promise<void> {
  await fs.mkdir(LOG_DIR, { recursive: true })
  await fs.appendFile(TMUX_LOG_FILE, "")

  const currentSize = await fileSize(TMUX_LOG_FILE)
  if (currentSize > TMUX_LOG_MAX_BYTES) {
    await fs.truncate(TMUX_LOG_FILE, 0)
  }

  const has = await tmux(["has-session", "-t", TMUX_SESSION])
  if (has.exitCode !== 0) {
    const created = await tmux([
      "new-session",
      "-d",
      "-s",
      TMUX_SESSION,
      "-n",
      TMUX_WINDOW,
      "-c",
      PROJECT_DIR,
      "droid",
    ])

    if (created.exitCode !== 0) {
      throw new Error(
        created.stderr.trim() ||
          created.stdout.trim() ||
          "Failed to create tmux session"
      )
    }
  }

  await tmux(["set-option", "-t", TMUX_SESSION, "history-limit", "50000"])

  const pane = tmuxPaneTarget()
  const pipe = await tmux([
    "pipe-pane",
    "-o",
    "-t",
    pane,
    `cat >> ${shellQuote(TMUX_LOG_FILE)}`,
  ])

  if (pipe.exitCode !== 0) {
    console.log(
      `Warning: failed to enable tmux pipe-pane logging: ${pipe.stderr.trim()}`
    )
  }

  const paneInfo = await tmux([
    "list-panes",
    "-t",
    `${TMUX_SESSION}:${TMUX_WINDOW}`,
    "-F",
    "#{pane_index} #{pane_current_command}",
  ])

  if (paneInfo.exitCode === 0) {
    const firstLine = paneInfo.stdout.split("\n").find(Boolean)
    const currentCommand = firstLine?.split(" ").slice(1).join(" ")

    if (currentCommand && ["bash", "zsh", "fish", "sh"].includes(currentCommand)) {
      await tmux(["send-keys", "-t", pane, "-l", "droid"])
      await tmux(["send-keys", "-t", pane, "Enter"])
    }
  }
}

function stripAnsi(text: string): string {
  return text
    .replace(/\u001b\[[0-9;]*[A-Za-z]/g, "")
    .replace(/\u001b\][^\u0007]*\u0007/g, "")
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function fileSize(filePath: string): Promise<number> {
  try {
    const stat = await fs.stat(filePath)
    return stat.size
  } catch {
    return 0
  }
}

async function readNewBytes(
  filePath: string,
  offset: number,
  maxBytes: number
): Promise<{ chunk: string; newOffset: number }> {
  const stat = await fs.stat(filePath)
  const size = stat.size
  if (size <= offset) return { chunk: "", newOffset: offset }

  const toRead = Math.min(size - offset, maxBytes)
  const handle = await fs.open(filePath, "r")

  try {
    const buffer = Buffer.alloc(toRead)
    const result = await handle.read(buffer, 0, toRead, offset)
    return {
      chunk: buffer.subarray(0, result.bytesRead).toString("utf8"),
      newOffset: offset + result.bytesRead,
    }
  } finally {
    await handle.close()
  }
}

async function waitForLogOutput(
  startOffset: number,
  onUpdate?: (partial: string) => Promise<void>
): Promise<{ output: string; timedOut: boolean }> {
  const pollMs = 250
  const idleDoneMs = TMUX_IDLE_DONE_MS
  const maxWaitMs = TMUX_MAX_WAIT_MS
  const maxReadBytes = 64 * 1024
  const maxKeepChars = 20000

  let offset = startOffset
  let output = ""
  let gotData = false
  let lastDataAt = Date.now()
  let lastUpdateAt = 0
  const startAt = Date.now()

  while (Date.now() - startAt < maxWaitMs) {
    const { chunk, newOffset } = await readNewBytes(
      TMUX_LOG_FILE,
      offset,
      maxReadBytes
    )

    if (chunk) {
      gotData = true
      offset = newOffset
      output += stripAnsi(chunk).replace(/\r/g, "")
      if (output.length > maxKeepChars) output = output.slice(-maxKeepChars)
      lastDataAt = Date.now()

      if (onUpdate && Date.now() - lastUpdateAt > 1000) {
        lastUpdateAt = Date.now()
        await onUpdate(output)
      }
    } else {
      if (gotData && Date.now() - lastDataAt > idleDoneMs) break
      await sleep(pollMs)
    }
  }

  const timedOut = Date.now() - startAt >= maxWaitMs
  return { output: output.trim(), timedOut }
}

async function runInTmuxSession(
  prompt: string,
  onUpdate?: (partial: string) => Promise<void>
): Promise<string> {
  await ensureTmuxDroidSession()

  const startOffset = await fileSize(TMUX_LOG_FILE)
  const sanitized = prompt.replace(/\r/g, "").replace(/\n/g, " ").trim()

  const pane = tmuxPaneTarget()
  const sent = await tmux(["send-keys", "-t", pane, "-l", sanitized])
  if (sent.exitCode !== 0) {
    throw new Error(sent.stderr.trim() || "Failed to send keys to tmux")
  }
  await tmux(["send-keys", "-t", pane, "Enter"])

  const { output, timedOut } = await waitForLogOutput(startOffset, onUpdate)
  if (output && timedOut) {
    return `${output}\n\n[Timed out waiting for more output — the session may still be running. Attach with: tmux -L ${TMUX_SERVER} attach -t ${TMUX_SESSION}]`
  }
  if (output) return output
  if (timedOut) {
    return `Timed out waiting for output — the session may still be running. Attach with: tmux -L ${TMUX_SERVER} attach -t ${TMUX_SESSION}`
  }

  return "(no output yet)"
}

function truncateMessage(text: string, maxLength = 4000): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 20) + "\n\n[...truncated]"
}

bot.command("start", (ctx) => {
  const userId = ctx.from?.id
  if (String(userId) !== ALLOWED_USER_ID) {
    console.log(`Unauthorized access attempt from user ${userId}`)
    return ctx.reply("Unauthorized. This bot is private.")
  }

  return ctx.reply(
    "AGI Intent Relay ready.\n\nSend any message to execute via Factory Droid."
  )
})

bot.command("status", (ctx) => {
  const userId = ctx.from?.id
  if (String(userId) !== ALLOWED_USER_ID) {
    console.log(`Unauthorized access attempt from user ${userId}`)
    return ctx.reply("Unauthorized. This bot is private.")
  }

  return ctx.reply("Online and ready.")
})

let messageQueue: Promise<void> = Promise.resolve()

bot.on("message:text", async (ctx) => {
  const userId = ctx.from?.id
  const prompt = ctx.message.text

  if (prompt.startsWith("/start") || prompt.startsWith("/status")) {
    return
  }

  if (String(userId) !== ALLOWED_USER_ID) {
    console.log(`Unauthorized access attempt from user ${userId}`)
    return ctx.reply("Unauthorized. This bot is private.")
  }

  console.log(`Sending prompt to tmux session from ${userId}: ${prompt.slice(0, 100)}...`)

  const statusMsg = await ctx.reply("Queued...")

  messageQueue = messageQueue
    .then(async () => {
      await ctx.api.editMessageText(
        ctx.chat.id,
        statusMsg.message_id,
        "Sending to persistent session..."
      )

      const startTime = Date.now()
      let lastLiveText = ""

      const output = await runInTmuxSession(prompt, async (partial) => {
        const prefix = "Session output (live):\n\n"
        const preview = truncateMessage(partial, 4000 - prefix.length)
        const nextText = prefix + preview
        if (nextText === lastLiveText) return
        lastLiveText = nextText

        try {
          await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, nextText)
        } catch {
          // ignore edit races / rate limits
        }
      })

      const duration = ((Date.now() - startTime) / 1000).toFixed(1)
      const donePrefix = `Done in ${duration}s (tmux session):\n\n`

      await ctx.api.editMessageText(
        ctx.chat.id,
        statusMsg.message_id,
        donePrefix + truncateMessage(output, 4000 - donePrefix.length)
      )
    })
    .catch(async (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error"

      console.log(`Handler error: ${errorMessage}`)

      try {
        await ctx.api.editMessageText(
          ctx.chat.id,
          statusMsg.message_id,
          `Execution failed: ${errorMessage}`
        )
      } catch {
        // ignore
      }
    })
})

console.log("AGI Intent Relay starting (Mac-native, no VPS)...")
console.log(`Allowed user ID: ${ALLOWED_USER_ID}`)
console.log(`Project directory: ${PROJECT_DIR}`)
console.log(`Droid auto level: ${DROID_AUTO_LEVEL}`)
console.log(`tmux server: ${TMUX_SERVER}`)
console.log(`tmux session: ${TMUX_SESSION}`)
console.log(`tmux log: ${TMUX_LOG_FILE}`)

bot.start()
