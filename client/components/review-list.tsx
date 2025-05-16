import Image from "next/image"
import { Star } from "lucide-react"

interface Review {
  id: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  date: string
  comment: string
}

interface ReviewListProps {
  reviews: Review[]
  className?: string
}

export function ReviewList({ reviews, className }: ReviewListProps) {
  return (
    <div className={className}>
      <h3 className="mb-4 text-lg font-semibold">Customer Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="mb-3 flex items-center gap-3">
                <Image
                  src={review.user.avatar || "/placeholder.svg"}
                  alt={review.user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{review.user.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span>|</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
