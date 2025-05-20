"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function PaymentFailurePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-red-50 to-white text-center px-4">
      <XCircle className="h-20 w-20 text-red-500 mb-6 animate-bounce" />
      <h1 className="text-4xl font-extrabold mb-3 text-red-700 drop-shadow">Thanh toán thất bại!</h1>
      <p className="mb-6 text-lg text-gray-700">Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ để được giúp đỡ.</p>
      <div className="flex gap-4 mb-8">
        <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
          <Link href="/checkout">Thử lại</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Về trang chủ</Link>
        </Button>
      </div>
      <div className="text-sm text-gray-400">Nếu bạn đã bị trừ tiền nhưng đơn hàng chưa xác nhận, vui lòng liên hệ hỗ trợ.</div>
    </div>
  )
} 