"use client"

import { useCallback, useEffect, useRef } from "react"

interface UseDialogAccessibilityOptions {
  isOpen: boolean
  onClose: () => void
  initialFocusRef?: React.RefObject<HTMLElement | null>
}

/**
 * Custom hook for accessible dialog behavior.
 *
 * Handles:
 * - Focus trap via `inert` attribute on background content
 * - Body scroll lock while dialog is open
 * - Focus restoration when dialog closes
 * - Escape key to close
 * - Initial focus placement
 */
export function useDialogAccessibility({
  isOpen,
  onClose,
  initialFocusRef,
}: UseDialogAccessibilityOptions) {
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  const scrollYRef = useRef(0)

  // Memoize onClose to avoid effect re-runs
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    // 1. Store previously focused element for restoration
    previousActiveElement.current = document.activeElement as HTMLElement

    // 2. Lock body scroll (preserve scroll position)
    scrollYRef.current = window.scrollY
    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollYRef.current}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.overflow = "hidden"

    // 3. Make background content inert (focus trap)
    const mainContent = document.getElementById("main")
    const header = document.querySelector("header")
    const chapterRail = document.querySelector("[data-chapter-rail]")
    const footer = document.querySelector("footer")

    mainContent?.setAttribute("inert", "")
    header?.setAttribute("inert", "")
    chapterRail?.setAttribute("inert", "")
    footer?.setAttribute("inert", "")

    // 4. Set initial focus
    requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus()
      } else {
        dialogRef.current?.focus()
      }
    })

    // 5. Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown)

      // Remove inert from all background elements
      mainContent?.removeAttribute("inert")
      header?.removeAttribute("inert")
      chapterRail?.removeAttribute("inert")
      footer?.removeAttribute("inert")

      // Restore body scroll
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      window.scrollTo(0, scrollYRef.current)

      // Restore focus to previously focused element
      requestAnimationFrame(() => {
        previousActiveElement.current?.focus()
      })
    }
  }, [isOpen, handleClose, initialFocusRef])

  return { dialogRef }
}
