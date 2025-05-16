import { useState, useEffect, useCallback } from 'react'

export function useSavedGigs(gigId: string | number) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedGigs = JSON.parse(localStorage.getItem('savedGigs') || '[]')
      setIsSaved(savedGigs.includes(gigId))
    } catch (err) {
      setError('Failed to load saved state')
      console.error('Error loading saved state:', err)
    } finally {
      setIsLoading(false)
    }
  }, [gigId])

  // Toggle save state
  const toggleSave = useCallback(() => {
    try {
      const savedGigs = JSON.parse(localStorage.getItem('savedGigs') || '[]')
      const newSavedState = !isSaved
      
      if (newSavedState) {
        if (!savedGigs.includes(gigId)) {
          savedGigs.push(gigId)
        }
      } else {
        const index = savedGigs.indexOf(gigId)
        if (index > -1) {
          savedGigs.splice(index, 1)
        }
      }
      
      localStorage.setItem('savedGigs', JSON.stringify(savedGigs))
      setIsSaved(newSavedState)
    } catch (err) {
      setError('Failed to update saved state')
      console.error('Error updating saved state:', err)
    }
  }, [gigId, isSaved])

  return {
    isSaved,
    isLoading,
    error,
    toggleSave
  }
} 