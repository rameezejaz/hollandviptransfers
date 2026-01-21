"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)
// Instagram icon component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z"/>
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
    <path d="M17.25 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
  </svg>

)

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
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: t("home.footer.subtitle") }}></p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.tiktok.com/@hollandviptransfers?_r=1&_t=ZN-926ra3HHfqo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/hollandviptransfers?igsh=MTdwZDk0d3A0OXB5MQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
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
              <li>
                <Link href="/diensten/group-events" className="hover:text-orange-400 transition-colors">
                  {t("nav.services.group-events")}
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