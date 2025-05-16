"use client"

import { use, useState, useEffect } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search, MoreHorizontal, Phone, Video, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveChat } from "@/components/live-chat"

interface MessagesPageProps {
  searchParams: Promise<{ order?: string }>
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  online: boolean
  unread: boolean
  unreadCount: number
  orderId?: string
  orderTitle?: string
  messages: any[]
}

export default function MessagesPage({ searchParams }: MessagesPageProps) {
  const params = use(searchParams)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const orderId = params?.order || null

  // Find conversation related to order if order param exists
  useEffect(() => {
    if (orderId) {
      const orderConversation = conversations.find((conv) => conv.orderId === orderId)
      if (orderConversation) {
        setSelectedConversation({
          ...orderConversation,
          messages: orderConversation.messages || [],
          unreadCount: typeof orderConversation.unreadCount === 'number' ? orderConversation.unreadCount : 0,
        })
      }
    } else if (conversations.length > 0 && !selectedConversation) {
      const firstConv = conversations[0]
      setSelectedConversation({
        ...firstConv,
        messages: firstConv.messages || [],
        unreadCount: typeof firstConv.unreadCount === 'number' ? firstConv.unreadCount : 0,
      })
    }
  }, [orderId])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="flex h-[calc(100vh-200px)] flex-col overflow-hidden rounded-lg border bg-white lg:flex-row">
        {/* Conversations List */}
        <div className="w-full border-r lg:w-80">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="pl-9" placeholder="Search messages" />
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <div className="h-[calc(100vh-300px)] overflow-y-auto">
              <TabsContent value="all" className="m-0">
                {conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={{
                      ...conversation,
                      messages: conversation.messages || [],
                      unreadCount: typeof conversation.unreadCount === 'number' ? conversation.unreadCount : 0,
                    }}
                    isSelected={selectedConversation?.id === conversation.id}
                    onClick={() => setSelectedConversation({
                      ...conversation,
                      messages: conversation.messages || [],
                      unreadCount: typeof conversation.unreadCount === 'number' ? conversation.unreadCount : 0,
                    })}
                  />
                ))}
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                {conversations
                  .filter((c) => c.unread)
                  .map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={{
                        ...conversation,
                        messages: conversation.messages || [],
                        unreadCount: typeof conversation.unreadCount === 'number' ? conversation.unreadCount : 0,
                      }}
                      isSelected={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation({
                        ...conversation,
                        messages: conversation.messages || [],
                        unreadCount: typeof conversation.unreadCount === 'number' ? conversation.unreadCount : 0,
                      })}
                    />
                  ))}
              </TabsContent>
              <TabsContent value="archived" className="m-0">
                <div className="flex h-40 items-center justify-center text-center text-gray-500">
                  <p>No archived conversations</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between border-b p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={selectedConversation.avatar || "/placeholder.svg"}
                      alt={selectedConversation.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {selectedConversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">{selectedConversation.online ? "Online" : "Offline"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {selectedConversation.orderId && (
                <div className="border-b bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Order #{selectedConversation.orderId}</span>
                      <span className="ml-2 text-sm text-gray-500">{selectedConversation.orderTitle}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild className="text-xs">
                      <Link href={`/orders/${selectedConversation.orderId}`}>View Order</Link>
                    </Button>
                  </div>
                </div>
              )}

              <LiveChat
                recipient={{
                  id: selectedConversation.id,
                  name: selectedConversation.name,
                  avatar: selectedConversation.avatar,
                  online: selectedConversation.online,
                }}
                initialMessages={selectedConversation.messages || []}
                className="flex-1"
              />
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Your Messages</h3>
              <p className="max-w-md text-gray-500">
                Select a conversation from the list to start chatting or search for a specific message.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

function ConversationItem({ conversation, isSelected, onClick }: { conversation: Conversation, isSelected: boolean, onClick: () => void }) {
  return (
    <div
      className={`flex cursor-pointer items-start gap-3 border-b p-3 hover:bg-gray-50 ${
        isSelected ? "bg-gray-50" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={conversation.avatar || "/placeholder.svg"}
          alt={conversation.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{conversation.name}</h3>
          <span className="text-xs text-gray-500">{conversation.time}</span>
        </div>
        <p className="truncate text-sm text-gray-600">{conversation.lastMessage}</p>
        {conversation.orderId && (
          <div className="mt-1">
            <Badge variant="outline" className="text-xs">
              Order #{conversation.orderId}
            </Badge>
          </div>
        )}
      </div>
      {conversation.unread && (
        <Badge className="h-5 w-5 rounded-full bg-emerald-500 p-0 text-center">{conversation.unreadCount}</Badge>
      )}
    </div>
  )
}

// Sample data
const conversations = [
  {
    id: "1",
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your message! I'll get back to you shortly.",
    time: "10:30 AM",
    online: true,
    unread: true,
    unreadCount: 2,
    orderId: "ORD-1234",
    orderTitle: "Professional Logo Design",
    messages: [
      {
        id: "msg-1",
        text: "Hi there! I'm interested in your logo design service.",
        sender: "me",
        time: "10:15 AM",
        status: "read",
      },
      {
        id: "msg-2",
        text: "Hello! Thanks for reaching out. I'd be happy to help with your logo design.",
        sender: "other",
        time: "10:20 AM",
        status: "read",
      },
      {
        id: "msg-3",
        text: "Could you tell me more about your business and what you're looking for in a logo?",
        sender: "other",
        time: "10:21 AM",
        status: "read",
      },
      {
        id: "msg-4",
        text: "I'm starting a fitness coaching business called 'FitLife'. I want something modern and energetic.",
        sender: "me",
        time: "10:25 AM",
        status: "read",
      },
      {
        id: "msg-5",
        text: "That sounds great! I can definitely create something that reflects energy and a modern fitness brand.",
        sender: "other",
        time: "10:30 AM",
        status: "read",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've completed the first draft of your website design.",
    time: "Yesterday",
    online: false,
    unread: true,
    unreadCount: 1,
    orderId: "ORD-1235",
    orderTitle: "Website Development with WordPress",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The blog posts look great! Thank you for your hard work.",
    time: "Yesterday",
    online: true,
    unread: false,
  },
  {
    id: "4",
    name: "Emily Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've reviewed your video and have some feedback.",
    time: "May 10",
    online: false,
    unread: false,
    orderId: "ORD-1230",
    orderTitle: "Professional Video Editing",
  },
  {
    id: "5",
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The voice over sounds perfect! Exactly what I needed.",
    time: "May 8",
    online: false,
    unread: false,
  },
  {
    id: "6",
    name: "Lisa Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I understand. Let me know if you change your mind.",
    time: "May 5",
    online: false,
    unread: false,
  },
]
