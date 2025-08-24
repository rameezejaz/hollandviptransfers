"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import AnimatedText from "@/components/animations/animated-text"
import { useFadeIn } from "@/hooks/use-fade-in"
import { Award, Car, Users, ShieldCheck, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function HomeContent() {
  const { t } = useLanguage()
  const fadeInRef = useFadeIn()

  const whyUsItems = [
    { icon: Award, title: t("home.why_us.item1.title"), desc: t("home.why_us.item1.desc") },
    { icon: Car, title: t("home.why_us.item2.title"), desc: t("home.why_us.item2.desc") },
    { icon: Users, title: t("home.why_us.item3.title"), desc: t("home.why_us.item3.desc") },
    { icon: ShieldCheck, title: t("home.why_us.item4.title"), desc: t("home.why_us.item4.desc") },
  ]

  const serviceItems = [
    {
      title: t("home.services.airport.title"),
      desc: t("home.services.airport.desc"),
      href: "/diensten/luchthaven-transfers",
      img: "/images/filler/3.jpg",
    },
    {
      title: t("home.services.corporate.title"),
      desc: t("home.services.corporate.desc"),
      href: "/diensten/zakelijk-vervoer",
      img: "/images/filler/4.jpg",
    },
    {
      title: t("home.services.sightseeing.title"),
      desc: t("home.services.sightseeing.desc"),
      href: "/diensten/sightseeing",
      img: "/images/filler/5.webp",
    },
    {
      title: t("home.services.touring.title"),
      desc: t("home.services.touring.desc"),
      href: "/diensten/touren",
      img: "/images/filler/luxury_tour.jpg",
    },
  ]

  const howItWorksItems = [
    { title: t("home.how_it_works.step1.title"), desc: t("home.how_it_works.step1.desc") },
    { title: t("home.how_it_works.step2.title"), desc: t("home.how_it_works.step2.desc") },
    { title: t("home.how_it_works.step3.title"), desc: t("home.how_it_works.step3.desc") },
    { title: t("home.how_it_works.step4.title"), desc: t("home.how_it_works.step4.desc") },
  ]

  return (
    <>
      {/* SEO Headers */}
      <h1 className="sr-only">
      Luxe vervoer Holland & Europa voor groepsvervoer, sightseeing, zakelijk en meer
    </h1>
    <h2 className="sr-only">
      Mercedes Sprinter, V-Klasse en minicoach voor grote groepen, coaching en luxe transport
    </h2>


      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/videos/video.mp4"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
        <div className="relative z-20 container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <AnimatedText text={t("home.hero.title")} />
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            <AnimatedText text={t("home.hero.subtitle")} delay={500} />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
            >
              <Link href="/boeken">{t("home.hero.cta.book")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-orange-500 text-white hover:bg-orange-500/10 hover:text-white text-lg px-8 py-6 bg-transparent"
            >
              <Link href="#services">{t("home.hero.cta.services")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-950 fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{t("home.why_us.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUsItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-lg border border-gray-800 text-center hover:border-orange-500/50 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-500/10 rounded-full">
                    <item.icon className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={fadeInRef} className="py-20 md:py-28 fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">{t("home.services.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceItems.map((service, index) => (
              <Link
                href={service.href}
                key={index}
                className="group block bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="relative h-60">
                  <Image
                    src={service.img || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.desc}</p>
                  <span className="font-semibold text-orange-500 flex items-center group-hover:text-orange-400">
                    {t("home.services.view_service")}{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-950 fade-in-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">{t("home.how_it_works.title")}</h2>
          <p className="text-center text-gray-400 mb-16">{t("home.hero.subtitle")}</p>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Central vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-600 transform -translate-x-px hidden md:block"></div>

              <div className="space-y-16">
                {howItWorksItems.map((item, index) => (
                  <div
                    key={index}
                    ref={fadeInRef}
                    className="relative fade-in-section"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center">
                      {/* Left side content (odd indexes) */}
                      {index % 2 === 0 && (
                        <>
                          <div className="w-1/2 pr-8">
                            <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500/50 hover:border-orange-500/50 transition-all duration-300 ml-auto max-w-md">
                              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                              <p className="text-gray-400">{item.desc}</p>
                            </div>
                          </div>

                          {/* Center circle */}
                          <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800 border-2 border-orange-500 rounded-full text-white font-bold text-lg">
                            {index + 1}
                          </div>

                          {/* Right side spacer */}
                          <div className="w-1/2 pl-8"></div>
                        </>
                      )}

                      {/* Right side content (even indexes) */}
                      {index % 2 === 1 && (
                        <>
                          {/* Left side spacer */}
                          <div className="w-1/2 pr-8"></div>

                          {/* Center circle */}
                          <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800 border-2 border-orange-500 rounded-full text-white font-bold text-lg">
                            {index + 1}
                          </div>

                          <div className="w-1/2 pl-8">
                            <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500/50 hover:border-orange-500/50 transition-all duration-300 mr-auto max-w-md">
                              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                              <p className="text-gray-400">{item.desc}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800 border-2 border-orange-500 rounded-full text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        {/* Vertical line for mobile - only show if not last item */}
                        {index < howItWorksItems.length - 1 && <div className="w-0.5 h-16 bg-gray-600 mt-4"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-900 p-6 rounded-lg border-2 border-orange-500/50">
                          <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                          <p className="text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>

                    {/* Connection dots on the line */}
                    <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
