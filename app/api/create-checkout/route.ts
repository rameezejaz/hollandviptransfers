import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, vehicle, lang, estimatedPrice } = body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${vehicle.name} - Holland VIP Transfers`,
              description: `${data.from} → ${data.to || "Hourly"} | ${data.date} ${data.time}`,
            },
            unit_amount: Math.round(estimatedPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/boeken/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/boeken?cancelled=true`,
      customer_email: data.email,
      metadata: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        rideType: data.rideType,
        date: data.date,
        time: data.time,
        from: data.from || "",
        to: data.to || "",
        lang: lang,
        emailSent: "false",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}