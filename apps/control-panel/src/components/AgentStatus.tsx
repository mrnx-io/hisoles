"use client"

import { useEffect, useState } from "react"

type Agent = {
  id: string
  name: string
  role: string
  status: "idle" | "running" | "error"
  currentTask?: string
  completedTasks: number
}

export function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    // Simulated agent status - in production, this would call an API
    setAgents([
      {
        id: "agent-1",
        name: "Researcher",
        role: "researcher",
        status: "idle",
        completedTasks: 12,
      },
      {
        id: "agent-2",
        name: "Executor",
        role: "executor",
        status: "running",
        currentTask: "Fill job application form",
        completedTasks: 8,
      },
      {
        id: "agent-3",
        name: "Validator",
        role: "validator",
        status: "idle",
        completedTasks: 5,
      },
    ])
  }, [])

  const statusColor = {
    idle: "#9ca3af",
    running: "#22c55e",
    error: "#ef4444",
  }

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
        Active Agents ({agents.length})
      </h2>

      {agents.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {agents.map((agent) => (
              <li
                key={agent.id}
                style={{
                  padding: "0.75rem",
                  marginBottom: "0.5rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{agent.name}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      backgroundColor: statusColor[agent.status],
                      color: "#fff",
                    }}
                  >
                    {agent.status}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.875rem",
                    color: "#666",
                  }}
                >
                  Role: {agent.role} | Tasks: {agent.completedTasks}
                </div>
                {agent.currentTask && (
                  <div
                    style={{
                      marginTop: "0.25rem",
                      fontSize: "0.75rem",
                      color: "#22c55e",
                    }}
                  >
                    {agent.currentTask}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ margin: "1rem 0 0", color: "#999" }}>No agents active</p>
      )}
    </div>
  )
}
