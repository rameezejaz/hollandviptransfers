"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Check, Home, Loader2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (sessionId) {
      // Verify payment on client side (optional, for display purposes)
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          setStatus(data.paid ? "success" : "error")
        })
        .catch(() => setStatus("error"))
    } else {
      setStatus("error")
    }
  }, [sessionId])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          <p className="text-xl">Verifying payment...</p>
        </div>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center p-12 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-lg mx-auto">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500/20 mb-8">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Payment Not Found</h2>
          <p className="text-gray-400 text-lg mb-10">
            We could not verify your payment. Please contact us if you were charged.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-3" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center p-12 bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-lg mx-auto">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/20 mb-8">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Booking Confirmed!</h2>
        <div className="inline-block bg-green-500/10 border border-green-500/30 rounded-full px-6 py-2 mb-6">
          <span className="text-green-400 font-semibold">✅ Payment Successful</span>
        </div>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Thank you for your payment! A confirmation email has been sent to your inbox. Our team will be in touch shortly.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 px-8 py-4 text-lg"
        >
          <Link href="/">
            <Home className="w-5 h-5 mr-3" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}