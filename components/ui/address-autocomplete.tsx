"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { google } from "google-maps"

interface AddressAutocompleteProps {
  id?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function AddressAutocomplete({
  id,
  placeholder = "Enter address",
  value = "",
  onChange,
  className,
}: AddressAutocompleteProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const autocompleteRef = React.useRef<google.maps.places.Autocomplete | null>(null)
  const [inputValue, setInputValue] = React.useState(value)

  // When the 'value' prop from the parent changes, update our local state
  React.useEffect(() => {
    setInputValue(value)
  }, [value])

  React.useEffect(() => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) {
      return
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["establishment", "geocode"],
      componentRestrictions: { country: ["nl", "be", "de", "fr"] },
      fields: ["name", "formatted_address", "place_id", "types", "address_components"],
    })

    const style = document.createElement("style")
    style.textContent = `
      .pac-container { background-color: #1f2937 !important; border: 1px solid #374151 !important; border-radius: 8px !important; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; margin-top: 4px !important; z-index: 9999 !important; }
      .pac-item { background-color: #1f2937 !important; color: #ffffff !important; border-bottom: 1px solid #374151 !important; padding: 12px 16px !important; cursor: pointer !important; }
      .pac-item:hover { background-color: #374151 !important; }
      .pac-item-selected { background-color: #f97316 !important; color: #ffffff !important; }
      .pac-item-query { color: #f97316 !important; font-weight: 600 !important; }
      .pac-matched { color: #fbbf24 !important; font-weight: 600 !important; }
    `
    document.head.appendChild(style)

    // FIX: This function handles selection (both click and Enter)
    const handlePlaceSelect = () => {
      const place = autocompleteRef.current?.getPlace()
      if (!place || !onChange) return

      let formattedAddress = ""
      const isAirport =
        place.types?.includes("airport") ||
        place.name?.toLowerCase().includes("airport") ||
        place.name?.toLowerCase().includes("luchthaven")

      if ((isAirport || place.types?.includes("establishment")) && place.name && place.formatted_address) {
        formattedAddress = `${place.name} - ${place.formatted_address}`
      } else {
        formattedAddress = place.formatted_address || place.name || ""
      }

      // Update the state and the parent. This is the only place where a
      // *formatted* address is set.
      setInputValue(formattedAddress)
      onChange(formattedAddress)
    }

    const listener = autocompleteRef.current.addListener("place_changed", handlePlaceSelect)

    return () => {
      listener.remove()
      const styles = document.querySelectorAll("style")
      styles.forEach((s) => {
        if (s.textContent?.includes(".pac-container")) s.remove()
      })
    }
  }, [])

  // This function handles manual typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={placeholder}
      value={inputValue}
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onChange={handleInputChange}
    />
  )
}
