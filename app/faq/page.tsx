import FaqContent from "./faq-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Veelgestelde Vragen Luxe Vervoer NL & Europa | Holland VIP Transfers",
  description:
    "Ontdek veelgestelde vragen over reizen in Amsterdam, Nederland, en vind handige tips voor luchthavenvervoer, tours en zakelijke reizen.",
  openGraph: {
    title: "Veelgestelde Vragen Luxe Vervoer NL & Europa | Holland VIP Transfers",
    description:
      "Ontdek veelgestelde vragen over reizen in Amsterdam, Nederland, en vind handige tips voor luchthavenvervoer, tours en zakelijke reizen.",
    type: "website",
    url: "https://hollandviptransfers.com/faq",
    siteName: "Holland VIP Transfers",
    images: ["/images/logo.png"],
  },
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What vehicles do you have?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer mid-range vehicles such as the Mercedes E-Class, luxury limousines including S-Class and V-Class, and group transport Sprinter vans for 8 to 28 passengers."
        }
      },
      {
        "@type": "Question",
        "name": "Can we book multiple vehicles at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, multiple vehicles can be booked at once. For weddings or large events, we handle full coordination and scheduling."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in the prices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prices include bottled water, mints, phone chargers, and Wi-Fi. Airport arrivals include up to 60 minutes of waiting time after landing, while other services include 15 minutes. Additional waiting time is charged at €60 per hour. Special requests such as child seats are available upon request."
        }
      },
      {
        "@type": "Question",
        "name": "Are you operational 24/7?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all chauffeur and transfer services operate 24 hours a day, 7 days a week."
        }
      },
      {
        "@type": "Question",
        "name": "Can we hire you for a tour or day trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer customized private tours with a chauffeur. Popular destinations include Keukenhof, Giethoorn, Zaanse Schans, Antwerp, Bruges, Brussels, and Paris."
        }
      },
      {
        "@type": "Question",
        "name": "Can I book last minute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, last-minute bookings are possible subject to availability. For urgent requests, we recommend calling directly."
        }
      },
      {
        "@type": "Question",
        "name": "Until when can I cancel free of charge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancellations are free up to 24 hours before the reservation. Cancellations made after this period are charged 100 percent."
        }
      },
      {
        "@type": "Question",
        "name": "What are the payment options?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Payment options include secure payment links, credit cards, debit cards, and invoicing for business travelers."
        }
      },
      {
        "@type": "Question",
        "name": "What is a Chauffeur Service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A chauffeur service provides luxury vehicles with professional drivers, focusing on comfort, safety, punctuality, and seamless door-to-door travel."
        }
      },
      {
        "@type": "Question",
        "name": "Why choose a private chauffeur in Amsterdam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A private chauffeur allows stress-free travel in Amsterdam with fixed pricing, local expertise, full privacy, and professional service."
        }
      },
      {
        "@type": "Question",
        "name": "What is a chauffeur service in Rotterdam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It provides premium and reliable transportation in Rotterdam for business travel, port visits, and events using luxury vehicles and experienced drivers."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a Schiphol Airport transfer service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Booking is easy online. Enter your travel details, choose a vehicle, and your chauffeur will track your flight for timely pickup."
        }
      },
      {
        "@type": "Question",
        "name": "Are Amsterdam Airport taxi fares fixed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all prices are confirmed in advance with no hidden fees, traffic surcharges, or unexpected costs."
        }
      },
      {
        "@type": "Question",
        "name": "Is a business cab suitable for executives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, business cabs are ideal for executives, offering quiet, comfort, punctuality, and professional chauffeurs."
        }
      },
      {
        "@type": "Question",
        "name": "Are wedding cars decorated for events?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, wedding vehicles can be elegantly decorated upon request while maintaining a luxurious appearance."
        }
      },
      {
        "@type": "Question",
        "name": "Do city tours include a private driver?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all city tours include a private chauffeur who manages routes, timing, and parking for a relaxed sightseeing experience."
        }
      },
      {
        "@type": "Question",
        "name": "Are Amsterdam city tours private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Amsterdam city tours are fully private, offering flexibility, comfort, and personalized itineraries."
        }
      },
      {
        "@type": "Question",
        "name": "Are luxury cars available for rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, luxury vehicles are available with a chauffeur for business travel, airport transfers, and special occasions."
        }
      },
      {
        "@type": "Question",
        "name": "Can I choose a specific vehicle from the fleet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can select the vehicle that best suits your comfort, group size, and travel requirements."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Holland VIP Transfers different?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on reliability, comfort, personal service, experienced chauffeurs, fixed pricing, and well-planned journeys."
        }
      },
      {
        "@type": "Question",
        "name": "Which cars and vans are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our fleet includes Mercedes E-Class, S-Class, V-Class, and Sprinter vans suitable for luxury, group, and airport travel."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book a ride with Holland VIP Transfers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book online via the website booking form or contact us by phone at +31 20 308 60 43 or email info@hollandviptransfer.com."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I make a booking?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Advance booking is recommended, but same-day and last-minute bookings are possible depending on availability."
        }
      },
      {
        "@type": "Question",
        "name": "Can I change or cancel my booking after confirmation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, bookings can be changed or canceled with prior notice. Please contact support as early as possible."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact customer support for booking help?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Customer support is available by phone at +31 20 308 60 43 or email at info@hollandviptransfer.com."
        }
      },
      {
        "@type": "Question",
        "name": "What services does Holland VIP Transfers offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Services include corporate transport, airport transfers, sightseeing tours, group travel, and event transportation across the Netherlands."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer airport transfers in Amsterdam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide reliable airport transfers to and from Amsterdam with professional drivers and luxury vehicles."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer hourly chauffeur services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hourly chauffeur services are available for business travel, city rides, tours, and special occasions."
        }
      },
      {
        "@type": "Question",
        "name": "Are your drivers professional and licensed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All chauffeurs are fully licensed, experienced, and professionally trained to ensure safe and comfortable journeys."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqContent />
    </>
  )
}