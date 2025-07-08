import TouringContent from "./touren-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Touring Holland & Europa | Luxe Meerdaagse Tours & Chauffeur",
  description:
    "Ontdek onze luxe tours: 3-5 daagse Grote Nederland Tour, 7-10 dagen Benelux Ontdekking en 10-14 dagen Europese Hoofdsteden.Begeleid uzelf met onze ervaren chauffeurs.",
  openGraph: {
    title: "Touring Holland & Europa | Luxe Meerdaagse Tours & Chauffeur",
    description:
      "Ontdek onze luxe tours: 3-5 daagse Grote Nederland Tour, 7-10 dagen Benelux Ontdekking en 10-14 dagen Europese Hoofdsteden. Begeleid uzelf met onze ervaren chauffeurs.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/touren",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function TouringPage() {
  return <TouringContent />
}
