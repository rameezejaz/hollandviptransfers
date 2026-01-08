import TouringContent from "./touren-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Touring Holland & Europa | Luxe Meerdaagse Tours & Chauffeur",
  description:
    "Ontdek Europa moeiteloos met privévervoer in Amsterdam, Nederland, en geniet van luxe meerdaagse tours door Europa in comfort en stijl.",
  openGraph: {
    title: "Touring Holland & Europa | Luxe Meerdaagse Tours & Chauffeur",
    description:
      "Ontdek Europa moeiteloos met privévervoer in Amsterdam, Nederland, en geniet van luxe meerdaagse tours door Europa in comfort en stijl.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/touren",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function TouringPage() {
  return <TouringContent />
}
