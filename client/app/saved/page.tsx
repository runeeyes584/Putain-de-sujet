"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { useAllSavedGigs } from "@/hooks/use-saved-gigs"

// Mapping gig thật sang định dạng ServiceCard
function mapGigToServiceCard(gig: any) {
  return {
    id: gig.id,
    title: gig.title,
    price: gig.starting_price,
    image: gig.gig_image || "/placeholder.svg",
    seller: {
      name: gig.seller_clerk_id,
      avatar: "/placeholder.svg",
      level: "Level 1 Seller",
    },
    rating: 5,
    reviewCount: 0,
    category: gig.category_id?.toString() || "",
    deliveryTime: gig.delivery_time,
    badges: [],
    isSaved: true,
  };
}

export default function SavedGigsPage() {
  const savedGigs = useAllSavedGigs();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedGigs.map((gig) => (
            <ServiceCard
              key={gig.id}
              service={mapGigToServiceCard(gig)}
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
  );
}
