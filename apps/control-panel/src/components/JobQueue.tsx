"use client"

import { useEffect, useState } from "react"

type Job = {
  id: string
  name: string
  status: "pending" | "running" | "completed" | "failed"
  progress?: number
  createdAt: string
}

export function JobQueue() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    // Simulated job queue - in production, this would call an API
    setJobs([
      {
        id: "job-1",
        name: "LinkedIn Profile Update",
        status: "running",
        progress: 65,
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: "job-2",
        name: "Indeed Job Applications (5)",
        status: "pending",
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: "job-3",
        name: "Resume Tailoring",
        status: "completed",
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ])
  }, [])

  const statusColor = {
    pending: "#9ca3af",
    running: "#3b82f6",
    completed: "#22c55e",
    failed: "#ef4444",
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
        Job Queue ({jobs.length})
      </h2>

      {jobs.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {jobs.map((job) => (
              <li
                key={job.id}
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
                  <span style={{ fontWeight: 500 }}>{job.name}</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      backgroundColor: statusColor[job.status],
                      color: "#fff",
                    }}
                  >
                    {job.status}
                  </span>
                </div>

                {job.progress !== undefined && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      height: "4px",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "2px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${job.progress}%`,
                        height: "100%",
                        backgroundColor: statusColor.running,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                )}

                <div
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.75rem",
                    color: "#999",
                  }}
                >
                  Created: {new Date(job.createdAt).toLocaleTimeString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ margin: "1rem 0 0", color: "#999" }}>No jobs in queue</p>
      )}
    </div>
  )
}
