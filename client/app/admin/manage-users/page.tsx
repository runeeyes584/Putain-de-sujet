"use client"

import { useEffect, useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Shield, User, Star, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock data
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    role: "seller",
    status: "active",
    joinDate: "2025-01-15",
    verified: true,
    rating: 4.8,
    completedOrders: 124,
  },
  {
    id: "user-2",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2025-02-20",
    verified: false,
    rating: 0,
    completedOrders: 0,
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    username: "robertj",
    email: "robert@example.com",
    role: "seller",
    status: "suspended",
    joinDate: "2025-03-10",
    verified: true,
    rating: 3.2,
    completedOrders: 18,
  },
  {
    id: "user-4",
    name: "Emily Davis",
    username: "emilyd",
    email: "emily@example.com",
    role: "seller",
    status: "active",
    joinDate: "2025-01-05",
    verified: true,
    rating: 4.9,
    completedOrders: 87,
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    username: "michaelw",
    email: "michael@example.com",
    role: "buyer",
    status: "active",
    joinDate: "2025-02-28",
    verified: false,
    rating: 0,
    completedOrders: 0,
  },
  {
    id: "user-6",
    name: "Sarah Brown",
    username: "sarahb",
    email: "sarah@example.com",
    role: "seller",
    status: "active",
    joinDate: "2025-03-15",
    verified: true,
    rating: 4.5,
    completedOrders: 42,
  },
  {
    id: "user-7",
    name: "David Lee",
    username: "davidl",
    email: "david@example.com",
    role: "admin",
    status: "active",
    joinDate: "2025-01-01",
    verified: true,
    rating: 0,
    completedOrders: 0,
  },
]

export default function ManageUsersPage() {
  const [isClient, setIsClient] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filtered users based on search, role, and status
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  // Mock action handlers
  const handleVerifyUser = (userId: string) => {
    toast({
      title: "User Verified",
      description: `User ID: ${userId} has been verified successfully.`,
    })
  }

  const handleSuspendUser = (userId: string) => {
    toast({
      title: "User Suspended",
      description: `User ID: ${userId} has been suspended.`,
      variant: "destructive",
    })
  }

  const handleActivateUser = (userId: string) => {
    toast({
      title: "User Activated",
      description: `User ID: ${userId} has been activated successfully.`,
    })
  }

  const handlePromoteToAdmin = (userId: string) => {
    toast({
      title: "User Promoted",
      description: `User ID: ${userId} has been promoted to admin.`,
    })
  }

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
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">View and manage all users on the platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View, filter, and manage all users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, username, or email..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="buyer">Buyers</SelectItem>
                    <SelectItem value="seller">Sellers</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">@{user.username}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "admin" ? "default" : user.role === "seller" ? "outline" : "secondary"}
                        >
                          {user.role === "admin" ? (
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              <span>Admin</span>
                            </div>
                          ) : user.role === "seller" ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>Seller</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>Buyer</span>
                            </div>
                          )}
                        </Badge>
                        {user.role === "seller" && (
                          <div className="mt-1 text-xs">
                            <span className="font-medium">{user.rating}</span>
                            <span className="text-muted-foreground"> • {user.completedOrders} orders</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "success" : "destructive"}>
                          {user.status === "active" ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.verified ? (
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                            Unverified
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => (window.location.href = `/admin/users/${user.id}`)}>
                              View Details
                            </DropdownMenuItem>
                            {!user.verified && (
                              <DropdownMenuItem onClick={() => handleVerifyUser(user.id)}>Verify User</DropdownMenuItem>
                            )}
                            {user.status === "active" ? (
                              <DropdownMenuItem className="text-red-500" onClick={() => handleSuspendUser(user.id)}>
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                                Activate User
                              </DropdownMenuItem>
                            )}
                            {user.role !== "admin" && (
                              <DropdownMenuItem onClick={() => handlePromoteToAdmin(user.id)}>
                                Promote to Admin
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
