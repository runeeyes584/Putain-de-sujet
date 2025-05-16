"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [accountType, setAccountType] = useState("buyer")

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <Link href="/">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Freelance Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join our community of freelancers and clients</p>
        </div>

        <Tabs defaultValue="buyer" onValueChange={setAccountType}>
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="buyer">I'm a Client</TabsTrigger>
            <TabsTrigger value="seller">I'm a Freelancer</TabsTrigger>
          </TabsList>
          <TabsContent value="buyer">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johndoe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                Create Account
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="seller">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seller-first-name">First Name</Label>
                  <Input id="seller-first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-last-name">Last Name</Label>
                  <Input id="seller-last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-email">Email</Label>
                <Input id="seller-email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-username">Username</Label>
                <Input id="seller-username" placeholder="johndoe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-password">Password</Label>
                <div className="relative">
                  <Input
                    id="seller-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seller-skills">Skills (separated by commas)</Label>
                <Input id="seller-skills" placeholder="Logo Design, Illustration, Web Design" required />
              </div>
              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            By joining, you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
