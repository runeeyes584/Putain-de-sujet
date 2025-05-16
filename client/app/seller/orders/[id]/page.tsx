import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Download, MessageSquare, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SellerOrderDetailsPage({ params }: { params: { id: string } }) {
  // Mock order data
  const order = {
    id: params.id,
    title: "Professional Logo Design",
    buyer: "businessowner",
    status: "in_progress",
    price: 85,
    created: "May 5, 2025",
    delivery: "May 12, 2025",
    description:
      "I will create a modern, professional logo for your business with unlimited revisions until you're satisfied.",
    requirements:
      "Please create a modern logo for my coffee shop called 'Morning Brew'. I prefer earthy tones like brown and green.",
    attachments: [
      { name: "coffee_shop_reference.jpg", size: "1.5 MB" },
      { name: "competitors.pdf", size: "2.3 MB" },
    ],
    deliverables: [],
    messages: 8,
  }

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Pending
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            In Progress
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
            Delivered
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/seller/orders" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
        <div className="ml-auto">{renderStatusBadge(order.status)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{order.title}</CardTitle>
              <div className="text-sm text-gray-500">Order #{order.id}</div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Ordered: {order.created}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">Delivery by: {order.delivery}</span>
                </div>
              </div>

              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600 mb-6">{order.description}</p>

              <h3 className="font-medium mb-2">Buyer Requirements</h3>
              <p className="text-gray-600 mb-6">{order.requirements}</p>

              <h3 className="font-medium mb-4">Buyer Attachments</h3>
              {order.attachments.length > 0 ? (
                <div className="space-y-2 mb-6">
                  {order.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{file.name}</span>
                        <span className="ml-2 text-xs text-gray-500">{file.size}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-6">No attachments provided</p>
              )}

              <Separator className="my-6" />

              <h3 className="font-medium mb-4">Your Deliverables</h3>
              {order.deliverables.length > 0 ? (
                <div className="space-y-2 mb-6">
                  {order.deliverables.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{file.name}</span>
                        <span className="ml-2 text-xs text-gray-500">{file.size}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-6">No deliverables uploaded yet</p>
              )}

              {order.status === "in_progress" && (
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Upload Deliverables</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-4">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-gray-400">Max file size: 25MB</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Buyer</span>
                  <Link href={`/users/${order.buyer}`} className="font-medium text-emerald-600 hover:underline">
                    @{order.buyer}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Package</span>
                  <span className="font-medium">Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Time</span>
                  <span className="font-medium">7 days</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold">${order.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Link href={`/messages?order=${order.id}`}>
                <Button className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Buyer
                </Button>
              </Link>

              {order.status === "in_progress" && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full mb-4">
                    Request Extension
                  </Button>

                  <Link href={`/deliver/${order.id}`}>
                    <Button className="w-full">Deliver Order</Button>
                  </Link>
                </div>
              )}

              {order.status === "delivered" && (
                <div className="mt-4 p-3 bg-amber-50 rounded-md text-amber-700 text-sm">
                  Waiting for buyer to accept delivery
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
