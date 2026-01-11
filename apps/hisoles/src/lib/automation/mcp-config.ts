import fs from "node:fs"
import path from "node:path"

import { z } from "zod"

export type BrowserbaseMcpDefaults = {
  modelName?: string
  modelApiKey?: string
  browserWidth?: number
  browserHeight?: number
  proxies?: boolean
  keepAlive?: boolean
  contextId?: string
  persist?: boolean
  experimental?: boolean
  env?: Record<string, string>
}

export type FactoryMcpHttpServer = {
  type: "http"
  url: string
}

export type FactoryMcpStdioServer = {
  type: "stdio"
  command: string
  args?: string[]
  env?: Record<string, string>
}

export type FactoryMcpServerConfig = FactoryMcpHttpServer | FactoryMcpStdioServer

export type FactoryMcpConfig = {
  mcpServers: Record<string, FactoryMcpServerConfig>
}

const McpHttpServerSchema = z
  .object({
    type: z.literal("http"),
    url: z.string(),
  })
  .passthrough()

const McpStdioServerSchema = z
  .object({
    type: z.literal("stdio"),
    command: z.string(),
    args: z.array(z.string()).optional(),
    env: z.record(z.string(), z.string()).optional(),
  })
  .passthrough()

const McpServerSchema = z.discriminatedUnion("type", [McpHttpServerSchema, McpStdioServerSchema])

const McpConfigSchema = z
  .object({
    mcpServers: z.record(z.string(), McpServerSchema),
  })
  .passthrough()

let cached: BrowserbaseMcpDefaults | null | undefined
let cachedFactoryConfig: FactoryMcpConfig | null | undefined

function findFactoryMcpJson(startDir: string): string | null {
  let currentDir = startDir
  while (true) {
    const candidate = path.join(currentDir, ".factory", "mcp.json")
    if (fs.existsSync(candidate)) {
      return candidate
    }

    const parentDir = path.dirname(currentDir)
    if (parentDir === currentDir) {
      return null
    }

    currentDir = parentDir
  }
}

function parseBoolean(value: string | undefined): boolean | undefined {
  if (!value) {
    return undefined
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  return undefined
}

function parseNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return undefined
  }

  return parsed
}

function parseArgs(args: string[]): Omit<BrowserbaseMcpDefaults, "env"> {
  const result: Omit<BrowserbaseMcpDefaults, "env"> = {}

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]

    if (arg === "--modelName") {
      result.modelName = args[i + 1]
      i += 1
      continue
    }

    if (arg === "--modelApiKey") {
      result.modelApiKey = args[i + 1]
      i += 1
      continue
    }

    if (arg === "--browserWidth") {
      result.browserWidth = parseNumber(args[i + 1])
      i += 1
      continue
    }

    if (arg === "--browserHeight") {
      result.browserHeight = parseNumber(args[i + 1])
      i += 1
      continue
    }

    if (arg === "--contextId") {
      result.contextId = args[i + 1]
      i += 1
      continue
    }

    if (arg === "--persist") {
      result.persist = parseBoolean(args[i + 1])
      i += 1
      continue
    }

    if (arg === "--proxies") {
      result.proxies = true
      continue
    }

    if (arg === "--keepAlive") {
      result.keepAlive = true
      continue
    }

    if (arg === "--experimental") {
      result.experimental = true
    }
  }

  return result
}

function getFactoryMcpConfig(): FactoryMcpConfig | null {
  if (cachedFactoryConfig !== undefined) {
    return cachedFactoryConfig
  }

  const filePath = findFactoryMcpJson(process.cwd())
  if (!filePath) {
    cachedFactoryConfig = null
    return cachedFactoryConfig
  }

  let raw: string
  try {
    raw = fs.readFileSync(filePath, "utf8")
  } catch {
    cachedFactoryConfig = null
    return cachedFactoryConfig
  }

  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    cachedFactoryConfig = null
    return cachedFactoryConfig
  }

  const parsed = McpConfigSchema.safeParse(data)
  if (!parsed.success) {
    cachedFactoryConfig = null
    return cachedFactoryConfig
  }

  cachedFactoryConfig = parsed.data as FactoryMcpConfig
  return cachedFactoryConfig
}

export function getFactoryMcpServers(): FactoryMcpConfig["mcpServers"] | null {
  const config = getFactoryMcpConfig()
  return config?.mcpServers ?? null
}

export function getBrowserbaseMcpDefaults(): BrowserbaseMcpDefaults | null {
  if (cached !== undefined) {
    return cached
  }

  const config = getFactoryMcpConfig()
  const server = config?.mcpServers?.browserbase
  if (!server || server.type !== "stdio") {
    cached = null
    return cached
  }

  const args = server.args ?? []
  const env = server.env

  const resolved: BrowserbaseMcpDefaults = {
    ...parseArgs(args),
    ...(env ? { env } : {}),
  }

  cached = resolved
  return resolved
}
