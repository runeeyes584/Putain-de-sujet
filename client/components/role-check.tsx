"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function RoleCheck() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const metadata = user?.publicMetadata || {}
    const hasRole = metadata.isSeller || metadata.isBuyer || metadata.isAdmin

    if (!hasRole && pathname !== "/select-role") {
      router.push("/select-role")
    }

  }, [isLoaded, isSignedIn, user, pathname, router])

  return null
}
