"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Search, Filter, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data
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
  {
    id: "gig-p4",
    title: "I will create a professional logo for your business",
    seller: "logodesigner",
    category: "Graphics & Design",
    submittedDate: "2025-05-13",
  },
  {
    id: "gig-p5",
    title: "I will create engaging social media content",
    seller: "socialmediapro",
    category: "Digital Marketing",
    submittedDate: "2025-05-14",
  },
]

const mockApprovedGigs = [
  {
    id: "gig-a1",
    title: "I will design a modern website UI",
    seller: "webdesigner",
    category: "Graphics & Design",
    approvedDate: "2025-05-01",
    status: "active",
  },
  {
    id: "gig-a2",
    title: "I will create a professional video intro",
    seller: "videocreator",
    category: "Video & Animation",
    approvedDate: "2025-05-02",
    status: "active",
  },
  {
    id: "gig-a3",
    title: "I will translate your content to Spanish",
    seller: "translator",
    category: "Writing & Translation",
    approvedDate: "2025-05-03",
    status: "paused",
  },
  {
    id: "gig-a4",
    title: "I will develop a React application",
    seller: "reactdev",
    category: "Programming & Tech",
    approvedDate: "2025-05-04",
    status: "active",
  },
  {
    id: "gig-a5",
    title: "I will optimize your website for SEO",
    seller: "seoexpert",
    category: "Digital Marketing",
    approvedDate: "2025-05-05",
    status: "active",
  },
]

const mockRejectedGigs = [
  {
    id: "gig-r1",
    title: "I will create social media content",
    seller: "socialmedia123",
    category: "Digital Marketing",
    rejectedDate: "2025-05-06",
    reason: "Duplicate content",
  },
  {
    id: "gig-r2",
    title: "I will translate your document",
    seller: "translatorpro",
    category: "Writing & Translation",
    rejectedDate: "2025-05-07",
    reason: "Misleading information",
  },
  {
    id: "gig-r3",
    title: "I will design a logo",
    seller: "logomaker",
    category: "Graphics & Design",
    rejectedDate: "2025-05-08",
    reason: "Low quality samples",
  },
]

export default function ManageGigsPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filtered gigs based on search and category
  const filteredPendingGigs = mockPendingGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredApprovedGigs = mockApprovedGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredRejectedGigs = mockRejectedGigs.filter((gig) => {
    const matchesSearch =
      gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || gig.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Mock approval/rejection handlers
  const handleApprove = (gigId: string) => {
    toast({
      title: "Gig Approved",
      description: `Gig ID: ${gigId} has been approved successfully.`,
    })
  }

  const handleReject = (gigId: string) => {
    toast({
      title: "Gig Rejected",
      description: `Gig ID: ${gigId} has been rejected.`,
      variant: "destructive",
    })
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Gigs</h1>
        <p className="text-muted-foreground">Review, approve, and manage gigs on the platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gig Management</CardTitle>
          <CardDescription>Review and manage all gigs on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or seller..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Graphics & Design">Graphics & Design</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Writing & Translation">Writing & Translation</SelectItem>
                  <SelectItem value="Video & Animation">Video & Animation</SelectItem>
                  <SelectItem value="Programming & Tech">Programming & Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">
                Pending
                <Badge variant="secondary" className="ml-2">
                  {filteredPendingGigs.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved
                <Badge variant="secondary" className="ml-2">
                  {filteredApprovedGigs.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected
                <Badge variant="secondary" className="ml-2">
                  {filteredRejectedGigs.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPendingGigs.length > 0 ? (
                    filteredPendingGigs.map((gig) => (
                      <TableRow key={gig.id}>
                        <TableCell className="font-medium">{gig.title}</TableCell>
                        <TableCell>{gig.seller}</TableCell>
                        <TableCell>{gig.category}</TableCell>
                        <TableCell>{new Date(gig.submittedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-green-500 hover:bg-green-50 hover:text-green-600"
                              onClick={() => handleApprove(gig.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Approve</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleReject(gig.id)}
                            >
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No pending gigs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="approved">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovedGigs.length > 0 ? (
                    filteredApprovedGigs.map((gig) => (
                      <TableRow key={gig.id}>
                        <TableCell className="font-medium">{gig.title}</TableCell>
                        <TableCell>{gig.seller}</TableCell>
                        <TableCell>{gig.category}</TableCell>
                        <TableCell>
                          <Badge variant={gig.status === "active" ? "success" : "secondary"}>
                            {gig.status === "active" ? "Active" : "Paused"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(gig.approvedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No approved gigs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="rejected">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Rejected Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRejectedGigs.length > 0 ? (
                    filteredRejectedGigs.map((gig) => (
                      <TableRow key={gig.id}>
                        <TableCell className="font-medium">{gig.title}</TableCell>
                        <TableCell>{gig.seller}</TableCell>
                        <TableCell>{gig.category}</TableCell>
                        <TableCell>{gig.reason}</TableCell>
                        <TableCell>{new Date(gig.rejectedDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        No rejected gigs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
