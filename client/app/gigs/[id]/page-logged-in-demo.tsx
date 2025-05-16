"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Share2,
  Flag,
  Clock,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ThumbsUp,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ServiceCard } from "@/components/service-card"

export default function GigDetailsLoggedInDemo() {
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState("basic")
  const [showAllFaqs, setShowAllFaqs] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isSaved, setIsSaved] = useState(true)
  const [reviewSort, setReviewSort] = useState("recent")
  const [showAllReviews, setShowAllReviews] = useState(false)

  const handleSaveGig = () => {
    setIsSaved(!isSaved)
  }

  const handleShareGig = () => {
    alert("Link copied to clipboard!")
  }

  const openImageModal = (index) => {
    setSelectedImage(index)
    setShowImageModal(true)
  }

  const navigateImage = (direction) => {
    if (direction === "next") {
      setSelectedImage((prev) => (prev === gig.images.length - 1 ? 0 : prev + 1))
    } else {
      setSelectedImage((prev) => (prev === 0 ? gig.images.length - 1 : prev - 1))
    }
  }

  const handleContactSeller = () => {
    router.push(`/messages?seller=${gig.seller.username}`)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Logged-In Demo View</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">John Smith</span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="mb-6 flex flex-wrap items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href="/search" className="hover:text-emerald-600">
          {gig.category}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <Link href={`/search?subcategory=${gig.subcategory}`} className="hover:text-emerald-600">
          {gig.subcategory}
        </Link>
        <ChevronRight className="mx-2 h-4 w-4" />
        <span className="truncate max-w-[200px]">{gig.title}</span>
      </div>

      {/* Gig Title */}
      <h1 className="mb-4 text-2xl font-bold md:text-3xl">{gig.title}</h1>

      {/* Seller Info (Mobile) */}
      <div className="mb-4 flex items-center md:hidden">
        <Image
          src={gig.seller.avatar || "/placeholder.svg"}
          alt={gig.seller.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-2">
          <Link href={`/users/${gig.seller.username}`} className="font-medium hover:text-emerald-600">
            {gig.seller.name}
          </Link>
          <div className="flex items-center text-sm">
            <span className="text-amber-500">★</span>
            <span className="ml-1 font-medium">{gig.rating}</span>
            <span className="ml-1 text-gray-500">({gig.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column - Gig Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8 overflow-hidden rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={gig.images[selectedImage] || "/placeholder.svg"}
                alt={gig.title}
                fill
                className="cursor-pointer object-cover"
                onClick={() => openImageModal(selectedImage)}
              />
              {/* Navigation Arrows */}
              <button
                className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("prev")
                }}
              >
                <ChevronUp className="h-5 w-5 -rotate-90" />
              </button>
              <button
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("next")
                }}
              >
                <ChevronUp className="h-5 w-5 rotate-90" />
              </button>
            </div>
            <div className="flex overflow-x-auto p-2">
              {gig.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative mr-2 h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? "border-emerald-500" : "border-transparent hover:border-emerald-300"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gig image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="mb-8 flex items-center justify-between rounded-lg border bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${isSaved ? "text-emerald-600" : ""}`}
                onClick={handleSaveGig}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-5 w-5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-5 w-5" />
                    Save
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={handleShareGig}>
                <Share2 className="h-5 w-5" />
                Share
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              onClick={() => setReportModalOpen(true)}
            >
              <Flag className="h-5 w-5" />
              Report
            </Button>
          </div>

          {/* About This Gig */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold">About This Gig</h2>
            <div className="prose max-w-none dark:prose-invert">
              <p>{gig.description}</p>
            </div>
          </div>

          {/* Seller Info (Desktop) */}
          <div className="mb-8 rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">About The Seller</h2>
            <div className="flex items-start gap-4">
              <Image
                src={gig.seller.avatar || "/placeholder.svg"}
                alt={gig.seller.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <Link href={`/users/${gig.seller.username}`} className="text-lg font-medium hover:text-emerald-600">
                    {gig.seller.name}
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleContactSeller}>
                    Contact Me
                  </Button>
                </div>
                <div className="mb-2 text-sm text-gray-500">{gig.seller.title}</div>
                <div className="mb-3 flex items-center">
                  <span className="text-amber-500">★</span>
                  <span className="ml-1 font-medium">{gig.rating}</span>
                  <span className="ml-1 text-gray-500">({gig.reviewCount})</span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-800/30 dark:text-emerald-400">
                  {gig.seller.level}
                </Badge>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="font-medium">{gig.seller.country}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Member since</div>
                <div className="font-medium">{gig.seller.memberSince}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Avg. response time</div>
                <div className="font-medium">{gig.seller.responseTime}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last delivery</div>
                <div className="font-medium">{gig.seller.lastDelivery}</div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="prose max-w-none dark:prose-invert">
              <p>{gig.seller.description}</p>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="mb-8 rounded-xl border bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold">What You'll Get</h2>
              <Tabs defaultValue="basic" value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3 rounded-md bg-gray-100 p-1 dark:bg-gray-700">
                  <TabsTrigger
                    value="basic"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                  >
                    Basic
                  </TabsTrigger>
                  <TabsTrigger
                    value="standard"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                  >
                    Standard
                  </TabsTrigger>
                  <TabsTrigger
                    value="premium"
                    className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                  >
                    Premium
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">Basic Package</h3>
                      <div className="text-lg font-bold">${gig.packages.basic.price}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{gig.packages.basic.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Delivery Time</span>
                        </div>
                        <div className="font-medium">{gig.packages.basic.deliveryTime} days</div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Revisions</span>
                        </div>
                        <div className="font-medium">{gig.packages.basic.revisions}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Features</h4>
                      <ul className="space-y-2">
                        {gig.packages.basic.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="standard">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">Standard Package</h3>
                      <div className="text-lg font-bold">${gig.packages.standard.price}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{gig.packages.standard.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Delivery Time</span>
                        </div>
                        <div className="font-medium">{gig.packages.standard.deliveryTime} days</div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Revisions</span>
                        </div>
                        <div className="font-medium">{gig.packages.standard.revisions}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Features</h4>
                      <ul className="space-y-2">
                        {gig.packages.standard.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="premium">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">Premium Package</h3>
                      <div className="text-lg font-bold">${gig.packages.premium.price}</div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{gig.packages.premium.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="mb-1 flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Delivery Time</span>
                        </div>
                        <div className="font-medium">{gig.packages.premium.deliveryTime} days</div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-500">Revisions</span>
                        </div>
                        <div className="font-medium">{gig.packages.premium.revisions}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Features</h4>
                      <ul className="space-y-2">
                        {gig.packages.premium.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8 rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {gig.faqs.slice(0, showAllFaqs ? gig.faqs.length : 3).map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {gig.faqs.length > 3 && (
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowAllFaqs(!showAllFaqs)}>
                {showAllFaqs ? (
                  <span className="flex items-center">
                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Show All ({gig.faqs.length}) <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </div>

          {/* Reviews Section */}
          <div className="mb-8 rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Reviews</h2>
              <div className="flex items-center">
                <span className="text-amber-500">★</span>
                <span className="ml-1 font-medium">{gig.rating}</span>
                <span className="ml-1 text-gray-500">({gig.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Review Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Sort By:</span>
              <Button
                variant={reviewSort === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setReviewSort("recent")}
                className={reviewSort === "recent" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                Most Recent
              </Button>
              <Button
                variant={reviewSort === "highest" ? "default" : "outline"}
                size="sm"
                onClick={() => setReviewSort("highest")}
                className={reviewSort === "highest" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                Highest Rated
              </Button>
              <Button
                variant={reviewSort === "lowest" ? "default" : "outline"}
                size="sm"
                onClick={() => setReviewSort("lowest")}
                className={reviewSort === "lowest" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
              >
                Lowest Rated
              </Button>
            </div>

            {/* Review Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">{gig.rating}</div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <div className="text-sm">{star} stars</div>
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-amber-500"
                          style={{ width: `${gig.ratingBreakdown[star]}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-500">{gig.ratingBreakdown[star]}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Rating Breakdown</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(gig.ratingCategories).map(([category, rating]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category}</span>
                      <div className="flex items-center">
                        <span className="mr-1 font-medium">{rating}</span>
                        <Star className="h-4 w-4 fill-current text-amber-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
              {gig.reviews.slice(0, showAllReviews ? gig.reviews.length : 3).map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Image
                        src={review.user.avatar || "/placeholder.svg"}
                        alt={review.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-medium">{review.user.name}</div>
                        <div className="flex items-center">
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">| {review.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {review.package} Package
                    </Badge>
                  </div>
                  <p className="mb-3 text-gray-600 dark:text-gray-300">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpfulCount})
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-500">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </div>
                  {review.sellerResponse && (
                    <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                      <div className="mb-2 flex items-center gap-2">
                        <Image
                          src={gig.seller.avatar || "/placeholder.svg"}
                          alt={gig.seller.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="font-medium">{gig.seller.name}</span>
                        <span className="text-xs text-gray-500">| Seller</span>
                      </div>
                      <p className="text-sm">{review.sellerResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {gig.reviews.length > 3 && (
              <Button variant="outline" className="mt-6 w-full" onClick={() => setShowAllReviews(!showAllReviews)}>
                {showAllReviews ? "Show Less" : `Show All Reviews (${gig.reviews.length})`}
              </Button>
            )}
          </div>

          {/* Related Services */}
          <div className="rounded-xl border bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Related Services</h2>
              <Link href="/search" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                See All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {relatedGigs.map((relatedGig) => (
                <ServiceCard
                  key={relatedGig.id}
                  service={{
                    id: relatedGig.id,
                    title: relatedGig.title,
                    price: relatedGig.price,
                    image: relatedGig.image,
                    seller: {
                      name: relatedGig.seller.name,
                      avatar: relatedGig.seller.avatar,
                      level: relatedGig.seller.level
                    },
                    rating: relatedGig.rating,
                    reviewCount: relatedGig.reviewCount
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Box */}
        <div className="w-full lg:w-[380px]">
          <div className="sticky top-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Tabs defaultValue="basic" value={selectedPackage} onValueChange={setSelectedPackage} className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3 rounded-md bg-gray-100 p-1 dark:bg-gray-700">
                <TabsTrigger
                  value="basic"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                >
                  Basic
                </TabsTrigger>
                <TabsTrigger
                  value="standard"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                >
                  Standard
                </TabsTrigger>
                <TabsTrigger
                  value="premium"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-emerald-400"
                >
                  Premium
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Basic Package</h3>
                  <div className="text-xl font-bold">${gig.packages.basic.price}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{gig.packages.basic.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.basic.deliveryTime} Days Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.basic.revisions} Revisions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What's Included:</h4>
                  <ul className="space-y-2">
                    {gig.packages.basic.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Continue (${gig.packages.basic.price})
                </Button>
                <Button variant="outline" className="w-full" onClick={handleContactSeller}>
                  Contact Seller
                </Button>
              </TabsContent>

              <TabsContent value="standard" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Standard Package</h3>
                  <div className="text-xl font-bold">${gig.packages.standard.price}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{gig.packages.standard.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.standard.deliveryTime} Days Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.standard.revisions} Revisions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What's Included:</h4>
                  <ul className="space-y-2">
                    {gig.packages.standard.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Continue (${gig.packages.standard.price})
                </Button>
                <Button variant="outline" className="w-full" onClick={handleContactSeller}>
                  Contact Seller
                </Button>
              </TabsContent>

              <TabsContent value="premium" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Premium Package</h3>
                  <div className="text-xl font-bold">${gig.packages.premium.price}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{gig.packages.premium.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.premium.deliveryTime} Days Delivery</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{gig.packages.premium.revisions} Revisions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">What's Included:</h4>
                  <ul className="space-y-2">
                    {gig.packages.premium.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Continue (${gig.packages.premium.price})
                </Button>
                <Button variant="outline" className="w-full" onClick={handleContactSeller}>
                  Contact Seller
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={gig.images[selectedImage] || "/placeholder.svg"}
              alt={gig.title}
              width={1200}
              height={800}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setShowImageModal(false)}
            >
              ✕
            </button>
            <button
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage("prev")}
            >
              ←
            </button>
            <button
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => navigateImage("next")}
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white">
              {selectedImage + 1} / {gig.images.length}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

// Sample data
const gig = {
  id: "gig123",
  title: "I will design a professional logo for your business",
  description:
    "I'll create a stunning, unique logo that perfectly represents your brand. With over 5 years of experience in logo design, I understand what makes a logo effective and memorable. My design process is thorough and collaborative, ensuring you get exactly what you need. I'll provide multiple concepts and revisions until you're completely satisfied with the final result.",
  category: "Graphics & Design",
  subcategory: "Logo Design",
  rating: 4.9,
  reviewCount: 243,
  ratingBreakdown: {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1,
  },
  ratingCategories: {
    Communication: 5.0,
    Service: 4.9,
    Expertise: 4.8,
    Recommendation: 4.9,
  },
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  seller: {
    name: "AlexDesigns",
    username: "alexdesigns",
    avatar: "/placeholder.svg?height=80&width=80",
    title: "Professional Graphic Designer",
    level: "Level 2 Seller",
    country: "United States",
    memberSince: "Jan 2021",
    responseTime: "1 hour",
    lastDelivery: "about 1 day",
    description:
      "Hi there! I'm Alex, a professional graphic designer with over 5 years of experience specializing in logo design and brand identity. I have a Bachelor's degree in Graphic Design and have worked with clients ranging from startups to established businesses. I'm passionate about creating designs that not only look great but also effectively communicate your brand's message.",
  },
  packages: {
    basic: {
      price: 50,
      description: "A simple, professional logo in 2 concepts with minimal revisions.",
      deliveryTime: 3,
      revisions: 2,
      features: [
        "2 Logo Concepts",
        "Logo Transparency",
        "High Resolution Files",
        "Vector Files (AI, EPS, SVG)",
        "JPEG and PNG Files",
        "Color Variations",
      ],
    },
    standard: {
      price: 100,
      description: "A comprehensive logo package with multiple concepts and file formats.",
      deliveryTime: 5,
      revisions: 5,
      features: [
        "4 Logo Concepts",
        "Logo Transparency",
        "High Resolution Files",
        "Vector Files (AI, EPS, SVG)",
        "JPEG and PNG Files",
        "Color Variations",
        "Source Files",
        "Social Media Kit",
        "3D Mockup",
      ],
    },
    premium: {
      price: 200,
      description: "The ultimate logo package with everything you need for your brand identity.",
      deliveryTime: 7,
      revisions: "Unlimited",
      features: [
        "6 Logo Concepts",
        "Logo Transparency",
        "High Resolution Files",
        "Vector Files (AI, EPS, SVG)",
        "JPEG and PNG Files",
        "Color Variations",
        "Source Files",
        "Social Media Kit",
        "3D Mockup",
        "Stationery Design",
        "Brand Guidelines",
        "Copyright Ownership",
      ],
    },
  },
  faqs: [
    {
      question: "How many revisions do I get?",
      answer:
        "The number of revisions depends on the package you choose. The Basic package includes 2 revisions, the Standard package includes 5 revisions, and the Premium package includes unlimited revisions until you're completely satisfied.",
    },
    {
      question: "What file formats will I receive?",
      answer:
        "All packages include high-resolution JPEG and PNG files, as well as vector files (AI, EPS, SVG) that can be scaled to any size without losing quality. The Standard and Premium packages also include source files.",
    },
    {
      question: "How long does the process take?",
      answer:
        "The delivery time depends on the package you choose. The Basic package takes 3 days, the Standard package takes 5 days, and the Premium package takes 7 days. However, complex projects may take longer, and I'll always communicate with you if there are any delays.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "I offer a 100% satisfaction guarantee. If you're not happy with the final design, I'll work with you to make it right. If you're still not satisfied, you can request a refund within 7 days of delivery.",
    },
    {
      question: "Do I own the copyright to the logo?",
      answer:
        "Yes, once the project is complete and payment is made, you own all rights to the logo. The Premium package includes a copyright transfer document.",
    },
  ],
  reviews: [
    {
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2 weeks ago",
      package: "Standard",
      comment:
        "Alex did an amazing job with my logo! The design perfectly captures the essence of my brand, and the communication throughout the process was excellent. I received multiple concepts to choose from, and the revisions were done quickly. Highly recommend!",
      helpfulCount: 12,
      sellerResponse:
        "Thank you so much for your kind words, John! It was a pleasure working with you on your logo design. I'm thrilled that you're happy with the final result and that it captures your brand's essence. Looking forward to working with you again in the future!",
    },
    {
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "1 month ago",
      package: "Premium",
      comment:
        "I couldn't be happier with my new logo! Alex took the time to understand my business and created a design that perfectly represents my brand. The unlimited revisions were a huge plus, and the additional branding materials in the Premium package are fantastic. Worth every penny!",
      helpfulCount: 8,
    },
    {
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "2 months ago",
      package: "Basic",
      comment:
        "Good experience overall. The logo looks professional and the delivery was on time. I would have liked more initial concepts to choose from, but the final result is good. Would use this service again.",
      helpfulCount: 5,
      sellerResponse:
        "Thank you for your feedback, Michael! I'm glad you're satisfied with the final logo. For future reference, my Standard and Premium packages include more initial concepts. I appreciate your business and look forward to working with you again!",
    },
    {
      user: {
        name: "Emily Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "3 months ago",
      package: "Standard",
      comment:
        "Alex is incredibly talented! The logo design process was smooth and professional from start to finish. I received exactly what I was looking for, and the social media kit has been so useful. Highly recommend!",
      helpfulCount: 10,
    },
    {
      user: {
        name: "David Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 3,
      date: "3 months ago",
      package: "Basic",
      comment:
        "The final logo is good, but the process took longer than expected. Communication could have been better, and I had to ask for updates several times. The quality of the work is solid though.",
      helpfulCount: 3,
      sellerResponse:
        "I appreciate your honest feedback, David. I apologize for the delays and communication issues during our project. I've taken your feedback to heart and am working to improve my process. I'm glad you're satisfied with the final logo quality, and I hope to have the opportunity to provide you with a better experience in the future.",
    },
  ],
}

const relatedGigs = [
  {
    id: 1,
    title: "I will create a modern minimalist logo design",
    price: 45,
    image: "/placeholder.svg?height=200&width=300",
    seller: {
      name: "LogoCreator",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Level 1 Seller",
    },
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    title: "I will design a professional brand identity package",
    price: 120,
    image: "/placeholder.svg?height=200&width=300",
    seller: {
      name: "BrandMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Top Rated",
    },
    rating: 4.9,
    reviewCount: 189,
  },
]
