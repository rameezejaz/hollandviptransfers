"use client"

import { useFadeIn } from "@/hooks/use-fade-in"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Map, Calendar, Star, Hotel, Phone, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TouringContent() {
  const { t } = useLanguage()
  const fadeInRef = useFadeIn()

  const features = [
    {
      icon: Calendar,
      title: t("services.touring.features.multiday.title"),
      desc: t("services.touring.features.multiday.desc"),
    },
    {
      icon: Star,
      title: t("services.touring.features.expert.title"),
      desc: t("services.touring.features.expert.desc"),
    },
    {
      icon: Hotel,
      title: t("services.touring.features.luxury.title"),
      desc: t("services.touring.features.luxury.desc"),
    },
    {
      icon: Clock,
      title: t("services.touring.features.flexible.title"),
      desc: t("services.touring.features.flexible.desc"),
    },
  ]

  const destinations = [
    {
      title: t("services.touring.destinations.netherlands.title"),
      description: t("services.touring.destinations.netherlands.desc"),
      duration: `3-5 ${t("days")}`,
      image: "/images/filler/8.jpg",
      tourPlan: "grand_netherlands",
    },
    {
      title: t("services.touring.destinations.benelux.title"),
      description: t("services.touring.destinations.benelux.desc"),
      duration: `7-10 ${t("days")}`,
      image: "/images/filler/antwerpen.jpg",
      tourPlan: "benelux",
    },
    {
      title: t("services.touring.destinations.europe.title"),
      description: t("services.touring.destinations.europe.desc"),
      duration: `10-14 ${t("days")}`,
      image: "/images/filler/eifel.jpg",
      tourPlan: "europe",
    },
  ]

  const faqItems = [
    {
      id: "q1",
      question: t("services.touring.faq.q1.question"),
      answer: t("services.touring.faq.q1.answer"),
    },
    {
      id: "q2",
      question: t("services.touring.faq.q2.question"),
      answer: t("services.touring.faq.q2.answer"),
    },
    {
      id: "q3",
      question: t("services.touring.faq.q3.question"),
      answer: t("services.touring.faq.q3.answer"),
    },
    {
      id: "q4",
      question: t("services.touring.faq.q4.question"),
      answer: t("services.touring.faq.q4.answer"),
    },
    {
      id: "q5",
      question: t("services.touring.faq.q5.question"),
      answer: t("services.touring.faq.q5.answer"),
    },
    {
      id: "q6",
      question: t("services.touring.faq.q6.question"),
      answer: t("services.touring.faq.q6.answer"),
    },
    {
      id: "q7",
      question: t("services.touring.faq.q7.question"),
      answer: t("services.touring.faq.q7.answer"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950">
      {/* SEO Headers */}
      <h1 className="sr-only">Luxury Touring Amsterdam | Multi-Day VIP Transport Europe</h1>
      <h2 className="sr-only">
        Professional chauffeur service for multi-day luxury tours across Europe from Amsterdam
      </h2>

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
        {/* Remove background image div */}

        <div className="relative container mx-auto px-4">
          <div ref={fadeInRef} className="max-w-4xl mx-auto text-center fade-in-section">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Map className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400 font-medium">{t("services.touring.title")}</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t("services.touring.subtitle")}
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              {t("services.touring.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
              >
                <Link href="/boeken?rideType=hourly&serviceType=touring">{t("plan.tour")}</Link>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("services.touring.hero.title")}</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t("services.touring.hero.description") }}></p>
              <div className="flex justify-center lg:justify-start">
                <Button
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600"
                >
                  <Link href="/boeken?rideType=hourly&serviceType=touring">{t("plan.tour")}</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image src="/images/filler/canals.webp" alt="Luxury Touring" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-900/50 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("tour.why")}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <feature.icon className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <h5 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h5>
                <p className="text-gray-400 text-center leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("popular.destinations")}</h3>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("popular.destinations.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative h-72">
                  <Image src={destination.image || "/placeholder.svg"} alt={destination.title} fill />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {destination.duration}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h5 className="text-2xl font-bold text-white mb-4">{destination.title}</h5>
                  <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{destination.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent mt-auto"
                  >
                    <Link href={`/boeken?rideType=hourly&serviceType=touring&touringPlan=${destination.tourPlan}`}>
                      {t("nav.booking")}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-900/50 fade-in-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("FAQ")}</h3>
              <p className="text-lg text-gray-400">{t("faq.desc.tour")}</p>
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
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("europe.tour")}</h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t("europe.tour.desc")}</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
          >
            <Link href="/boeken?rideType=hourly&serviceType=touring">{t("plan.tour")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}