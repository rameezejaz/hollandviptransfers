import GroupEventsContent from "./group-events-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Groeps- & Evenementenvervoer | Betrouwbare Chauffeur- & Groepsreizen",
  description:
    "Professioneel groepsvervoer voor evenementen, zakenreizen, bruiloften, tours en luchthavenvervoer met luxe voertuigen en ervaren chauffeurs.",
  keywords: [
    "groepsvervoer",
    "busvervoer",
    "Mercedes Sprinter",
    "16 zitplaatsen",
    "20 zitplaatsen",
    "23 zitplaatsen",
    "28 zitplaatsen",
    "bedrijfsuitje",
    "bruiloft vervoer",
    "groepsevenementen",
    "luxe busvervoer"
  ],
  openGraph: {
    title: "Groeps- & Evenementenvervoer | Betrouwbare Chauffeur- & Groepsreizen",
    description:
      "Professioneel groepsvervoer voor evenementen, zakenreizen, bruiloften, tours en luchthavenvervoer met luxe voertuigen en ervaren chauffeurs.",
    type: "website",
    url: "https://hollandviptransfers.com/diensten/group-events",
    siteName: "Holland VIP Transfers",
    images: [
      {
        url: "/images/cars/mercedes-sprinter/mercedes_sprinter_16_seater.webp",
        width: 1200,
        height: 630,
        alt: "Mercedes Sprinter Groepsvervoer"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Groepsevenementen & Luxe Busvervoer | Holland VIP Transfers",
    description: "Mercedes Sprinter bussen voor groepsevenementen - 16 tot 28 zitplaatsen",
    images: ["/images/cars/mercedes-sprinter/mercedes_sprinter_16_seater.webp"],
  },
  alternates: {
    canonical: "https://hollandviptransfers.com/diensten/group-events",
  },
}

export default function GroupEventsPage() {
  return <GroupEventsContent />
}