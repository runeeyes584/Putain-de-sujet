import { useState, useEffect, useCallback } from 'react'

// Hook cho từng gig: kiểm tra và toggle trạng thái đã lưu qua API
export function useSavedGigs(gigId: string | number) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:8800/api/savedGigs", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setIsSaved((data.savedGigs || []).some((g: any) => g.id == gigId))
        setIsLoading(false)
      })
      .catch(err => {
        setError('Failed to load saved state')
        setIsLoading(false)
      })
  }, [gigId])

  const toggleSave = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`http://localhost:8800/api/savedGigs/${gigId}`, {
        method: isSaved ? "DELETE" : "POST",
        credentials: "include"
      })
      if (res.ok) setIsSaved(!isSaved)
      else setError("Failed to update saved state")
    } catch (err) {
      setError('Failed to update saved state')
    }
    setIsLoading(false)
  }, [gigId, isSaved])

  return { isSaved, isLoading, error, toggleSave }
}

// Hook lấy toàn bộ gig đã lưu cho trang Saved hoặc Home
export function useAllSavedGigs() {
  const [savedGigs, setSavedGigs] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:8800/api/savedGigs", { credentials: "include" })
      .then(res => res.json())
      .then(data => setSavedGigs(data.savedGigs || []));
  }, []);
  return savedGigs;
} 