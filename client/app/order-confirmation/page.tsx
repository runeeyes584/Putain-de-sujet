import Link from "next/link"
import { CheckCircle, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function OrderConfirmationPage() {
  // Mock order data
  const order = {
    id: "ORD-12345678",
    service: "I will design a professional logo for your business",
    seller: "AlexDesigns",
    package: "Standard",
    deliveryDate: "May 15, 2025", // 3 days from current date
    price: 52.5, // Including service fee
  }

  return (
    <main className="flex-1 bg-gray-50 py-12">
      <div className="container max-w-3xl px-4">
        <div className="rounded-lg border bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-emerald-100 p-3 text-emerald-600">
              <CheckCircle className="h-12 w-12" />
            </div>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've sent a confirmation email to your registered email address.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-gray-50 p-6">
            <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <span className="text-sm text-gray-500">Order ID</span>
                <h2 className="text-lg font-semibold">{order.id}</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                <Clock className="h-4 w-4" />
                <span>Estimated delivery: {order.deliveryDate}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Service</span>
                <p className="font-medium">{order.service}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-gray-500">Seller</span>
                  <p className="font-medium">{order.seller}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Package</span>
                  <p className="font-medium">{order.package}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Total</span>
                  <p className="font-medium">${order.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild className="flex-1 bg-emerald-500 hover:bg-emerald-600">
              <Link href="/dashboard">
                View Order
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>

          <div className="mt-8 rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
            <p className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                The seller will begin working on your order shortly. You can communicate with the seller through the
                messaging system in your dashboard.
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
