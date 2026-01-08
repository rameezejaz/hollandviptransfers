import CorporateEventsContent from "./zakelijk-vervoer-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zakelijk Vervoer Holland | Executive Chauffeurs & VIP Service",
  description:
    "Ervaar zorgeloos zakelijk vervoer in Nederland met luxe voertuigen en ervaren chauffeurs, voor naadloze reizen die voldoen aan zakelijke en executive behoeften.",
  openGraph: {
    title: "Zakelijk Vervoer Holland | Executive Chauffeurs & VIP Service",
    description:
      "Ervaar zorgeloos zakelijk vervoer in Nederland met luxe voertuigen en ervaren chauffeurs, voor naadloze reizen die voldoen aan zakelijke en executive behoeften.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/zakelijk-vervoer",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function CorporateEventsPage() {
  return <CorporateEventsContent />
}
