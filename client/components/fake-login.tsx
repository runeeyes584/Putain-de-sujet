"use client"

import { useState, useEffect } from "react"
import { User, Shield, LogOut } from "lucide-react"
import { useRole } from "@/contexts/role-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function FakeLogin() {
  const { role, setRole, clearRole } = useRole()
  const [open, setOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogin = (selectedRole: "user" | "admin") => {
    setRole(selectedRole)
    setOpen(false)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {role ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={role === "admin" ? "bg-blue-500 hover:bg-blue-600" : "bg-emerald-500 hover:bg-emerald-600"}
            >
              {role === "admin" ? (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Admin Mode</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>User Mode</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setRole(role === "admin" ? "user" : "admin")}>
              Switch to {role === "admin" ? "User" : "Admin"} Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={clearRole} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">Demo Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Choose a role</DialogTitle>
              <DialogDescription>Select a role to simulate the logged-in experience</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <Button
                onClick={() => handleLogin("user")}
                className="flex flex-col items-center justify-center gap-2 h-24 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
              >
                <User className="h-8 w-8" />
                <span>User</span>
              </Button>
              <Button
                onClick={() => handleLogin("admin")}
                className="flex flex-col items-center justify-center gap-2 h-24 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
              >
                <Shield className="h-8 w-8" />
                <span>Admin</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
