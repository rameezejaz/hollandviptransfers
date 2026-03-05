import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id")
  if (!sessionId) {
    return NextResponse.json({ paid: false, error: "No session ID" }, { status: 400 })
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json({
      paid: session.payment_status === "paid",
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      customerEmail: session.customer_email,
      metadata: session.metadata,
      alreadyEmailed: session.metadata?.emailSent === "true",
    })
  } catch (error) {
    return NextResponse.json({ paid: false, error: "Session not found" }, { status: 404 })
  }
}