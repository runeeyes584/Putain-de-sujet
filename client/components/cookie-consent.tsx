"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookie-consent")

    if (!hasAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const dismissBanner = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:flex md:items-center md:justify-between">
      <div className="mb-4 pr-8 md:mb-0">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          We use cookies to improve your experience on our site. By continuing to use our site, you consent to our use
          of cookies.
        </p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" size="sm" asChild className="text-sm">
          <a href="/privacy-policy">Learn More</a>
        </Button>
        <Button size="sm" onClick={acceptCookies} className="bg-emerald-500 text-sm hover:bg-emerald-600">
          Accept
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={dismissBanner}
          className="ml-2 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  )
}
