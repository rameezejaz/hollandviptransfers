import HomeContent from "./home-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Luxe Vervoer NL & Europa | Groepsvervoer, Sightseeing & Zakelijk",
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
    title: "Luxe Vervoer NL & Europa | Groepsvervoer, Sightseeing & Zakelijk",
    description:
      "Boek luxe vervoer in Holland & Europa met Mercedes V-Klasse, Sprinter of minicoach. Voor sightseeing, groepsvervoer, zakelijke ritten en luchthaven transfers.",
    type: "website",
    url: "https://hollandviptransfers.com",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function HomePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hollandviptransfers.com/#localbusiness",
    "name": "Holland VIP Transfers",
    "url": "https://hollandviptransfers.com/",
    "logo": "https://hollandviptransfers.com/images/logo2.png",
    "image": "https://hollandviptransfers.com/images/logo2.png",
    "email": "info@hollandviptransfer.com",
    "telephone": "+31 20 308 60 43",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Amsterdam",
      "addressLocality": "Amsterdam",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates"
    },
    "sameAs": [
      "https://hollandviptransfers.com/"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$$",
    "areaServed": {
      "@type": "Country",
      "name": "Netherlands"
    },
    "hasMap": "https://share.google/sjWPiU3cBGjlaELs0",
    "description": "Holland VIP Transfers offers luxury chauffeur services, airport transfers, corporate transportation, private tours, and VIP travel solutions across Amsterdam and the Netherlands with professional drivers and premium vehicles."
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HomeContent />
    </>
  )
}