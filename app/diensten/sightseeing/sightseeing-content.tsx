"use client"

import { useState, useCallback, useRef } from "react"
import { useFadeIn } from "@/hooks/use-fade-in"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"

// Dark theme for Google Maps
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0f0f23" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f0f23" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8b9dc3" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f97316" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#f97316" }, { weight: 1 }],
  },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#f97316" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1a1a2e" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#16213e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0f0f23" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f97316" }, { weight: 0.8 }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#0f0f23" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f97316" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#2d3748" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1a202c" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#f97316" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1421" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4a90e2" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#0d1421" }] },
]

const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "1.5rem",
}

const center = {
  lat: 52.0,
  lng: 5.2,
}

export default function SightseeingContent() {
  const { t, language } = useLanguage()
  const fadeInRef = useFadeIn()
  const [activeLocation, setActiveLocation] = useState<any>(null)
  const [clickedLocation, setClickedLocation] = useState<any>(null)
  const mapRef = useRef<any>(null)

  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map
  }, [])

  const handleLocationHover = (location: any) => {
    if (!clickedLocation) {
      setActiveLocation(location)
    } else {
      setActiveLocation(clickedLocation)
    }
  }

  const handleLocationClick = (location: any) => {
    setActiveLocation(location)
    setClickedLocation(location)
    if (mapRef.current) {
      mapRef.current.panTo(location.coords)
    }
  }

  const handleInfoWindowClose = () => {
    setActiveLocation(null)
    setClickedLocation(null)
  }

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

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
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

      {/* Interactive Map Section */}
      <section ref={fadeInRef} className="py-20 md:py-28 bg-gray-900/50 fade-in-section">
        <div className="container mx-auto px-2 md:px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("explore")}</h3>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("explore.desc")}</p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Map Container */}
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl p-3 md:p-10 border border-gray-700/50 shadow-2xl shadow-orange-500/10">
              {/* Map Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{t("interactive.map")}</h4>
                    <p className="text-gray-400 text-sm">{t("click")}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>{t("pd")}</span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-gray-600/30 shadow-inner">
                {typeof window !== "undefined" && window.google && window.google.maps ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={7}
                    options={{
                      styles: mapStyles,
                      disableDefaultUI: true,
                      zoomControl: true,
                      gestureHandling: "cooperative",
                      mapTypeControl: false,
                      streetViewControl: false,
                      fullscreenControl: false,
                    }}
                    onLoad={onMapLoad}
                  >
                    {locations.map((location) => (
                      <Marker
                        key={location.id}
                        position={location.coords}
                        onMouseOver={() => handleLocationHover(location)}
                        onClick={() => handleLocationClick(location)}
                        icon={{
                          path: "M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13C19,5.13 15.87,2 12,2zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,2.5S13.38,11.5 12,11.5z",
                          fillColor: activeLocation?.id === location.id ? "#fbbf24" : "#f97316",
                          fillOpacity: 1,
                          strokeColor: "#ffffff",
                          strokeWeight: 2,
                          scale: activeLocation?.id === location.id ? 1.8 : 1.4,
                          anchor: new window.google.maps.Point(12, 24),
                        }}
                      />
                    ))}

                    {activeLocation && (
                      <InfoWindow
                        position={activeLocation.coords}
                        onCloseClick={handleInfoWindowClose}
                        options={{
                          pixelOffset: new window.google.maps.Size(0, -50),
                          disableAutoPan: false,
                        }}
                      >
                        <div className="bg-gradient-to-br from-gray-900 to-black text-white p-4 rounded-2xl max-w-sm shadow-2xl relative lg:max-w-sm md:max-w-[280px] sm:max-w-[260px]">
                          <div className="relative h-40 mb-4 rounded-xl overflow-hidden lg:h-40 md:h-32 sm:h-28">
                            <Image
                              src={activeLocation.image || "/placeholder.svg"}
                              alt={activeLocation.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <h4 className="font-bold text-lg mb-2 text-orange-400 lg:text-lg md:text-base sm:text-sm">
                            {activeLocation.name}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed mb-3 lg:text-sm md:text-xs sm:text-xs">
                            {activeLocation.description}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-3 lg:gap-1 md:gap-1 sm:gap-0.5">
                            {activeLocation.highlights?.map((highlight: string, index: number) => (
                              <span
                                key={index}
                                className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full border border-orange-500/30 lg:text-xs md:text-xs sm:text-xs lg:px-2 md:px-1.5 sm:px-1"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-800 rounded-2xl">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-400">{language === "nl" ? "Kaart wordt geladen..." : "Loading map..."}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Stats */}
              <div className="flex items-center justify-center mt-6 gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>
                    {locations.length} {t("pd")}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={cn(
                    "group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer hover:shadow-2xl hover:shadow-orange-500/20",
                    activeLocation?.id === location.id
                      ? "border-orange-500/80 shadow-lg shadow-orange-500/30 scale-105"
                      : "border-gray-700/50 hover:border-orange-500/50",
                  )}
                  onMouseEnter={() => handleLocationHover(location)}
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
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{location.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {location.highlights?.slice(0, 2).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-orange-500/10 text-orange-400 text-xs px-2 py-1 rounded-full border border-orange-500/20"
                        >
                          {highlight}
                        </span>
                      ))}
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
