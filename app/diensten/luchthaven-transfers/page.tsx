import AirportTransfersContent from "./luchthaven-transfers-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luchthaventransfer Holland & Europa | Luxe Chauffeursdienst",
  description:
    "Eersteklas luchthaventransport in Amsterdam, Nederland, met betrouwbaar luxe vervoer en professionele chauffeurs voor moeiteloze luchthavenreizen.",
  openGraph: {
    title: "Luchthaventransfer Holland & Europa | Luxe Chauffeursdienst",
    description:
      "Eersteklas luchthaventransport in Amsterdam, Nederland, met betrouwbaar luxe vervoer en professionele chauffeurs voor moeiteloze luchthavenreizen.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/luchthaven-transfers",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function AirportTransfersPage() {
  return <AirportTransfersContent />
}
