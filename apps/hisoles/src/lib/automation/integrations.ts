import { connectToMCPServer } from "@browserbasehq/stagehand"
import type { Client } from "@modelcontextprotocol/sdk/client/index.js"

import {
  type FactoryMcpHttpServer,
  type FactoryMcpServerConfig,
  type FactoryMcpStdioServer,
  getFactoryMcpServers,
} from "@/lib/automation/mcp-config"

type ResolvedIntegrations = {
  clients: Client[]
  close: () => Promise<void>
}

function isUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
}

function sanitizeKeyForEnv(key: string) {
  return key
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
}

function getUrlFromEnv(key: string) {
  const envKey = sanitizeKeyForEnv(key)
  return process.env[`MCP_${envKey}_URL`] ?? process.env[`MCP_SERVER_${envKey}_URL`]
}

function toConnectConfig(
  server: FactoryMcpServerConfig
):
  | FactoryMcpHttpServer["url"]
  | { command: string; args?: string[]; env?: Record<string, string> } {
  if (server.type === "http") {
    return server.url
  }

  const stdio = server as FactoryMcpStdioServer
  return {
    command: stdio.command,
    ...(stdio.args ? { args: stdio.args } : {}),
    ...(stdio.env ? { env: stdio.env } : {}),
  }
}

export async function resolveAutomationMcpIntegrations(
  integrations: string[] | undefined
): Promise<ResolvedIntegrations> {
  const entries = (integrations ?? []).map((value) => value.trim()).filter(Boolean)
  if (!entries.length) {
    return { clients: [], close: async () => {} }
  }

  const servers = getFactoryMcpServers() ?? {}
  const seen = new Set<string>()
  const clients: Client[] = []

  for (const entry of entries) {
    if (seen.has(entry)) {
      continue
    }
    seen.add(entry)

    try {
      if (isUrl(entry)) {
        const client = await connectToMCPServer(entry)
        ;(client as unknown as { toJSON?: () => unknown }).toJSON = () => ({ integration: entry })
        clients.push(client)
        continue
      }

      const fromFactory = servers[entry]
      if (fromFactory) {
        const client = await connectToMCPServer(toConnectConfig(fromFactory))
        ;(client as unknown as { toJSON?: () => unknown }).toJSON = () => ({ integration: entry })
        clients.push(client)
        continue
      }

      const fromEnv = getUrlFromEnv(entry)
      if (fromEnv) {
        const client = await connectToMCPServer(fromEnv)
        ;(client as unknown as { toJSON?: () => unknown }).toJSON = () => ({ integration: entry })
        clients.push(client)
        continue
      }

      const availableKeys = Object.keys(servers)
      throw new Error(
        availableKeys.length
          ? `Unknown MCP integration '${entry}'. Available keys: ${availableKeys.join(", ")}`
          : `Unknown MCP integration '${entry}'. No MCP servers found in .factory/mcp.json.`
      )
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Unknown MCP integration")) {
        throw error
      }

      throw new Error(`Failed to connect MCP integration '${entry}'.`)
    }
  }

  return {
    clients,
    close: async () => {
      await Promise.allSettled(clients.map((client) => client.close()))
    },
  }
}
