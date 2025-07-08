"use client"

import { useEffect, useRef } from "react"

export function useFadeIn() {
  const elementsRef = useRef<Set<HTMLElement>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    const currentElements = elementsRef.current
    currentElements.forEach((el) => observer.observe(el))

    return () => {
      currentElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const refCallback = (element: HTMLElement | null) => {
    if (element) {
      elementsRef.current.add(element)
    }
  }

  return refCallback
}
