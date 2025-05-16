"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useRole } from "@/contexts/role-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SelectRolePage() {
  const { role, setRole } = useRole()
  const router = useRouter()

  // Handle role selection
  const handleSelectRole = (selectedRole: "user" | "admin") => {
    setRole(selectedRole)

    // Redirect to appropriate dashboard
    if (selectedRole === "user") {
      router.push("/dashboard/user")
    } else {
      router.push("/dashboard/admin")
    }
  }

  // If role is already set, redirect to appropriate dashboard
  useEffect(() => {
    if (role === "user") {
      router.push("/dashboard/user")
    } else if (role === "admin") {
      router.push("/dashboard/admin")
    }
  }, [role, router])

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-4xl gap-8 md:grid-cols-2">
        <Card className="overflow-hidden border-2 transition-all hover:border-emerald-500 hover:shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
            <CardTitle className="text-2xl">User Account</CardTitle>
            <CardDescription className="text-emerald-100">Access your gigs, orders, and profile</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-emerald-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="User"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Browse and purchase gigs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Manage your orders</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-emerald-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Create and sell your services</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4 dark:bg-gray-800">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600" onClick={() => handleSelectRole("user")}>
              Login as User
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border-2 transition-all hover:border-blue-500 hover:shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardTitle className="text-2xl">Admin Account</CardTitle>
            <CardDescription className="text-blue-100">Manage platform and oversee operations</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4 flex justify-center">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Admin"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Manage all users and sellers</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Review and approve gigs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span>Access platform analytics</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4 dark:bg-gray-800">
            <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => handleSelectRole("admin")}>
              Login as Admin
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
