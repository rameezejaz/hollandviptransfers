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
    { id: "q10", question: t("faq.q10.question"), answer: t("faq.q10.answer"), category: "services" },
    { id: "q11", question: t("faq.q11.question"), answer: t("faq.q11.answer"), category: "services" },
    { id: "q12", question: t("faq.q12.question"), answer: t("faq.q12.answer"), category: "services" },
    { id: "q13", question: t("faq.q13.question"), answer: t("faq.q13.answer"), category: "services" },
    { id: "q14", question: t("faq.q14.question"), answer: t("faq.q14.answer"), category: "services" },
    { id: "q15", question: t("faq.q15.question"), answer: t("faq.q15.answer"), category: "services" },
    { id: "q16", question: t("faq.q16.question"), answer: t("faq.q16.answer"), category: "services" },
    { id: "q17", question: t("faq.q17.question"), answer: t("faq.q17.answer"), category: "services" },
    { id: "q18", question: t("faq.q18.question"), answer: t("faq.q18.answer"), category: "services" },
    { id: "q19", question: t("faq.q19.question"), answer: t("faq.q19.answer"), category: "services" },
    { id: "q20", question: t("faq.q20.question"), answer: t("faq.q20.answer"), category: "services" },
    { id: "q21", question: t("faq.q21.question"), answer: t("faq.q21.answer"), category: "services" },
    { id: "q22", question: t("faq.q22.question"), answer: t("faq.q22.answer"), category: "services" },
    { id: "q23", question: t("faq.q23.question"), answer: t("faq.q23.answer"), category: "booking" },
    { id: "q24", question: t("faq.q24.question"), answer: t("faq.q24.answer"), category: "booking" },
    { id: "q25", question: t("faq.q25.question"), answer: t("faq.q25.answer"), category: "booking" },
    { id: "q26", question: t("faq.q26.question"), answer: t("faq.q26.answer"), category: "booking" },
    { id: "q27", question: t("faq.q27.question"), answer: t("faq.q27.answer"), category: "booking" },
    { id: "q28", question: t("faq.q28.question"), answer: t("faq.q28.answer"), category: "general" },
    { id: "q29", question: t("faq.q29.question"), answer: t("faq.q29.answer"), category: "general" },
    { id: "q30", question: t("faq.q30.question"), answer: t("faq.q30.answer"), category: "general" },
    { id: "q31", question: t("faq.q31.question"), answer: t("faq.q31.answer"), category: "general" },
    { id: "q32", question: t("faq.q32.question"), answer: t("faq.q32.answer"), category: "general" },
    { id: "q33", question: t("faq.q33.question"), answer: t("faq.q33.answer"), category: "general" },
    { id: "q34", question: t("faq.q34.question"), answer: t("faq.q34.answer"), category: "general" },
    { id: "q35", question: t("faq.q35.question"), answer: t("faq.q35.answer"), category: "general" },
    { id: "q36", question: t("faq.q36.question"), answer: t("faq.q36.answer"), category: "general" },
    { id: "q37", question: t("faq.q37.question"), answer: t("faq.q37.answer"), category: "general" },
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
