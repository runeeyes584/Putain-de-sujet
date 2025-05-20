import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

// Lưu trạng thái gig đã lưu cho từng user
const savedStateCache = new Map<string, boolean>();
const listeners: Map<string, Set<() => void>> = new Map();

const getKey = (clerkId: string, gigId: string | number) => `${clerkId}-${gigId}`;
const getAllKey = (clerkId: string) => `__ALL__-${clerkId}`;

export function useSavedGigs(gigId: string | number) {
  const { getToken, userId } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notifyChange = () => {
    const key = getKey(userId || "", gigId);
    const allKey = getAllKey(userId || "");

    listeners.get(key)?.forEach(fn => fn());
    listeners.get(allKey)?.forEach(fn => fn());
  };

  useEffect(() => {
    if (!userId) return;
    const key = getKey(userId, gigId);

    const update = () => {
      setIsSaved(savedStateCache.get(key) || false);
    };

    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(update);

    return () => {
      listeners.get(key)?.delete(update);
    };
  }, [userId, gigId]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();

        const res = await fetch("http://localhost:8800/api/savedGigs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          const saved = !!(data.savedGigs || []).find((g: any) => g.id == gigId);
          const key = getKey(userId || "", gigId);
          savedStateCache.set(key, saved);
          setIsSaved(saved);
        } else {
          setError("Failed to fetch saved status");
        }
      } catch {
        setError("Failed to fetch saved status");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, [gigId, getToken, userId]);

  const toggleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:8800/api/savedGigs/${gigId}`, {
        method: isSaved ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const key = getKey(userId || "", gigId);
        savedStateCache.set(key, !isSaved);
        setIsSaved(!isSaved);
        notifyChange(); // 🔥 gọi toàn bộ nơi khác cập nhật
      } else {
        setError("Failed to toggle save");
      }
    } catch {
      setError("Failed to toggle save");
    } finally {
      setIsLoading(false);
    }
  }, [gigId, isSaved, getToken, userId]);

  return { isSaved, isLoading, error, toggleSave };
}

export function useAllSavedGigs() {
  const { getToken, userId } = useAuth();
  const [savedGigs, setSavedGigs] = useState<any[]>([]);

  const fetchAll = useCallback(async () => {
    const token = await getToken();
    const res = await fetch("http://localhost:8800/api/savedGigs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setSavedGigs(data.savedGigs || []);
    } else {
      console.error("Failed to fetch saved gigs:", data);
    }
  }, [getToken]);

  useEffect(() => {
    fetchAll();

    const key = getAllKey(userId || "");
    const update = () => fetchAll();

    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(update);

    return () => {
      listeners.get(key)?.delete(update);
    };
  }, [fetchAll, userId]);

  return savedGigs;
}
