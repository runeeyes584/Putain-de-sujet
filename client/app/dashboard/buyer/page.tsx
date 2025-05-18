"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

// Mock data
const mockOrders = [
  {
    id: "ord-1",
    title: "Logo Design",
    seller: "designmaster",
    price: 50,
    status: "in_progress",
    dueDate: "2025-05-20",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ord-2",
    title: "Website Development",
    seller: "webwizard",
    price: 350,
    status: "delivered",
    dueDate: "2025-05-10",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const mockSavedGigs = [
  {
    id: "saved-1",
    title: "I will create custom illustrations for your project",
    seller: "artmaster",
    price: 75,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function BuyerDashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
        <p className="text-muted-foreground">Manage your orders and saved gigs</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Active Orders</CardTitle>
            <CardDescription>Orders in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockOrders.filter((o) => o.status === "in_progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Completed Orders</CardTitle>
            <CardDescription>Successfully delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{mockOrders.filter((o) => o.status === "delivered").length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">My Orders</TabsTrigger>
          <TabsTrigger value="saved">Saved Gigs</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <div className="rounded-lg border">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col border-b p-4 last:border-0 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={order.image || "/placeholder.svg"}
                    alt={order.title}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{order.title}</h3>
                    <p className="text-sm text-muted-foreground">Seller: {order.seller}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-0">
                  <Badge variant="default">
                    {order.status === "in_progress" ? "In Progress" : "Delivered"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Due: {new Date(order.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="font-medium">${order.price}</div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/orders/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <h2 className="text-xl font-semibold">Saved Gigs</h2>
          <div className="rounded-lg border">
            {mockSavedGigs.map((gig) => (
              <div
                key={gig.id}
                className="flex items-center gap-4 border-b p-4 last:border-0"
              >
                <Image
                  src={gig.image || "/placeholder.svg"}
                  alt={gig.title}
                  width={60}
                  height={60}
                  className="rounded-md"
                />
                <div>
                  <h3 className="font-medium">{gig.title}</h3>
                  <p className="text-sm text-muted-foreground">Seller: {gig.seller}</p>
                  <div className="font-medium">${gig.price}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 