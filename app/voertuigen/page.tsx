import FleetContent from "./voertuigen-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxe Voertuigen Holland & Europa | Mercedes VIP & Groepsvervoer",
  description:
    "Ervaar uw reis in ultiem comfort met onze Mercedes E-Class, S-Class, V-Class, Sprinter en touringcar. Van zakelijke ritten tot groepsreizen en meerdaagse tours.",
  openGraph: {
    title: "Luxe Voertuigen Holland & Europa | Mercedes VIP & Groepsvervoer",
    description:
      "Ervaar uw reis in ultiem comfort met onze Mercedes E-Class, S-Class, V-Class, Sprinter en touringcar. Van zakelijke ritten tot groepsreizen en meerdaagse tours.",
    type: "website",
    url: "https://hollandviptransfers.com/voertuigen",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function FleetPage() {
  return <FleetContent />
}
