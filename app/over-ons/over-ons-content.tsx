"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFadeIn } from "@/hooks/use-fade-in"
import Image from "next/image"
import Link from "next/link"

export function OverOnsContent() {
  const { language } = useLanguage()
  const fadeIn = useFadeIn()

  const content = {
    en: {
      title: "About Holland VIP Transfers",
      description:
        "<a href='https://hollandviptransfers.com/' style='text-decoration: underline;'>Holland VIP Transfers</a> is the best luxury transportation company in Amsterdam, with 20 years of reliable experience. We guarantee comfort, privacy, and being on time for every trip with our professional private chauffeur services. We offer seamless <a href='https://hollandviptransfers.com/diensten/zakelijk-vervoer' style='text-decoration: underline;'>Airport Car Service</a> and car service to and from Amsterdam Airport, so you can relax when you arrive or leave. Our Amsterdam Countryside Tour is perfect for travelers who like elegance and local charm. It will show you the beautiful countryside. Our <a href='https://hollandviptransfers.com/diensten/luchthaven-transfers' style='text-decoration: underline;'>Luxury Airport Service</a> offers stylish, on-time transfers for those who want the most convenience. We also have international options, like Car Rental Milan Linate Airport, that give you more freedom and better travel experiences no matter where your trip takes you.",
      stats: {
        title: "Our Numbers",
        items: [
          { number: "20", label: "Years Experience" },
          { number: "1000+", label: "Happy Customers" },
          { number: "24/7", label: "Available Service" },
          { number: "100%", label: "Professional" },
        ],
      },
      why: {
        title: "Why Choose Us?",
        reasons: [
          "Professional and experienced chauffeurs",
          "Modern luxury vehicles with all amenities",
          "Always on time, 24/7 availability",
          "Competitive prices with transparent pricing",
          "Personal service tailored to your needs",
        ],
      },
      cta: "Book Your Ride",
    },
    nl: {
      title: "Over Holland VIP Transfers",
      description:
        "<a href='https://hollandviptransfers.com/' style='text-decoration: underline;'>Holland VIP Transfers</a> is het beste luxe vervoersbedrijf in Amsterdam, met 20 jaar betrouwbare ervaring. Wij garanderen comfort, privacy en stiptheid voor elke rit met onze professionele private chauffeur-diensten. Wij bieden naadloze <a href='https://hollandviptransfers.com/diensten/zakelijk-vervoer' style='text-decoration: underline;'>Airport Car Service</a> en car service van en naar Amsterdam Airport, zodat u volledig kunt ontspannen bij aankomst of vertrek. Onze Amsterdam Countryside Tour is perfect voor reizigers die houden van elegantie en lokale charme en laat u het prachtige platteland zien. Onze <a href='https://hollandviptransfers.com/diensten/luchthaven-transfers' style='text-decoration: underline;'>Luxury Airport Service</a> biedt stijlvolle, tijdige transfers voor wie het maximale gemak wil. We hebben ook internationale opties, zoals Car Rental Milan Linate Airport, voor meer vrijheid en betere reiservaringen, waar uw reis u ook brengt.",
      stats: {
        title: "Onze Cijfers",
        items: [
          { number: "20", label: "Jaar Ervaring" },
          { number: "1000+", label: "Tevreden Klanten" },
          { number: "24/7", label: "Service Beschikbaar" },
          { number: "100%", label: "Professioneel" },
        ],
      },
      why: {
        title: "Waarom Kiezen Voor Ons?",
        reasons: [
          "Professionele en ervaren chauffeurs",
          "Moderne luxe voertuigen met alle voorzieningen",
          "Altijd op tijd, 24/7 beschikbaarheid",
          "Scherpe prijzen met transparante tarieven",
          "Persoonlijke service op maat",
        ],
      },
      cta: "Boek Uw Rit",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16" {...fadeIn}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>

          {/* Main Content - Photo Right, Text Left */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div {...fadeIn}>
              <p className="text-lg text-gray-300 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.description }}></p>
            </div>
            <div {...fadeIn}>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/filler/about-us.jpeg"
                  alt="Holland VIP Transfers Mercedes S-Class"
                  fill
                  className="object-cover object-[10%_75%]"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div {...fadeIn}>
            <h2 className="text-3xl font-bold text-center mb-12 text-white">{t.stats.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.stats.items.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">{stat.number}</div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div {...fadeIn}>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">{t.why.title}</h2>
                <ul className="space-y-4 max-w-2xl mx-auto">
                  {t.why.reasons.map((reason, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-lg">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mr-4 flex-shrink-0"></div>
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto" {...fadeIn}>
          <Link href="/boeken">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold hover:from-orange-600 hover:to-yellow-600 px-8 py-4 text-lg"
            >
              {t.cta}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
