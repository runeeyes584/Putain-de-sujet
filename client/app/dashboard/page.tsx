"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, CheckCircle, XCircle, MessageSquare, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <main className="flex-1 bg-gray-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-gray-600">Manage and track your orders</p>
          </div>

          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Orders</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} type="active" />
              ))}
              {activeOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-3">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">No Active Orders</h3>
                  <p className="mb-4 text-gray-600">You don't have any active orders at the moment.</p>
                  <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                    <Link href="/search">Browse Services</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} type="completed" />
              ))}
              {completedOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-3">
                    <CheckCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">No Completed Orders</h3>
                  <p className="text-gray-600">You don't have any completed orders yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              {cancelledOrders.map((order) => (
                <OrderCard key={order.id} order={order} type="cancelled" />
              ))}
              {cancelledOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-8 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-3">
                    <XCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">No Cancelled Orders</h3>
                  <p className="text-gray-600">You don't have any cancelled orders.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

interface OrderCardProps {
  order: {
    id: string
    service: {
      title: string
      image: string
    }
    seller: {
      name: string
      avatar: string
    }
    price: number
    date: string
    deliveryDate: string
    status: string
    progress?: number
  }
  type: "active" | "completed" | "cancelled"
}

function OrderCard({ order, type }: OrderCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-6 sm:flex-row">
        {/* Service Image */}
        <div className="h-24 w-36 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={order.service.image || "/placeholder.svg"}
            alt={order.service.title}
            width={144}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Order Details */}
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-medium line-clamp-1">{order.service.title}</h3>
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <Image
                  src={order.seller.avatar || "/placeholder.svg"}
                  alt={order.seller.name}
                  width={16}
                  height={16}
                  className="mr-1 rounded-full"
                />
                {order.seller.name}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${order.price.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Order #{order.id}</div>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-500">Ordered:</span> {order.date}
              </div>
              {type === "active" && (
                <div className="text-sm">
                  <span className="text-gray-500">Delivery:</span> {order.deliveryDate}
                </div>
              )}
              <Badge
                className={`${
                  type === "active"
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                    : type === "completed"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : "bg-red-100 text-red-700 hover:bg-red-100"
                }`}
              >
                {order.status}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/messages?order=${order.id}`}>
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Message
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/orders/${order.id}`}>
                  <ExternalLink className="mr-1 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </div>
          </div>

          {type === "active" && order.progress !== undefined && (
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span>Progress</span>
                <span>{order.progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${order.progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Sample data
const activeOrders = [
  {
    id: "ORD-12345",
    service: {
      title: "I will design a professional logo for your business",
      image: "/placeholder.svg?height=96&width=144",
    },
    seller: {
      name: "AlexDesigns",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 50,
    date: "May 12, 2025",
    deliveryDate: "May 15, 2025",
    status: "In Progress",
    progress: 60,
  },
  {
    id: "ORD-12346",
    service: {
      title: "I will create a stunning website using WordPress",
      image: "/placeholder.svg?height=96&width=144",
    },
    seller: {
      name: "WebMaster",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 95,
    date: "May 10, 2025",
    deliveryDate: "May 17, 2025",
    status: "Requirements Sent",
    progress: 20,
  },
]

const completedOrders = [
  {
    id: "ORD-12340",
    service: {
      title: "I will write SEO-optimized content for your blog",
      image: "/placeholder.svg?height=96&width=144",
    },
    seller: {
      name: "ContentPro",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 45,
    date: "April 28, 2025",
    deliveryDate: "May 1, 2025",
    status: "Completed",
  },
  {
    id: "ORD-12338",
    service: {
      title: "I will create a professional video intro for your brand",
      image: "/placeholder.svg?height=96&width=144",
    },
    seller: {
      name: "VideoWizard",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 75,
    date: "April 20, 2025",
    deliveryDate: "April 25, 2025",
    status: "Completed",
  },
]

const cancelledOrders = [
  {
    id: "ORD-12335",
    service: {
      title: "I will design social media graphics for your brand",
      image: "/placeholder.svg?height=96&width=144",
    },
    seller: {
      name: "SocialDesigner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: 35,
    date: "April 15, 2025",
    deliveryDate: "April 18, 2025",
    status: "Cancelled",
  },
]
