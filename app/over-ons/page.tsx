import type { Metadata } from "next"
import { OverOnsContent } from "./over-ons-content"

export const metadata: Metadata = {
  title: "Over Holland VIP Transfers | Luxe vervoer & groepsreizen",
  description:
    "Ontdek Holland VIP Transfers: meer dan 20 jaar ervaring in luxe vervoer, groepsreizen, tours en zakelijke ritten vanuit Amsterdam door heel Nederland en Europa.",
  openGraph: {
    title: "Over Holland VIP Transfers | Luxe vervoer & groepsreizen",
    description:
      "Ontdek Holland VIP Transfers: meer dan 20 jaar ervaring in luxe vervoer, groepsreizen, tours en zakelijke ritten vanuit Amsterdam door heel Nederland en Europa.",
    type: "website",
    url: "https://hollandviptransfers.com/over-ons",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function OverOnsPage() {
  return <OverOnsContent />
}
