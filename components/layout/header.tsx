"use client"

import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

const whatsappSvgPath =
  "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-" +
  "5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 " +
  "6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 " +
  "8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-" +
  "3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676" +
  ".995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 " +
  "9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-" +
  "9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 " +
  "5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124" +
  "-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-" +
  ".272-.099-.47-.149-.669.149-.198.297-.768.967-.941 " +
  "1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-" +
  "2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-" +
  ".297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-" +
  ".172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-" +
  ".148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-" +
  ".51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-" +
  "1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 " +
  "5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36." +
  "194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695" +
  ".248-1.29.173-1.414z"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const hasBg = isScrolled || isOpen

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navLinks = [
    { href: "/", label: t("nav.home") },
    {
      label: t("nav.services"),
      isDropdown: true,
      items: [
        {
          href: "/diensten/luchthaven-transfers",
          label: t("nav.services.airport"),
        },
        {
          href: "/diensten/zakelijk-vervoer",
          label: t("nav.services.corporate"),
        },
        {
          href: "/diensten/sightseeing",
          label: t("nav.services.sightseeing"),
        },
        { href: "/diensten/touren", label: t("nav.services.touring") },
      ],
    },
    { href: "/voertuigen", label: t("nav.fleet") },
    { href: "/over-ons", label: t("nav.about") },
    { href: "/faq", label: t("nav.faq") },
  ]

  const whatsappUrl = `https://wa.me/31203086043?text=${encodeURIComponent(
    language === "nl" ? "Beste Holland VIP Transfers," : "Dear Holland VIP Transfers,",
  )}`

  const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("bg-transparent border-orange-500/50", "hover:bg-orange-500/10")}>
          {language.toUpperCase()}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "bg-gray-800 border-gray-700 text-white min-w-[80px]",
          mobile && "z-[150]", // Higher z-index for mobile menu
        )}
      >
        <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("nl")}>NL</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <>
      <header
        className={cn(
          "sticky top-0 w-full transition-all duration-300 z-50",
          hasBg ? "bg-gray-900 backdrop-blur-lg shadow-lg" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className={cn("flex items-center justify-between transition-all duration-300", hasBg ? "h-16" : "h-24")}>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo2.png"
                alt="Holland VIP Transfers"
                width={isScrolled ? 115 : 150}
                height={isScrolled ? 60 : 100}
                className="transition-all duration-300"
              />
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) =>
                link.isDropdown ? (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger
                      className={cn("flex items-center", "text-gray-300 hover:text-orange-400", "transition-colors")}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                      {link.items?.map((item) => (
                        <DropdownMenuItem
                          key={item.label}
                          asChild
                          className="
                          cursor-pointer
                          hover:bg-orange-500/10 focus:bg-orange-500/10
                          hover:text-orange-400 focus:text-orange-400
                          transition-colors duration-200"
                          >
                          <Link href={item.href}>{item.label}</Link>
                        </DropdownMenuItem>

                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn("text-gray-300 hover:text-orange-400", "transition-colors")}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-bold">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={whatsappSvgPath} />
                  </svg>
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                className={cn(
                  "bg-gradient-to-r from-orange-500 to-yellow-500",
                  "text-white font-bold",
                  "hover:from-orange-600 hover:to-yellow-600",
                )}
              >
                <Link href="/boeken">{t("nav.booking")}</Link>
              </Button>
            </div>

            <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-[100]",
          "bg-gray-900/95 backdrop-blur-lg",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "overflow-y-auto",
        )}
      >
        <div className="container mx-auto px-4 pt-20 flex flex-col min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <LanguageSwitcher mobile={true} />
            <button onClick={() => setIsOpen(false)}>
              <X className="w-8 h-8 text-orange-500" />
            </button>
          </div>

          {/* Mobile links */}
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((link) =>
              link.isDropdown ? (
                <div key={link.label}>
                  <p className="text-xl font-semibold mb-2">{link.label}</p>
                  <div className="flex flex-col gap-3">
                    {link.items?.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn("text-gray-300 hover:text-orange-400", "transition-colors")}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn("text-xl font-semibold text-white", "hover:text-orange-400 transition-colors")}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Mobile CTAs */}
          <div className="mt-auto pt-8 pb-4 flex flex-col items-center gap-6">
            <Button
              asChild
              className={cn("w-full bg-green-600 hover:bg-green-700", "text-white font-bold py-6 text-lg")}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={whatsappSvgPath} />
                </svg>
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              className={cn(
                "w-full bg-gradient-to-r from-orange-500 to-yellow-500",
                "text-white font-bold py-6 text-lg",
                "hover:from-orange-600 hover:to-yellow-600",
              )}
            >
              <Link href="/boeken" onClick={() => setIsOpen(false)}>
                {t("nav.booking")}
              </Link>
            </Button>
            <div className="flex flex-col items-center gap-2 text-sm text-gray-400 mt-4">
              <a href="tel:+31203086043" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                +31 20 308 60 43
              </a>
              <a href="mailto:info@hollandviptransfer.com" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                info@hollandviptransfer.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
