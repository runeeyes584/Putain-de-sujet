import Link from "next/link"
import { ArrowLeft, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  // Mock conversation data
  const conversation = {
    id: params.id,
    with: {
      username: "designpro",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    messages: [
      {
        id: "1",
        sender: "designpro",
        content: "Hi there! Thanks for reaching out. How can I help you with your logo design needs?",
        timestamp: "May 10, 2025 10:23 AM",
        isRead: true,
      },
      {
        id: "2",
        sender: "me",
        content:
          "Hello! I'm looking for a minimalist logo for my new coffee shop. Do you have experience with food & beverage branding?",
        timestamp: "May 10, 2025 10:30 AM",
        isRead: true,
      },
      {
        id: "3",
        sender: "designpro",
        content:
          "I've worked with several coffee shops and restaurants. I'd be happy to create a minimalist design that captures the essence of your brand. Could you tell me a bit more about your coffee shop? What's the name and what kind of atmosphere are you going for?",
        timestamp: "May 10, 2025 10:35 AM",
        isRead: true,
      },
      {
        id: "4",
        sender: "me",
        content:
          "The name is 'Morning Brew'. We're going for a cozy but modern vibe, targeting young professionals. Our colors are earthy tones - browns and greens. I'd like something simple but memorable.",
        timestamp: "May 10, 2025 10:42 AM",
        isRead: true,
      },
      {
        id: "5",
        sender: "designpro",
        content:
          "That sounds perfect for a minimalist approach. I can definitely work with those colors and the modern-cozy concept. Would you like me to include a coffee cup or bean element, or are you looking for something more abstract?",
        timestamp: "May 10, 2025 10:48 AM",
        isRead: true,
      },
    ],
    relatedOrder: null,
  }

  return (
    <div className="container mx-auto py-4 px-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center mb-4">
        <Link href="/messages" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={conversation.with.avatar || "/placeholder.svg"} alt={conversation.with.username} />
          <AvatarFallback>{conversation.with.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">@{conversation.with.username}</div>
          <div className="flex items-center">
            <span
              className={`h-2 w-2 rounded-full mr-2 ${conversation.with.isOnline ? "bg-green-500" : "bg-gray-300"}`}
            ></span>
            <span className="text-xs text-gray-500">{conversation.with.isOnline ? "Online" : "Offline"}</span>
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
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          <div className="text-center text-xs text-gray-500 my-4">May 10, 2025</div>

          {conversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className="flex max-w-[80%]">
                {message.sender !== "me" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage
                      src={conversation.with.avatar || "/placeholder.svg"}
                      alt={conversation.with.username}
                    />
                    <AvatarFallback>{conversation.with.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "me" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp}
                    {message.sender === "me" && <span className="ml-2">{message.isRead ? "Read" : "Delivered"}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input placeholder="Type a message..." className="mx-2" />
            <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
