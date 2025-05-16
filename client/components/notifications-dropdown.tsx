"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, MessageSquare, Star, Package, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))
    setNotifications(updatedNotifications)
  }

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    )
    setNotifications(updatedNotifications)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 p-0 text-xs text-white"
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="p-0 text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex cursor-pointer gap-3 p-4 ${notification.read ? "" : "bg-emerald-50"}`}
                onClick={() => {
                  if (!notification.read) {
                    handleMarkAsRead(notification.id)
                  }
                  setIsOpen(false)
                }}
                asChild
              >
                <Link href={notification.link}>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getIconBackground(
                      notification.type,
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="mb-2 h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-500">No notifications yet</p>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="p-0">
          <Link href="/notifications" className="flex w-full justify-center p-2 text-sm text-emerald-600">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4 text-white" />
    case "order":
      return <Package className="h-4 w-4 text-white" />
    case "review":
      return <Star className="h-4 w-4 text-white" />
    case "reminder":
      return <Clock className="h-4 w-4 text-white" />
    default:
      return <Bell className="h-4 w-4 text-white" />
  }
}

function getIconBackground(type: NotificationType) {
  switch (type) {
    case "message":
      return "bg-blue-500"
    case "order":
      return "bg-emerald-500"
    case "review":
      return "bg-yellow-500"
    case "reminder":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

type NotificationType = "message" | "order" | "review" | "reminder" | "system"

interface Notification {
  id: string
  type: NotificationType
  message: string
  time: string
  read: boolean
  link: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    message: "Your order #12345 has been completed! Please leave a review.",
    time: "Just now",
    read: false,
    link: "/dashboard",
  },
  {
    id: "2",
    type: "message",
    message: "AlexDesigns sent you a message about your logo design order.",
    time: "10 minutes ago",
    read: false,
    link: "/messages",
  },
  {
    id: "3",
    type: "review",
    message: "John Smith left a 5-star review on your service!",
    time: "1 hour ago",
    read: false,
    link: "/seller-dashboard",
  },
  {
    id: "4",
    type: "reminder",
    message: "Your order #12346 is due in 24 hours. Don't forget to deliver!",
    time: "2 hours ago",
    read: true,
    link: "/seller-dashboard?tab=orders",
  },
  {
    id: "5",
    type: "system",
    message: "Your account information has been updated successfully.",
    time: "Yesterday",
    read: true,
    link: "/settings",
  },
]
