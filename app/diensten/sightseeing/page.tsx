import SightseeingContent from "./sightseeing-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sightseeing | Privé Luxe Transport Tours",
  description:
    "Privé sightseeing met luxe transport. Professionele chauffeur service naar Keukenhof, Giethoorn, Zaanse Schans en meer. Boek vandaag een VIP-tour.",
  openGraph: {
    title: "Sightseeing | Privé Luxe Transport Tours",
    description:
      "Privé sightseeing met luxe transport. Professionele chauffeur service naar Keukenhof, Giethoorn, Zaanse Schans. Boek vandaag een VIP-tour.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/sightseeing",
    siteName: "Holland VIP Transfers",
  },
}

export default function SightseeingPage() {
  return <SightseeingContent />
}
