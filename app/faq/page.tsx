import FaqContent from "./faq-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen Luxe Vervoer Holland & Europa | Holland VIP Transfers",
  description:
    "Ontdek veelgestelde vragen over reizen in Amsterdam, Nederland, en vind handige tips voor luchthavenvervoer, tours en zakelijke reizen.",
  openGraph: {
    title: "Veelgestelde Vragen Luxe Vervoer Holland & Europa | Holland VIP Transfers",
    description:
      "Ontdek veelgestelde vragen over reizen in Amsterdam, Nederland, en vind handige tips voor luchthavenvervoer, tours en zakelijke reizen.",
    type: "website",
    url: "https://hollandviptransfers.com/faq",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function FaqPage() {
  return <FaqContent />
}
