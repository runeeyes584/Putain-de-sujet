"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, MoreHorizontal, Check, X, Eye, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleSelectAll = (items: any[]) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, services, and orders</p>
          </div>

          <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type="text" placeholder="Search users..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                    Add User
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-6 py-3">
                          <div className="flex items-center">
                            <Checkbox
                              checked={selectedItems.length === users.length && users.length > 0}
                              onCheckedChange={() => toggleSelectAll(users)}
                            />
                          </div>
                        </th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Joined</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedItems.includes(user.id)}
                                onCheckedChange={() => toggleSelectItem(user.id)}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                width={32}
                                height={32}
                                className="rounded-full"
                              />
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Admin"
                                  ? "border-purple-200 bg-purple-50 text-purple-700"
                                  : user.role === "Seller"
                                    ? "border-blue-200 bg-blue-50 text-blue-700"
                                    : "border-gray-200 bg-gray-50 text-gray-700"
                              }
                            >
                              {user.role}
                            </Badge>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`mr-2 h-2.5 w-2.5 rounded-full ${
                                  user.status === "Active" ? "bg-emerald-500" : "bg-gray-400"
                                }`}
                              ></div>
                              {user.status}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-gray-500">{user.joined}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/users/${user.username}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Check className="mr-2 h-4 w-4" />
                                    Verify User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <X className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t px-6 py-3">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> users
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type="text" placeholder="Search services..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-6 py-3">
                          <div className="flex items-center">
                            <Checkbox
                              checked={selectedItems.length === services.length && services.length > 0}
                              onCheckedChange={() => toggleSelectAll(services)}
                            />
                          </div>
                        </th>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Seller</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedItems.includes(service.id)}
                                onCheckedChange={() => toggleSelectItem(service.id)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-16 flex-shrink-0 overflow-hidden rounded">
                                <Image
                                  src={service.image || "/placeholder.svg"}
                                  alt={service.title}
                                  width={64}
                                  height={40}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="max-w-xs">
                                <div className="font-medium line-clamp-1">{service.title}</div>
                                <div className="text-sm text-gray-500">ID: {service.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Image
                                src={service.seller.avatar || "/placeholder.svg"}
                                alt={service.seller.name}
                                width={20}
                                height={20}
                                className="rounded-full"
                              />
                              <span>{service.seller.name}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{service.category}</td>
                          <td className="whitespace-nowrap px-6 py-4">${service.price}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Badge
                              className={
                                service.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : service.status === "Pending"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-red-100 text-red-700"
                              }
                            >
                              {service.status}
                            </Badge>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/gigs/${service.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Feature Service</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Service
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t px-6 py-3">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">143</span> services
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input type="text" placeholder="Search orders..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        <th className="px-6 py-3">
                          <div className="flex items-center">
                            <Checkbox
                              checked={selectedItems.length === orders.length && orders.length > 0}
                              onCheckedChange={() => toggleSelectAll(orders)}
                            />
                          </div>
                        </th>
                        <th className="px-6 py-3">Order ID</th>
                        <th className="px-6 py-3">Service</th>
                        <th className="px-6 py-3">Buyer</th>
                        <th className="px-6 py-3">Seller</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedItems.includes(order.id)}
                                onCheckedChange={() => toggleSelectItem(order.id)}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4 max-w-xs">
                            <div className="line-clamp-1">{order.service}</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{order.buyer}</td>
                          <td className="whitespace-nowrap px-6 py-4">{order.seller}</td>
                          <td className="whitespace-nowrap px-6 py-4">${order.amount}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Badge
                              className={
                                order.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : order.status === "In Progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.status === "Cancelled"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-amber-100 text-amber-700"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-gray-500">{order.date}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Buyer</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Seller</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Refund Order</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <X className="mr-2 h-4 w-4" />
                                    Cancel Order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t px-6 py-3">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">215</span> orders
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

// Sample data
const users = [
  {
    id: "1",
    name: "John Smith",
    username: "johnsmith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Buyer",
    status: "Active",
    joined: "May 10, 2025",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    username: "sarahj",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Seller",
    status: "Active",
    joined: "April 15, 2025",
  },
  {
    id: "3",
    name: "Michael Chen",
    username: "michaelc",
    email: "michael.chen@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Seller",
    status: "Active",
    joined: "March 22, 2025",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    username: "emilyr",
    email: "emily.rodriguez@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Buyer",
    status: "Inactive",
    joined: "February 8, 2025",
  },
  {
    id: "5",
    name: "Admin User",
    username: "admin",
    email: "admin@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    joined: "January 1, 2025",
  },
]

const services = [
  {
    id: "1",
    title: "I will design a professional logo for your business",
    image: "/placeholder.svg?height=40&width=64",
    seller: {
      name: "AlexDesigns",
      avatar: "/placeholder.svg?height=20&width=20",
    },
    category: "Graphics & Design",
    price: 25,
    status: "Active",
  },
  {
    id: "2",
    title: "I will create a stunning website using WordPress",
    image: "/placeholder.svg?height=40&width=64",
    seller: {
      name: "WebMaster",
      avatar: "/placeholder.svg?height=20&width=20",
    },
    category: "Programming & Tech",
    price: 95,
    status: "Active",
  },
  {
    id: "3",
    title: "I will write SEO-optimized content for your blog",
    image: "/placeholder.svg?height=40&width=64",
    seller: {
      name: "ContentPro",
      avatar: "/placeholder.svg?height=20&width=20",
    },
    category: "Writing & Translation",
    price: 45,
    status: "Active",
  },
  {
    id: "4",
    title: "I will create a professional video intro for your brand",
    image: "/placeholder.svg?height=40&width=64",
    seller: {
      name: "VideoWizard",
      avatar: "/placeholder.svg?height=20&width=20",
    },
    category: "Video & Animation",
    price: 75,
    status: "Pending",
  },
  {
    id: "5",
    title: "I will design social media graphics for your brand",
    image: "/placeholder.svg?height=40&width=64",
    seller: {
      name: "SocialDesigner",
      avatar: "/placeholder.svg?height=20&width=20",
    },
    category: "Graphics & Design",
    price: 35,
    status: "Suspended",
  },
]

const orders = [
  {
    id: "ORD-12345",
    service: "Professional Logo Design",
    buyer: "John Smith",
    seller: "AlexDesigns",
    amount: 50,
    status: "Completed",
    date: "May 12, 2025",
  },
  {
    id: "ORD-12346",
    service: "Website Design with WordPress",
    buyer: "Sarah Johnson",
    seller: "WebMaster",
    amount: 95,
    status: "In Progress",
    date: "May 10, 2025",
  },
  {
    id: "ORD-12347",
    service: "SEO-optimized Blog Content",
    buyer: "Michael Chen",
    seller: "ContentPro",
    amount: 45,
    status: "Completed",
    date: "May 5, 2025",
  },
  {
    id: "ORD-12348",
    service: "Professional Video Intro",
    buyer: "Emily Rodriguez",
    seller: "VideoWizard",
    amount: 75,
    status: "Completed",
    date: "April 28, 2025",
  },
  {
    id: "ORD-12349",
    service: "Social Media Graphics Package",
    buyer: "David Wilson",
    seller: "SocialDesigner",
    amount: 35,
    status: "Cancelled",
    date: "April 15, 2025",
  },
]
