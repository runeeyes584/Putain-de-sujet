"use client"

import { useRole } from "@/contexts/role-context"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function RoleCheck() {
  const { role } = useRole()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Nếu chưa có role (null) và không phải trang select-role thì redirect
    if (role === null && pathname !== "/select-role") {
      router.push("/select-role")
    }
  }, [role, pathname, router])

  return null
}
