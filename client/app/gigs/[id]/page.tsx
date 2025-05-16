"use client"

import { useState, useRef, useEffect } from "react"
import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Star,
  Clock,
  Check,
  Heart,
  Share2,
  Flag,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  X,
  MessageCircle,
  ThumbsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { UserBadge } from "@/components/user-badge"
import { ReportModal } from "@/components/report-modal"
import { ReviewForm } from "@/components/review-form"
import { PriceDisplay } from "@/components/price-display"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { useSavedGigs } from "@/hooks/use-saved-gigs"

interface PageParams {
  id: string
}

export default function GigDetailPage({ params }: { params: Promise<PageParams> }) {
  const resolvedParams = use(params)
  const gig = sampleGig
  const router = useRouter()
  const { isSaved, isLoading, error, toggleSave } = useSavedGigs(resolvedParams.id)

  // State for image gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // State for reviews
  const [reviewSort, setReviewSort] = useState("recent")
  const [reviewsToShow, setReviewsToShow] = useState(3)
  const [filteredReviews, setFilteredReviews] = useState(gig.reviews)

  // State for FAQ
  const [expandedFAQs, setExpandedFAQs] = useState<number[]>([])

  // State for package selection
  const [selectedPackage, setSelectedPackage] = useState("basic")

  // Refs for scrolling
  const reviewsRef = useRef<HTMLDivElement>(null)

  // Handle image navigation
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % gig.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + gig.images.length) % gig.images.length)
  }

  // Handle lightbox navigation
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % gig.images.length)
  }

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + gig.images.length) % gig.images.length)
  }

  // Handle save/favorite
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSave()
  }

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: gig.title,
          text: `Check out this gig: ${gig.title}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Handle FAQ toggle
  const toggleFAQ = (index: number) => {
    setExpandedFAQs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Handle review sorting
  useEffect(() => {
    let sorted = [...gig.reviews]

    switch (reviewSort) {
      case "recent":
        // Sort by date (most recent first)
        sorted = sorted.sort((a, b) => {
          const dateA = new Date(
            a.date.includes("week")
              ? Date.now() - Number.parseInt(a.date) * 7 * 24 * 60 * 60 * 1000
              : Date.now() - Number.parseInt(a.date) * 30 * 24 * 60 * 60 * 1000,
          )
          const dateB = new Date(
            b.date.includes("week")
              ? Date.now() - Number.parseInt(b.date) * 7 * 24 * 60 * 60 * 1000
              : Date.now() - Number.parseInt(b.date) * 30 * 24 * 60 * 60 * 1000,
          )
          return dateB.getTime() - dateA.getTime()
        })
        break
      case "highest":
        // Sort by rating (highest first)
        sorted = sorted.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        // Sort by rating (lowest first)
        sorted = sorted.sort((a, b) => a.rating - b.rating)
        break
    }

    setFilteredReviews(sorted)
  }, [reviewSort, gig.reviews])

  // Handle review submission
  const handleReviewSubmit = (data: { rating: number; comment: string }) => {
    // In a real app, you would call an API to submit the review
    alert(`Review submitted with rating ${data.rating} and comment: ${data.comment}`)
  }

  // Handle scroll to reviews
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle continue to checkout
  const handleContinue = () => {
    router.push(`/checkout?gig=${resolvedParams.id}&package=${selectedPackage}`)
  }

  // Handle contact seller
  const handleContactSeller = () => {
    router.push(`/messages/${gig.seller.username}`)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-emerald-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link href="/search" className="hover:text-emerald-600 transition-colors">
                    Graphics & Design
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <Link href="/search" className="hover:text-emerald-600 transition-colors">
                    Logo Design
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2">/</span>
                  <span className="max-w-[200px] truncate">{gig.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Gig Details */}
          <div className="lg:col-span-2">
            <h1 className="mb-6 text-2xl font-bold md:text-3xl">{gig.title}</h1>

            {/* Seller Brief */}
            <div className="mb-8 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200">
                <Image
                  src={gig.seller.avatar || "/placeholder.svg"}
                  alt={gig.seller.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <Link
                  href={`/users/${gig.seller.username}`}
                  className="font-medium hover:text-emerald-600 transition-colors"
                >
                  {gig.seller.name}
                </Link>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <UserBadge level={gig.seller.level} />
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{gig.rating}</span>
                    <button
                      onClick={scrollToReviews}
                      className="ml-1 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      ({gig.reviewCount})
                    </button>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-600">{gig.orderQueue} orders</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleContactSeller}
                className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                Contact Me
              </Button>
            </div>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={gig.images[selectedImageIndex]}
                  alt={gig.title}
                  fill
                  className="object-cover"
                  onClick={() => openLightbox(selectedImageIndex)}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {gig.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                      selectedImageIndex === index ? "border-emerald-500" : "border-transparent"
                    }`}
                  >
                    <Image src={image} alt={`${gig.title} - Image ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">About This Gig</h2>
              <div className="prose max-w-none">
                <p>{gig.description}</p>
              </div>
            </div>

            {/* About The Seller */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">About The Seller</h2>
              <div className="prose max-w-none">
                <p>{gig.seller.bio}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">FAQ</h2>
              <div className="space-y-4">
                {gig.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <span className="font-medium">{faq.question}</span>
                      {expandedFAQs.includes(index) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFAQs.includes(index) && (
                      <p className="mt-2 text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div ref={reviewsRef} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <Select value={reviewSort} onValueChange={setReviewSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                {filteredReviews.slice(0, reviewsToShow).map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="mb-2 flex items-center gap-4">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={review.user.avatar || "/placeholder.svg"}
                          alt={review.user.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{review.user.name}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="mx-2">•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>

              {reviewsToShow < filteredReviews.length && (
                <Button
                  variant="outline"
                  className="mt-6 w-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setReviewsToShow((prev) => prev + 3)}
                >
                  Show More Reviews
                </Button>
              )}

              <div className="mt-6">
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            </div>
          </div>

          {/* Right Column - Packages */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <Tabs value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="premium">Premium</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold">
                      <PriceDisplay priceUSD={gig.packages.basic.price} />
                    </h3>
                    <span className="text-sm text-gray-500">{gig.packages.basic.deliveryTime} days delivery</span>
                  </div>

                  <ul className="space-y-3">
                    {gig.packages.basic.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={handleContinue}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  >
                    Continue
                  </Button>
                </TabsContent>

                <TabsContent value="standard" className="space-y-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold">
                      <PriceDisplay priceUSD={gig.packages.standard.price} />
                    </h3>
                    <span className="text-sm text-gray-500">{gig.packages.standard.deliveryTime} days delivery</span>
                  </div>

                  <ul className="space-y-3">
                    {gig.packages.standard.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={handleContinue}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  >
                    Continue
                  </Button>
                </TabsContent>

                <TabsContent value="premium" className="space-y-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold">
                      <PriceDisplay priceUSD={gig.packages.premium.price} />
                    </h3>
                    <span className="text-sm text-gray-500">{gig.packages.premium.deliveryTime} days delivery</span>
                  </div>

                  <ul className="space-y-3">
                    {gig.packages.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={handleContinue}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  >
                    Continue
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  disabled={isLoading}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  {isSaved ? "Saved" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report This Gig</DialogTitle>
                      <DialogDescription>
                        Please let us know why you want to report this gig. We'll review your report and take
                        appropriate action.
                      </DialogDescription>
                    </DialogHeader>
                    <ReportModal 
                      type="service"
                      id={resolvedParams.id}
                      name={gig.title}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={prevLightboxImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextLightboxImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          <div className="relative h-[80vh] w-[80vw]">
            <Image
              src={gig.images[lightboxIndex]}
              alt={gig.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
}

// Sample data
const sampleGig = {
  id: "1",
  title: "I will design a professional logo for your business",
  description:
    "Are you looking for a professional logo that perfectly represents your brand? Look no further! I'll create a custom logo design that will make your business stand out from the competition.",
  price: 25,
  images: [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  seller: {
    name: "AlexDesigns",
    username: "alexdesigns",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    level: "Level 2 Seller",
    bio: "I'm a professional graphic designer with over 5 years of experience specializing in logo design and brand identity. I've worked with clients from various industries, from startups to established businesses, helping them create memorable visual identities.",
  },
  rating: 4.9,
  reviewCount: 156,
  orderQueue: 3,
  benefits: [
    "100% original designs - no templates",
    "Unlimited revisions until you're satisfied",
    "Quick turnaround time",
    "High-resolution files in multiple formats",
    "Full copyright ownership",
    "Excellent communication throughout the process",
    "Money-back guarantee if you're not satisfied",
    "24/7 customer support",
  ],
  packages: {
    basic: {
      price: 25,
      description: "1 professional logo design with 2 revisions",
      deliveryTime: "2 days",
      features: [
        "1 concept included",
        "Logo transparency",
        "Vector file (SVG)",
        "High resolution files",
        "2 revisions",
      ],
    },
    standard: {
      price: 50,
      description: "3 professional logo designs with unlimited revisions",
      deliveryTime: "3 days",
      features: [
        "3 concepts included",
        "Logo transparency",
        "Vector file (SVG, EPS, AI)",
        "High resolution files",
        "Source file",
        "Unlimited revisions",
        "Social media kit",
      ],
    },
    premium: {
      price: 100,
      description: "5 professional logo designs with priority support",
      deliveryTime: "5 days",
      features: [
        "5 concepts included",
        "Logo transparency",
        "Vector file (SVG, EPS, AI)",
        "High resolution files",
        "Source file",
        "Unlimited revisions",
        "Social media kit",
        "Stationery designs",
        "3D mockup",
        "Priority support",
      ],
    },
  },
  reviews: [
    {
      id: "1",
      user: {
        name: "John Smith",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely amazing work! Alex delivered exactly what I was looking for and was very responsive to my feedback. The logo perfectly captures my brand's essence. I highly recommend his services!",
    },
    {
      id: "2",
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      rating: 5,
      date: "1 month ago",
      comment:
        "Working with Alex was a pleasure. He understood my vision from the start and delivered a stunning logo that exceeded my expectations. The process was smooth, and he was very patient with my revision requests.",
    },
    {
      id: "3",
      user: {
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      rating: 4,
      date: "2 months ago",
      comment:
        "Great experience overall. The logo looks professional and modern. I would have liked a bit more variety in the initial concepts, but the final result is excellent. Would use this service again.",
    },
    {
      id: "4",
      user: {
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      rating: 5,
      date: "3 months ago",
      comment:
        "I needed a logo for my new bakery business and Alex delivered beyond my expectations. The design is eye-catching, memorable, and perfectly represents my brand's personality. The communication was excellent throughout the process.",
    },
    {
      id: "5",
      user: {
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      rating: 3,
      date: "4 months ago",
      comment:
        "The final logo is good, but it took more revisions than I expected to get there. Communication was sometimes slow, but Alex was willing to work until I was satisfied with the result.",
    },
  ],
  faqs: [
    {
      question: "How many revisions do I get?",
      answer:
        "The number of revisions depends on the package you choose. Basic includes 2 revisions, Standard includes unlimited revisions, and Premium includes unlimited revisions plus priority support.",
    },
    {
      question: "What file formats will I receive?",
      answer:
        "You'll receive your logo in multiple formats including PNG, JPG, SVG, and AI (for Standard and Premium packages). All packages include high-resolution files suitable for both print and digital use.",
    },
    {
      question: "How long does the process take?",
      answer:
        "The delivery time depends on the package: Basic takes 2 days, Standard takes 3 days, and Premium takes 5 days. This includes the initial design and revision time.",
    },
    {
      question: "Do I own the copyright to the logo?",
      answer:
        "Yes, once the order is completed and payment is finalized, you will own full copyright to the logo design. You're free to use it for any commercial or personal purposes.",
    },
    {
      question: "Can you help with brand guidelines?",
      answer:
        "Yes, the Premium package includes basic brand guidelines. If you need more comprehensive guidelines, please contact me for a custom offer.",
    },
  ],
}
