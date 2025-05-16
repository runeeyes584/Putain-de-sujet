"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useRole } from "@/contexts/role-context"

export function CategoryNavbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { role } = useRole()

  // Get the current category from search params
  const currentCategory = searchParams.get("category")

  // Don't show category navbar on role selection page or for admin users
  if (pathname === "/select-role" || role === "admin") {
    return null
  }

  // Check if the current path includes a specific category
  const isActiveCategory = (category: string) => {
    return currentCategory === category
  }

  // Categories from the previous dropdown
  const categories = [
    { name: "Graphics & Design", slug: "graphics-design" },
    { name: "Digital Marketing", slug: "digital-marketing" },
    { name: "Writing & Translation", slug: "writing-translation" },
    { name: "Video & Animation", slug: "video-animation" },
    { name: "Programming & Tech", slug: "programming-tech" },
  ]

  return (
    <div className="hidden md:block border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container px-4">
        <div className="flex items-center justify-center md:justify-start space-x-8 py-3 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/search?category=${category.slug}`}
              className={`
                text-sm font-medium whitespace-nowrap
                transition-colors duration-200
                border-b-2 py-1
                ${
                  isActiveCategory(category.slug)
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500"
                }
              `}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/search"
            className={`
              text-sm font-medium whitespace-nowrap
              transition-colors duration-200
              border-b-2 py-1
              ${
                pathname === "/search" && !currentCategory
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500"
              }
            `}
          >
            All Categories
          </Link>
        </div>
      </div>
    </div>
  )
}
