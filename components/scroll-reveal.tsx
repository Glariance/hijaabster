"use client"

import { cn } from "@/lib/utils"
import { type HTMLAttributes, useEffect, useRef, useState } from "react"

type Direction = "up" | "down" | "left" | "right" | "scale"

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction
  delay?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  const hiddenTransforms: Record<Direction, string> = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "-translate-x-10",
    right: "translate-x-10",
    scale: "scale-95",
  }

  const base = cn(
    "transition-all duration-700 ease-out will-change-transform opacity-0",
    hiddenTransforms[direction]
  )

  const visible = "opacity-100 translate-x-0 translate-y-0 scale-100"

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(base, isVisible && visible, className)}
      {...props}
    >
      {children}
    </div>
  )
}



