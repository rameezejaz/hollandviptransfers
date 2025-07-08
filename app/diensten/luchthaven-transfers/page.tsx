import AirportTransfersContent from "./luchthaven-transfers-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luchthaventransfer Holland & Europa | Luxe Chauffeursdienst",
  description:
    "Boek uw premium luchthaventransfer van en naar Schiphol en andere Europese luchthavens. Met professionele chauffeurs, meet & greet service en vluchttracking. 24/7 beschikbaar.",
  openGraph: {
    title: "Luchthaventransfer Holland & Europa | Luxe Chauffeursdienst",
    description:
      "Boek uw premium luchthaventransfer van en naar Schiphol en andere Europese luchthavens. Met professionele chauffeurs, meet & greet service en vluchttracking. 24/7 beschikbaar.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/luchthaven-transfers",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function AirportTransfersPage() {
  return <AirportTransfersContent />
}
