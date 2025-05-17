"use client"

import type React from "react"

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { BarChart, Bell, Briefcase, Camera, ChevronLeft, ChevronRight, Code, Database, Heart, LayoutDashboard, MessageSquare, Music, Palette, PenTool, Search, ShoppingCart, Smile, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { AuthModal } from "@/components/auth-modal"
import { LanguageCurrencySwitcher } from "@/components/language-currency-switcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRole } from "@/contexts/role-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const { role, clearRole } = useRole()
  const { isSignedIn, isLoaded, user } = useUser();
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const categoriesRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openNotify, setOpenNotify] = useState(false);
  const [openMsg, setOpenMsg] = useState(false);
  const notifications: { title: string; time: string }[] = [] // Thay bằng dữ liệu thực tế nếu có
  const messages: { title: string; time: string }[] = [] // Thay bằng dữ liệu thực tế nếu có

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

  const getDashboardLink = () => {
    if (!user) return null
    const publicMetadata = user.publicMetadata || {}
    if (publicMetadata.isAdmin) return "/admin"
    if (publicMetadata.isSeller) return "/dashboard/user"
    if (publicMetadata.isBuyer) return "/dashboard/buyer"
    return "/dashboard"
  }

  const getDashboardTooltip = () => {
    return "Dashboard"
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
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="hidden font-bold sm:inline-block">JopNOVA</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center gap-4">
            <form onSubmit={handleSearch} className="relative flex-1 mx-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-base rounded-full bg-background placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-emerald-500"
              />
            </form>
            <div className="flex items-center gap-2 shrink-0">
              {!isLoaded ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : isSignedIn ? (
                <>
                  <LanguageCurrencySwitcher />
                  {user && getDashboardLink() && (
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={getDashboardLink()!}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="hidden md:flex hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 ring-0 outline-none"
                            >
                              <LayoutDashboard className="h-5 w-5" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getDashboardTooltip()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {/* Notify Dropdown on hover - fix hover gap */}
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setOpenNotify(true)}
                    onMouseLeave={() => setOpenNotify(false)}
                  >
                    <DropdownMenu open={openNotify}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          tabIndex={-1}
                          variant="ghost"
                          size="icon"
                          className="hidden md:flex hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 outline-none ring-0 !outline-none !ring-0"
                          style={{ outline: "none", boxShadow: "none" }}
                        >
                          <Bell className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      {openNotify && (
                        <div className="absolute top-full right-0 z-50 w-80 min-h-[400px] max-h-[700px] bg-white shadow-lg rounded-b-lg overflow-y-auto">
                          <div className="font-semibold px-4 py-2 border-b">Notifications</div>
                          {notifications.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">No notifications</div>
                          ) : (
                            notifications.map((item, idx) => (
                              <div key={idx} className="whitespace-normal py-3 px-4 hover:bg-gray-100 cursor-pointer">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-xs text-gray-500">{item.time}</div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </DropdownMenu>
                  </div>

                  {/* Message Dropdown on hover - fix hover gap */}
                  <div
                    className="relative flex items-center"
                    onMouseEnter={() => setOpenMsg(true)}
                    onMouseLeave={() => setOpenMsg(false)}
                  >
                    <DropdownMenu open={openMsg}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          tabIndex={-1}
                          variant="ghost"
                          size="icon"
                          className="hidden md:flex hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 outline-none ring-0 !outline-none !ring-0"
                          style={{ outline: "none", boxShadow: "none" }}
                        >
                          <MessageSquare className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      {openMsg && (
                        <div className="absolute top-full right-0 z-50 w-80 min-h-[400px] max-h-[700px] bg-white shadow-lg rounded-b-lg overflow-y-auto">
                          <div className="font-semibold px-4 py-2 border-b">Messages</div>
                          {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">No messages</div>
                          ) : (
                            messages.map((item, idx) => (
                              <div key={idx} className="whitespace-normal py-3 px-4 hover:bg-gray-100 cursor-pointer">
                                <div className="font-medium">{item.title}</div>
                                <div className="text-xs text-gray-500">{item.time}</div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </DropdownMenu>
                  </div>

                  {/* Saved Tooltip */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/saved">
                          <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 ring-0 outline-none">
                            <Heart className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Favorites Jobs</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Cart Tooltip */}
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/orders">
                          <Button variant="ghost" size="icon" className="hidden md:flex hover:bg-emerald-50 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 ring-0 outline-none">
                            <ShoppingCart className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Đăng nhập</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Đăng ký</Button>
                  </SignUpButton>
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
