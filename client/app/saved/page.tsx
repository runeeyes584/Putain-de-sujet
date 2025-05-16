"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"

interface SavedGig {
  id: string
  title: string
  seller: {
    name: string
    avatar: string
    level: string
  }
  price: number
  rating: number
  reviewCount: number
  image: string
  category?: string
  deliveryTime?: number
  badges?: string[]
}

export default function SavedGigsPage() {
  const [savedGigs, setSavedGigs] = useState<SavedGig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Load saved gig IDs from localStorage
      const savedGigIds = JSON.parse(localStorage.getItem('savedGigs') || '[]')
      
      // Mock data - in a real app, this would be fetched from an API
      const mockGigs: SavedGig[] = [
        {
          id: "gig1",
          title: "I will design a professional logo for your business",
          seller: {
            name: "logomaster",
            avatar: "/placeholder.svg",
            level: "Level 2"
          },
          price: 50,
          rating: 4.9,
          reviewCount: 243,
          image: "/placeholder.svg?height=200&width=300",
          category: "Graphics & Design",
          deliveryTime: 3,
          badges: ["top_rated"]
        },
        {
          id: "gig2",
          title: "I will create a stunning website design",
          seller: {
            name: "webwizard",
            avatar: "/placeholder.svg",
            level: "Level 1"
          },
          price: 120,
          rating: 4.8,
          reviewCount: 187,
          image: "/placeholder.svg?height=200&width=300",
          category: "Programming & Tech",
          deliveryTime: 5,
          badges: ["pro"]
        },
        {
          id: "gig3",
          title: "I will write SEO-optimized content for your blog",
          seller: {
            name: "contentcreator",
            avatar: "/placeholder.svg",
            level: "Level 2"
          },
          price: 35,
          rating: 4.7,
          reviewCount: 156,
          image: "/placeholder.svg?height=200&width=300",
          category: "Writing & Translation",
          deliveryTime: 2,
          badges: ["new"]
        },
      ]

      // Filter mock gigs to only show saved ones
      const filteredGigs = mockGigs.filter(gig => savedGigIds.includes(gig.id))
      setSavedGigs(filteredGigs)
    } catch (err) {
      setError('Failed to load saved gigs')
      console.error('Error loading saved gigs:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Saved Gigs</h1>
        </div>
        <div className="text-center py-8">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Saved Gigs</h1>
        </div>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Saved Gigs</h1>
      </div>

      {savedGigs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedGigs.map((gig) => (
            <ServiceCard
              key={gig.id}
              service={gig}
              showCategory
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't saved any gigs yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/">Browse Gigs</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
