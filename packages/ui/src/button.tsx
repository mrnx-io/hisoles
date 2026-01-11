import type { ButtonHTMLAttributes, ReactNode } from "react"

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger"
export type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
  },
  secondary: {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#000",
    border: "none",
  },
  danger: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
  },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
  md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
  lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        borderRadius: "6px",
        fontWeight: 500,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "opacity 0.2s",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {loading && <span>...</span>}
      {children}
    </button>
  )
}
