"use client"

import { useEffect, useState } from "react"
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
import { Search, Filter, MoreHorizontal, Shield, User, Star, CheckCircle, Eye, Trash2, Ban, CheckCircle2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: number;
  clerk_id: string;
  user_roles: string[];
  country: string;
  description: string | null;
  registration_date: string;
  date_of_birth: string | null;
  gender: number;
  contact_number: string | null;
  is_banned: boolean;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    try {
      const response = await fetch(`http://localhost:8800/api/users/${userId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        })
        fetchUsers() // Refresh the list
      } else {
        throw new Error("Failed to delete user")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      })
    }
  }

  const handleViewDetails = async (userId: number) => {
    try {
      const response = await fetch(`http://localhost:8800/api/users/${userId}`)
      const user = await response.json()
      setSelectedUser(user)
      setIsViewDialogOpen(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user details",
        variant: "destructive",
      })
    }
  }

  const handleBanUser = async (clerkId: string) => {
    try {
      const response = await fetch(`http://localhost:8800/api/users/${clerkId}/ban`, {
        method: "PATCH",
      });
      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success",
          description: data.message,
        });
        fetchUsers(); // Refresh lại danh sách
      } else {
        throw new Error("Failed to update user status");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 1:
        return "Male"
      case 2:
        return "Female"
      default:
        return "Other"
    }
  }

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.clerk_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.user_roles.includes(roleFilter)
    return matchesSearch && matchesRole
  })

  return (
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
                placeholder="Search by ID or country..."
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
                  <SelectItem value="admin">Admins</SelectItem>
                  <SelectItem value="employer">Employers</SelectItem>
                  <SelectItem value="seeker">Seekers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.clerk_id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 items-center">
                        {user.user_roles.map((role) => (
                          <Badge
                            key={role}
                            variant={role === "admin" ? "default" : role === "employer" ? "outline" : "secondary"}
                          >
                            {role === "admin" ? (
                              <span>Admin</span>
                            ) : role === "employer" ? (
                              <span>Employer</span>
                            ) : (
                              <span>Seeker</span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{user.country}</TableCell>
                    <TableCell>{new Date(user.registration_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.is_banned ? (
                        <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-semibold">Banned</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-green-500 text-white text-xs font-semibold">Active</span>
                      )}
                    </TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(user.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={user.is_banned ? "text-green-500" : "text-red-500"}
                            onClick={() => handleBanUser(user.clerk_id)}
                          >
                            {user.is_banned ? (
                              <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Unban User
                              </>
                            ) : (
                              <>
                                <Ban className="mr-2 h-4 w-4" />
                                Ban User
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
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

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Clerk ID</h3>
                <p className="mt-1">{selectedUser.clerk_id}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Roles</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {selectedUser.user_roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Country</h3>
                <p className="mt-1">{selectedUser.country}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Registration Date</h3>
                <p className="mt-1">{new Date(selectedUser.registration_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Date of Birth</h3>
                <p className="mt-1">{selectedUser.date_of_birth ? new Date(selectedUser.date_of_birth).toLocaleDateString() : "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground">Gender</h3>
                <p className="mt-1">{getGenderText(selectedUser.gender)}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
                <p className="mt-1">{selectedUser.description || "No description"}</p>
              </div>
              <div className="col-span-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Contact Number</h3>
                <p className="mt-1">{selectedUser.contact_number || "Not provided"}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
