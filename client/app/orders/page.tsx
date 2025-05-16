import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Clock, CheckCircle, AlertCircle, XCircle, RefreshCw, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {cancelledOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {[...activeOrders, ...completedOrders, ...cancelledOrders].map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>
    </main>
  )
}

function OrderCard({ order }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-500">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-blue-500 text-blue-500">
            <RefreshCw className="h-3 w-3" />
            In Progress
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-emerald-500 text-emerald-500">
            <CheckCircle className="h-3 w-3" />
            Delivered
          </Badge>
        )
      case "completed":
        return (
          <Badge className="flex items-center gap-1 bg-emerald-500">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "revision":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-purple-500 text-purple-500">
            <AlertCircle className="h-3 w-3" />
            Revision Requested
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="flex items-center gap-1 border-red-500 text-red-500">
            <XCircle className="h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionButtons = (status) => {
    switch (status) {
      case "delivered":
        return (
          <>
            <Button className="bg-emerald-500 hover:bg-emerald-600">Mark as Complete</Button>
            <Button variant="outline">Request Revision</Button>
          </>
        )
      case "in_progress":
        return (
          <>
            <Button variant="outline">Contact Seller</Button>
            <Button variant="outline" className="text-red-500 hover:bg-red-50">
              Cancel Order
            </Button>
          </>
        )
      case "pending":
        return (
          <>
            <Button variant="outline">Contact Seller</Button>
            <Button variant="outline" className="text-red-500 hover:bg-red-50">
              Cancel Order
            </Button>
          </>
        )
      case "revision":
        return <Button variant="outline">View Revision Request</Button>
      case "completed":
        return <Button variant="outline">Leave a Review</Button>
      case "cancelled":
        return <Button variant="outline">View Details</Button>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-xl">{order.title}</CardTitle>
          <CardDescription>Order #{order.id}</CardDescription>
        </div>
        {getStatusBadge(order.status)}
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <Image
              src={order.image || "/placeholder.svg?height=80&width=80"}
              alt={order.title}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div>
              <h3 className="font-medium">Seller Information</h3>
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src={order.seller.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={order.seller.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{order.seller.name}</p>
                  <p className="text-sm text-gray-500">{order.seller.level}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Date:</span>
              <span>{format(new Date(order.orderDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Date:</span>
              <span>{format(new Date(order.deliveryDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Package:</span>
              <span>{order.package}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${order.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/orders/${order.id}`}>View Details</Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Message Seller
          </Button>
          {getActionButtons(order.status)}
        </div>
      </CardFooter>
    </Card>
  )
}

// Sample data
const activeOrders = [
  {
    id: "ORD-1234",
    title: "Professional Logo Design",
    status: "in_progress",
    orderDate: "2025-05-01",
    deliveryDate: "2025-05-08",
    package: "Standard",
    price: 50,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "AlexDesigns",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Level 2 Seller",
    },
  },
  {
    id: "ORD-1235",
    title: "Website Development with WordPress",
    status: "pending",
    orderDate: "2025-05-03",
    deliveryDate: "2025-05-17",
    package: "Premium",
    price: 120,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "WebMaster",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Top Rated",
    },
  },
  {
    id: "ORD-1236",
    title: "SEO-Optimized Blog Content",
    status: "delivered",
    orderDate: "2025-04-28",
    deliveryDate: "2025-05-05",
    package: "Basic",
    price: 45,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "ContentPro",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Level 1 Seller",
    },
  },
  {
    id: "ORD-1237",
    title: "Social Media Marketing Strategy",
    status: "revision",
    orderDate: "2025-04-25",
    deliveryDate: "2025-05-02",
    package: "Standard",
    price: 75,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "MarketingGuru",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Level 2 Seller",
    },
  },
]

const completedOrders = [
  {
    id: "ORD-1230",
    title: "Professional Video Editing",
    status: "completed",
    orderDate: "2025-04-10",
    deliveryDate: "2025-04-17",
    package: "Premium",
    price: 95,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "VideoWizard",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Level 2 Seller",
    },
  },
  {
    id: "ORD-1231",
    title: "Voice Over for Commercial",
    status: "completed",
    orderDate: "2025-04-05",
    deliveryDate: "2025-04-08",
    package: "Basic",
    price: 30,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "VoiceArtist",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Top Rated",
    },
  },
]

const cancelledOrders = [
  {
    id: "ORD-1228",
    title: "Mobile App UI Design",
    status: "cancelled",
    orderDate: "2025-03-20",
    deliveryDate: "2025-03-27",
    package: "Standard",
    price: 65,
    image: "/placeholder.svg?height=80&width=80",
    seller: {
      name: "UIDesigner",
      avatar: "/placeholder.svg?height=32&width=32",
      level: "Level 1 Seller",
    },
  },
]
