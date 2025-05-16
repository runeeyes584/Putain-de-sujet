"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState(selectedConversation.messages)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update messages when selected conversation changes
  useEffect(() => {
    setMessages(selectedConversation.messages)
  }, [selectedConversation])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const newMessage = {
      id: `msg-${Date.now()}`,
      text: message,
      sender: "me",
      time: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Show typing indicator after a short delay
    setTimeout(() => {
      setIsTyping(true)

      // Hide typing indicator and add response after a delay
      setTimeout(() => {
        setIsTyping(false)

        // Add response message
        const responseMessage = {
          id: `msg-${Date.now() + 1}`,
          text: "Thanks for your message! I'll get back to you as soon as possible.",
          sender: "other",
          time: new Date(),
        }

        setMessages((prev) => [...prev, responseMessage])
      }, 3000)
    }, 1000)
  }

  return (
    <main className="container mx-auto flex h-[calc(100vh-4rem)] flex-col px-0 py-4 md:px-4">
      <div className="mb-4 px-4 md:px-0">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-gray-600">Communicate with your buyers and sellers</p>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-lg border">
        {/* Conversations Sidebar */}
        <div className="hidden w-80 flex-shrink-0 border-r md:block">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Conversations</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-[200px] grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search messages" className="pl-9" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`cursor-pointer border-b p-3 hover:bg-gray-50 ${
                  selectedConversation.id === conversation.id ? "bg-gray-50" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Image
                      src={conversation.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={conversation.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">
                        {format(new Date(conversation.lastMessageTime), "h:mm a")}
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-600">{conversation.lastMessage}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {conversation.orderRelated && (
                        <Badge variant="outline" className="text-xs">
                          Order #{conversation.orderId}
                        </Badge>
                      )}
                      {conversation.unread > 0 && (
                        <Badge className="h-5 w-5 rounded-full bg-emerald-500 p-0 text-center text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center gap-3">
              <Image
                src={selectedConversation.avatar || "/placeholder.svg?height=40&width=40"}
                alt={selectedConversation.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {selectedConversation.online ? "Online" : "Last seen recently"}
                  </span>
                  {selectedConversation.orderRelated && (
                    <Badge variant="outline" className="text-xs">
                      Order #{selectedConversation.orderId}
                    </Badge>
                  )}
                </div>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Delete Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.sender !== "me" && (
                    <Image
                      src={selectedConversation.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={selectedConversation.name}
                      width={32}
                      height={32}
                      className="mr-2 h-8 w-8 rounded-full"
                    />
                  )}
                  <div className="max-w-[70%]">
                    <div
                      className={`rounded-lg p-3 ${
                        msg.sender === "me" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-1 text-xs text-gray-500">
                      <span>{format(new Date(msg.time), "h:mm a")}</span>
                      {msg.sender === "me" && msg.status === "read" && (
                        <CheckCheck className="h-3 w-3 text-emerald-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <Image
                    src={selectedConversation.avatar || "/placeholder.svg?height=32&width=32"}
                    alt={selectedConversation.name}
                    width={32}
                    height={32}
                    className="mr-2 h-8 w-8 rounded-full"
                  />
                  <div className="max-w-[70%]">
                    <div className="rounded-lg bg-gray-100 p-3 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t p-3">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="submit" disabled={!message.trim()} className="shrink-0 bg-emerald-500 hover:bg-emerald-600">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

// Sample data
const conversations = [
  {
    id: 1,
    name: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'll check the revisions and get back to you soon.",
    lastMessageTime: "2025-05-12T14:30:00",
    online: true,
    unread: 2,
    orderRelated: true,
    orderId: "1234",
    messages: [
      {
        id: "msg-1",
        text: "Hi there! I'm interested in your logo design service.",
        sender: "other",
        time: "2025-05-12T10:30:00",
      },
      {
        id: "msg-2",
        text: "Hello! Thanks for reaching out. I'd be happy to help with your logo design. What kind of business do you have?",
        sender: "me",
        time: "2025-05-12T10:35:00",
        status: "read",
      },
      {
        id: "msg-3",
        text: "I'm starting a tech startup focused on AI solutions. I need a modern, clean logo that conveys innovation.",
        sender: "other",
        time: "2025-05-12T10:40:00",
      },
      {
        id: "msg-4",
        text: "That sounds interesting! I can definitely create something that reflects innovation and technology. Do you have any color preferences or specific elements you'd like to include?",
        sender: "me",
        time: "2025-05-12T10:45:00",
        status: "read",
      },
      {
        id: "msg-5",
        text: "I prefer blue and gray tones. Maybe something with a circuit or neural network motif? I've placed an order for your standard package.",
        sender: "other",
        time: "2025-05-12T11:00:00",
      },
      {
        id: "msg-6",
        text: "Perfect! I've received your order #1234. I'll start working on some concepts with blue and gray tones incorporating circuit/neural network elements. I'll have initial drafts ready in 2 days as per the package timeline.",
        sender: "me",
        time: "2025-05-12T11:10:00",
        status: "read",
      },
      {
        id: "msg-7",
        text: "Here are the initial concepts for your logo. Let me know what you think!",
        sender: "me",
        time: "2025-05-14T09:30:00",
        status: "read",
      },
      {
        id: "msg-8",
        text: "I like concept #2, but could we make the blue a bit more vibrant and adjust the circuit pattern to be slightly more abstract?",
        sender: "other",
        time: "2025-05-14T10:45:00",
      },
      {
        id: "msg-9",
        text: "I'll work on those revisions and get back to you by tomorrow.",
        sender: "me",
        time: "2025-05-14T11:00:00",
        status: "read",
      },
      {
        id: "msg-10",
        text: "I've completed the revisions as requested. You can check them in the delivered files.",
        sender: "me",
        time: "2025-05-15T14:20:00",
        status: "read",
      },
      {
        id: "msg-11",
        text: "I'll check the revisions and get back to you soon.",
        sender: "other",
        time: "2025-05-15T14:30:00",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "The website looks great! Just a few minor tweaks needed.",
    lastMessageTime: "2025-05-11T18:45:00",
    online: false,
    unread: 0,
    orderRelated: true,
    orderId: "1235",
    messages: [],
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When can you start on the next batch of articles?",
    lastMessageTime: "2025-05-10T09:15:00",
    online: true,
    unread: 0,
    orderRelated: false,
    messages: [],
  },
  {
    id: 4,
    name: "Emily Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I've approved the order. Thanks for the great work!",
    lastMessageTime: "2025-05-09T16:20:00",
    online: false,
    unread: 0,
    orderRelated: true,
    orderId: "1230",
    messages: [],
  },
  {
    id: 5,
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you make the voice a bit deeper in the final version?",
    lastMessageTime: "2025-05-08T11:30:00",
    online: false,
    unread: 1,
    orderRelated: true,
    orderId: "1231",
    messages: [],
  },
]
