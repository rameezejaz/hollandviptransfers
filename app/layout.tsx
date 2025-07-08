import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { LanguageProvider } from "@/contexts/language-context"
import GoogleMapsProvider from "@/components/GoogleMapsProvider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Holland VIP Transfers - Luxe Vervoer Holland & Europa",
  description:
    "Holland VIP Transfers biedt luxe vervoer in Amsterdam, Nederland en Europa. Geniet van een eersteklas chauffeursdienst voor luchthaven transfers, zakelijk vervoer en sightseeing met onze Mercedes V-Klasse, Sprinter of minicoach.",
  openGraph: {
    title: "Holland VIP Transfers - Luxe Vervoer Holland & Europa",
    description:
      "Ervaar luxe vervoer en professionele chauffeursdienst in Amsterdam, Nederland en Europa met Holland VIP Transfers.",
    url: "https://hollandviptransfers.com",
    siteName: "Holland VIP Transfers",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-gray-900 font-sans antialiased text-gray-200",
          poppins.variable,
          playfair.variable,
        )}
      >
        <LanguageProvider>
          <GoogleMapsProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </GoogleMapsProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
