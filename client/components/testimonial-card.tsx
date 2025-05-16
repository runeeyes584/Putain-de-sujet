import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialProps {
  testimonial: {
    id: number
    content: string
    author: {
      name: string
      position: string
      company: string
      avatar: string
    }
    rating: number
  }
}

export function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>
      <p className="mb-6 text-gray-700">{testimonial.content}</p>
      <div className="flex items-center gap-3">
        <Image
          src={testimonial.author.avatar || "/placeholder.svg"}
          alt={testimonial.author.name}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="font-medium">{testimonial.author.name}</div>
          <div className="text-sm text-gray-600">
            {testimonial.author.position}, {testimonial.author.company}
          </div>
        </div>
      </div>
    </div>
  )
}
