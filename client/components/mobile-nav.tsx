"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home, Search, MessageSquare, User, Package, Heart, Settings, HelpCircle, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // For demo purposes

  // Close the mobile menu when the screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-[80%] flex-col p-0">
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image src="/placeholder.svg?height=32&width=100" alt="Freelance Logo" width={100} height={32} />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="flex flex-col gap-1 px-2">
              {/* Main Navigation */}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Search className="h-5 w-5" />
                Explore
              </Link>

              {isLoggedIn ? (
                <>
                  <Separator className="my-2" />
                  <div className="px-3 py-1 text-xs font-semibold uppercase text-gray-500">Account</div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="h-5 w-5" />
                    My Orders
                  </Link>
                  <Link
                    href="/messages"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Messages
                    </div>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1 text-xs font-medium text-emerald-700">
                      3
                    </span>
                  </Link>
                  <Link
                    href="/saved"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    Saved
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>

                  <Separator className="my-2" />
                  <div className="px-3 py-1 text-xs font-semibold uppercase text-gray-500">Seller</div>
                  <Link
                    href="/seller-dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="h-5 w-5" />
                    Seller Dashboard
                  </Link>
                  <Link
                    href="/create-gig"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="ml-7">Create a New Gig</span>
                  </Link>
                </>
              ) : (
                <>
                  <Separator className="my-2" />
                  <div className="flex flex-col gap-2 px-3">
                    <Button
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/register">Join</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>

          <div className="border-t p-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </Link>
              {isLoggedIn && (
                <button
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsOpen(false)
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
