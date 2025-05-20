"use client"

import { ClerkProvider, useUser } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CurrencyProvider } from "@/context/currency-context"
import { RoleCheck } from "@/components/role-check"
import { usePathname } from "next/navigation"
import { BannedOverlay } from "@/components/BannedOverlay"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

function BannedLayout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser();
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    if (isSignedIn && user?.id) {
      fetch(`http://localhost:8800/api/users/${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log("[BannedLayout] User data for banned check:", data);
          setIsBanned(!!data.is_banned)
        })
        .catch(() => setIsBanned(false));
    } else {
      setIsBanned(false);
    }
  }, [isSignedIn, user?.id]);

  if (isSignedIn && isBanned) {
    return <BannedOverlay />;
  }
  return <>{children}</>;
}

// useEffect(() => {
//     const checkBannedStatus = async () => {
//       if (!isSignedIn || !user?.id) {
//         setIsBanned(false);
//         return;
//       }

//       try {
//         const response = await fetch(`http://localhost:8800/api/users/${user.id}`);
//         if (response.status === 404) {
//           console.log(`User ${user.id} not found in database. Consider syncing with Clerk.`);
//           setIsBanned(false);
//           return;
//         }
//         if (!response.ok) throw new Error('Failed to fetch user status');
//         const data = await response.json();
//         console.log("[BannedLayout] User data for banned check:", data);
//         setIsBanned(!!data.is_banned);
//       } catch (error) {
//         console.error('Error checking banned status:', error.message);
//         setIsBanned(false);
//       }
//     };

//     checkBannedStatus();
//   }, [isSignedIn, user?.id]);



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
            <BannedLayout>
              {children}
            </BannedLayout>
            {!isAdminRoute && <Footer />}
          </CurrencyProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
