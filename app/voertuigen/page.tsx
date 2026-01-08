import FleetContent from "./voertuigen-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxe Voertuigen Holland & Europa | Mercedes VIP & Groepsvervoer",
  description:
    "Ervaar eersteklas reizen in Nederland met high-end voertuigen, superieure interieurs en professionele standaarden die tot uiting komen in ons luxe wagenpark",
  openGraph: {
    title: "Luxe Voertuigen Holland & Europa | Mercedes VIP & Groepsvervoer",
    description:
      "Ervaar eersteklas reizen in Nederland met high-end voertuigen, superieure interieurs en professionele standaarden die tot uiting komen in ons luxe wagenpark",
    type: "website",
    url: "https://hollandviptransfers.com/voertuigen",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function FleetPage() {
  return <FleetContent />
}
