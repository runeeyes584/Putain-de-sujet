import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Clock, CheckCircle, AlertCircle, XCircle, RefreshCw, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SellerOrdersPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Seller Orders</h1>
        <p className="text-gray-600">Manage orders from your customers</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-emerald-500">12</CardTitle>
            <CardDescription>Active Orders</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-blue-500">3</CardTitle>
            <CardDescription>Due Today</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-amber-500">2</CardTitle>
            <CardDescription>Late Deliveries</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-500">85%</CardTitle>
            <CardDescription>Completion Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-5 md:w-auto">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeOrders.map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="delivered" className="space-y-6">
          {deliveredOrders.map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedOrders.map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {cancelledOrders.map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          {[...activeOrders, ...deliveredOrders, ...completedOrders, ...cancelledOrders].map((order) => (
            <SellerOrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>
    </main>
  )
}

function SellerOrderCard({ order }) {
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
      case "pending":
      case "in_progress":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600">Deliver Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Deliver Order #{order.id}</DialogTitle>
                <DialogDescription>
                  Provide your completed work to the buyer. They will have 3 days to review and accept.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="message">Message to Buyer</Label>
                  <Textarea
                    id="message"
                    placeholder="I'm pleased to deliver your order as requested. Please let me know if you need any adjustments."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="files">Upload Files</Label>
                  <div className="flex items-center gap-2">
                    <Input id="files" type="file" multiple />
                  </div>
                  <p className="text-xs text-gray-500">
                    Max file size: 100MB. Supported formats: ZIP, PDF, DOC, JPG, PNG, AI, PSD
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                  <Send className="mr-2 h-4 w-4" />
                  Deliver Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      case "delivered":
        return <Button variant="outline">View Delivery</Button>
      case "revision":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-500 hover:bg-emerald-600">Submit Revision</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Submit Revision for Order #{order.id}</DialogTitle>
                <DialogDescription>
                  Address the buyer's revision request and submit your updated work.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="rounded-md bg-amber-50 p-3 text-amber-800">
                  <h4 className="mb-1 font-medium">Revision Request:</h4>
                  <p className="text-sm">{order.revisionRequest || "Please make the logo colors more vibrant."}</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message to Buyer</Label>
                  <Textarea
                    id="message"
                    placeholder="I've made the requested changes. Please let me know if this meets your expectations."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="files">Upload Files</Label>
                  <div className="flex items-center gap-2">
                    <Input id="files" type="file" multiple />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                  <Send className="mr-2 h-4 w-4" />
                  Submit Revision
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      case "completed":
        return <Button variant="outline">View Completed Order</Button>
      case "cancelled":
        return <Button variant="outline">View Details</Button>
      default:
        return null
    }
  }

  const getDueDate = (deliveryDate) => {
    const today = new Date()
    const due = new Date(deliveryDate)
    const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24))

    if (daysLeft < 0) {
      return <span className="text-red-500">Overdue by {Math.abs(daysLeft)} days</span>
    } else if (daysLeft === 0) {
      return <span className="text-amber-500">Due today</span>
    } else if (daysLeft === 1) {
      return <span className="text-amber-500">Due tomorrow</span>
    } else {
      return <span>Due in {daysLeft} days</span>
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
              <h3 className="font-medium">Buyer Information</h3>
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src={order.buyer.avatar || "/placeholder.svg?height=32&width=32"}
                  alt={order.buyer.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{order.buyer.name}</p>
                  <p className="text-sm text-gray-500">
                    {order.buyer.country && `${order.buyer.country} • `}
                    {order.buyer.orders} orders
                  </p>
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
              <span className="text-gray-500">Delivery Due:</span>
              <span>{getDueDate(order.deliveryDate)}</span>
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

        {order.requirements && (
          <div className="mt-4 rounded-md bg-gray-50 p-3 dark:bg-gray-800">
            <h4 className="mb-1 font-medium">Buyer Requirements:</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">{order.requirements}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/seller/orders/${order.id}`}>View Details</Link>
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
            <Link href={`/inbox?order=${order.id}`}>
              <Send className="h-4 w-4" />
              Message Buyer
            </Link>
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
    buyer: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "United States",
      orders: 5,
    },
    requirements:
      "I need a modern logo for my tech startup. The colors should be blue and gray, and it should convey innovation and trust.",
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
    buyer: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "Canada",
      orders: 2,
    },
    requirements:
      "I need a 5-page WordPress website for my consulting business. I already have the content and brand guidelines ready.",
  },
]

const deliveredOrders = [
  {
    id: "ORD-1236",
    title: "SEO-Optimized Blog Content",
    status: "delivered",
    orderDate: "2025-04-28",
    deliveryDate: "2025-05-05",
    package: "Basic",
    price: 45,
    image: "/placeholder.svg?height=80&width=80",
    buyer: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "Singapore",
      orders: 8,
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
    buyer: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "Australia",
      orders: 3,
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
    buyer: {
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "Mexico",
      orders: 1,
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
    buyer: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      country: "United Kingdom",
      orders: 4,
    },
  },
]
