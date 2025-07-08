"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/favicon.ico" alt="Holland VIP Transfers Logo" width={150} height={100} />
            </Link>
            <p className="text-sm">{t("home.hero.subtitle")}</p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">{t("nav.services")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/diensten/luchthaven-transfers" className="hover:text-orange-400 transition-colors">
                  {t("nav.services.airport")}
                </Link>
              </li>
              <li>
                <Link href="/diensten/zakelijk-vervoer" className="hover:text-orange-400 transition-colors">
                  {t("nav.services.corporate")}
                </Link>
              </li>
              <li>
                <Link href="/diensten/sightseeing" className="hover:text-orange-400 transition-colors">
                  {t("nav.services.sightseeing")}
                </Link>
              </li>
              <li>
                <Link href="/diensten/touren" className="hover:text-orange-400 transition-colors">
                  {t("nav.services.touring")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/voertuigen" className="hover:text-orange-400 transition-colors">
                  {t("nav.fleet")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-orange-400 transition-colors">
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link href="/boeken" className="hover:text-orange-400 transition-colors">
                  {t("nav.booking")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+31203086043" className="hover:text-orange-400 transition-colors">
                  +31 20 308 60 43
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:info@hollandviptransfer.com" className="hover:text-orange-400 transition-colors">
                  info@hollandviptransfer.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                <span>Amsterdam, {t("Netherlands")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
