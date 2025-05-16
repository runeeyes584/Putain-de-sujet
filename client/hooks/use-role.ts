"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type Role = "user" | "admin" | null

interface RoleState {
  role: Role
  setRole: (role: Role) => void
  clearRole: () => void
}

export const useRole = create<RoleState>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      clearRole: () => set({ role: null }),
    }),
    {
      name: "role-storage",
    }
  )
) 