import GroupEventsContent from "./group-events-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Groepsevenementen & Busvervoer | Mercedes Sprinter | Holland VIP Transfers",
  description:
    "Luxe busvervoer voor groepsevenementen. Mercedes Sprinter bussen beschikbaar in 16, 20, 23 en 28 zitplaatsen. Perfect voor bedrijfsuitjes, bruiloften, feesten en tours met professionele chauffeurs.",
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
    title: "Groepsevenementen & Luxe Busvervoer | Mercedes Sprinter",
    description:
      "Luxe busvervoer voor groepsevenementen. Mercedes Sprinter bussen in 16, 20, 23 en 28 zitplaatsen. Perfect voor bedrijfsuitjes, bruiloften en speciale evenementen met ervaren chauffeurs.",
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