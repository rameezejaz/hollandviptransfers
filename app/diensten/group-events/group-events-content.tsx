"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Map, Phone, Users, Luggage, Eye, Film, Bus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

type BusId = 'bus16' | 'bus20' | 'bus23' | 'bus28'

export default function GroupEventsContent() {
  const { t } = useLanguage()
  const [activeImageIndex, setActiveImageIndex] = useState<Record<BusId, number>>({
    bus16: 0,
    bus20: 0,
    bus23: 0,
    bus28: 0
  })

  const busRefs = {
    bus16: useRef<HTMLElement>(null),
    bus20: useRef<HTMLElement>(null),
    bus23: useRef<HTMLElement>(null),
    bus28: useRef<HTMLElement>(null)
  }

  const scrollToBus = (busId: BusId) => {
    const headerHeight = 80 // Approximate header height
    const element = busRefs[busId].current
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight - 80 // Extra padding for navigation
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Bus data with i18n keys
  const buses: Array<{
    id: BusId
    seater: number
    nameKey: string
    descriptionKey: string
    mainImage: string
    galleryImages: string[]
    features: Array<{
      icon: React.ComponentType<{ className?: string }>
      textKey: string
    }>
  }> = [
    {
      id: "bus16",
      seater: 16,
      nameKey: "groupEvents.buses.bus16.name",
      descriptionKey: "groupEvents.buses.bus16.description",
      mainImage: "/images/buses/16-seater-main.jpg",
      galleryImages: [
        "/images/cars/mercedes-sprinter/mercedes_sprinter_16_seater.webp",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_16_seater_1.jpeg",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_16_seater_2.jpeg",
      ],
      features: [
        { icon: Eye, textKey: "groupEvents.buses.bus16.features.privacyGlass" },
        { icon: Film, textKey: "groupEvents.buses.bus16.features.multimedia" },
        { icon: Users, textKey: "groupEvents.buses.bus16.features.seating" },
        { icon: Luggage, textKey: "groupEvents.buses.bus16.features.luggage" }
      ]
    },
    {
      id: "bus20",
      seater: 20,
      nameKey: "groupEvents.buses.bus20.name",
      descriptionKey: "groupEvents.buses.bus20.description",
      mainImage: "/images/buses/20-seater-main.jpg",
      galleryImages: [
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater.webp",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater_1.jpeg",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater_2.jpeg",
      ],
      features: [
        { icon: Eye, textKey: "groupEvents.buses.bus20.features.privacyGlass" },
        { icon: Film, textKey: "groupEvents.buses.bus20.features.multimedia" },
        { icon: Users, textKey: "groupEvents.buses.bus20.features.seating" },
        { icon: Luggage, textKey: "groupEvents.buses.bus20.features.luggage" }
      ]
    },
    {
      id: "bus23",
      seater: 23,
      nameKey: "groupEvents.buses.bus23.name",
      descriptionKey: "groupEvents.buses.bus23.description",
      mainImage: "/images/buses/23-seater-main.jpg",
      galleryImages: [
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater.webp",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater_1.jpeg",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_20_seater_2.jpeg",
      ],
      features: [
        { icon: Eye, textKey: "groupEvents.buses.bus23.features.privacyGlass" },
        { icon: Film, textKey: "groupEvents.buses.bus23.features.multimedia" },
        { icon: Users, textKey: "groupEvents.buses.bus23.features.seating" },
        { icon: Luggage, textKey: "groupEvents.buses.bus23.features.luggage" }
      ]
    },
    {
      id: "bus28",
      seater: 28,
      nameKey: "groupEvents.buses.bus28.name",
      descriptionKey: "groupEvents.buses.bus28.description",
      mainImage: "/images/buses/28-seater-main.jpg",
      galleryImages: [
        "/images/cars/mercedes-sprinter/mercedes_sprinter_28_seater.webp",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_28_seater_1.jpeg",
        "/images/cars/mercedes-sprinter/mercedes_sprinter_28_seater_2.jpeg",
      ],
      features: [
        { icon: Eye, textKey: "groupEvents.buses.bus28.features.privacyGlass" },
        { icon: Film, textKey: "groupEvents.buses.bus28.features.multimedia" },
        { icon: Users, textKey: "groupEvents.buses.bus28.features.seating" },
        { icon: Luggage, textKey: "groupEvents.buses.bus28.features.luggage" }
      ]
    }
  ]

  const handleImageClick = (busId: BusId, index: number) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [busId]: index
    }))
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* SEO Headers */}
      <h1 className="sr-only">{t('groupEvents.seo.title')}</h1>
      <h2 className="sr-only">{t('groupEvents.seo.subtitle')}</h2>

      {/* Hero Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-8">
              <Map className="w-5 h-5 text-orange-500" />
              <span className="text-orange-400 font-medium">{t('groupEvents.hero.badge')}</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {t('groupEvents.hero.title')}
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              {t('groupEvents.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
              >
                <Link href="/boeken?rideType=hourly&serviceType=group-events">
                  {t('groupEvents.hero.ctaPrimary')}
                </Link>
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

      {/* Bus Navigation - Now with proper z-index below header */}
      <div className="sticky top-12 md:top-18 z-40 bg-gradient-to-b from-gray-900 via-gray-900/98 to-gray-900/95 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="border-b border-orange-500/20"></div>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-start md:justify-center gap-2 py-4 min-w-max md:min-w-0">
              {buses.map((bus) => (
                <button
                  key={bus.id}
                  onClick={() => scrollToBus(bus.id)}
                  className="group relative flex items-center gap-2 px-4 md:px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 whitespace-nowrap backdrop-blur-sm flex-shrink-0"
                >
                  <Bus className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm md:text-base font-medium text-gray-300 group-hover:text-orange-400">
                    {bus.seater} {t('groupEvents.navigation.seater')}
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
      </div>

      {/* Bus Sections */}
      {buses.map((bus, index) => (
        <section 
          key={bus.id}
          ref={busRefs[bus.id]}
          className={`py-20 md:py-28 ${index % 2 === 1 ? 'bg-gray-900/30' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Image Column */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 group">
                    <Image 
                      src={bus.galleryImages[activeImageIndex[bus.id]]} 
                      alt={`${t(bus.nameKey)} - View ${activeImageIndex[bus.id] + 1}`}
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-orange-500/30">
                      {bus.seater} {t('groupEvents.navigation.seater')}
                    </div>
                  </div>

                  {/* Gallery Thumbnails */}
                  <div className="grid grid-cols-3 gap-4">
                    {bus.galleryImages.map((image, imgIndex) => (
                      <button
                        key={imgIndex}
                        onClick={() => handleImageClick(bus.id, imgIndex)}
                        className={`relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                          activeImageIndex[bus.id] === imgIndex 
                            ? 'ring-4 ring-orange-500 scale-105 shadow-lg shadow-orange-500/30' 
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Image 
                          src={image} 
                          alt={`${t(bus.nameKey)} thumbnail ${imgIndex + 1}`}
                          fill 
                          className="object-cover" 
                        />
                        {activeImageIndex[bus.id] === imgIndex && (
                          <div className="absolute inset-0 bg-orange-500/20 border-2 border-orange-500/50"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-400 text-sm font-medium">
                    {t('groupEvents.capacity')}: {bus.seater} {t('groupEvents.passengers')}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t(bus.nameKey)}
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {t(bus.descriptionKey)}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {bus.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex}
                      className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-colors duration-300"
                    >
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <feature.icon className="w-5 h-5 text-orange-500" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium">{t(feature.textKey)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600"
                  >
                    <Link href={`/boeken?rideType=hourly&serviceType=group-events&busType=${bus.seater}-seater`}>
                      {t('groupEvents.bookThisBus')}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
                  >
                    <a href="tel:+31203086043">
                      <Phone className="w-4 h-4 mr-2" />
                      {t('groupEvents.contactUs')}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-yellow-500/20 border-t border-orange-500/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('groupEvents.cta.title')}
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('groupEvents.cta.description')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg px-8 py-6"
          >
            <Link href="/boeken?rideType=hourly&serviceType=touring">
              {t('groupEvents.cta.button')}
            </Link>
          </Button>
        </div>
      </section>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}