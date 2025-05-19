import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BannedOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
      <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Tài khoản của bạn đã bị khóa</h2>
        <p className="mb-6">Vui lòng liên hệ admin để biết thêm chi tiết hoặc gửi yêu cầu hỗ trợ.</p>
        <div className="flex flex-col gap-3">
          <Button asChild variant="outline" className="w-full">
            <Link href="/contact">Liên hệ hỗ trợ</Link>
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              window.location.href = "/sign-out";
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
} 