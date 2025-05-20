"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-emerald-50 to-white text-center px-4">
      <CheckCircle className="h-20 w-20 text-emerald-500 mb-6 animate-bounce" />
      <h1 className="text-4xl font-extrabold mb-3 text-emerald-700 drop-shadow">Thanh toán thành công!</h1>
      <p className="mb-6 text-lg text-gray-700">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
      <div className="flex gap-4 mb-8">
        <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href="/orders">Xem đơn hàng</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
      <div className="text-sm text-gray-400">Nếu có bất kỳ thắc mắc nào, hãy liên hệ bộ phận hỗ trợ của chúng tôi.</div>
    </div>
  )
} 