"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type Role = "user" | "admin" | null

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
  clearRole: () => void
  isAuthorized: (allowedRoles: Role[]) => boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(null)
  const router = useRouter()

  // Initialize role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as Role
    if (storedRole) {
      setRoleState(storedRole)
    }
  }, [])

  // Set role in state and localStorage
  const setRole = (newRole: Role) => {
    setRoleState(newRole)

    if (newRole) {
      localStorage.setItem("userRole", newRole)
      toast({
        title: "Role Changed",
        description: `You are now logged in as ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
      })
    } else {
      localStorage.removeItem("userRole")
    }
  }

  // Clear role from state and localStorage
  const clearRole = () => {
    setRoleState(null)
    localStorage.removeItem("userRole")
    router.push("/select-role")
    toast({
      title: "Logged Out",
      description: "You have been logged out",
    })
  }

  // Check if current role is authorized
  const isAuthorized = (allowedRoles: Role[]) => {
    return role !== null && allowedRoles.includes(role)
  }

  return <RoleContext.Provider value={{ role, setRole, clearRole, isAuthorized }}>{children}</RoleContext.Provider>
}

// Custom hook to use the role context
export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}
