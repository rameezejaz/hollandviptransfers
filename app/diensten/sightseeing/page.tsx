import SightseeingContent from "./sightseeing-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sightseeing | Privé Luxe Transport Tours",
  description:
    "Reis door Nederland met ervaren chauffeurs en luxe voertuigen, en ontdek de topbezienswaardigheden terwijl u geniet van een naadloze en onvergetelijke tourervaring",
  openGraph: {
    title: "Sightseeing | Privé Luxe Transport Tours",
    description:
      "Reis door Nederland met ervaren chauffeurs en luxe voertuigen, en ontdek de topbezienswaardigheden terwijl u geniet van een naadloze en onvergetelijke tourervaring",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/sightseeing",
    siteName: "Holland VIP Transfers",
  },
}

export default function SightseeingPage() {
  return <SightseeingContent />
}
