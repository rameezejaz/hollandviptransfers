import CorporateEventsContent from "./zakelijk-vervoer-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zakelijk Vervoer Holland | Executive Chauffeurs & VIP Service",
  description:
    "Ervaar professioneel zakelijk vervoer. Professionele chauffeurs voor vergaderingen, en conferenties. Ook geschikt voor grote groepen. 24/7 beschikbaar.",
  openGraph: {
    title: "Zakelijk Vervoer Holland | Executive Chauffeurs & VIP Service",
    description:
      "Ervaar professioneel zakelijk vervoer. Professionele chauffeurs voor vergaderingen en conferenties. Ook geschikt voor grote groepen. 24/7 beschikbaar.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/zakelijk-vervoer",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function CorporateEventsPage() {
  return <CorporateEventsContent />
}
