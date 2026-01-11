"use client"

import { useEffect, useState } from "react"

type HealthStatus = {
  status: "healthy" | "degraded" | "unhealthy"
  services: {
    name: string
    status: "up" | "down"
    latency?: number
  }[]
  timestamp: string
}

export function SystemHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null)

  useEffect(() => {
    // Simulated health check - in production, this would call an API
    setHealth({
      status: "healthy",
      services: [
        { name: "Browserbase", status: "up", latency: 45 },
        { name: "Stagehand", status: "up", latency: 120 },
        { name: "Agent Orchestrator", status: "up", latency: 15 },
      ],
      timestamp: new Date().toISOString(),
    })
  }, [])

  const statusColor = {
    healthy: "#22c55e",
    degraded: "#eab308",
    unhealthy: "#ef4444",
  }

  const serviceStatusColor = {
    up: "#22c55e",
    down: "#ef4444",
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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
          System Health
        </h2>
        {health && (
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: statusColor[health.status],
            }}
          />
        )}
      </div>

      {health ? (
        <div style={{ marginTop: "1rem" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {health.services.map((service) => (
              <li
                key={service.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: serviceStatusColor[service.status],
                    }}
                  />
                  {service.name}
                </span>
                {service.latency && (
                  <span style={{ color: "#666", fontSize: "0.875rem" }}>
                    {service.latency}ms
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p style={{ margin: "1rem 0 0", fontSize: "0.75rem", color: "#999" }}>
            Last updated: {new Date(health.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p style={{ margin: "1rem 0 0", color: "#999" }}>Loading...</p>
      )}
    </div>
  )
}
