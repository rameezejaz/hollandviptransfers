"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useFadeIn } from "@/hooks/use-fade-in"
import Image from "next/image"
import {
  Check,
  Home,
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Car,
  Luggage,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useSearchParams } from "next/navigation"
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput"

const fullSchema = z
  .object({
    /* ride details */
    rideType: z.enum(["one_way", "hourly"]),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    from: z.string().min(1, "Pick-up location is required"),
    to: z.string().optional(),
    hours: z.number().min(3).optional(),
    serviceType: z.string().optional(),
    sightseeingLoc: z.string().optional(),
    otherLoc: z.string().optional(),
    baggage: z.number().min(0).max(20),
    passengers: z.number().min(1).max(89),
    remarks: z.string().optional(),
    touringPlan: z.string().optional(),
    customTourDetails: z.string().optional(),

    /* luggage types */
    handLuggage: z.boolean().default(false),
    checkedLuggage: z.boolean().default(false),

    /* vehicle specific options */
    coachCapacity: z.string().optional(),
    sprinterTrailer: z.boolean().default(false),

    /* vehicle */
    vehicle: z.string().min(1, "Please select a vehicle"),

    /* contact */
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    company: z.string().optional(),
  })
  .refine((data) => (data.rideType === "one_way" ? !!data.to : true), {
    message: "Drop-off location is required for one-way trips",
    path: ["to"],
  })
  .refine(
    (data) =>
      data.rideType === "hourly" && (data.serviceType === "corporate" || data.serviceType === "stand-by")
        ? !!data.hours && data.hours >= 3
        : true,
    {
      message: "Minimum 3 hours required",
      path: ["hours"],
    },
  )
  .refine((data) => (data.rideType === "hourly" ? !!data.serviceType : true), {
    message: "Please select a service type",
    path: ["serviceType"],
  })
  .refine((data) => (data.serviceType === "touring" ? !!data.touringPlan : true), {
    message: "Please select a touring plan",
    path: ["touringPlan"],
  })
  .refine((data) => (data.touringPlan === "other" ? !!data.customTourDetails : true), {
    message: "Please describe your custom tour plan",
    path: ["customTourDetails"],
  })
  .refine((data) => (data.vehicle === "coach" ? !!data.coachCapacity : true), {
    message: "Please select coach capacity",
    path: ["coachCapacity"],
  })
  .refine((data) => data.handLuggage || data.checkedLuggage, {
    message: "Please select at least one luggage type",
    path: ["handLuggage"],
  })

type FormData = z.infer<typeof fullSchema>

const vehicles = [
  {
    id: "e-class",
    name: "Mercedes E-Class",
    type: "Business Class",
    img: "/images/cars/e-class/front.jpeg",
    passengers: 3,
    luggage: 2,
  },
  {
    id: "s-class",
    name: "Mercedes S-Class",
    type: "First Class",
    img: "/images/cars/s-class/front.jpeg",
    passengers: 3,
    luggage: 2,
  },
  {
    id: "v-class",
    name: "Mercedes V-Class",
    type: "Business Van",
    img: "/images/cars/v-class/front.jpeg",
    passengers: 7,
    luggage: 7,
  },
  {
    id: "sprinter",
    name: "Mercedes Sprinter",
    type: "Luxury Minibus",
    img: "/images/cars/sprinter/front2.jpeg",
    passengers: 8,
    luggage: 10,
  },
  {
    id: "coach",
    name: "Mercedes Coach/Touring",
    type: "Luxury Coach",
    img: "/images/cars/coach/front2.jpeg",
    passengers: 89,
    luggage: 20,
  },
]

const sightseeingLocations = [
  "Amsterdam – Canals, museums, shopping, and history",
  "The Hague – International city of peace and Dutch royal palaces",
  "Rotterdam – Modern architecture and vibrant port culture",
  "Keukenhof & Tulip Fields – Seasonal beauty at its finest",
  'Giethoorn – "The Venice of the North" with peaceful waterways',
  "Zaanse Schans & Volendam – Traditional Dutch villages",
  "Bruges (Belgium) – Optional cross-border luxury day tour",
]

const coachCapacityOptions = ["30", "50", "60", "89"]

// Generate time slots (15-minute intervals)
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      slots.push(timeString)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export default function BookingContent() {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fadeInRef = useFadeIn()
  const searchParams = useSearchParams()
  const preSelectedVehicle = searchParams.get("vehicle")
  const { language } = useLanguage()

  const serviceTypes = [
    { id: "corporate", label: t("nav.services.corporate") },
    { id: "sightseeing", label: t("nav.services.sightseeing") },
    { id: "touring", label: t("nav.services.touring") },
    { id: "stand-by", label: t("service.standby") },
  ]

  const touringPlans = [
    { id: "grand_netherlands", label: t("touring.plan.grand_netherlands") },
    { id: "benelux", label: t("touring.plan.benelux") },
    { id: "europe", label: t("touring.plan.europe") },
    { id: "other", label: t("touring.plan.other") },
  ]

  // Get today's date for minimum date validation
  const today = new Date()
  const minDate = today.toISOString().split("T")[0]

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onChange",
    defaultValues: {
      rideType: "one_way",
      vehicle: preSelectedVehicle || "",
      hours: 3,
      baggage: undefined,
      passengers: undefined,
      date: "",
      time: "",
      from: "",
      to: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      handLuggage: false,
      checkedLuggage: false,
      sprinterTrailer: false,
      coachCapacity: "",
    },
  })

  const [showVehicleNotification, setShowVehicleNotification] = useState(false)

  useEffect(() => {
    if (preSelectedVehicle) {
      setShowVehicleNotification(true)
      const timer = setTimeout(() => {
        setShowVehicleNotification(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [preSelectedVehicle])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const rideType = urlParams.get("rideType")
    const serviceType = urlParams.get("serviceType")
    const sightseeingLoc = urlParams.get("sightseeingLoc")
    const touringPlan = urlParams.get("touringPlan")

    if (rideType) {
      setValue("rideType", rideType as "one_way" | "hourly")
    }
    if (serviceType) {
      setValue("serviceType", serviceType)
    }
    if (sightseeingLoc) {
      setValue("sightseeingLoc", decodeURIComponent(sightseeingLoc))
    }
    if (touringPlan) {
      setValue("touringPlan", touringPlan)
    }
  }, [setValue])

  const rideType = watch("rideType")
  const serviceType = watch("serviceType")
  const sightseeingLoc = watch("sightseeingLoc")
  const touringPlan = watch("touringPlan")
  const selectedVehicle = watch("vehicle")
  const handLuggage = watch("handLuggage")
  const checkedLuggage = watch("checkedLuggage")
  const coachCapacity = watch("coachCapacity")
  const formData = watch()

  const handleNext = async () => {
    let isValid = false
    if (step === 1) {
      const fieldsToValidate: (keyof FormData)[] = [
        "rideType",
        "date",
        "time",
        "from",
        "baggage",
        "passengers",
        "handLuggage",
      ]
      if (rideType === "one_way") fieldsToValidate.push("to")
      if (rideType === "hourly") {
        fieldsToValidate.push("serviceType")
        if (serviceType === "corporate" || serviceType === "stand-by") {
          fieldsToValidate.push("hours")
        }
        if (serviceType === "touring") {
          fieldsToValidate.push("touringPlan")
          if (touringPlan === "other") {
            fieldsToValidate.push("customTourDetails")
          }
        }
      }
      isValid = await trigger(fieldsToValidate)
    }
    if (step === 2) {
      const fieldsToValidate: (keyof FormData)[] = ["vehicle"]
      if (selectedVehicle === "coach") {
        fieldsToValidate.push("coachCapacity")
      }
      isValid = await trigger(fieldsToValidate)
    }
    if (step === 3) isValid = await trigger(["firstName", "lastName", "phone", "email"])

    if (isValid) setStep((s) => s + 1)
  }

  const handleBack = () => setStep((s) => s - 1)

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const veh = vehicles.find((v) => v.id === data.vehicle) || vehicles[0]
      const lang = language

      const response = await fetch("/api/boeken-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          vehicle: veh,
          lang,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send emails")
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert(
        language === "nl"
          ? "Er is een fout opgetreden bij het versturen. Probeer het opnieuw."
          : "An error occurred while sending. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: t("booking.step1.title") },
    { number: 2, title: t("booking.step2.title") },
    { number: 3, title: t("booking.step3.title") },
    { number: 4, title: t("booking.success.title") },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <div className="text-center p-12 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-lg mx-auto">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 mb-8">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">{t("booking.success.title")}</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">{t("booking.success.message")}</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 px-8 py-4 text-lg"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-3" />
              {t("booking.success.cta")}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 md:py-20">
    <h1 className="sr-only">Luxe Vervoer Amsterdam Boeken | Vraag Direct Offerte Aan</h1>
    <h2 className="sr-only">VIP chauffeursdiensten, luchthaventransfers & zakelijk vervoer — 24/7 beschikbaar</h2>
      <div className="container mx-auto px-4">
        <div ref={fadeInRef} className="text-center mb-16 fade-in-section">
          <div className="text-5xl md:text-6xl font-bold text-white mb-6">{t("booking.title")}</div>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">{t("booking.subtitle")}</p>
        </div>

        {showVehicleNotification && preSelectedVehicle && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div className="text-green-400">
                <span className="font-medium">
                  {vehicles.find((v) => v.id === preSelectedVehicle)?.name} {t("pre-selected")}
                </span>
                <span className="text-green-300 ml-2">{t("complete1")}</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-700"></div>
            <div
              className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-700 ease-out"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            {steps.map((stepItem) => (
              <div key={stepItem.number} className="flex flex-col items-center relative z-10">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-lg",
                    step > stepItem.number
                      ? "bg-green-500 text-white scale-110"
                      : step === stepItem.number
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white scale-110 shadow-orange-500/50"
                        : "bg-gray-800 text-gray-400 border-2 border-gray-700",
                  )}
                >
                  {step > stepItem.number ? <Check className="w-6 h-6" /> : stepItem.number}
                </div>
                <p
                  className={cn(
                    "text-sm mt-4 text-center transition-all duration-300 font-medium px-2",
                    step >= stepItem.number ? "text-white" : "text-gray-500",
                  )}
                >
                  {stepItem.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Ride Details */}
              <div className={cn("transition-all duration-500", step !== 1 && "hidden")}>
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-bold mb-8 text-white">{t("booking.step1.title")}</h3>

                  <div className="space-y-8">
                    <Controller
                      name="rideType"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value)
                            // Reset related fields on change
                            if (value === "one_way") {
                              setValue("serviceType", "")
                              setValue("hours", 3)
                              setValue("sightseeingLoc", "")
                              setValue("otherLoc", "")
                              setValue("touringPlan", "")
                              setValue("customTourDetails", "")
                            } else {
                              setValue("to", "")
                            }
                            // Clear errors
                            clearErrors([
                              "to",
                              "serviceType",
                              "hours",
                              "sightseeingLoc",
                              "touringPlan",
                              "customTourDetails",
                            ])
                          }}
                          value={field.value}
                          className="grid grid-cols-2 gap-6"
                        >
                          <div className="flex-1">
                            <RadioGroupItem value="one_way" id="one_way" className="sr-only" />
                            <Label
                              htmlFor="one_way"
                              className={cn(
                                "flex flex-col items-center justify-center rounded-xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:scale-105 h-full min-h-[120px]",
                                rideType === "one_way"
                                  ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 shadow-lg shadow-orange-500/25"
                                  : "border-gray-700 hover:border-gray-600 bg-gray-800/50",
                              )}
                            >
                              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-orange-500" />
                              <span className="text-lg sm:text-xl font-semibold text-white text-center">
                                {t("booking.ride_type.one_way")}
                              </span>
                            </Label>
                          </div>
                          <div className="flex-1">
                            <RadioGroupItem value="hourly" id="hourly" className="sr-only" />
                            <Label
                              htmlFor="hourly"
                              className={cn(
                                "flex flex-col items-center justify-center rounded-xl border-2 p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:scale-105 h-full min-h-[120px]",
                                rideType === "hourly"
                                  ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 shadow-lg shadow-orange-500/25"
                                  : "border-gray-700 hover:border-gray-600 bg-gray-800/50",
                              )}
                            >
                              <Clock className="w-6 h-6 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-orange-500" />
                              <span className="text-lg sm:text-xl font-semibold text-white text-center">
                                {t("booking.ride_type.hourly")}
                              </span>
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-white font-medium">
                          {t("booking.form.date")}
                        </Label>
                        <Controller
                          name="date"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="date"
                              type="date"
                              min={minDate}
                              className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                              {...field}
                            />
                          )}
                        />
                        {errors.date && <p className="text-red-400 text-sm">{errors.date.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-white font-medium">
                          {t("booking.form.time")}
                        </Label>
                        <Controller
                          name="time"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500">
                                <SelectValue placeholder={language === "nl" ? "Selecteer tijd" : "Select time"} />
                              </SelectTrigger>
                              <SelectContent
                                className="bg-gray-800 border-gray-700 max-h-60"
                                position="popper"
                                side="bottom"
                                align="start"
                              >
                                {timeSlots.map((time) => (
                                  <SelectItem
                                    key={time}
                                    value={time}
                                    className="text-white hover:bg-gray-700 focus:bg-gray-700"
                                  >
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.time && <p className="text-red-400 text-sm">{errors.time.message}</p>}
                      </div>
                    </div>

                      <div className="space-y-2">
                        <Label htmlFor="from" className="text-white font-medium">
                          {t("booking.form.from")}
                        </Label>
                        <Controller
                          name="from"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="from"
                              placeholder={language === "nl" ? "Ophaallocatie" : "Pick-up location"}
                              className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                                clearErrors("from")
                              }}
                            />
                          )}
                        />
                        {errors.from && <p className="text-red-400 text-sm">{errors.from.message}</p>}
                      </div>

                      {rideType === "one_way" && (
                        <div className="space-y-2">
                          <Label htmlFor="to" className="text-white font-medium">
                            {t("booking.form.to")}
                          </Label>
                          <Controller
                            name="to"
                            control={control}
                            render={({ field }) => (
                              <Input
                                id="to"
                                placeholder={language === "nl" ? "Bestemmingslocatie" : "Drop-off location"}
                                className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e.target.value)
                                  clearErrors("to")
                                }}
                              />
                            )}
                          />
                          {errors.to && <p className="text-red-400 text-sm">{errors.to.message}</p>}
                        </div>
                      )}

                    {rideType === "hourly" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="serviceType" className="text-white font-medium">
                            {t("booking.form.service_type")}
                          </Label>
                          <Controller
                            name="serviceType"
                            control={control}
                            render={({ field }) => (
                              <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500">
                                  <SelectValue
                                    placeholder={language === "nl" ? "Selecteer een dienst" : "Select a service"}
                                  />
                                </SelectTrigger>
                                <SelectContent
                                  className="bg-gray-800 border-gray-700"
                                  position="popper"
                                  side="bottom"
                                  align="start"
                                >
                                  {serviceTypes.map((service) => (
                                    <SelectItem
                                      key={service.id}
                                      value={service.id}
                                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                                    >
                                      {service.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                          {errors.serviceType && <p className="text-red-400 text-sm">{errors.serviceType.message}</p>}
                        </div>

                        {(serviceType === "corporate" || serviceType === "stand-by") && (
                          <div className="space-y-2">
                            <Label htmlFor="hours" className="text-white font-medium">
                              {t("booking.form.hours")}
                            </Label>
                            <Controller
                              name="hours"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id="hours"
                                  type="number"
                                  min="3"
                                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                  {...field}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                />
                              )}
                            />
                            {errors.hours && <p className="text-red-400 text-sm">{errors.hours.message}</p>}
                          </div>
                        )}

                        {serviceType === "sightseeing" && (
                          <div className="space-y-2">
                            <Label htmlFor="sightseeingLoc" className="text-white font-medium">
                              {t("booking.form.sightseeing_loc")}
                            </Label>
                            <Controller
                              name="sightseeingLoc"
                              control={control}
                              render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500">
                                    <SelectValue
                                      placeholder={language === "nl" ? "Kies een bestemming" : "Choose a destination"}
                                    />
                                  </SelectTrigger>
                                  <SelectContent
                                    className="bg-gray-800 border-gray-700"
                                    position="popper"
                                    side="bottom"
                                    align="start"
                                  >
                                    {sightseeingLocations.map((location, index) => (
                                      <SelectItem
                                        key={index}
                                        value={location}
                                        className="text-white hover:bg-gray-700 focus:bg-gray-700"
                                      >
                                        {location}
                                      </SelectItem>
                                    ))}
                                    <SelectItem
                                      value="other"
                                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                                    >
                                      {t("booking.form.other_loc")}
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </div>
                        )}

                        {sightseeingLoc === "other" && (
                          <div className="space-y-2">
                            <Label htmlFor="otherLoc" className="text-white font-medium">
                              {language === "nl" ? "Aangepaste locatie" : "Custom Location"}
                            </Label>
                            <Controller
                              name="otherLoc"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id="otherLoc"
                                  placeholder={
                                    language === "nl" ? "Voer uw gewenste locatie in" : "Enter your preferred location"
                                  }
                                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                  {...field}
                                />
                              )}
                            />
                          </div>
                        )}

                        {serviceType === "touring" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-white font-medium">{t("touring.plan.title")}</Label>
                              <Controller
                                name="touringPlan"
                                control={control}
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500">
                                      <SelectValue
                                        placeholder={
                                          language === "nl" ? "Selecteer een tourplan" : "Select a tour plan"
                                        }
                                      />
                                    </SelectTrigger>
                                    <SelectContent
                                      className="bg-gray-800 border-gray-700"
                                      position="popper"
                                      side="bottom"
                                      align="start"
                                    >
                                      {touringPlans.map((plan) => (
                                        <SelectItem
                                          key={plan.id}
                                          value={plan.id}
                                          className="text-white hover:bg-gray-700 focus:bg-gray-700"
                                        >
                                          {plan.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                              {errors.touringPlan && (
                                <p className="text-red-400 text-sm">{errors.touringPlan.message}</p>
                              )}
                            </div>

                            {touringPlan === "other" && (
                              <div className="space-y-2">
                                <Label htmlFor="customTourDetails" className="text-white font-medium">
                                  {t("touring.plan.other")}
                                </Label>
                                <Controller
                                  name="customTourDetails"
                                  control={control}
                                  render={({ field }) => (
                                    <Textarea
                                      id="customTourDetails"
                                      rows={5}
                                      className="bg-gray-800 border-gray-700 text-white rounded-lg focus:border-orange-500 focus:ring-orange-500/20 resize-y"
                                      placeholder={t("touring.plan.custom_details")}
                                      {...field}
                                    />
                                  )}
                                />
                                {errors.customTourDetails && (
                                  <p className="text-red-400 text-sm">{errors.customTourDetails.message}</p>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Luggage Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-white font-medium flex items-center gap-2">
                        <Luggage className="w-4 h-4" />
                        {language === "nl" ? "Type bagage" : "Luggage Type"}
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          name="handLuggage"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
                              <Checkbox
                                id="handLuggage"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                              />
                              <Label htmlFor="handLuggage" className="text-white cursor-pointer">
                                {language === "nl" ? "Handbagage" : "Hand Luggage"}
                              </Label>
                            </div>
                          )}
                        />
                        <Controller
                          name="checkedLuggage"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
                              <Checkbox
                                id="checkedLuggage"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                              />
                              <Label htmlFor="checkedLuggage" className="text-white cursor-pointer">
                                {language === "nl" ? "Ruimbagage" : "Checked Luggage"}
                              </Label>
                            </div>
                          )}
                        />
                      </div>
                      {errors.handLuggage && <p className="text-red-400 text-sm">{errors.handLuggage.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="baggage" className="text-white font-medium flex items-center gap-2">
                        <Luggage className="w-4 h-4" />
                        {language === "nl" ? "Aantal bagage (0-20)" : "Number of Luggage (0-20)"}
                      </Label>
                      <Controller
                        name="baggage"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="baggage"
                            type="number"
                            min="0"
                            max="100"
                            className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder={
                              language === "nl" ? "Voer aantal bagage stukken in" : "Enter number of luggage pieces"
                            }
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        )}
                      />
                      {errors.baggage && <p className="text-red-400 text-sm">{errors.baggage.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passengers" className="text-white font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {language === "nl" ? "Aantal passagiers (1-89)" : "Number of Passengers (1-89)"}
                      </Label>
                      <Controller
                        name="passengers"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="passengers"
                            type="number"
                            min="1"
                            max="89"
                            className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            placeholder={language === "nl" ? "Voer aantal passagiers in" : "Enter number of passengers"}
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseInt(e.target.value) : undefined)
                            }
                          />
                        )}
                      />
                      {errors.passengers && <p className="text-red-400 text-sm">{errors.passengers.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="remarks" className="text-white font-medium">
                        {t("booking.form.remarks")}
                      </Label>
                      <Controller
                        name="remarks"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            id="remarks"
                            rows={4}
                            className="bg-gray-800 border-gray-700 text-white rounded-lg focus:border-orange-500 focus:ring-orange-500/20 resize-none"
                            placeholder={
                              language === "nl"
                                ? "Speciale verzoeken of aanvullende informatie..."
                                : "Any special requests or additional information..."
                            }
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose Vehicle */}
              <div className={cn("transition-all duration-500", step !== 2 && "hidden")}>
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-bold mb-8 text-white">{t("booking.step2.title")}</h3>
                  {preSelectedVehicle && (
                    <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                      <p className="text-orange-400 text-center">
                        <span className="font-medium">
                          {vehicles.find((v) => v.id === preSelectedVehicle)?.name} {t("pre-selected")}
                        </span>
                        <span className="text-orange-300 ml-2">{t("change")}</span>
                      </p>
                    </div>
                  )}
                  <Controller
                    name="vehicle"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value)
                          // Reset vehicle-specific options when changing vehicle
                          setValue("coachCapacity", "")
                          setValue("sprinterTrailer", false)
                          clearErrors(["coachCapacity"])
                        }}
                        value={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        {vehicles.map((v) => (
                          <div key={v.id}>
                            <RadioGroupItem value={v.id} id={v.id} className="sr-only" />
                            <Label
                              htmlFor={v.id}
                              className={cn(
                                "block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105",
                                field.value === v.id
                                  ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 shadow-lg shadow-orange-500/25"
                                  : "border-gray-700 hover:border-gray-600 bg-gray-800/50",
                              )}
                            >
                              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                                <Image src={v.img || "/placeholder.svg"} alt={v.name} fill className="object-cover" />
                              </div>
                              <div className="text-center">
                                <h4 className="text-xl font-bold text-white mb-2">{v.name}</h4>
                                <p className="text-orange-400 font-medium mb-4">{v.type}</p>
                                <div className="flex justify-center gap-6 text-gray-400 text-sm">
                                  <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" /> {v.passengers} {t("fleet.passengers")}
                                  </span>
                                  <span className="flex items-center gap-2">
                                    <Car className="w-4 h-4" /> {v.luggage} {t("fleet.luggage")}
                                  </span>
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                  {errors.vehicle && <p className="text-red-400 text-sm mt-6 text-center">{errors.vehicle.message}</p>}

                  {/* Coach Capacity Selection */}
                  {selectedVehicle === "coach" && (
                    <div className="mt-8 space-y-4">
                      <Label className="text-white font-medium text-lg">
                        {language === "nl" ? "Selecteer capaciteit" : "Select Capacity"}
                      </Label>
                      <Controller
                        name="coachCapacity"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                          >
                            {coachCapacityOptions.map((capacity) => (
                              <div key={capacity}>
                                <RadioGroupItem value={capacity} id={`capacity-${capacity}`} className="sr-only" />
                                <Label
                                  htmlFor={`capacity-${capacity}`}
                                  className={cn(
                                    "flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105",
                                    field.value === capacity
                                      ? "border-orange-500 bg-gradient-to-br from-orange-500/20 to-yellow-500/10 shadow-lg shadow-orange-500/25"
                                      : "border-gray-700 hover:border-gray-600 bg-gray-800/50",
                                  )}
                                >
                                  <span className="text-white font-semibold text-lg">
                                    {capacity} {language === "nl" ? "personen" : "people"}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {errors.coachCapacity && <p className="text-red-400 text-sm">{errors.coachCapacity.message}</p>}
                    </div>
                  )}

                  {/* Sprinter Trailer Option */}
                  {selectedVehicle === "sprinter" && (
                    <div className="mt-8 space-y-4">
                      <Label className="text-white font-medium text-lg">
                        {language === "nl" ? "Extra opties" : "Additional Options"}
                      </Label>
                      <Controller
                        name="sprinterTrailer"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <Checkbox
                              id="sprinterTrailer"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <Label htmlFor="sprinterTrailer" className="text-white cursor-pointer">
                              {language === "nl" ? "Aanhangwagen voor extra bagage" : "Trailer for extra luggage"}
                            </Label>
                          </div>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3: Quote Request Summary */}
              <div className={cn("transition-all duration-500", step !== 3 && "hidden")}>
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-bold mb-8 text-white">{t("booking.step3.title")}</h3>

                  <div className="space-y-8">
                    {/* Trip Details */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        {t("booking.step1.title")}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div>
                          <span className="text-gray-400">{language === "nl" ? "Type:" : "Type:"}</span>{" "}
                          {formData.rideType === "one_way"
                            ? t("booking.ride_type.one_way")
                            : t("booking.ride_type.hourly")}
                        </div>
                        <div>
                          <span className="text-gray-400">{t("booking.form.date")}:</span> {formData.date}
                        </div>
                        <div>
                          <span className="text-gray-400">{t("booking.form.time")}:</span> {formData.time}
                        </div>
                        <div>
                          <span className="text-gray-400">{t("booking.form.from")}:</span> {formData.from}
                        </div>
                        {formData.to && (
                          <div>
                            <span className="text-gray-400">{t("booking.form.to")}:</span> {formData.to}
                          </div>
                        )}
                        {formData.hours && (serviceType === "corporate" || serviceType === "stand-by") && (
                          <div>
                            <span className="text-gray-400">{t("booking.form.hours")}:</span> {formData.hours}{" "}
                            {t("hours:")}
                          </div>
                        )}
                        {formData.serviceType && (
                          <div>
                            <span className="text-gray-400">{language === "nl" ? "Dienst:" : "Service:"}</span>{" "}
                            {serviceTypes.find((s) => s.id === formData.serviceType)?.label}
                          </div>
                        )}
                        <div>
                          <span className="text-gray-400">{language === "nl" ? "Bagage type:" : "Luggage type:"}</span>{" "}
                          {[
                            handLuggage && (language === "nl" ? "Handbagage" : "Hand luggage"),
                            checkedLuggage && (language === "nl" ? "Ruimbagage" : "Checked luggage"),
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </div>
                        <div>
                          <span className="text-gray-400">{t("fleet.luggage")}:</span> {formData.baggage || 0}{" "}
                          {t("pieces")}
                        </div>
                        <div>
                          <span className="text-gray-400">{language === "nl" ? "Passagiers:" : "Passengers:"}</span>{" "}
                          {formData.passengers || 0}
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Selection */}
                    {selectedVehicle && (
                      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                          <Car className="w-5 h-5 text-orange-500" />
                          {language === "nl" ? "Geselecteerd voertuig" : "Selected Vehicle"}
                        </h4>
                        <div className="flex items-center gap-6">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={vehicles.find((v) => v.id === selectedVehicle)?.img || "/placeholder.svg"}
                              alt={vehicles.find((v) => v.id === selectedVehicle)?.name || ""}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-white font-semibold">
                              {vehicles.find((v) => v.id === selectedVehicle)?.name}
                            </p>
                            <p className="text-orange-400 text-sm">
                              {vehicles.find((v) => v.id === selectedVehicle)?.type}
                            </p>
                            {selectedVehicle === "coach" && coachCapacity && (
                              <p className="text-gray-400 text-sm">
                                {language === "nl" ? "Capaciteit:" : "Capacity:"} {coachCapacity}{" "}
                                {language === "nl" ? "personen" : "people"}
                              </p>
                            )}
                            {selectedVehicle === "sprinter" && formData.sprinterTrailer && (
                              <p className="text-gray-400 text-sm">
                                {language === "nl" ? "Met aanhangwagen" : "With trailer"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Form */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                        <User className="w-5 h-5 text-orange-500" />
                        {language === "nl" ? "Contactinformatie" : "Contact Information"}
                      </h4>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white font-medium">
                              {t("booking.form.first_name")} *
                            </Label>
                            <Controller
                              name="firstName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id="firstName"
                                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                  {...field}
                                />
                              )}
                            />
                            {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white font-medium">
                              {t("booking.form.last_name")} *
                            </Label>
                            <Controller
                              name="lastName"
                              control={control}
                              render={({ field }) => (
                                <Input
                                  id="lastName"
                                  className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                  {...field}
                                />
                              )}
                            />
                            {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white font-medium flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {t("booking.form.phone")} *
                          </Label>
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <Input
                                id="phone"
                                type="tel"
                                className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                {...field}
                              />
                            )}
                          />
                          {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white font-medium flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {t("booking.form.email")} *
                          </Label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <Input
                                id="email"
                                type="email"
                                className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                {...field}
                              />
                            )}
                          />
                          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-white font-medium">
                            {t("booking.form.company")}
                          </Label>
                          <Controller
                            name="company"
                            control={control}
                            render={({ field }) => (
                              <Input
                                id="company"
                                className="bg-gray-800 border-gray-700 text-white h-12 rounded-lg focus:border-orange-500 focus:ring-orange-500/20"
                                {...field}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="px-8 md:px-12 pb-8 md:pb-12">
                <div className="flex justify-between items-center pt-8 border-t border-gray-800">
                  {step > 1 && step < 4 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center gap-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      {t("booking.form.back")}
                    </Button>
                  )}
                  <div className={cn(step === 1 && "ml-auto")}>
                    {step < 3 && (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 flex items-center gap-3 px-8 py-3 rounded-lg text-lg"
                      >
                        {t("booking.form.next")}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    )}
                    {step === 3 && (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold hover:from-green-600 hover:to-teal-600 px-6 py-3 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {language === "nl" ? "Bezig met laden..." : "Loading..."}
                          </>
                        ) : (
                          t("booking.form.submit")
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}