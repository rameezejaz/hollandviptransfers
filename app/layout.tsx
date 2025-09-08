// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { LanguageProvider } from "@/contexts/language-context"
import GoogleMapsProvider from "@/components/GoogleMapsProvider"
import "./globals.css"

// GTM
import Script from "next/script"
import GtmPageView from "@/components/GtmPageView"

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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html lang="nl" className="scroll-smooth">
      <head>
        {/* Google Tag Manager – main script */}
        {process.env.NODE_ENV === "production" && gtmId && (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
      </head>

      <body
        className={cn(
          "min-h-screen bg-gray-900 font-sans antialiased text-gray-200",
          poppins.variable,
          playfair.variable,
        )}
      >
        {/* Google Tag Manager (noscript) – must be right after <body> */}
        {process.env.NODE_ENV === "production" && gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        {/* SPA pageview events for GTM on route changes */}
        {process.env.NODE_ENV === "production" && gtmId && <GtmPageView />}

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
