import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CurrencyProvider } from "@/context/currency-context"
import { RoleProvider } from "@/contexts/role-context"
import { RoleCheck } from "@/components/role-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobNOVA",
  description: "Find the perfect freelance services for your business",
  generator: 'Nguyễn Hùng Sơn, Lê Anh Tiến, Dương Phúc Khang'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <RoleProvider>
            <CurrencyProvider>
              <RoleCheck />
              <Navbar />
                {children}
              <Footer />
            </CurrencyProvider>
          </RoleProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
