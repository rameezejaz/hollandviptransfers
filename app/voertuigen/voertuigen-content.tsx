"use client"

import { useState } from "react"
import Image from "next/image"
import { Users, Briefcase, ArrowLeft, Star, Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useFadeIn } from "@/hooks/use-fade-in"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

// This function centralizes the vehicle data .
const getTranslatedFleetData = (t: (key: string) => string) => {
  const vehicles = [
    {
      id: "e-class",
      name: t("fleet.e_class.name"),
      type: t("fleet.e_class.type"),
      category: "Business Class",
      passengers: 3,
      luggage: 2,
      shortDescription: t("fleet.e_class.desc"),
      fullDescription: t("fleet.e_class.desc"),
      images: ["/images/cars/e-class/front.jpeg", "/images/cars/e-class/inside.jpeg", "/images/cars/e-class/back.jpeg"],
      prices: {
        arrival: "€105,-",
        departure: "€80,-",
        hourly: "€70,-",
        dayrate: "€499,-",
        cityTransfer: "€67,50",
      },
    },
    {
      id: "s-class",
      name: t("fleet.s_class.name"),
      type: t("fleet.s_class.type"),
      category: t("fleet.s_class.type"),
      passengers: 3,
      luggage: 2,
      shortDescription: t("fleet.s_class.desc"),
      fullDescription: t("fleet.s_class.desc"),
      images: [
        "/images/cars/s-class/front.jpeg",
        "/images/cars/s-class/side.jpeg",
        "/images/cars/s-class/side-back.jpeg",
        "/images/cars/s-class/back.jpeg",
        "/images/cars/s-class/sideback2.jpeg",
        "/images/cars/s-class/side2.jpeg",
        "/images/cars/s-class/side-front2.jpeg",
        "/images/cars/s-class/interieur.jpeg",
        "/images/cars/s-class/interieur2.jpeg",
      ],
      prices: {
        arrival: "€120,-",
        departure: "€95,-",
        hourly: "€80,-",
        dayrate: "€579,-",
        cityTransfer: "€77,50",
      },
    },
    {
      id: "v-class",
      name: t("fleet.v_class.name"),
      type: t("fleet.v_class.type"),
      category: "Business Van",
      passengers: 7,
      luggage: 7,
      shortDescription: t("fleet.v_class.desc"),
      fullDescription: t("fleet.v_class.desc"),
      images: ["/images/cars/v-class/front.jpeg", "/images/cars/v-class/side.jpeg"],
      prices: {
        arrival: "€120,-",
        departure: "€95,-",
        hourly: "€80,-",
        dayrate: "€579,-",
        cityTransfer: "€77,50",
      },
    },
    {
      id: "sprinter",
      name: t("fleet.sprinter.name"),
      type: t("fleet.sprinter.type"),
      category: t("fleet.sprinter.type"),
      passengers: "1-28",
      luggage: 10,
      shortDescription: t("fleet.sprinter.desc"),
      fullDescription: t("fleet.sprinter.desc"),
      images: [
        "/images/cars/sprinter/front2.jpeg",
        "/images/cars/sprinter/side-front.jpeg",
        "/images/cars/sprinter/side-front2.jpeg",
        "/images/cars/sprinter/interieur.jpeg",
      ],
      prices: {
        arrival: "€285,-",
        departure: "€270,-",
        hourly: "€120,-",
        dayrate: t("offer"),
        cityTransfer: "€225,-",
      },
    },
    {
      id: "coach",
      name: t("fleet.coach.name"),
      type: t("fleet.coach.type"),
      category: t("fleet.coach.type"),
      passengers: "1-89",
      luggage: 20,
      shortDescription: t("fleet.coach.desc"),
      fullDescription: t("fleet.coach.desc"),
      images: [
        "/images/cars/coach/front2.jpeg",
        "/images/cars/coach/side1.jpeg",
        "/images/cars/coach/side3.jpeg",
        "/images/cars/coach/back.jpeg",

      ],
      prices: {
        arrival: "N/A",
        departure: "N/A",
        hourly: "N/A",
        dayrate: "N/A",
        cityTransfer: "N/A",
      },
    },
  ]

  const getAmenitiesForVehicle = (vehicleId: string) => {
    const baseAmenities = [
      t("fleet.amenities.wait_time_airport"),
      t("fleet.amenities.wait_time_other"),
      t("fleet.amenities.onboard"),
      t("fleet.amenities.cancellation"),
    ]

    const baseNotIncluded = []

    if (vehicleId === "coach") {
      return {
        included: [t("fleet.amenities.trailer_option"), ...baseAmenities],
        notIncluded: [t("fleet.amenities.pickup_outside")],
      }
    }

    if (vehicleId === "sprinter") {
      return {
        included: [t("fleet.amenities.trailer_option"), ...baseAmenities],
        notIncluded: [t("fleet.amenities.pickup_outside")],
      }
    }

    return {
      included: [t("fleet.amenities.meet_greet"), ...baseAmenities],
      notIncluded: [],
    }
  }

  return { vehicles, getAmenitiesForVehicle }
}

// Vehicle Detail Component
function VehicleDetail({
  vehicle,
  onBack,
}: {
  vehicle: ReturnType<typeof getTranslatedFleetData>["vehicles"][0]
  onBack: () => void
}) {
  const fadeInRef = useFadeIn()
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const vehicleAmenities = getTranslatedFleetData(t).getAmenitiesForVehicle(vehicle.id)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-gray-950 py-20" key={`vehicle-detail-${vehicle.id}`}>
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-8 border-orange-500 text-orange-400 hover:bg-orange-500/10 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("fleet.back_to_fleet")}
        </Button>

        <div ref={fadeInRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 fade-in-section">
          <div>
            <div className="relative">
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden",
                  vehicle.id === "coach"
                    ? "h-64 md:h-80 lg:h-96" // Lower height for coach
                    : "h-96 md:h-[35rem] lg:h-[40rem]", // Original height for others
                )}
              >
                <Image
                  src={vehicle.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${vehicle.name} ${currentImageIndex + 1}`}
                  fill
                  className={cn("object-cover", vehicle.id === "coach" ? "object-center" : "object-center")}
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 border border-gray-700 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 border border-gray-700 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {vehicle.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200",
                    currentImageIndex === index
                      ? "border-orange-500 scale-105"
                      : "border-gray-600 hover:border-gray-500",
                  )}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${vehicle.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 text-orange-400 text-sm font-medium mb-4">
                {vehicle.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{vehicle.name}</h2>
              <p className="text-xl text-orange-400 mb-6">{vehicle.type}</p>
            </div>

            <div className="flex gap-8 mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-5 h-5 text-orange-500" />
                <span>
                  {vehicle.passengers} {t("fleet.passengers")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-5 h-5 text-orange-500" />
                <span>
                  {vehicle.luggage} {t("fleet.luggage")}
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">{vehicle.fullDescription}</p>

            {/* Pricing */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{t("p")}</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(vehicle.prices).map(([key, value]) => (
                  <div key={key} className="bg-gray-950 p-3 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 capitalize">
                      {key === "cityTransfer"
                        ? t("fleet.price.city_transfer")
                        : key === "dayrate"
                          ? t("fleet.price.dayrate")
                          : key === "hourly"
                            ? t("fleet.price.hourly")
                            : key === "arrival"
                              ? t("fleet.price.arrival_schiphol")
                              : key === "departure"
                                ? t("fleet.price.departure_schiphol")
                                : key}
                    </p>
                    <p className="font-bold text-white">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">{t("excl")}</p>
            </div>

            {/* Amenities */}
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">{t("fleet.amenities.title")}</h3>

              {/* Included Amenities */}
              <ul className="space-y-3 mb-6">
                {vehicleAmenities.included.map((amenity, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>

              {/* Not Included Amenities */}
              {vehicleAmenities.notIncluded.length > 0 && (
                <ul className="space-y-3">
                  {vehicleAmenities.notIncluded.map((amenity, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-400">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 text-lg py-6"
            >
              <Link href={`/boeken?vehicle=${vehicle.id}`}>{t("book.vehicle")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fleet Overview Component
function FleetOverview({
  vehicles,
  onSelectVehicle,
}: {
  vehicles: ReturnType<typeof getTranslatedFleetData>["vehicles"]
  onSelectVehicle: (vehicleId: string) => void
}) {
  const { t } = useLanguage()
  const fadeInRef = useFadeIn()

  return (
    <div className="py-20 md:py-28 bg-gray-950" key="fleet-overview">
      {/* SEO Headers */}
      <h1 className="sr-only">Luxe voertuigen voor VIP vervoer, groepsreizen & tours</h1>
      <h2 className="sr-only">Ervaar uw reis met Mercedes E-Class, S-Class, V-Class, Sprinter en touringcar</h2>


      <div className="container mx-auto px-4">
        <div ref={fadeInRef} className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("fleet.title")}</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">{t("fleet.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              ref={fadeInRef}
              onClick={() => onSelectVehicle(vehicle.id)}
              className="fade-in-section bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden cursor-pointer transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className={cn("relative", vehicle.id === "coach" ? "h-40" : "h-48")}>
                <Image
                  src={vehicle.images[0] || "/placeholder.svg"}
                  alt={vehicle.name}
                  fill
                  className={cn("object-cover", vehicle.id === "coach" ? "object-center" : "object-cover")}
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {vehicle.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
                <p className="text-orange-400 text-sm font-medium mb-4">{vehicle.type}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{vehicle.passengers}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Briefcase className="w-4 h-4" />
                    <span>{vehicle.luggage}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">{vehicle.shortDescription}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <span className="text-orange-400 font-medium text-sm">{t("fleet.view_details")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main Fleet Content Component
export default function FleetContent() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const { t } = useLanguage()

  const { vehicles, getAmenitiesForVehicle } = getTranslatedFleetData(t)

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicleId)

  const handleSelectVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
  }

  const handleBackToFleet = () => {
    setSelectedVehicleId(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (selectedVehicleId && selectedVehicleData) {
    return <VehicleDetail vehicle={selectedVehicleData} onBack={handleBackToFleet} />
  }

  return <FleetOverview vehicles={vehicles} onSelectVehicle={handleSelectVehicle} />
}
