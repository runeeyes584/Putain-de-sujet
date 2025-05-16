"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Search, MessageSquare, LogOut, User, Shield, Heart, ShoppingCart, Bell, Palette, BarChart, PenTool, Video, Music, Code, Briefcase, Smile, ChevronLeft, ChevronRight, Database, Camera, Menu, ChevronDown } from "lucide-react"
import { UserNav } from "@/components/user-nav"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { useRole } from "@/contexts/role-context"
import { Badge } from "@/components/ui/badge"
import { LanguageCurrencySwitcher } from "@/components/language-currency-switcher"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const { role, clearRole } = useRole()
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const categoriesRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const checkScrollButtons = () => {
    if (!categoriesRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current
    setShowLeftButton(scrollLeft > 0)
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1)
  }

  useEffect(() => {
    const container = categoriesRef.current
    if (!container) return

    // Kiểm tra ban đầu
    checkScrollButtons()

    // Theo dõi sự kiện scroll
    container.addEventListener('scroll', checkScrollButtons)

    // Theo dõi thay đổi kích thước
    const resizeObserver = new ResizeObserver(checkScrollButtons)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', checkScrollButtons)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollLeft = () => {
    if (!categoriesRef.current) return
    categoriesRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (!categoriesRef.current) return
    categoriesRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }

  const handleSignIn = () => {
    setIsAuthModalOpen(true)
  }

  const handleSignUp = () => {
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    clearRole()
  }

  // Don't show navbar on role selection page
  if (pathname === "/select-role") {
    return null
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} />
              <span className="hidden font-bold sm:inline-block">Fiverr Clone</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <form onSubmit={handleSearch} className="relative flex-1 max-w-full md:max-w-[400px] mx-4 md:mx-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 text-base rounded-full bg-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </form>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <LanguageCurrencySwitcher />
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/saved">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              {role ? (
                <div className="relative group/account">
                  <button className="flex items-center gap-2 rounded-full border p-2 hover:bg-gray-50 group-hover/account:bg-gray-50 relative after:absolute after:left-0 after:right-0 after:top-full after:h-4 after:content-[''] after:z-0">
                    <User className="h-5 w-5" />
                    <span className="hidden md:inline">Tài khoản</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 hidden w-48 rounded-lg border bg-white py-2 shadow-lg group-hover/account:block z-20">
                    <Link
                      href="/dashboard/user"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/user/settings"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Cài đặt
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={handleSignIn}>
                    Đăng nhập
                  </Button>
                  <Button onClick={handleSignUp}>Đăng ký</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subnavbar - Categories */}
        <div className="border-t bg-white">
          <div className="container relative">
            {showLeftButton && (
              <button 
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-r-lg shadow-md z-10 hidden md:flex items-center justify-center transition-opacity duration-200"
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="overflow-hidden">
              <nav 
                ref={categoriesRef}
                className="flex items-center space-x-4 overflow-x-auto py-2 whitespace-nowrap touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <Link
                  href="/search?category=graphics-design"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Palette className="h-4 w-4" />
                  <span>Graphics & Design</span>
                </Link>
                <Link
                  href="/search?category=digital-marketing"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <BarChart className="h-4 w-4" />
                  <span>Digital Marketing</span>
                </Link>
                <Link
                  href="/search?category=writing-translation"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <PenTool className="h-4 w-4" />
                  <span>Writing & Translation</span>
                </Link>
                <Link
                  href="/search?category=video-animation"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Video className="h-4 w-4" />
                  <span>Video & Animation</span>
                </Link>
                <Link
                  href="/search?category=music-audio"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Music className="h-4 w-4" />
                  <span>Music & Audio</span>
                </Link>
                <Link
                  href="/search?category=programming-tech"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Code className="h-4 w-4" />
                  <span>Programming & Tech</span>
                </Link>
                <Link
                  href="/search?category=business"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business</span>
                </Link>
                <Link
                  href="/search?category=lifestyle"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Smile className="h-4 w-4" />
                  <span>Lifestyle</span>
                </Link>
                <Link
                  href="/search?category=data"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Database className="h-4 w-4" />
                  <span>Data</span>
                </Link>
                <Link
                  href="/search?category=photography"
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors whitespace-nowrap"
                >
                  <Camera className="h-4 w-4" />
                  <span>Photography</span>
                </Link>
              </nav>
            </div>
            {showRightButton && (
              <button 
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-l-lg shadow-md z-10 hidden md:flex items-center justify-center transition-opacity duration-200"
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
