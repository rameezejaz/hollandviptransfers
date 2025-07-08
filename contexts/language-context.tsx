"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

type Language = "nl" | "en"

type TranslationFunction = (key: string) => string

interface LanguageContextProps {
  language: Language
  setLanguage: (language: Language) => void
  t: TranslationFunction
  dictionary: Record<string, any>
}

const LanguageContext = createContext<LanguageContextProps>({
  language: "nl", // This default value is overridden by useState
  setLanguage: () => {},
  t: (key: string) => key,
  dictionary: {},
})

// Import dictionaries directly
import enDict from "@/dictionaries/en.json"
import nlDict from "@/dictionaries/nl.json"

const dictionaries = {
  en: enDict,
  nl: nlDict,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Set the initial state to 'en' for English as the default language
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language | null
    if (storedLanguage && ["nl", "en"].includes(storedLanguage)) {
      setLanguage(storedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const dictionary = dictionaries[language]

  const t: TranslationFunction = (key) => {
    return dictionary[key as keyof typeof dictionary] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dictionary }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
