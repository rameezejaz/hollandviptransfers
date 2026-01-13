"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span className={cn("inline-flex flex-wrap justify-center", className)}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="flex mr-2">
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className={cn(
                "inline-block transition-all duration-500 ease-out",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              )}
              style={{ transitionDelay: `${wordIndex * 80 + charIndex * 30}ms` }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
