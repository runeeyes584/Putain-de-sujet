"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, ShoppingBag, AlertTriangle, DollarSign, CheckCircle, XCircle, Clock } from "lucide-react"

// Mock data
const mockStats = {
  totalUsers: 1245,
  totalGigs: 3567,
  pendingApprovals: 28,
  totalRevenue: 125750,
  userGrowth: 12.5,
  revenueGrowth: 8.3,
}

const mockRevenueData = [
  { month: "Jan", revenue: 8500 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10500 },
  { month: "Apr", revenue: 9800 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 12500 },
  { month: "Jul", revenue: 11800 },
  { month: "Aug", revenue: 13200 },
  { month: "Sep", revenue: 14500 },
  { month: "Oct", revenue: 15800 },
  { month: "Nov", revenue: 16200 },
  { month: "Dec", revenue: 17500 },
]

const mockUserData = [
  { month: "Jan", users: 950 },
  { month: "Feb", users: 980 },
  { month: "Mar", users: 1020 },
  { month: "Apr", users: 1050 },
  { month: "May", users: 1080 },
  { month: "Jun", users: 1120 },
  { month: "Jul", users: 1150 },
  { month: "Aug", users: 1180 },
  { month: "Sep", users: 1210 },
  { month: "Oct", users: 1230 },
  { month: "Nov", users: 1240 },
  { month: "Dec", users: 1245 },
]

const mockCategoryData = [
  { name: "Graphics & Design", value: 35 },
  { name: "Digital Marketing", value: 20 },
  { name: "Writing & Translation", value: 15 },
  { name: "Video & Animation", value: 18 },
  { name: "Programming & Tech", value: 12 },
]

const mockPendingGigs = [
  {
    id: "gig-p1",
    title: "I will create a professional mobile app UI design",
    seller: "uimaster",
    category: "Graphics & Design",
    submittedDate: "2025-05-10",
  },
  {
    id: "gig-p2",
    title: "I will write SEO-optimized blog posts for your website",
    seller: "contentpro",
    category: "Writing & Translation",
    submittedDate: "2025-05-11",
  },
  {
    id: "gig-p3",
    title: "I will develop a custom WordPress plugin",
    seller: "wpdev",
    category: "Programming & Tech",
    submittedDate: "2025-05-12",
  },
]

const mockReportedGigs = [
  {
    id: "gig-r1",
    title: "I will create social media content",
    seller: "socialmedia123",
    reportReason: "Copyright infringement",
    reportedBy: "user456",
    reportDate: "2025-05-09",
  },
  {
    id: "gig-r2",
    title: "I will translate your document",
    seller: "translatorpro",
    reportReason: "Misleading information",
    reportedBy: "user789",
    reportDate: "2025-05-10",
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{mockStats.userGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Gigs</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalGigs.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Requires your attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+{mockStats.revenueGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user growth for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockUserData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="users" stroke="var(--color-users)" name="Users" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Gigs by Category</CardTitle>
              <CardDescription>Distribution of gigs across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
                  <TabsTrigger value="reported">Reported Gigs</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {mockPendingGigs.map((gig) => (
                    <div
                      key={gig.id}
                      className="flex flex-col justify-between rounded-lg border p-4 md:flex-row md:items-center"
                    >
                      <div>
                        <h3 className="font-medium">{gig.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>Seller: {gig.seller}</span>
                          <span>•</span>
                          <span>Category: {gig.category}</span>
                          <span>•</span>
                          <span>Submitted: {new Date(gig.submittedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2 md:mt-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-500 hover:bg-green-50 hover:text-green-600"
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button variant="outline" asChild>
                      <Link href="/admin/manage-gigs">View All Pending Gigs</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="reported" className="space-y-4">
                  {mockReportedGigs.map((gig) => (
                    <div
                      key={gig.id}
                      className="flex flex-col justify-between rounded-lg border p-4 md:flex-row md:items-center"
                    >
                      <div>
                        <h3 className="font-medium">{gig.title}</h3>
                        <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span>Seller: {gig.seller}</span>
                          <span>•</span>
                          <span>Reported by: {gig.reportedBy}</span>
                          <span>•</span>
                          <span>Reason: {gig.reportReason}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2 md:mt-0">
                        <Button size="sm" variant="outline">
                          <Clock className="mr-1 h-4 w-4" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button variant="outline" asChild>
                      <Link href="/admin/reported-gigs">View All Reported Gigs</Link>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
