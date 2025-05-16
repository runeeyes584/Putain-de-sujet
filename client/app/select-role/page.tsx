"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { FaUserTie, FaUser } from "react-icons/fa"

const roles = [
  {
    key: "seller",
    label: "Seller",
    icon: <FaUserTie size={40} />,
    desc: "Create services, receive orders, and earn money from your skills.",
  },
  {
    key: "buyer",
    label: "Buyer",
    icon: <FaUser size={40} />,
    desc: "Find and order services to grow your projects.",
  },
]

export default function SelectRole() {
  const { user } = useUser()
  const router = useRouter()
  const [selected, setSelected] = useState<"seller" | "buyer" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleContinue = async () => {
    if (!selected || !user) return
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8800/api/role/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          role: selected,
        }),
      })
      if (!response.ok) throw new Error("Failed to update role")
      toast({
        title: "Success",
        description: `You have selected the role: ${selected === "seller" ? "Seller" : "Buyer"}`,
      })
      window.location.href = "/"
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update your role. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9f0fb] px-2">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-xl flex flex-col items-center relative">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-gray-900">Please select your role</h1>
        <p className="text-gray-500 text-center mb-6 md:mb-8 max-w-md">How do you want to use this platform?</p>
        <div className="flex gap-6 w-full justify-center mb-8 flex-col md:flex-row">
          {roles.map((role) => {
            const isActive = selected === role.key
            return (
              <button
                key={role.key}
                type="button"
                onClick={() => setSelected(role.key as "seller" | "buyer")}
                className={`
                  flex flex-col items-center px-6 py-8 rounded-xl border-2 shadow-md transition-all
                  w-full md:w-64 bg-white
                  ${isActive
                    ? "border-blue-600 bg-blue-50 scale-105 z-10"
                    : "border-gray-200 opacity-60 hover:opacity-100 hover:border-blue-400"}
                  focus:outline-none
                `}
                style={{ minHeight: 200 }}
              >
                <div className={`mb-3 ${isActive ? "text-blue-600" : "text-gray-400"}`}>{role.icon}</div>
                <div className={`font-bold text-lg mb-1 ${isActive ? "text-blue-700" : "text-gray-700"}`}>{role.label}</div>
                <div className="text-gray-500 text-sm text-center">{role.desc}</div>
              </button>
            )
          })}
        </div>
        <button
          onClick={handleContinue}
          disabled={!selected || isLoading}
          className={`
            w-full md:w-64 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow
            transition-all hover:bg-blue-700 disabled:opacity-50
          `}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>
        {/* Dots indicator for 2 roles */}
        <div className="flex gap-2 mt-6">
          {roles.map((role) => (
            <span
              key={role.key}
              className={`block w-3 h-3 rounded-full transition-all duration-200
                ${selected === role.key ? "bg-blue-600" : "bg-gray-300"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 