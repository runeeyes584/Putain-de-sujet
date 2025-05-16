"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export function RoleCheck() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoaded) return

    // Nếu chưa đăng nhập thì không làm gì cả
    if (!isSignedIn) return

    const publicMetadata = user?.publicMetadata || {}
    const hasRole = publicMetadata.isSeller !== undefined || publicMetadata.isAdmin === true

    // Nếu người dùng chưa có role và không đang ở trang select-role
    if (!hasRole && pathname !== "/select-role") {
      router.push("/select-role")
    }

    // Nếu người dùng đã có role và đang ở trang select-role
    if (hasRole && pathname === "/select-role") {
      router.push("/")
    }
  }, [isLoaded, isSignedIn, user, pathname, router])

  return null
} 