"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import io from "socket.io-client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  sender_clerk_id: string
  receiver_clerk_id: string
  message_content: string
  sent_at: string
  is_read: boolean
}

interface MessagesApiResponse {
  success: boolean
  messages?: Message[]
  message?: string
}

interface SendMessageResponse {
  success: boolean
  message?: any
  error?: string
}

interface Ticket {
  order_id: string
  buyer_clerk_id: string
  seller_clerk_id: string
}

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [receiverId, setReceiverId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isNewMessage, setIsNewMessage] = useState(false)
  const { user } = useUser()
  const senderId = user?.id || ""
  const socket = io("http://localhost:8800", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    auth: {
      credentials: "include"
    }
  })

  useEffect(() => {
    if (!senderId) {
      setError("Người dùng chưa đăng nhập")
      return
    }

    fetchMessages(params.id)
    fetchTicket(params.id)
    socket.emit("joinOrder", { orderId: params.id })
    socket.emit("viewChat", { orderId: params.id, userId: senderId })

    socket.on("newMessage", (newMessage: Message) => {
      setMessages((prev) => [
        ...prev,
        {
          ...newMessage,
          is_read: newMessage.is_read || false,
        },
      ])
      setIsNewMessage(true)
    })

    socket.on("messagesRead", ({ orderId, messageIds }: { orderId: string; messageIds: string[] }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          messageIds.includes(msg.id) ? { ...msg, is_read: true } : msg
        )
      )
    })

    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err)
      setError("Không thể kết nối với server chat")
    })

    return () => {
      socket.off("newMessage")
      socket.off("messagesRead")
      socket.off("connect_error")
    }
  }, [params.id, senderId])

  useEffect(() => {
    if (isNewMessage && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
      setIsNewMessage(false)
    }
  }, [messages, isNewMessage])

  const fetchMessages = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:8800/api/messages?order_id=${orderId}`, {
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: MessagesApiResponse = await response.json()
      if (data.success) {
        setMessages(
          data.messages?.map((msg) => ({
            ...msg,
            is_read: msg.is_read || false,
          })) || []
        )
      } else {
        setError(data.message || "Không thể tải tin nhắn")
      }
    } catch (err) {
      setError("Lỗi kết nối mạng hoặc server không phản hồi")
      console.error("Fetch messages error:", err)
    }
  }

  const fetchTicket = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:8800/api/messages/tickets?order_id=${orderId}`, {
        credentials: "include",
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success && data.tickets?.length > 0) {
        const ticket: Ticket = data.tickets[0]
        const receiver = senderId === ticket.buyer_clerk_id ? ticket.seller_clerk_id : ticket.buyer_clerk_id
        setReceiverId(receiver)
      } else {
        setError("Không thể lấy thông tin ticket")
      }
    } catch (err) {
      setError("Lỗi kết nối mạng hoặc server không phản hồi")
      console.error("Fetch ticket error:", err)
    }
  }

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Vui lòng nhập tin nhắn")
      return
    }

    if (!receiverId) {
      setError("Không xác định được người nhận")
      return
    }

    const msgData = {
      order_id: params.id,
      sender_clerk_id: senderId,
      receiver_clerk_id: receiverId,
      message_content: message,
    }

    try {
      const response = await new Promise<SendMessageResponse>((resolve) =>
        socket.emit("sendMessage", msgData, (res: SendMessageResponse) => resolve(res))
      )
      if (response.success) {
        setMessage("")
        setError("")
      } else {
        setError(response.error || "Không thể gửi tin nhắn")
      }
    } catch (err) {
      setError("Lỗi socket")
      console.error("Send message error:", err)
    }
  }

  const conversation = {
    id: params.id,
    with: {
      username: "User",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    relatedOrder: { id: params.id },
  }

  const groupedMessages = useMemo(() => {
    return messages.reduce((acc, msg) => {
      const date = new Date(msg.sent_at).toLocaleDateString()
      if (!acc[date]) acc[date] = []
      acc[date].push(msg)
      return acc
    }, {} as { [date: string]: Message[] })
  }, [messages])

  return (
    <div className="container mx-auto py-4 px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center mb-4">
        <Link href="/messages" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={conversation.with.avatar} alt={conversation.with.username} />
          <AvatarFallback>{conversation.with.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">@{conversation.with.username}</div>
          <div className="flex items-center">
            <span
              className={`h-2 w-2 rounded-full mr-2 ${conversation.with.isOnline ? "bg-green-500" : "bg-gray-300"}`}
            ></span>
            <span className="text-xs text-gray-500">
              {conversation.with.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        {conversation.relatedOrder && (
          <Link href={`/orders/${conversation.relatedOrder.id}`} className="ml-auto">
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              Order #{conversation.relatedOrder.id}
            </Badge>
          </Link>
        )}
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden">
        <CardContent ref={contentRef} className="flex-grow overflow-y-auto p-4 space-y-4">
          {Object.keys(groupedMessages).length === 0 && !error && (
            <div className="text-center text-gray-500">Không có tin nhắn nào để hiển thị.</div>
          )}
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="text-center text-xs text-gray-500 my-4">{date}</div>
              {groupedMessages[date].map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_clerk_id === senderId ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[80%]">
                    {message.sender_clerk_id !== senderId && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src={conversation.with.avatar} alt={conversation.with.username} />
                        <AvatarFallback>{conversation.with.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender_clerk_id === senderId
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.message_content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(message.sent_at).toLocaleString()}
                        {message.sender_clerk_id === senderId && (
                          <span className="ml-2">{message.is_read ? "Read" : "Delivered"}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="mx-2"
            />
            <Button onClick={handleSend} size="icon" className="bg-emerald-600 hover:bg-emerald-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </Card>
    </div>
  )
}

function useUser() {
  return { user: { id: "user123" } }
}