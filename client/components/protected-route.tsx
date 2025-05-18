"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export function ProtectedRoute() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (isSignedIn && user) {
      const publicMetadata = user.publicMetadata || {}
      const isAdmin = publicMetadata.isAdmin
      const isSeller = publicMetadata.isSeller
      const isBuyer = publicMetadata.isBuyer

      // Nếu không có role nào thì chuyển đến select-role
      if (!isAdmin && !isSeller && !isBuyer) {
        router.push("/select-role")
        return
      }

      // Nếu đang ở trang dashboard và có nhiều role thì chuyển đến dashboard chính
      if (pathname === "/dashboard" && (isAdmin || (isSeller && isBuyer))) {
        return
      }

      // Nếu đang ở trang dashboard/user và không phải seller thì chuyển về dashboard chính
      if (pathname === "/dashboard/user" && !isSeller) {
        router.push("/dashboard")
        return
      }

      // Nếu đang ở trang dashboard/buyer và không phải buyer thì chuyển về dashboard chính
      if (pathname === "/dashboard/buyer" && !isBuyer) {
        router.push("/dashboard")
        return
      }

      // Nếu đang ở trang dashboard/admin và không phải admin thì chuyển về dashboard chính
      if (pathname === "/dashboard/admin" && !isAdmin) {
        router.push("/dashboard")
        return
      }
    }
  }, [user, pathname, router, isSignedIn])

  return null
}
