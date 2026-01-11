import crypto from "node:crypto"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import type { AutomationRunResult } from "@/lib/automation/types"

export type AutomationResultStore = {
  save: (result: AutomationRunResult) => Promise<{ id: string; path: string }>
}

function safeTimestamp(timestamp: string) {
  return timestamp.replace(/[:.]/g, "-")
}

export function createJsonFileResultStore(directory: string): AutomationResultStore {
  return {
    async save(result) {
      await mkdir(directory, { recursive: true })
      const id = crypto.randomUUID()
      const fileName = `${safeTimestamp(result.startedAt)}-${result.task}-${id}.json`
      const filePath = path.join(directory, fileName)

      await writeFile(filePath, JSON.stringify(result, null, 2), "utf8")
      return { id, path: filePath }
    },
  }
}
