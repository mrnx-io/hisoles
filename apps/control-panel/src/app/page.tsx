import { Suspense } from "react"
import { AgentStatus } from "@/components/AgentStatus"
import { JobQueue } from "@/components/JobQueue"
import { SystemHealth } from "@/components/SystemHealth"

export default function DashboardPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
          AGI Control Panel
        </h1>
        <p style={{ margin: "0.5rem 0 0", color: "#666" }}>
          Monitor and control automation agents
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <Suspense fallback={<CardSkeleton title="System Health" />}>
          <SystemHealth />
        </Suspense>

        <Suspense fallback={<CardSkeleton title="Active Agents" />}>
          <AgentStatus />
        </Suspense>

        <Suspense fallback={<CardSkeleton title="Job Queue" />}>
          <JobQueue />
        </Suspense>
      </div>
    </main>
  )
}

function CardSkeleton({ title }: { title: string }) {
  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>{title}</h2>
      <p style={{ margin: "1rem 0 0", color: "#999" }}>Loading...</p>
    </div>
  )
}
