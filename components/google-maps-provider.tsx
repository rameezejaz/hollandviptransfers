"use client"

import { createContext, useState, useContext } from "react"
import { LoadScript } from "@react-google-maps/api"
import type React from "react"

interface GoogleMapsContextType {
  isLoaded: boolean
  loadError: Error | undefined
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
})
export function useGoogleMaps() {
  return useContext(GoogleMapsContext)
}

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"]

export default function GoogleMapsProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<Error | undefined>(undefined)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = (error: Error) => {
    setLoadError(error)
    console.error("Google Maps API loading error:", error)
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={libraries}
        onLoad={handleLoad}
        onError={handleError}
        loadingElement={<div />}
      >
        {children}
      </LoadScript>
    </GoogleMapsContext.Provider>
  )
}
