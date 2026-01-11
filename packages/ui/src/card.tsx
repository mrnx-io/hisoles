import type { HTMLAttributes, ReactNode } from "react"

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  padding?: "none" | "sm" | "md" | "lg"
  shadow?: boolean
  border?: boolean
}

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "0",
  sm: "0.75rem",
  md: "1.5rem",
  lg: "2rem",
}

export function Card({
  children,
  padding = "md",
  shadow = true,
  border = true,
  style,
  ...props
}: CardProps) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: paddingStyles[padding],
        border: border ? "1px solid #e5e7eb" : "none",
        boxShadow: shadow ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
