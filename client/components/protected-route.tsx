"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/contexts/role-context"
import { toast } from "@/components/ui/use-toast"

type Role = "user" | "admin" | null

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Role[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role, isAuthorized } = useRole()
  const router = useRouter()

  useEffect(() => {
    // If no role is set, redirect to role selection
    if (role === null) {
      router.push("/select-role")
      return
    }

    // If role is not authorized, show error and redirect
    if (!isAuthorized(allowedRoles)) {
      toast({
        title: "Access Denied",
        description: `You don't have permission to access this page as ${role}`,
        variant: "destructive",
      })
      router.push("/select-role")
    }
  }, [role, isAuthorized, allowedRoles, router])

  // Only render children if authorized
  return isAuthorized(allowedRoles) ? <>{children}</> : null
}
