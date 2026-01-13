"use client"

import { useState } from "react"
import { useFadeIn } from "@/hooks/use-fade-in"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function SightseeingContent() {
  const { t, language } = useLanguage()
  const fadeInRef = useFadeIn()

  const locations = [
    {
      id: "amsterdam",
      name: t("services.sightseeing.locations.amsterdam.title"),
      description: t("services.sightseeing.locations.amsterdam.desc"),
      image: "/images/filler/canals.webp",
      coords: { lat: 52.3676, lng: 4.9041 },
      highlights: [
        t("services.sightseeing.locations.amsterdam.highlights.canals"),
        t("services.sightseeing.locations.amsterdam.highlights.museums"),
        t("services.sightseeing.locations.amsterdam.highlights.history"),
      ],
      bookingName: "Amsterdam – Canals, museums, shopping, and history",
    },
    {
      id: "keukenhof",
      name: t("services.sightseeing.locations.keukenhof.title"),
      description: t("services.sightseeing.locations.keukenhof.desc"),
      image: "/images/filler/keukenhof.webp",
      coords: { lat: 52.2712, lng: 4.546 },
      highlights: [
        t("services.sightseeing.locations.keukenhof.highlights.tulips"),
        t("services.sightseeing.locations.keukenhof.highlights.gardens"),
        t("services.sightseeing.locations.keukenhof.highlights.spring"),
      ],
      bookingName: "Keukenhof & Tulip Fields – Seasonal beauty at its finest",
    },
    {
      id: "giethoorn",
      name: t("services.sightseeing.locations.giethoorn.title"),
      description: t("services.sightseeing.locations.giethoorn.desc"),
      image: "/images/filler/giethoorn.jpg",
      coords: { lat: 52.7412, lng: 6.0771 },
      highlights: [
        t("services.sightseeing.locations.giethoorn.highlights.waterways"),
        t("services.sightseeing.locations.giethoorn.highlights.peace"),
        t("services.sightseeing.locations.giethoorn.highlights.nature"),
      ],
      bookingName: 'Giethoorn – "The Venice of the North" with peaceful waterways',
    },
    {
      id: "bruges",
      name: "Bruges (Belgium)",
      description: t("bruges"),
      image: "/images/filler/bruges.webp",
      coords: { lat: 51.2093, lng: 3.2247 },
      highlights: [
        t("services.sightseeing.locations.bruges.highlights.medieval"),
        t("services.sightseeing.locations.bruges.highlights.chocolate"),
        t("services.sightseeing.locations.bruges.highlights.canals"),
      ],
      bookingName: "Bruges (Belgium) – Optional cross-border luxury day tour",
    },
    {
      id: "zaanse",
      name: t("services.sightseeing.locations.zaanse.title"),
      description: t("services.sightseeing.locations.zaanse.desc"),
      image: "/images/filler/windmills.jpg",
      coords: { lat: 52.4739, lng: 4.8187 },
      highlights: [
        t("services.sightseeing.locations.zaanse.highlights.windmills"),
        t("services.sightseeing.locations.zaanse.highlights.crafts"),
        t("services.sightseeing.locations.zaanse.highlights.traditional"),
      ],
      bookingName: "Zaanse Schans & Volendam – Traditional Dutch villages",
    },
    {
      id: "hague",
      name: t("services.sightseeing.locations.hague.title"),
      description: t("services.sightseeing.locations.hague.desc"),
      image: "/images/filler/denhaag.jpg",
      coords: { lat: 52.0787, lng: 4.2887 },
      highlights: [
        t("services.sightseeing.locations.hague.highlights.politics"),
        t("services.sightseeing.locations.hague.highlights.palaces"),
        t("services.sightseeing.locations.hague.highlights.peace"),
      ],
      bookingName: "The Hague – International city of peace and Dutch royal palaces",
    },
    {
      id: "rotterdam",
      name: t("services.sightseeing.locations.rotterdam.title"),
      description: t("services.sightseeing.locations.rotterdam.desc"),
      image: "/images/filler/rotterdam.jpg",
      coords: { lat: 51.9244, lng: 4.4777 },
      highlights: [
        "Modern",
        t("services.sightseeing.locations.rotterdam.highlights.architecture"),
        t("services.sightseeing.locations.rotterdam.highlights.port"),
      ],
      bookingName: "Rotterdam – Modern architecture and vibrant port culture",
    },
  ]

  const faqItems = [
    {
      id: "q1",
      question: t("services.sightseeing.faq.q1.question"),
      answer: t("services.sightseeing.faq.q1.answer"),
    },
    {
      id: "q2",
      question: t("services.sightseeing.faq.q2.question"),
      answer: t("services.sightseeing.faq.q2.answer"),
    },
    {
      id: "q3",
      question: t("services.sightseeing.faq.q3.question"),
      answer: t("services.sightseeing.faq.q3.answer"),
    },
    {
      id: "q4",
      question: t("services.sightseeing.faq.q4.question"),
      answer: t("services.sightseeing.faq.q4.answer"),
    },
    {
      id: "q5",
      question: t("services.sightseeing.faq.q5.question"),
      answer: t("services.sightseeing.faq.q5.answer"),
    },
    {
      id: "q6",
      question: t("services.sightseeing.faq.q6.question"),
      answer: t("services.sightseeing.faq.q6.answer"),
    },
    {
      id: "q7",
      question: t("services.sightseeing.faq.q7.question"),
      answer: t("services.sightseeing.faq.q7.answer"),
    },
  ]

  const createBookingUrl = (location: any) => {
    const params = new URLSearchParams({
      rideType: "hourly",
      serviceType: "sightseeing",
      sightseeingLoc: encodeURIComponent(location.bookingName),
    })
    return `/boeken?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

        <div className="relative container mx-auto px-4">
          <div ref={fadeInRef} className="max-w-4xl mx-auto text-center fade-in-section">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Camera className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400 font-medium">{t("services.sightseeing.title")}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight hyphens-auto">
              {t("services.sightseeing.subtitle")}
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              {t("services.sightseeing.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
              >
                <Link href="/boeken">{t("book.sightseeing")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 text-lg px-8 py-6 bg-transparent"
              >
                <a href="tel:+31203086043">
                  <Phone className="w-5 h-5 mr-3" />
                  +31 20 308 60 43
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={fadeInRef} className="py-20 md:py-28 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("services.sightseeing.hero.title")}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{t("services.sightseeing.hero.description")}</p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600"
                >
                  <Link href="/boeken?rideType=hourly&serviceType=sightseeing">{t("plan.sightseeing")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image src="/images/filler/1.jpeg" alt="Sightseeing Tour" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-900/50 fade-in-section">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("explore")}</h3>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("explore.desc")}</p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-white font-bold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                      {location.name}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{location.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {location.highlights?.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/20"
                        >
                          {highlight}
                        </span>
                      ))}
                      {location.highlights && location.highlights.length > 3 && (
                        <span className="bg-gray-600/20 text-gray-400 text-xs px-2 py-1 rounded-full border border-gray-600/20">
                          +{location.highlights.length - 3}
                        </span>
                      )}
                    </div>

                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium"
                    >
                      <Link href={createBookingUrl(location)}>{t("nav.booking")}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("FAQ")}</h3>
              <p className="text-lg text-gray-400">{t("commong.sigthseeing")}</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-8 hover:border-orange-500/50 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-white hover:text-orange-400 py-8 text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-8 text-lg leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={fadeInRef}
        className="py-20 md:py-28 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-yellow-500/20 border-t border-orange-500/20 fade-in-section"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("sight")}</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t("sight2")}</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
          >
            <Link href="/boeken?rideType=hourly&serviceType=sightseeing">{t("sight3")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}