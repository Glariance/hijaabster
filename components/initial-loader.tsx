"use client"

import { useEffect, useState } from "react"

import { LoaderOverlay } from "./loader-overlay"

export function InitialLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(false)
    }, 600)

    return () => window.clearTimeout(timeout)
  }, [])

  if (!visible) {
    return null
  }

  return <LoaderOverlay />
}

