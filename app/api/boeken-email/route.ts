import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface FormData {
  // ride details
  rideType: "one_way" | "round_trip" | "hourly"
  date: string
  time: string
  returnDate?: string
  returnTime?: string
  from: string
  to?: string
  customFrom?: string
  customTo?: string
  fullAddressFrom?: string
  fullAddressTo?: string
  fullAddressReturnFrom?: string
  fullAddressReturnTo?: string
  returnFrom?: string
  returnTo?: string
  customReturnFrom?: string
  customReturnTo?: string
  sameReturnLocation: boolean
  hours?: number
  serviceType?: string
  sightseeingLoc?: string
  otherLoc?: string
  baggage: number
  passengers: number
  remarks?: string
  touringPlan?: string
  customTourDetails?: string

  // luggage types
  handLuggage: boolean
  checkedLuggage: boolean

  // vehicle specific
  coachCapacity?: string
  sprinterCapacity?: string
  sprinterTrailer: boolean

  // vehicle
  vehicle: string

  // contact
  firstName: string
  lastName: string
  phone: string
  email: string
  company?: string
}

interface Vehicle {
  id: string
  name: string
  type: string
  img: string
  passengers: number
  luggage: number
}

export async function POST(request: NextRequest) {
  console.log("📧 Email API called")

  try {
    const body = await request.json()
    console.log("📋 Received data:", JSON.stringify(body, null, 2))

    const { data, vehicle, lang, bookingType, paymentInfo } = body as {
      data: FormData
      vehicle: Vehicle
      lang: string
      bookingType?: string
      paymentInfo?: { paid: boolean; amount: number; sessionId: string }
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }
    console.log("🔑 API Key found:", process.env.RESEND_API_KEY?.substring(0, 10) + "...")

    // Determine language-specific content
    const isNL = lang === "nl"

    // Determine if this is a groups & events booking
    const isGroupEvents = bookingType === "group_events"
    const isPaid = !!(body as any).paymentInfo?.paid
    const paidAmount = (body as any).paymentInfo?.amount ?? 0

    const subjects = {
      owner: paymentInfo?.paid
        ? `🚨 New Booking Request - ✅ PAYMENT RECEIVED - €${paymentInfo.amount} - Holland VIP Transfers`
        : isNL ? `🚨 Nieuwe Boekingsaanvraag - Holland VIP Transfers` : `🚨 New Booking Request - Holland VIP Transfers`,
      customer: isNL
        ? `Bevestiging van uw ${isGroupEvents ? "groepsevenementen" : "boekings"}aanvraag - Holland VIP Transfers`
        : `${isGroupEvents ? "Groups & Events" : "Booking"} Request Confirmation - Holland VIP Transfers`,
    }

    // Format service type display
    const getServiceTypeDisplay = (serviceType: string) => {
      const serviceMap: Record<string, { nl: string; en: string }> = {
        corporate: { nl: "Zakelijk Vervoer", en: "Corporate Transport" },
        sightseeing: { nl: "Sightseeing", en: "Sightseeing" },
        touring: { nl: "Touring", en: "Touring" },
        "stand-by": { nl: "Stand-by Service", en: "Stand-by Service" },
        "groups-events": { nl: "Groepen & Evenementen", en: "Groups & Events" },
      }
      return serviceMap[serviceType]?.[isNL ? "nl" : "en"] || serviceType
    }

    // Format touring plan display
    const getTouringPlanDisplay = (plan: string) => {
      const planMap: Record<string, { nl: string; en: string }> = {
        grand_netherlands: { nl: "Grand Netherlands Tour", en: "Grand Netherlands Tour" },
        benelux: { nl: "Benelux Tour", en: "Benelux Tour" },
        europe: { nl: "Europa Tour", en: "Europe Tour" },
        other: { nl: "Aangepaste Tour", en: "Custom Tour" },
      }
      return planMap[plan]?.[isNL ? "nl" : "en"] || plan
    }

    // Format luggage type display
    const getLuggageTypeDisplay = (data: FormData) => {
      const types = []
      if (data.handLuggage) {
        types.push(isNL ? "Handbagage" : "Hand Luggage")
      }
      if (data.checkedLuggage) {
        types.push(isNL ? "Ruimbagage" : "Checked Luggage")
      }
      return types.join(", ") || (isNL ? "Niet gespecificeerd" : "Not specified")
    }

    // Helper to get location display (handles "other" case)
    const getLocationDisplay = (location: string | undefined, customLocation: string | undefined): string => {
      if (!location) return ""
      if (location === "other" && customLocation) return customLocation
      return location
    }

    // Create email content
    const createEmailContent = (isForOwner: boolean) => {
      if (isForOwner) {
        // Owner email
        const submittedAt = new Date().toLocaleString("nl-NL", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        // Build service/event details based on booking type
        let serviceDetails = ""

        if (!isGroupEvents) {
          // Regular booking service details
          if (data.rideType === "hourly" && data.serviceType) {
            serviceDetails += `
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #374151;">🎪 Service Type:</strong>
                </td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                  ${getServiceTypeDisplay(data.serviceType)}
                </td>
              </tr>
            `

            if (data.serviceType === "touring" && data.touringPlan) {
              serviceDetails += `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">🗺️ Tour Plan:</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                    ${getTouringPlanDisplay(data.touringPlan)}
                  </td>
                </tr>
              `

              if (data.touringPlan === "other" && data.customTourDetails) {
                serviceDetails += `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                      <strong style="color: #374151;">📝 Custom Tour:</strong>
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                      ${data.customTourDetails}
                    </td>
                  </tr>
                `
              }
            }

            if (data.serviceType === "sightseeing" && data.sightseeingLoc) {
              serviceDetails += `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">🗺️ Destination:</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                    ${data.sightseeingLoc}
                  </td>
                </tr>
              `

              if (data.sightseeingLoc === "other" && data.otherLoc) {
                serviceDetails += `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                      <strong style="color: #374151;">📍 Custom Location:</strong>
                    </td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                      ${data.otherLoc}
                    </td>
                  </tr>
                `
              }
            }

            if (
              (data.serviceType === "corporate" || data.serviceType === "stand-by" || data.serviceType === "groups-events") &&
              data.hours
            ) {
              serviceDetails += `
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #374151;">⏱️ Duration:</strong>
                  </td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                    ${data.hours} hours
                  </td>
                </tr>
                `
              const hourlyRates: Record<string, number> = {
                "e-class": 75,
                "s-class": 95,
                "v-class": 95,
              }
              if (hourlyRates[data.vehicle]) {
                const totalPrice = hourlyRates[data.vehicle] * data.hours
                serviceDetails += `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                        <strong style="color: #374151;">💰 Estimated Total:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #16a34a; font-weight: 600;">
                        € ${totalPrice} (€${hourlyRates[data.vehicle]}/hour × ${data.hours} hours)
                      </td>
                    </tr>
                  `
              }
            }
          }
        }

        // Vehicle specific details
        let vehicleSpecificDetails = ""
        if (data.vehicle === "coach" && data.coachCapacity) {
          vehicleSpecificDetails += `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #374151;">🚌 Coach Capacity:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                ${data.coachCapacity} people
              </td>
            </tr>
          `
        }

        if (data.vehicle === "sprinter" && data.sprinterCapacity) {
          vehicleSpecificDetails += `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #374151;">🚐 Sprinter Capacity:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                ${data.sprinterCapacity} seater
              </td>
            </tr>
          `
        }

        if (data.vehicle === "sprinter" && data.sprinterTrailer) {
          vehicleSpecificDetails += `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
                <strong style="color: #374151;">🚛 Extra Trailer:</strong>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: 600;">
                Yes, luggage trailer requested
              </td>
            </tr>
          `
        }

        // Get display values for locations
        const fromDisplay = getLocationDisplay(data.from, data.customFrom)
        const toDisplay = getLocationDisplay(data.to, data.customTo)
        const returnFromDisplay = getLocationDisplay(data.returnFrom, data.customReturnFrom)
        const returnToDisplay = getLocationDisplay(data.returnTo, data.customReturnTo)

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New ${isGroupEvents ? "Groups & Events" : "Booking"} Request</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
            <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">

              <!-- Header -->
              <div style="background-color: #dc2626; padding: 20px; text-align: center;">
                <img src="https://hollandviptransfers.com/images/logo.jpeg" alt="Holland VIP Transfers" width="60" height="60" style="border-radius: 8px; margin-bottom: 10px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                  🚨 NEW ${isGroupEvents ? "GROUPS & EVENTS" : "BOOKING"} REQUEST
                </h1>
                <p style="color: #fecaca; font-size: 14px; margin: 5px 0 0 0;">Submitted: ${submittedAt}</p>
              </div>

              <!-- Main Content -->
              <div style="padding: 30px;">

                <!-- Customer Information -->
                <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="font-size: 20px; font-weight: bold; color: #1e40af; margin-bottom: 15px;">
                    👤 CUSTOMER INFORMATION
                  </h2>

                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; width: 25%; border-bottom: 1px solid #bfdbfe;">
                        <strong style="color: #374151;">Name:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bfdbfe; color: #1f2937; font-weight: 600;">
                        ${data.firstName} ${data.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bfdbfe;">
                        <strong style="color: #374151;">📞 Phone:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bfdbfe;">
                        <a href="tel:${data.phone}" style="color: #dc2626; font-weight: 600; text-decoration: none; font-size: 16px;">
                          ${data.phone}
                        </a>
                      </td>
                    </tr>
                    ${
                      data.email
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bfdbfe;">
                        <strong style="color: #374151;">✉️ Email:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bfdbfe;">
                        <a href="mailto:${data.email}" style="color: #dc2626; font-weight: 600; text-decoration: none; font-size: 16px;">
                          ${data.email}
                        </a>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.company
                        ? `
                    <tr>
                      <td style="padding: 8px 0;">
                        <strong style="color: #374151;">🏢 Company:</strong>
                      </td>
                      <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">
                        ${data.company}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                  </table>
                </div>

                <!-- Booking/Event Details -->
                <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="font-size: 20px; font-weight: bold; color: #166534; margin-bottom: 15px;">
                    📋 ${isGroupEvents ? "EVENT" : "BOOKING"} DETAILS
                  </h2>

                  <table style="width: 100%; border-collapse: collapse;">
                    ${
                      !isGroupEvents
                        ? `
                    <tr>
                      <td style="padding: 8px 0; width: 25%; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🚗 Type:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.rideType === "one_way" ? "One-Way" : data.rideType === "round_trip" ? "Round Trip" : "Hourly Service"}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    <tr>
                      <td style="padding: 8px 0; ${!isGroupEvents ? "width: 25%;" : ""} border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">📅 Date:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.date}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🕐 Time:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.time}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">📍 ${isGroupEvents ? "Pick-up Location" : "From"}:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${fromDisplay}
                      </td>
                    </tr>
                    ${
                      data.fullAddressFrom
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🏠 Full Address (From):</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.fullAddressFrom}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      toDisplay
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🎯 ${isGroupEvents ? "Drop-off Location" : "To"}:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${toDisplay}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.fullAddressTo
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🏠 Full Address (To):</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.fullAddressTo}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.returnDate && data.returnTime
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🔄 Return Date:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.returnDate}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🔄 Return Time:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.returnTime}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      returnFromDisplay
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🔄 Return From:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${returnFromDisplay}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.fullAddressReturnFrom
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🏠 Return Full Address (From):</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.fullAddressReturnFrom}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      returnToDisplay
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🔄 Return To:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${returnToDisplay}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.fullAddressReturnTo
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🏠 Return Full Address (To):</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.fullAddressReturnTo}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${serviceDetails}
                    ${
                      !isGroupEvents
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🧳 Luggage Type:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${getLuggageTypeDisplay(data)}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">👥 ${isGroupEvents ? "Group Size" : "Passengers"}:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.passengers || 0}
                      </td>
                    </tr>
                    ${
                      !isGroupEvents && data.baggage
                        ? `
                    <tr>
                      <td style="padding: 8px 0; ${data.remarks ? "border-bottom: 1px solid #bbf7d0;" : ""}">
                        <strong style="color: #374151;">🧳 Luggage:</strong>
                      </td>
                      <td style="padding: 8px 0; ${data.remarks ? "border-bottom: 1px solid #bbf7d0;" : ""} color: #1f2937; font-weight: 600;">
                        ${data.baggage} pieces
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${
                      data.remarks
                        ? `
                    <tr>
                      <td style="padding: 8px 0;">
                        <strong style="color: #374151;">💬 Remarks:</strong>
                      </td>
                      <td style="padding: 8px 0;">
                        <div style="background-color: #fef3c7; padding: 8px; border-radius: 4px; color: #1f2937; font-weight: 600;">
                          ${data.remarks}
                        </div>
                      </td>
                    </tr>
                    `
                        : ""
                    }
                  </table>
                </div>

                ${
                  vehicle
                    ? `
                <!-- Vehicle Information -->
                <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="font-size: 20px; font-weight: bold; color: #d97706; margin-bottom: 15px;">
                    🚙 SELECTED VEHICLE
                  </h2>
                  <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="${vehicle.img}" alt="${vehicle.name}" width="100" height="75" style="border-radius: 8px;">
                    <div>
                      <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin: 0 0 8px 0;">
                        ${vehicle.name}
                      </h3>
                      <p style="font-size: 16px; color: #d97706; margin: 0; font-weight: 600;">
                        ${vehicle.type}
                      </p>
                      <p style="font-size: 14px; color: #666; margin: 5px 0 0 0;">
                        Capacity: ${vehicle.passengers} passengers, ${vehicle.luggage} luggage pieces
                      </p>
                    </div>
                  </div>
                  ${
                    vehicleSpecificDetails
                      ? `
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    ${vehicleSpecificDetails}
                  </table>
                  `
                      : ""
                  }
                </div>
                `
                    : ""
                }

                ${isPaid ? `
                  <div style="background-color:#dcfce7;padding:20px;border-radius:8px;border:2px solid #86efac;margin-bottom:20px;text-align:center">
                    <p style="font-size:14px;font-weight:bold;color:#166534;margin:0 0 8px 0">💳 BETALING ONTVANGEN</p>
                    <p style="font-size:40px;font-weight:bold;color:#16a34a;margin:0">€ ${paidAmount}</p>
                  </div>
                  ` : ''}

                <!-- Action Required -->
                <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border: 2px solid #fca5a5; margin-bottom: 30px;">
                  <h2 style="font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
                    ⚡ ACTION REQUIRED
                  </h2>
                  <p style="font-size: 14px; color: #374151; line-height: 1.5; margin: 0;">
                    Please contact the customer within 1 business day to provide a detailed quote and confirm the ${isGroupEvents ? "event" : "booking"} details.
                  </p>
                </div>

                <!-- Quick Actions -->
                <div style="text-align: center; margin-bottom: 30px;">
                  <h2 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 20px;">
                    Quick Actions:
                  </h2>
                  <div style="display: inline-block;">
                    ${
                      data.email
                        ? `
                    <a href="mailto:${data.email}?subject=Quote%20for%20your%20Holland%20VIP%20Transfer%20-%20${encodeURIComponent(data.date)}&body=Dear%20${encodeURIComponent(data.firstName)}%2C%0A%0AThank%20you%20for%20your%20${isGroupEvents ? "group%20events" : "booking"}%20request.%20We%20have%20reviewed%20your%20requirements%20and%20would%20like%20to%20provide%20you%20with%20a%20detailed%20quote.%0A%0ABest%20regards%2C%0AHolland%20VIP%20Transfers" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 15px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 0 10px 10px 0; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      ✉️ Send Quote
                    </a>
                    `
                        : ""
                    }
                  </div>
                </div>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

                <!-- Customer Summary for Quick Reference -->
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                  <h3 style="font-size: 16px; font-weight: bold; color: #1f2937; margin: 0 0 10px 0;">
                    📋 Quick Summary
                  </h3>
                  <p style="font-size: 14px; color: #374151; margin: 0; line-height: 1.4;">
                    <strong>${data.firstName} ${data.lastName}</strong> needs ${isGroupEvents ? `group event transportation for <strong>${data.passengers || 0} people</strong>` : `${data.rideType === "one_way" ? "one-way transport" : data.rideType === "round_trip" ? "round-trip transport" : "hourly service"}`} on <strong>${data.date}</strong> at <strong>${data.time}</strong> from <strong>${fromDisplay}</strong>${toDisplay ? ` to <strong>${toDisplay}</strong>` : ""}${!isGroupEvents ? ` for <strong>${data.passengers || 0} passengers</strong> with <strong>${data.baggage || 0} luggage pieces</strong> (${getLuggageTypeDisplay(data)})` : ""}.
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #1f2937; padding: 20px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Holland VIP Transfers - Internal ${isGroupEvents ? "Groups & Events" : "Booking"} Notification
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      } else {
        // Customer email
        const greeting = isNL ? `Beste ${data.firstName},` : `Dear ${data.firstName},`
        const thankYouMessage = isNL
          ? `Bedankt voor uw ${isGroupEvents ? "groepsevenementen" : "boekings"}aanvraag. Wij nemen zo spoedig mogelijk contact met u op voor een offerte.`
          : `Thank you for your ${isGroupEvents ? "groups & events" : "booking"} request. We will contact you as soon as possible with a quote.`
        const contactInfo = isNL
          ? "Voor vragen kunt u contact met ons opnemen via:"
          : "For questions, you can contact us via:"

        let serviceDetails = ""

        if (data.rideType === "hourly" && data.serviceType) {
          serviceDetails += `<p><strong>${isNL ? "Service Type" : "Service Type"}:</strong> ${getServiceTypeDisplay(data.serviceType)}</p>`

          if (data.serviceType === "touring" && data.touringPlan) {
            serviceDetails += `<p><strong>${isNL ? "Tour Plan" : "Tour Plan"}:</strong> ${getTouringPlanDisplay(data.touringPlan)}</p>`

            if (data.touringPlan === "other" && data.customTourDetails) {
              serviceDetails += `<p><strong>${isNL ? "Aangepaste Tour Details" : "Custom Tour Details"}:</strong> ${data.customTourDetails}</p>`
            }
          }

          if (data.serviceType === "sightseeing" && data.sightseeingLoc) {
            serviceDetails += `<p><strong>${isNL ? "Bestemming" : "Destination"}:</strong> ${data.sightseeingLoc}</p>`

            if (data.sightseeingLoc === "other" && data.otherLoc) {
              serviceDetails += `<p><strong>${isNL ? "Aangepaste Locatie" : "Custom Location"}:</strong> ${data.otherLoc}</p>`
            }
          }

          if ((data.serviceType === "corporate" || data.serviceType === "stand-by" || data.serviceType === "groups-events") && data.hours) {
            serviceDetails += `<p><strong>${isNL ? "Aantal Uren" : "Number of Hours"}:</strong> ${data.hours}</p>`
          }
        }

        let vehicleSpecificDetails = ""
        if (data.vehicle === "coach" && data.coachCapacity) {
          vehicleSpecificDetails += `<p><strong>${isNL ? "Coach Capaciteit" : "Coach Capacity"}:</strong> ${data.coachCapacity} ${isNL ? "personen" : "people"}</p>`
        }
        if (data.vehicle === "sprinter" && data.sprinterCapacity) {
          vehicleSpecificDetails += `<p><strong>${isNL ? "Sprinter Capaciteit" : "Sprinter Capacity"}:</strong> ${data.sprinterCapacity} ${isNL ? "zitplaatsen" : "seater"}</p>`
        }

        if (data.vehicle === "sprinter" && data.sprinterTrailer) {
          vehicleSpecificDetails += `<p><strong>${isNL ? "Extra Aanhangwagen" : "Extra Trailer"}:</strong> ${isNL ? "Ja" : "Yes"}</p>`
        }

        // Get display values for locations
        const fromDisplay = getLocationDisplay(data.from, data.customFrom)
        const toDisplay = getLocationDisplay(data.to, data.customTo)
        const returnFromDisplay = getLocationDisplay(data.returnFrom, data.customReturnFrom)
        const returnToDisplay = getLocationDisplay(data.returnTo, data.customReturnTo)

        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #f97316; margin: 0; font-size: 28px;">Holland VIP Transfers</h1>
                <p style="color: #666; margin: 5px 0 0 0;">${isNL ? "Luxe Vervoer & Chauffeursdiensten" : "Luxury Transport & Chauffeur Services"}</p>
              </div>

              <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">${greeting}</h2>

              <p style="color: #666; line-height: 1.6;">${thankYouMessage}</p>

              ${isPaid ? `
                <div style="background-color:#dcfce7;border:2px solid #86efac;border-radius:12px;padding:20px;margin:20px 0;text-align:center">
                  <p style="font-size:16px;font-weight:bold;color:#166534;margin:0 0 8px 0">✅ BETALING ONTVANGEN</p>
                  <p style="font-size:36px;font-weight:bold;color:#16a34a;margin:0">€ ${paidAmount}</p>
                  <p style="color:#166534;font-size:14px;margin:8px 0 0 0">Uw boeking is bevestigd!</p>
                </div>
                ` : ''}

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">${isNL ? (isGroupEvents ? "Evenement Details" : "Boekingsdetails") : (isGroupEvents ? "Event Details" : "Booking Details")}</h3>

                <div style="display: grid; gap: 10px;">
                  ${!isGroupEvents ? `<p><strong>${isNL ? "Type Rit" : "Ride Type"}:</strong> ${data.rideType === "one_way" ? (isNL ? "Enkele Reis" : "One Way") : data.rideType === "round_trip" ? (isNL ? "Retour" : "Round Trip") : isNL ? "Per Uur" : "Hourly"}</p>` : ""}
                  <p><strong>${isNL ? "Datum" : "Date"}:</strong> ${data.date}</p>
                  <p><strong>${isNL ? "Tijd" : "Time"}:</strong> ${data.time}</p>
                  <p><strong>${isNL ? "Ophaallocatie" : "Pick-up Location"}:</strong> ${fromDisplay}</p>
                  ${data.fullAddressFrom ? `<p><strong>${isNL ? "Volledig Adres (Van)" : "Full Address (From)"}:</strong> ${data.fullAddressFrom}</p>` : ""}
                  ${toDisplay ? `<p><strong>${isNL ? "Bestemmingslocatie" : "Drop-off Location"}:</strong> ${toDisplay}</p>` : ""}
                  ${data.fullAddressTo ? `<p><strong>${isNL ? "Volledig Adres (Naar)" : "Full Address (To)"}:</strong> ${data.fullAddressTo}</p>` : ""}
                  ${data.returnDate ? `<p><strong>${isNL ? "Retour Datum" : "Return Date"}:</strong> ${data.returnDate}</p>` : ""}
                  ${data.returnTime ? `<p><strong>${isNL ? "Retour Tijd" : "Return Time"}:</strong> ${data.returnTime}</p>` : ""}
                  ${returnFromDisplay ? `<p><strong>${isNL ? "Retour Ophaallocatie" : "Return Pick-up Location"}:</strong> ${returnFromDisplay}</p>` : ""}
                  ${data.fullAddressReturnFrom ? `<p><strong>${isNL ? "Volledig Adres (Retour Van)" : "Full Address (Return From)"}:</strong> ${data.fullAddressReturnFrom}</p>` : ""}
                  ${returnToDisplay ? `<p><strong>${isNL ? "Retour Bestemmingslocatie" : "Return Drop-off Location"}:</strong> ${returnToDisplay}</p>` : ""}
                  ${data.fullAddressReturnTo ? `<p><strong>${isNL ? "Volledig Adres (Retour Naar)" : "Full Address (Return To)"}:</strong> ${data.fullAddressReturnTo}</p>` : ""}
                  ${serviceDetails}
                  ${!isGroupEvents ? `<p><strong>${isNL ? "Bagage Type" : "Luggage Type"}:</strong> ${getLuggageTypeDisplay(data)}</p>` : ""}
                  <p><strong>${isNL ? (isGroupEvents ? "Groepsgrootte" : "Aantal Passagiers") : (isGroupEvents ? "Group Size" : "Number of Passengers")}:</strong> ${data.passengers || 0}</p>
                  ${!isGroupEvents && data.baggage ? `<p><strong>${isNL ? "Aantal Koffers" : "Number of Luggage"}:</strong> ${data.baggage}</p>` : ""}
                  ${data.remarks ? `<p><strong>${isNL ? "Opmerkingen" : "Remarks"}:</strong> ${data.remarks}</p>` : ""}
                </div>
              </div>

              ${
                vehicle
                  ? `
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
                <h3 style="color: #333; margin-top: 0;">${isNL ? "Geselecteerd Voertuig" : "Selected Vehicle"}</h3>
                <p><strong>${vehicle.name}</strong> - ${vehicle.type}</p>
                <p style="color: #666; margin: 5px 0;">${isNL ? "Capaciteit" : "Capacity"}: ${vehicle.passengers} ${isNL ? "passagiers" : "passengers"}, ${vehicle.luggage} ${isNL ? "koffers" : "luggage pieces"}</p>
                ${vehicleSpecificDetails}
              </div>
              `
                  : ""
              }

              <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">${isNL ? "Contactgegevens" : "Contact Information"}</h3>
                <p><strong>${isNL ? "Naam" : "Name"}:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>${isNL ? "Telefoon" : "Phone"}:</strong> ${data.phone}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.company ? `<p><strong>${isNL ? "Bedrijf" : "Company"}:</strong> ${data.company}</p>` : ""}
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; line-height: 1.6;">${contactInfo}</p>
                <p style="color: #666;">
                  📧 Email: Info@hollandviptransfers.nl<br>
                  📱 ${isNL ? "Telefoon" : "Phone"}: +31 20 308 60 43<br>
                  🌐 Website: www.hollandviptransfers.com
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 14px; margin: 0;">
                  Holland VIP Transfers - ${isNL ? "Uw partner voor luxe vervoer" : "Your partner for luxury transport"}
                </p>
              </div>
            </div>
          </div>
        `
      }
    }

    console.log("📨 Sending emails...")

    // Send emails in parallel
    const emailPromises = [
      // Email to owner
      resend.emails.send({
        from: "Holland VIP Transfers <info@hollandviptransfers.com>",
        to: ["info@hollandviptransfers.nl"],
        subject: subjects.owner,
        html: createEmailContent(true),
      }),
      // Email to customer
      resend.emails.send({
        from: "Holland VIP Transfers <info@hollandviptransfers.com>",
        to: [data.email],
        subject: subjects.customer,
        html: createEmailContent(false),
      }),
    ]

    const results = await Promise.all(emailPromises)
    console.log("✅ Email results:", results)

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      results: results.map((r) => ({ id: r.data?.id, error: r.error })),
    })
  } catch (error) {
    console.error("❌ Error sending emails:", error)
    return NextResponse.json(
      { error: "Failed to send emails", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}