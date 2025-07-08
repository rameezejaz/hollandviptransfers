"use client"

import type React from "react"
import { useEffect, useState } from "react"

export default function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Ensure we only render on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    // Load Google Maps script with the new Places API
    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      console.error("Failed to load Google Maps script")
      setIsLoaded(true) // Still render children with fallback
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.getElementById("google-maps-script")
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [isClient])

  // Server-side rendering: render children without Google Maps
  if (!isClient) {
    return <>{children}</>
  }

  // Client-side rendering: render children (Google Maps will handle its own loading)
  return <>{children}</>
}
