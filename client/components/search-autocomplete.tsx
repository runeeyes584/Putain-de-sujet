"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

// Sample search suggestions
const searchSuggestions = [
  { id: 1, text: "logo design", category: "Graphics & Design" },
  { id: 2, text: "website development", category: "Programming & Tech" },
  { id: 3, text: "social media marketing", category: "Digital Marketing" },
  { id: 4, text: "content writing", category: "Writing & Translation" },
  { id: 5, text: "video editing", category: "Video & Animation" },
  { id: 6, text: "voice over", category: "Music & Audio" },
  { id: 7, text: "business plan", category: "Business" },
  { id: 8, text: "fitness coaching", category: "Lifestyle" },
  { id: 9, text: "mobile app development", category: "Programming & Tech" },
  { id: 10, text: "seo optimization", category: "Digital Marketing" },
]

interface SearchAutocompleteProps {
  placeholder?: string
  className?: string
}

export function SearchAutocomplete({ placeholder = "Search for services", className = "" }: SearchAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof searchSuggestions>([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = searchSuggestions.filter((suggestion) =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSuggestions(filtered)
      setIsOpen(true)
      setHighlightedIndex(-1)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [searchQuery])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSuggestionClick(suggestions[highlightedIndex].text)
      } else if (searchQuery.trim()) {
        handleSearch()
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (text: string) => {
    setSearchQuery(text)
    router.push(`/search?q=${encodeURIComponent(text)}`)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="pl-10 h-12 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim().length > 1 && setIsOpen(true)}
        />
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                index === highlightedIndex ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <div className="font-medium dark:text-white">{suggestion.text}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">in {suggestion.category}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
