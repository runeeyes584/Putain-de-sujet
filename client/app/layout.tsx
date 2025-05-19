"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CurrencyProvider } from "@/context/currency-context"
import { RoleCheck } from "@/components/role-check"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <CurrencyProvider>
            <RoleCheck />
            {!isAdminRoute && <Navbar />}
            {children}
            {!isAdminRoute && <Footer />}
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
