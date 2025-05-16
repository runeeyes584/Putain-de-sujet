import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Clock, PlusCircle } from "lucide-react"

export default function ForumPage() {
  const categories = [
    {
      id: "general",
      name: "General Discussion",
      description: "General topics related to freelancing and Fiverr",
      topics: 1245,
      posts: 8976,
    },
    {
      id: "getting-started",
      name: "Getting Started",
      description: "Tips and advice for new freelancers",
      topics: 876,
      posts: 5432,
    },
    {
      id: "client-relations",
      name: "Client Relations",
      description: "Discussing client communication, management, and relationships",
      topics: 932,
      posts: 6789,
    },
    {
      id: "technical",
      name: "Technical Help",
      description: "Technical questions about using the Fiverr platform",
      topics: 654,
      posts: 3210,
    },
    {
      id: "marketing",
      name: "Marketing & Promotion",
      description: "Strategies for marketing your services and growing your business",
      topics: 789,
      posts: 4567,
    },
    {
      id: "finance",
      name: "Finance & Taxes",
      description: "Financial advice, tax tips, and money management",
      topics: 543,
      posts: 2987,
    },
  ]

  const popularTopics = [
    {
      id: 1,
      title: "How do you handle difficult clients?",
      author: {
        name: "FreelanceNinja",
        image: "/placeholder.svg?height=100&width=100&text=FN",
        posts: 342,
      },
      replies: 42,
      views: 1250,
      lastActivity: "2 hours ago",
      category: "Client Relations",
      lastPoster: {
        name: "DesignPro",
        image: "/placeholder.svg?height=100&width=100&text=DP",
      },
    },
    {
      id: 2,
      title: "Tax tips for international freelancers",
      author: {
        name: "GlobalGigger",
        image: "/placeholder.svg?height=100&width=100&text=GG",
        posts: 156,
      },
      replies: 28,
      views: 980,
      lastActivity: "5 hours ago",
      category: "Finance & Taxes",
      lastPoster: {
        name: "TaxExpert",
        image: "/placeholder.svg?height=100&width=100&text=TE",
      },
    },
    {
      id: 3,
      title: "Best tools for project management in 2024",
      author: {
        name: "OrganizedPro",
        image: "/placeholder.svg?height=100&width=100&text=OP",
        posts: 278,
      },
      replies: 36,
      views: 1120,
      lastActivity: "1 day ago",
      category: "Technical Help",
      lastPoster: {
        name: "ProductivityGuru",
        image: "/placeholder.svg?height=100&width=100&text=PG",
      },
    },
    {
      id: 4,
      title: "How to price your services competitively",
      author: {
        name: "ValueMaster",
        image: "/placeholder.svg?height=100&width=100&text=VM",
        posts: 189,
      },
      replies: 53,
      views: 1680,
      lastActivity: "2 days ago",
      category: "Marketing & Promotion",
      lastPoster: {
        name: "PricingExpert",
        image: "/placeholder.svg?height=100&width=100&text=PE",
      },
    },
    {
      id: 5,
      title: "Getting your first client on Fiverr: Success stories",
      author: {
        name: "NewbiePro",
        image: "/placeholder.svg?height=100&width=100&text=NP",
        posts: 67,
      },
      replies: 45,
      views: 2100,
      lastActivity: "3 days ago",
      category: "Getting Started",
      lastPoster: {
        name: "FiverrVeteran",
        image: "/placeholder.svg?height=100&width=100&text=FV",
      },
    },
  ]

  const recentTopics = [
    {
      id: 6,
      title: "How to handle scope creep without losing clients",
      author: {
        name: "BoundaryPro",
        image: "/placeholder.svg?height=100&width=100&text=BP",
        posts: 124,
      },
      replies: 8,
      views: 156,
      lastActivity: "30 minutes ago",
      category: "Client Relations",
      lastPoster: {
        name: "ClientWhisperer",
        image: "/placeholder.svg?height=100&width=100&text=CW",
      },
    },
    {
      id: 7,
      title: "New Fiverr feature discussion: What do you think?",
      author: {
        name: "PlatformWatcher",
        image: "/placeholder.svg?height=100&width=100&text=PW",
        posts: 231,
      },
      replies: 15,
      views: 320,
      lastActivity: "1 hour ago",
      category: "General Discussion",
      lastPoster: {
        name: "TechEnthusiast",
        image: "/placeholder.svg?height=100&width=100&text=TE",
      },
    },
    {
      id: 8,
      title: "Portfolio website recommendations for writers",
      author: {
        name: "WordSmith",
        image: "/placeholder.svg?height=100&width=100&text=WS",
        posts: 87,
      },
      replies: 12,
      views: 210,
      lastActivity: "3 hours ago",
      category: "Marketing & Promotion",
      lastPoster: {
        name: "PortfolioDesigner",
        image: "/placeholder.svg?height=100&width=100&text=PD",
      },
    },
    {
      id: 9,
      title: "How to set up a business entity as a freelancer?",
      author: {
        name: "LegalEagle",
        image: "/placeholder.svg?height=100&width=100&text=LE",
        posts: 156,
      },
      replies: 7,
      views: 180,
      lastActivity: "4 hours ago",
      category: "Finance & Taxes",
      lastPoster: {
        name: "BusinessAdvisor",
        image: "/placeholder.svg?height=100&width=100&text=BA",
      },
    },
    {
      id: 10,
      title: "Dealing with imposter syndrome as a new freelancer",
      author: {
        name: "ConfidentNow",
        image: "/placeholder.svg?height=100&width=100&text=CN",
        posts: 42,
      },
      replies: 23,
      views: 450,
      lastActivity: "6 hours ago",
      category: "Getting Started",
      lastPoster: {
        name: "MindsetCoach",
        image: "/placeholder.svg?height=100&width=100&text=MC",
      },
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Community Forum</h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
          Connect with fellow freelancers, ask questions, share experiences, and learn from the community
        </p>
      </section>

      {/* Search and Actions */}
      <section className="mb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-1/2">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search the forum..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/community/forum/new-topic">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/community/forum/my-topics">My Topics</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/community/forum/subscribed">Subscribed</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Forum Categories */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Categories</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/community/forum/category/${category.id}`} className="hover:underline">
                    {category.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{category.description}</p>
                <div className="flex justify-between text-sm">
                  <span>
                    <strong>{category.topics}</strong> topics
                  </span>
                  <span>
                    <strong>{category.posts}</strong> posts
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/community/forum/category/${category.id}`}>Browse Topics</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Topics Tabs */}
      <section>
        <Tabs defaultValue="popular">
          <TabsList className="mb-6">
            <TabsTrigger value="popular">Popular Topics</TabsTrigger>
            <TabsTrigger value="recent">Recent Topics</TabsTrigger>
          </TabsList>

          {/* Popular Topics Tab */}
          <TabsContent value="popular">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-center">Replies</th>
                    <th className="px-4 py-3 text-center">Views</th>
                    <th className="px-4 py-3 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {popularTopics.map((topic, index) => (
                    <tr key={topic.id} className={`border-t ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-start">
                          <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={topic.author.image || "/placeholder.svg"}
                              alt={topic.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/community/forum/topic/${topic.id}`} className="font-medium hover:underline">
                              {topic.title}
                            </Link>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <span>By {topic.author.name}</span>
                              <span className="mx-2">•</span>
                              <Badge variant="outline" className="text-xs">
                                {topic.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">{topic.replies}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">{topic.views}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                          <Link
                            href={`/community/forum/user/${topic.lastPoster.name}`}
                            className="relative h-6 w-6 overflow-hidden rounded-full"
                          >
                            <Image
                              src={topic.lastPoster.image || "/placeholder.svg"}
                              alt={topic.lastPoster.name}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Recent Topics Tab */}
          <TabsContent value="recent">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-center">Replies</th>
                    <th className="px-4 py-3 text-center">Views</th>
                    <th className="px-4 py-3 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTopics.map((topic, index) => (
                    <tr key={topic.id} className={`border-t ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}>
                      <td className="px-4 py-4">
                        <div className="flex items-start">
                          <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={topic.author.image || "/placeholder.svg"}
                              alt={topic.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link href={`/community/forum/topic/${topic.id}`} className="font-medium hover:underline">
                              {topic.title}
                            </Link>
                            <div className="mt-1 flex items-center text-xs text-muted-foreground">
                              <span>By {topic.author.name}</span>
                              <span className="mx-2">•</span>
                              <Badge variant="outline" className="text-xs">
                                {topic.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">{topic.replies}</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center">{topic.views}</div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{topic.lastActivity}</span>
                          <Link
                            href={`/community/forum/user/${topic.lastPoster.name}`}
                            className="relative h-6 w-6 overflow-hidden rounded-full"
                          >
                            <Image
                              src={topic.lastPoster.image || "/placeholder.svg"}
                              alt={topic.lastPoster.name}
                              fill
                              className="object-cover"
                            />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
