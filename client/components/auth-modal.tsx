"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useRole } from "@/contexts/role-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const router = useRouter()
  const { setRole } = useRole()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý đăng nhập ở đây
    setRole("user")
    onClose()
    router.push("/dashboard/user")
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý đăng ký ở đây
    setRole("user")
    onClose()
    router.push("/dashboard/user")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === "signin" ? "Đăng nhập" : "Đăng ký"}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
            <TabsTrigger value="signup">Đăng ký</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Nhập email của bạn" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" placeholder="Nhập mật khẩu" required />
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ tên</Label>
                <Input id="name" placeholder="Nhập họ tên của bạn" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="Nhập email của bạn" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Mật khẩu</Label>
                <Input id="signup-password" type="password" placeholder="Nhập mật khẩu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input id="confirm-password" type="password" placeholder="Nhập lại mật khẩu" required />
              </div>
              <Button type="submit" className="w-full">
                Đăng ký
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 