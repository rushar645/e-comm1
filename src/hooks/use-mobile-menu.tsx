"use client"

import { useState, useCallback } from "react"

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    // Prevent scrolling when menu is open
    document.body.style.overflow = "hidden"
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    // Restore scrolling when menu is closed
    document.body.style.overflow = ""
  }, [])

  const toggle = useCallback(() => {
    if (isOpen) {
      close()
    } else {
      open()
    }
  }, [isOpen, open, close])

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
