import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status === "paid") {
      console.log("✅ Payment successful for session:", session.id)

      try {
        // Retrieve full session with metadata
        const fullSession = await stripe.checkout.sessions.retrieve(session.id)
        const metadata = fullSession.metadata || {}

        // Reconstruct booking data from metadata
        // We stored key fields directly in metadata
        const bookingData = {
          firstName: metadata.firstName || "",
          lastName: metadata.lastName || "",
          email: metadata.email || "",
          phone: metadata.phone || "",
          company: metadata.company || "",
          vehicleId: metadata.vehicleId || "",
          vehicleName: metadata.vehicleName || "",
          rideType: metadata.rideType || "",
          date: metadata.date || "",
          time: metadata.time || "",
        }

        const lang = metadata.lang || "en"
        const isNL = lang === "nl"

        const amountPaid = session.amount_total ? session.amount_total / 100 : 0

        // Send confirmation emails via existing email API
        const emailPayload = {
          data: {
            ...bookingData,
            // These will show in email - we have what we stored in metadata
            rideType: bookingData.rideType as "one_way" | "round_trip" | "hourly",
            baggage: 0,
            passengers: 0,
            sameReturnLocation: false,
            handLuggage: true,
            checkedLuggage: false,
            sprinterTrailer: false,
            remarks: isNL
              ? `✅ BETALING ONTVANGEN: €${amountPaid} - Stripe Session: ${session.id}`
              : `✅ PAYMENT RECEIVED: €${amountPaid} - Stripe Session: ${session.id}`,
          },
          vehicle: {
            id: bookingData.vehicleId,
            name: bookingData.vehicleName,
            type: "",
            img: `/images/cars/${bookingData.vehicleId}/front.jpeg`,
            passengers: 0,
            luggage: 0,
          },
          lang,
          bookingType: "paid_booking",
          paymentInfo: {
            amount: amountPaid,
            currency: "EUR",
            sessionId: session.id,
            paymentStatus: "paid",
          },
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hollandviptransfers.com"
        const emailResponse = await fetch(`${baseUrl}/api/boeken-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(emailPayload),
        })

        if (!emailResponse.ok) {
          console.error("Failed to send email after payment")
        } else {
          console.log("✅ Payment confirmation emails sent")
        }
      } catch (error) {
        console.error("Error processing successful payment:", error)
      }
    }
  }

  return NextResponse.json({ received: true })
}