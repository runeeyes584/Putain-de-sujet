"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export function RoleCheck() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Chỉ chuyển hướng khi đã đăng nhập và publicMetadata trống
    if (isSignedIn && user) {
      const publicMetadata = user.publicMetadata || {}
      const hasRole = publicMetadata.isAdmin || publicMetadata.isSeller || publicMetadata.isBuyer
      
      // Nếu không có role và không phải đang ở trang select-role thì chuyển hướng
      if (!hasRole && pathname !== "/select-role") {
        router.push("/select-role")
      }
    }
  }, [user, pathname, router, isSignedIn])

  return null
}
