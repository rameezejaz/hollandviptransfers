import type { Metadata } from "next"
import { OverOnsContent } from "./over-ons-content"

export const metadata: Metadata = {
  title: "Over Holland VIP Transfers | Luxe vervoer & groepsreizen",
  description:
    "Ontdek onze premium chauffeursnormen, luxe wagenpark en uitmuntende service in Amsterdam, Nederland, en lees wat Holland VIP Transfers onderscheidt.",
  openGraph: {
    title: "Over Holland VIP Transfers | Luxe vervoer & groepsreizen",
    description:
      "Ontdek onze premium chauffeursnormen, luxe wagenpark en uitmuntende service in Amsterdam, Nederland, en lees wat Holland VIP Transfers onderscheidt.",
    type: "website",
    url: "https://hollandviptransfers.com/over-ons",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function OverOnsPage() {
  return <OverOnsContent />
}
