"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { FaUserTie, FaUser } from "react-icons/fa"

export default function SelectRole() {
  const { user } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = async (isSeller: boolean) => {
    try {
      setIsLoading(true)
      if (user) {
        const response = await fetch("http://localhost:8800/api/role/set-role", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            role: isSeller ? "seller" : "buyer"
          }),
        })

        if (!response.ok) {
          throw new Error("Cập nhật role thất bại")
        }

        toast({
          title: "Thành công",
          description: `Bạn đã chọn vai trò ${isSeller ? "Người bán" : "Người mua"}`,
        })

        // Reload lại trang để lấy metadata mới nhất
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật role:", error)
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật vai trò. Vui lòng thử lại sau.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900">Chọn vai trò của bạn</h1>
        <p className="text-gray-500 text-center mb-8">Bạn muốn sử dụng nền tảng này với vai trò nào?</p>
        <div className="flex flex-col gap-6 w-full">
          <button
            onClick={() => handleRoleSelect(true)}
            disabled={isLoading}
            className="flex items-center gap-4 w-full py-4 px-4 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-all text-lg font-semibold justify-center disabled:opacity-50"
          >
            <FaUserTie size={28} />
            Tôi muốn trở thành <span className="font-bold ml-1">Người bán</span>
          </button>
          <button
            onClick={() => handleRoleSelect(false)}
            disabled={isLoading}
            className="flex items-center gap-4 w-full py-4 px-4 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition-all text-lg font-semibold justify-center disabled:opacity-50"
          >
            <FaUser size={28} />
            Tôi muốn trở thành <span className="font-bold ml-1">Người mua</span>
          </button>
        </div>
        {isLoading && (
          <div className="mt-6 text-blue-600 font-medium animate-pulse">Đang xử lý...</div>
        )}
      </div>
    </div>
  )
} 