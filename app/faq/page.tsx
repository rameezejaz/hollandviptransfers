import FaqContent from "./faq-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen Luxe Vervoer Holland & Europa | Holland VIP Transfers",
  description:
    "Antwoorden op veelgestelde vragen over luxe vervoer in Holland & Europa. Alles over onze tours, prijzen, boekingen, groepsvervoer en voertuigen.",
  openGraph: {
    title: "Veelgestelde Vragen Luxe Vervoer Holland & Europa | Holland VIP Transfers",
    description:
      "Antwoorden op veelgestelde vragen over luxe vervoer in Holland & Europa. Alles over onze chauffeursdiensten, prijzen, boekingen, groepsvervoer en voertuigen.",
    type: "website",
    url: "https://hollandviptransfers.com/faq",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function FaqPage() {
  return <FaqContent />
}
