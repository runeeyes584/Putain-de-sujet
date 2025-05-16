"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PriceDisplay } from "@/components/price-display"

export default function CheckoutPage() {
  const [requirements, setRequirements] = useState("")

  // Mock data for the selected service
  const selectedService = {
    id: "1",
    title: "I will design a professional logo for your business",
    image: "/placeholder.svg?height=100&width=150",
    seller: {
      name: "AlexDesigns",
      avatar: "/placeholder.svg?height=40&width=40",
      level: "Level 2 Seller",
    },
    package: {
      name: "Standard",
      deliveryTime: "3 days",
      revisions: "Unlimited revisions",
      price: 50,
    },
    features: [
      "3 concepts included",
      "Logo transparency",
      "Vector file (SVG, EPS, AI)",
      "High resolution files",
      "Source file",
    ],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the order
    window.location.href = "/order-confirmation"
  }

  return (
    <main className="flex-1 bg-gray-50 py-8">
      <div className="container px-4">
        <div className="mb-6">
          <Link
            href={`/gigs/${selectedService.id}`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to service
          </Link>
        </div>

        <h1 className="mb-8 text-2xl font-bold md:text-3xl">Complete Your Order</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - Order Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Requirements */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Order Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="requirements" className="mb-2 block">
                      Tell the seller what you need
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="Describe your project in detail, including any specific requirements or preferences..."
                      className="min-h-[150px]"
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                <RadioGroup defaultValue="credit-card">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      Credit Card
                    </Label>
                    <div className="flex gap-2">
                      <Image src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
                      <Image src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
                      <Image src="/placeholder.svg?height=24&width=36" alt="Amex" width={36} height={24} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      PayPal
                    </Label>
                    <Image src="/placeholder.svg?height=24&width=36" alt="PayPal" width={36} height={24} />
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                Continue to Payment
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px]">
            <div className="sticky top-8 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              {/* Service Info */}
              <div className="mb-4 flex gap-4">
                <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={selectedService.image || "/placeholder.svg"}
                    alt={selectedService.title}
                    width={150}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-2">{selectedService.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <Image
                      src={selectedService.seller.avatar || "/placeholder.svg"}
                      alt={selectedService.seller.name}
                      width={16}
                      height={16}
                      className="mr-1 rounded-full"
                    />
                    {selectedService.seller.name}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Package Details */}
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium">{selectedService.package.name} Package</span>
                  <span className="font-bold">
                    <PriceDisplay priceUSD={selectedService.package.price} />
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{selectedService.package.deliveryTime} delivery</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">{selectedService.package.revisions}</div>
              </div>

              <Separator className="my-4" />

              {/* Features */}
              <div className="mb-4">
                <h4 className="mb-2 font-medium">What's included:</h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    <PriceDisplay priceUSD={selectedService.package.price} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>
                    <PriceDisplay priceUSD={selectedService.package.price * 0.05} />
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    <PriceDisplay priceUSD={selectedService.package.price * 1.05} />
                  </span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                By clicking "Continue to Payment", you agree to our Terms of Service and acknowledge that you have read
                our Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
