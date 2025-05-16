"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Star, Heart } from "lucide-react"
import { ServiceCard } from "@/components/service-card"

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
  {
    id: "ord-3",
    title: "Content Writing",
    seller: "wordsmith",
    price: 80,
    status: "revision",
    dueDate: "2025-05-15",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const mockGigs = [
  {
    id: "gig-1",
    title: "I will create a professional WordPress website",
    price: 120,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=60&width=60",
    impressions: 1240,
    clicks: 85,
    orders: 12,
  },
  {
    id: "gig-2",
    title: "I will design a modern logo for your business",
    price: 50,
    rating: 4.9,
    reviews: 203,
    image: "/placeholder.svg?height=60&width=60",
    impressions: 2150,
    clicks: 178,
    orders: 24,
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
  {
    id: "saved-2",
    title: "I will translate your content to Spanish",
    seller: "linguaexpert",
    price: 40,
    rating: 4.6,
    reviews: 112,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function UserDashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="container px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-muted-foreground">Manage your orders, gigs, and saved items</p>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600" asChild>
            <Link href="/create-gig">Create New Gig</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Saved Gigs</CardTitle>
              <CardDescription>Items in your wishlist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockSavedGigs.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="mt-8">
          <TabsList className="mb-4">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="gigs">My Gigs</TabsTrigger>
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
                    <Badge
                      variant={
                        order.status === "in_progress"
                          ? "default"
                          : order.status === "delivered"
                            ? "success"
                            : "warning"
                      }
                    >
                      {order.status === "in_progress"
                        ? "In Progress"
                        : order.status === "delivered"
                          ? "Delivered"
                          : "Revision"}
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
            <div className="flex justify-end">
              <Button variant="outline" asChild>
                <Link href="/orders">View All Orders</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="gigs" className="space-y-4">
            <h2 className="text-xl font-semibold">My Gigs</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {mockGigs.map((gig) => (
                <Card key={gig.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={gig.image || "/placeholder.svg"}
                        alt={gig.title}
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{gig.title}</h3>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="ml-1 text-sm">{gig.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({gig.reviews} reviews)</span>
                          <span className="font-medium">${gig.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Impressions</span>
                          <span>{gig.impressions}</span>
                        </div>
                        <Progress value={(gig.impressions / 3000) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Clicks</span>
                          <span>{gig.clicks}</span>
                        </div>
                        <Progress value={(gig.clicks / 200) * 100} className="h-2" />
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>Orders</span>
                          <span>{gig.orders}</span>
                        </div>
                        <Progress value={(gig.orders / 30) * 100} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/gigs/${gig.id}`}>View Gig</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/gigs/${gig.id}/edit`}>Edit Gig</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <h2 className="text-xl font-semibold">Saved Gigs</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {mockSavedGigs.map((gig) => (
                <ServiceCard
                  key={gig.id}
                  service={{
                    id: gig.id,
                    title: gig.title,
                    price: gig.price,
                    image: gig.image,
                    seller: {
                      name: gig.seller,
                      avatar: "/placeholder.svg",
                      level: "Level 1"
                    },
                    rating: gig.rating,
                    reviewCount: gig.reviews,
                    isSaved: true
                  }}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" asChild>
                <Link href="/saved-gigs">View All Saved Gigs</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}
