// components/GtmPageView.tsx
"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GtmPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const query = searchParams?.toString()
    const page = query ? `${pathname}?${query}` : pathname

    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || []
    // Send a custom event GTM can listen to
    window.dataLayer.push({
      event: "pageview",
      page,
    })
  }, [pathname, searchParams])

  return null
}
