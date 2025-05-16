"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function MarketingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const slides = [
    {
      id: 1,
      title: "Find the perfect freelance services for your business",
      description: "Access top talent and get high-quality work delivered on time",
      image: "/placeholder.svg?height=500&width=1920",
      cta: {
        text: "Explore Services",
        link: "/search",
      },
      theme: "from-blue-800 to-blue-600",
    },
    {
      id: 2,
      title: "Join our community of professional freelancers",
      description: "Start selling your services and reach clients worldwide",
      image: "/placeholder.svg?height=500&width=1920",
      cta: {
        text: "Become a Seller",
        link: "/become-seller",
      },
      theme: "from-purple-800 to-purple-600",
    },
    {
      id: 3,
      title: "Need a logo? Find top designers here",
      description: "Professional logo design services starting at just $25",
      image: "/placeholder.svg?height=500&width=1920",
      cta: {
        text: "Browse Logo Designers",
        link: "/search?category=logo-design",
      },
      theme: "from-emerald-800 to-emerald-600",
    },
    {
      id: 4,
      title: "Website development made easy",
      description: "Get your business online with our expert web developers",
      image: "/placeholder.svg?height=500&width=1920",
      cta: {
        text: "Find Web Developers",
        link: "/search?category=web-development",
      },
      theme: "from-amber-800 to-amber-600",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentSlide, autoplay])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <div
      className="relative h-[500px] w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.theme}`}>
            <div className="absolute inset-0 opacity-20">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>
          <div className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{slide.title}</h1>
            <p className="mb-8 text-lg md:text-xl">{slide.description}</p>
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link href={slide.cta.link}>{slide.cta.text}</Link>
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
