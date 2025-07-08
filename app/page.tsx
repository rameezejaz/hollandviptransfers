import HomeContent from "./home-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxe Vervoer Holland & Europa | Groepsvervoer, Sightseeing & Zakelijk",
  description:
    "Luxe vervoer in Amsterdam, Nederland & Europa. Boek een Mercedes V-Klasse, Sprinter of minicoach voor sightseeing, grote groepen, luchthaven en zakelijk vervoer. Ervaar topklasse chauffeursservice.",
  keywords: [
    "luxe vervoer Holland",
    "luxe vervoer Amsterdam",
    "luxe vervoer Holland",
    "chauffeursdienst amsterdam",
    "luchthaven transfer amsterdam",
    "zakelijk vervoer europa",
    "groepsvervoer Holland",
    "groepsvervoer amsterdam",
    "grote groepen vervoer europa",
    "mercedes sprinter huren",
    "mercedes v-klasse",
    "sightseeing tours europa",
    "touren europa",
    "minicoach amsterdam",
    "executive vervoer",
    "vip vervoer nederland",
    "touringcar huren",
    "business transport europa",
    "meerdaagse tours europa",
    "airport service amsterdam",
    "coaching vervoer nederland",
    "Touringcar boeken"
  ],
  openGraph: {
    title: "Luxe Vervoer Holland & Europa | Groepsvervoer, Sightseeing & Zakelijk",
    description:
      "Boek luxe vervoer in Holland & Europa met Mercedes V-Klasse, Sprinter of minicoach. Voor sightseeing, groepsvervoer, zakelijke ritten en luchthaven transfers.",
    type: "website",
    url: "https://hollandviptransfers.com",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],

  },
}

export default function HomePage() {
  return <HomeContent />
}
