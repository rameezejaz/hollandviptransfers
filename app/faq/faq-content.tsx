"use client"

import { useState } from "react"
import { useFadeIn } from "@/hooks/use-fade-in"
import { useLanguage } from "@/contexts/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type FaqItem = {
  id: string
  question: string
  answer: string
  category: "general" | "booking" | "services"
}

export default function FaqContent() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const fadeInRef = useFadeIn()

  const faqItems: FaqItem[] = [
    { id: "q1", question: t("faq.q1.question"), answer: t("faq.q1.answer"), category: "general" },
    { id: "q2", question: t("faq.q2.question"), answer: t("faq.q2.answer"), category: "booking" },
    { id: "q3", question: t("faq.q3.question"), answer: t("faq.q3.answer"), category: "services" },
    { id: "q4", question: t("faq.q4.question"), answer: t("faq.q4.answer"), category: "general" },
    { id: "q5", question: t("faq.q5.question"), answer: t("faq.q5.answer"), category: "general" },
    { id: "q6", question: t("faq.q6.question"), answer: t("faq.q6.answer"), category: "services" },
    { id: "q7", question: t("faq.q7.question"), answer: t("faq.q7.answer"), category: "general" },
    { id: "q8", question: t("faq.q8.question"), answer: t("faq.q8.answer"), category: "booking" },
    { id: "q9", question: t("faq.q9.question"), answer: t("faq.q9.answer"), category: "booking" },
  ]

  const filteredFaqs = activeFilter === "all" ? faqItems : faqItems.filter((faq) => faq.category === activeFilter)

  const filters = [
    { key: "all", label: t("faq.filter.all") },
    { key: "general", label: t("faq.filter.general") },
    { key: "booking", label: t("faq.filter.booking") },
    { key: "services", label: t("faq.filter.services") },
  ]

  return (
    <div className="py-20 md:py-28 bg-gray-950">
      {/* SEO Headers */}
      <h1 className="sr-only">
      Veelgestelde vragen over luxe vervoer, groepsreizen en zakelijk transport in Amsterdam
    </h1>
    <h2 className="sr-only">
      Alles over onze chauffeursdiensten, prijzen, boekingen en wagenpark
    </h2>

      <div className="container mx-auto px-4">
        <div ref={fadeInRef} className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("faq.title")}</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("faq.subtitle")}</p>
        </div>

        {/* Filters */}
        <div ref={fadeInRef} className="flex flex-wrap justify-center gap-4 mb-12 fade-in-section">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              variant={activeFilter === filter.key ? "default" : "outline"}
              className={cn(
                "transition-all duration-300",
                activeFilter === filter.key
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                  : "border-gray-700 text-gray-300 hover:border-orange-500/50 hover:text-orange-400",
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div ref={fadeInRef} className="max-w-4xl mx-auto fade-in-section">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-gray-900 border border-gray-800 rounded-lg px-6 hover:border-orange-500/50 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left text-white hover:text-orange-400 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
