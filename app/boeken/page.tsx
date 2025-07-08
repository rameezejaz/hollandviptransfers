import BookingContent from "./boeken-content"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Book Your Luxury Transfer - Holland VIP Transfers",
  description:
    "Book your luxury transport service in Amsterdam, Holland and Europe. Complete our simple 4-step process to request your quote.",
  openGraph: {
    title: "Book Your Luxury Transfer - Holland VIP Transfers",
    description:
      "Book your luxury transport service in Amsterdam, Holland and Europe. Complete our simple 4-step process to request your quote.",
    type: "website",
    url: "https://hollandviptransfers.com/booking",
    siteName: "Holland VIP Transfers",
  },
}

function BookingLoading() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
        <p className="text-xl">Loading Booking Form...</p>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  )
}
