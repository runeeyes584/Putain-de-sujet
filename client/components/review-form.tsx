"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ReviewFormProps {
  onSubmit?: (data: { rating: number; comment: string }) => void
  className?: string
}

export function ReviewForm({ onSubmit, className }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) return

    onSubmit?.({ rating, comment })
    // Reset form
    setRating(0)
    setComment("")
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <h3 className="mb-4 text-lg font-semibold">Leave a Review</h3>

      <div className="mb-4">
        <p className="mb-2 text-sm font-medium">Rating</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <Star
                className={`h-6 w-6 ${
                  star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review-comment" className="mb-2 block text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this service..."
          className="min-h-[120px] resize-y"
        />
      </div>

      <Button type="submit" disabled={rating === 0} className="bg-emerald-500 hover:bg-emerald-600">
        Submit Review
      </Button>
    </form>
  )
}
