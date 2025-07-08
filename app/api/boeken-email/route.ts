import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  console.log("📧 Email API called")

  try {
    const body = await request.json()
    console.log("📋 Received data:", JSON.stringify(body, null, 2))

    const { data, vehicle, lang } = body

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY not found")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }
    console.log("🔑 API Key found:", process.env.RESEND_API_KEY?.substring(0, 10) + "...")

    // Determine language-specific content
    const isNL = lang === "nl"

    const subjects = {
      owner: isNL
        ? "🚨 Nieuwe Boekingsaanvraag - Holland VIP Transfers"
        : "🚨 New Booking Request - Holland VIP Transfers",
      customer: isNL
        ? "Bevestiging van uw boekingsaanvraag - Holland VIP Transfers"
        : "Booking Request Confirmation - Holland VIP Transfers",
    }

    // Format service type display
    const getServiceTypeDisplay = (serviceType: string) => {
      const serviceMap: Record<string, { nl: string; en: string }> = {
        corporate: { nl: "Zakelijk Vervoer", en: "Corporate Transport" },
        sightseeing: { nl: "Sightseeing", en: "Sightseeing" },
        touring: { nl: "Touring", en: "Touring" },
        "stand-by": { nl: "Stand-by Service", en: "Stand-by Service" },
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
    const getLuggageTypeDisplay = (data: any) => {
      const types = []
      if (data.handLuggage) {
        types.push(isNL ? "Handbagage" : "Hand Luggage")
      }
      if (data.checkedLuggage) {
        types.push(isNL ? "Ruimbagage" : "Checked Luggage")
      }
      return types.join(", ") || (isNL ? "Niet gespecificeerd" : "Not specified")
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

        let serviceDetails = ""
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

          if ((data.serviceType === "corporate" || data.serviceType === "stand-by") && data.hours) {
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

        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Booking Request</title>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
            <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff;">

              <!-- Header -->
              <div style="background-color: #dc2626; padding: 20px; text-align: center;">
                <img src="https://hollandviptransfers.com/images/logo.jpeg" alt="Holland VIP Transfers" width="60" height="60" style="border-radius: 8px; margin-bottom: 10px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0;">
                  🚨 NEW BOOKING REQUEST
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

                <!-- Booking Details -->
                <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <h2 style="font-size: 20px; font-weight: bold; color: #166534; margin-bottom: 15px;">
                    📋 BOOKING DETAILS
                  </h2>

                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; width: 25%; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🚗 Type:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.rideType === "one_way" ? "One-Way" : "Hourly Service"}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
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
                        <strong style="color: #374151;">📍 From:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.from}
                      </td>
                    </tr>
                    ${
                      data.to
                        ? `
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🎯 To:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.to}
                      </td>
                    </tr>
                    `
                        : ""
                    }
                    ${serviceDetails}
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">🧳 Luggage Type:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${getLuggageTypeDisplay(data)}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0;">
                        <strong style="color: #374151;">👥 Passengers:</strong>
                      </td>
                      <td style="padding: 8px 0; border-bottom: 1px solid #bbf7d0; color: #1f2937; font-weight: 600;">
                        ${data.passengers || 0}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; ${data.remarks ? "border-bottom: 1px solid #bbf7d0;" : ""}">
                        <strong style="color: #374151;">🧳 Luggage:</strong>
                      </td>
                      <td style="padding: 8px 0; ${data.remarks ? "border-bottom: 1px solid #bbf7d0;" : ""} color: #1f2937; font-weight: 600;">
                        ${data.baggage || 0} pieces
                      </td>
                    </tr>
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
                  ${vehicleSpecificDetails ? `
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    ${vehicleSpecificDetails}
                  </table>
                  ` : ""}
                </div>

                <!-- Action Required -->
                <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; border: 2px solid #fca5a5; margin-bottom: 30px;">
                  <h2 style="font-size: 18px; font-weight: bold; color: #dc2626; margin-bottom: 10px;">
                    ⚡ ACTION REQUIRED
                  </h2>
                  <p style="font-size: 14px; color: #374151; line-height: 1.5; margin: 0;">
                    Please contact the customer within 1 business day to provide a detailed quote and confirm the booking details.
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
                    <a href="mailto:${data.email}?subject=Quote%20for%20your%20Holland%20VIP%20Transfer%20-%20${encodeURIComponent(data.date)}&body=Dear%20${encodeURIComponent(data.firstName)}%2C%0A%0AThank%20you%20for%20your%20booking%20request.%20We%20have%20reviewed%20your%20requirements%20and%20would%20like%20to%20provide%20you%20with%20a%20detailed%20quote.%0A%0ABest%20regards%2C%0AHolland%20VIP%20Transfers" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 15px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 0 10px 10px 0; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
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
                    <strong>${data.firstName} ${data.lastName}</strong> needs ${data.rideType === "one_way" ? "one-way transport" : "hourly service"} on <strong>${data.date}</strong> at <strong>${data.time}</strong> from <strong>${data.from}</strong>${data.to ? ` to <strong>${data.to}</strong>` : ""} for <strong>${data.passengers || 0} passengers</strong> with <strong>${data.baggage || 0} luggage pieces</strong> (${getLuggageTypeDisplay(data)}).
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background-color: #1f2937; padding: 20px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Holland VIP Transfers - Internal Booking Notification
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
          ? "Bedankt voor uw boekingsaanvraag. Wij nemen zo spoedig mogelijk contact met u op voor een offerte."
          : "Thank you for your booking request. We will contact you as soon as possible with a quote."
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

          if ((data.serviceType === "corporate" || data.serviceType === "stand-by") && data.hours) {
            serviceDetails += `<p><strong>${isNL ? "Aantal Uren" : "Number of Hours"}:</strong> ${data.hours}</p>`
          }
        }

        let vehicleSpecificDetails = ""
        if (data.vehicle === "coach" && data.coachCapacity) {
          vehicleSpecificDetails += `<p><strong>${isNL ? "Coach Capaciteit" : "Coach Capacity"}:</strong> ${data.coachCapacity} ${isNL ? "personen" : "people"}</p>`
        }
        if (data.vehicle === "sprinter" && data.sprinterTrailer) {
          vehicleSpecificDetails += `<p><strong>${isNL ? "Extra Aanhangwagen" : "Extra Trailer"}:</strong> ${isNL ? "Ja" : "Yes"}</p>`
        }

        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #f97316; margin: 0; font-size: 28px;">Holland VIP Transfers</h1>
                <p style="color: #666; margin: 5px 0 0 0;">${isNL ? "Luxe Vervoer & Chauffeursdiensten" : "Luxury Transport & Chauffeur Services"}</p>
              </div>

              <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">${greeting}</h2>

              <p style="color: #666; line-height: 1.6;">${thankYouMessage}</p>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">${isNL ? "Boekingsdetails" : "Booking Details"}</h3>

                <div style="display: grid; gap: 10px;">
                  <p><strong>${isNL ? "Type Rit" : "Ride Type"}:</strong> ${data.rideType === "one_way" ? (isNL ? "Enkele Reis" : "One Way") : isNL ? "Per Uur" : "Hourly"}</p>
                  <p><strong>${isNL ? "Datum" : "Date"}:</strong> ${data.date}</p>
                  <p><strong>${isNL ? "Tijd" : "Time"}:</strong> ${data.time}</p>
                  <p><strong>${isNL ? "Ophaallocatie" : "Pick-up Location"}:</strong> ${data.from}</p>
                  ${data.to ? `<p><strong>${isNL ? "Bestemmingslocatie" : "Drop-off Location"}:</strong> ${data.to}</p>` : ""}
                  ${serviceDetails}
                  <p><strong>${isNL ? "Bagage Type" : "Luggage Type"}:</strong> ${getLuggageTypeDisplay(data)}</p>
                  <p><strong>${isNL ? "Aantal Passagiers" : "Number of Passengers"}:</strong> ${data.passengers || 0}</p>
                  <p><strong>${isNL ? "Aantal Koffers" : "Number of Luggage"}:</strong> ${data.baggage || 0}</p>
                  ${data.remarks ? `<p><strong>${isNL ? "Opmerkingen" : "Remarks"}:</strong> ${data.remarks}</p>` : ""}
                </div>
              </div>

              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
                <h3 style="color: #333; margin-top: 0;">${isNL ? "Geselecteerd Voertuig" : "Selected Vehicle"}</h3>
                <p><strong>${vehicle.name}</strong> - ${vehicle.type}</p>
                <p style="color: #666; margin: 5px 0;">${isNL ? "Capaciteit" : "Capacity"}: ${vehicle.passengers} ${isNL ? "passagiers" : "passengers"}, ${vehicle.luggage} ${isNL ? "koffers" : "luggage pieces"}</p>
                ${vehicleSpecificDetails}
              </div>

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
                  📧 Email: info@hollandviptransfers.com<br>
                  📱 ${isNL ? "Telefoon" : "Phone"}: +31 (0) 123 456 789<br>
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
        to: ["adelaarjonas1@gmail.com"],
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
