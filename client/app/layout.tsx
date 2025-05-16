import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RoleProvider } from "@/contexts/role-context"
import { CurrencyProvider } from "@/context/currency-context"

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
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <RoleProvider>
          <CurrencyProvider>
            <Navbar />
            {children}
            <Footer />
          </CurrencyProvider>
        </RoleProvider>
      </body>
    </html>
  )
}
