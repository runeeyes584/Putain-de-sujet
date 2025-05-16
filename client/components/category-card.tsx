import Link from "next/link"
import Image from "next/image"

interface CategoryProps {
  category: {
    id: number
    name: string
    icon: string
    slug: string
  }
}

export function CategoryCard({ category }: CategoryProps) {
  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="flex flex-col items-center rounded-lg p-4 text-center transition-colors hover:bg-gray-50"
    >
      <div className="mb-3 rounded-full bg-gray-100 p-3">
        <Image
          src={category.icon || "/placeholder.svg"}
          alt={category.name}
          width={40}
          height={40}
          className="h-6 w-6 object-contain"
        />
      </div>
      <span className="text-sm font-medium">{category.name}</span>
    </Link>
  )
}
