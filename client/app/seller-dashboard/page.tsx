"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  DollarSign,
  Package,
  Clock,
  Star,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="flex-1 bg-gray-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-gray-600">Manage your gigs, orders, and earnings</p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gigs">My Gigs</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  title="Total Earnings"
                  value="$1,245.89"
                  description="Last 30 days"
                  icon={<DollarSign className="h-5 w-5" />}
                  trend={{ value: "+12.5%", positive: true }}
                />
                <StatsCard
                  title="Active Orders"
                  value="8"
                  description="2 due today"
                  icon={<Package className="h-5 w-5" />}
                  trend={{ value: "+3", positive: true }}
                />
                <StatsCard
                  title="Avg. Response Time"
                  value="1.2h"
                  description="Last 7 days"
                  icon={<Clock className="h-5 w-5" />}
                  trend={{ value: "-0.3h", positive: true }}
                />
                <StatsCard
                  title="Rating"
                  value="4.9"
                  description="From 156 reviews"
                  icon={<Star className="h-5 w-5" />}
                  trend={{ value: "+0.1", positive: true }}
                />
              </div>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                  <CardDescription>Your earnings over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <div className="flex h-full w-full items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-gray-300" />
                      <span className="ml-2 text-gray-500">Revenue chart placeholder</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your latest orders</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={order.buyer.avatar || "/placeholder.svg"}
                            alt={order.buyer.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">{order.buyer.name}</div>
                            <div className="text-sm text-gray-500">{order.service}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${order.amount}</div>
                          <div className="text-sm text-gray-500">{order.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rate</CardTitle>
                    <CardDescription>Orders completed on time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="mb-4 text-4xl font-bold">98%</div>
                      <Progress value={98} className="h-2 w-full" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Buyer Satisfaction</CardTitle>
                    <CardDescription>Based on buyer reviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-4xl font-bold">4.9</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <Progress value={98} className="h-2 w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gigs" className="space-y-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">My Gigs</h2>
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                  <Link href="/create-gig">Create New Gig</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {myGigs.map((gig) => (
                  <div key={gig.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col gap-4 p-6 sm:flex-row">
                      {/* Gig Image */}
                      <div className="h-24 w-36 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={gig.image || "/placeholder.svg"}
                          alt={gig.title}
                          width={144}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Gig Details */}
                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{gig.title}</h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                              <Badge
                                variant="outline"
                                className={`${
                                  gig.status === "Active"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-amber-200 bg-amber-50 text-amber-700"
                                }`}
                              >
                                {gig.status}
                              </Badge>
                              <span>|</span>
                              <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{gig.rating}</span>
                                <span className="ml-1">({gig.reviews})</span>
                              </div>
                              <span>|</span>
                              <span>{gig.orders} orders in queue</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">From ${gig.price}</div>
                            <div className="text-sm text-gray-500">Last updated: {gig.updated}</div>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{gig.impressions} impressions</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Package className="h-4 w-4 text-gray-500" />
                              <span>{gig.clicks} clicks</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/gigs/${gig.id}`}>View</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/edit-gig/${gig.id}`}>
                                <Edit className="mr-1 h-4 w-4" />
                                Edit
                              </Link>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Pause Gig</DropdownMenuItem>
                                <DropdownMenuItem>Promote Gig</DropdownMenuItem>
                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Gig
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Orders to Fulfill</h2>
                <Select
                  options={[
                    { value: "all", label: "All Orders" },
                    { value: "active", label: "Active" },
                    { value: "late", label: "Late" },
                    { value: "completed", label: "Completed" },
                    { value: "cancelled", label: "Cancelled" },
                  ]}
                  defaultValue="all"
                />
              </div>

              <div className="space-y-4">
                {ordersToFulfill.map((order) => (
                  <div key={order.id} className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <div className="flex flex-col gap-4 p-6 sm:flex-row">
                      {/* Order Details */}
                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.service}</h3>
                              <Badge
                                className={`${
                                  order.status === "In Progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : order.status === "Late"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Image
                                  src={order.buyer.avatar || "/placeholder.svg"}
                                  alt={order.buyer.name}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                                {order.buyer.name}
                              </div>
                              <span>|</span>
                              <span>Order #{order.id}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${order.amount}</div>
                            <div className="text-sm text-gray-500">Due: {order.dueDate}</div>
                          </div>
                        </div>

                        {order.progress !== undefined && (
                          <div className="mb-4 mt-2">
                            <div className="mb-1 flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{order.progress}%</span>
                            </div>
                            <Progress value={order.progress} className="h-2 w-full" />
                          </div>
                        )}

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                          <div className="text-sm text-gray-600">Ordered: {order.orderDate}</div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/messages?order=${order.id}`}>Message Buyer</Link>
                            </Button>
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600" asChild>
                              <Link href={`/deliver/${order.id}`}>Deliver Work</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  trend: {
    value: string
    positive: boolean
  }
}

function StatsCard({ title, value, description, icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-gray-100 p-2">{icon}</div>
          <div className="flex items-center gap-1 text-xs font-medium">
            {trend.positive ? (
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500" />
            )}
            <span className={trend.positive ? "text-emerald-500" : "text-red-500"}>{trend.value}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
        <div className="mt-2 text-xs text-gray-500">{description}</div>
      </CardContent>
    </Card>
  )
}

interface SelectProps {
  options: { value: string; label: string }[]
  defaultValue: string
}

function Select({ options, defaultValue }: SelectProps) {
  return (
    <select
      defaultValue={defaultValue}
      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// Sample data
const recentOrders = [
  {
    id: "ORD-12345",
    buyer: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Logo Design",
    amount: 50,
    date: "Today, 10:30 AM",
  },
  {
    id: "ORD-12346",
    buyer: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Website Design",
    amount: 95,
    date: "Yesterday, 3:45 PM",
  },
  {
    id: "ORD-12347",
    buyer: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    service: "Social Media Graphics",
    amount: 35,
    date: "May 10, 2025",
  },
]

const myGigs = [
  {
    id: "1",
    title: "I will design a professional logo for your business",
    image: "/placeholder.svg?height=96&width=144",
    status: "Active",
    rating: 4.9,
    reviews: 156,
    orders: 3,
    price: 25,
    updated: "May 10, 2025",
    impressions: 1245,
    clicks: 87,
  },
  {
    id: "2",
    title: "I will create a complete brand identity package",
    image: "/placeholder.svg?height=96&width=144",
    status: "Active",
    rating: 4.8,
    reviews: 92,
    orders: 1,
    price: 120,
    updated: "May 5, 2025",
    impressions: 876,
    clicks: 54,
  },
  {
    id: "3",
    title: "I will design social media graphics for your brand",
    image: "/placeholder.svg?height=96&width=144",
    status: "Paused",
    rating: 4.7,
    reviews: 43,
    orders: 0,
    price: 45,
    updated: "April 28, 2025",
    impressions: 432,
    clicks: 21,
  },
]

const ordersToFulfill = [
  {
    id: "12345",
    service: "Professional Logo Design",
    buyer: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 50,
    orderDate: "May 12, 2025",
    dueDate: "May 15, 2025",
    status: "In Progress",
    progress: 60,
  },
  {
    id: "12346",
    service: "Website Design with WordPress",
    buyer: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 95,
    orderDate: "May 10, 2025",
    dueDate: "May 13, 2025",
    status: "Late",
    progress: 80,
  },
  {
    id: "12347",
    service: "Social Media Graphics Package",
    buyer: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 35,
    orderDate: "May 11, 2025",
    dueDate: "May 18, 2025",
    status: "Requirements Sent",
    progress: 20,
  },
]
