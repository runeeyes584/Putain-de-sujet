import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MessageSquare, Users, Rss, Headphones, ArrowRight } from "lucide-react"

export default function CommunityPage() {
  const featuredEvents = [
    {
      id: 1,
      title: "JobNOVA Freelance Summit 2024",
      date: "June 15-17, 2024",
      location: "New York City",
      image: "/placeholder.svg?height=400&width=600&text=JobNOVA+Summit",
      attendees: 1200,
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      date: "July 8, 2024",
      location: "Virtual",
      image: "/placeholder.svg?height=400&width=600&text=Marketing+Masterclass",
      attendees: 850,
    },
    {
      id: 3,
      title: "Freelancer Networking Mixer",
      date: "May 25, 2024",
      location: "London",
      image: "/placeholder.svg?height=400&width=600&text=Networking+Mixer",
      attendees: 300,
    },
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "10 Tips to Boost Your Freelance Career in 2024",
      excerpt:
        "Learn the strategies top freelancers are using to increase their earnings and attract better clients...",
      author: "Sarah Johnson",
      date: "April 28, 2024",
      category: "Career Advice",
      image: "/placeholder.svg?height=300&width=500&text=Career+Tips",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "How to Create a Portfolio That Converts Clients",
      excerpt:
        "Discover the essential elements every freelancer portfolio needs to turn visitors into paying clients...",
      author: "Michael Chen",
      date: "April 15, 2024",
      category: "Marketing",
      image: "/placeholder.svg?height=300&width=500&text=Portfolio+Tips",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "The Future of AI in Freelancing: Opportunities and Challenges",
      excerpt: "Explore how artificial intelligence is transforming the freelance landscape and how to stay ahead...",
      author: "Elena Rodriguez",
      date: "April 3, 2024",
      category: "Technology",
      image: "/placeholder.svg?height=300&width=500&text=AI+Freelancing",
      readTime: "10 min read",
    },
  ]

  const forumTopics = [
    {
      id: 1,
      title: "How do you handle difficult clients?",
      author: "FreelanceNinja",
      replies: 42,
      views: 1250,
      lastActivity: "2 hours ago",
      category: "Client Relations",
    },
    {
      id: 2,
      title: "Tax tips for international freelancers",
      author: "GlobalGigger",
      replies: 28,
      views: 980,
      lastActivity: "5 hours ago",
      category: "Finance",
    },
    {
      id: 3,
      title: "Best tools for project management in 2024",
      author: "OrganizedPro",
      replies: 36,
      views: 1120,
      lastActivity: "1 day ago",
      category: "Tools",
    },
    {
      id: 4,
      title: "How to price your services competitively",
      author: "ValueMaster",
      replies: 53,
      views: 1680,
      lastActivity: "2 days ago",
      category: "Pricing",
    },
  ]

  const podcastEpisodes = [
    {
      id: 1,
      title: "Building a Six-Figure Freelance Business",
      guest: "Alex Morgan, Web Developer",
      duration: "45 min",
      date: "April 25, 2024",
      image: "/placeholder.svg?height=200&width=200&text=Podcast+1",
    },
    {
      id: 2,
      title: "From Side Hustle to Full-Time Freelancing",
      guest: "Jessica Lee, Graphic Designer",
      duration: "38 min",
      date: "April 18, 2024",
      image: "/placeholder.svg?height=200&width=200&text=Podcast+2",
    },
    {
      id: 3,
      title: "Navigating Cross-Cultural Client Relationships",
      guest: "Omar Patel, Marketing Consultant",
      duration: "52 min",
      date: "April 11, 2024",
      image: "/placeholder.svg?height=200&width=200&text=Podcast+3",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">JobNOVA Community</h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
          Connect, learn, and grow with millions of freelancers and businesses in the JobNOVA community
        </p>
        <div className="relative mx-auto h-[400px] w-full max-w-5xl overflow-hidden rounded-xl">
          <Image
            src="/placeholder.svg?height=800&width=1200&text=Community+Hub"
            alt="JobNOVA Community"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Community Highlights */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Community Highlights</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">5M+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Community Members</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <CalendarIcon className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">200+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Events Per Year</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Rss className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">500+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Blog Articles</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">50K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Forum Discussions</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Tabs */}
      <section className="mb-16">
        <Tabs defaultValue="events">
          <TabsList className="mb-8 w-full justify-center">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="podcast">Podcast</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Upcoming Events</h3>
              <Button variant="outline" asChild>
                <Link href="/community/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-[200px] w-full">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{event.location}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {event.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {event.attendees} attendees
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/community/events/${event.id}`}>Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Latest Articles</h3>
              <Button variant="outline" asChild>
                <Link href="/community/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-[200px] w-full">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge>{post.category}</Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-2 text-muted-foreground">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>By {post.author}</span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/community/blog/${post.id}`}>Read Article</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Popular Discussions</h3>
              <Button variant="outline" asChild>
                <Link href="/community/forum">
                  Visit Forum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-4 py-3 text-left">Topic</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-center">Replies</th>
                    <th className="px-4 py-3 text-center">Views</th>
                    <th className="px-4 py-3 text-right">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {forumTopics.map((topic, index) => (
                    <tr key={topic.id} className={`border-t ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}>
                      <td className="px-4 py-4">
                        <Link href={`/community/forum/${topic.id}`} className="font-medium hover:underline">
                          {topic.title}
                        </Link>
                        <div className="text-sm text-muted-foreground">by {topic.author}</div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline">{topic.category}</Badge>
                      </td>
                      <td className="px-4 py-4 text-center">{topic.replies}</td>
                      <td className="px-4 py-4 text-center">{topic.views}</td>
                      <td className="px-4 py-4 text-right text-sm text-muted-foreground">{topic.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Podcast Tab */}
          <TabsContent value="podcast">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">Latest Episodes</h3>
              <Button variant="outline" asChild>
                <Link href="/community/podcast">
                  All Episodes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {podcastEpisodes.map((episode) => (
                <Card key={episode.id} className="flex overflow-hidden">
                  <div className="relative h-auto w-1/3">
                    <Image
                      src={episode.image || "/placeholder.svg"}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-2/3 flex-col">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{episode.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">Guest: {episode.guest}</p>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span>{episode.duration}</span>
                        <span className="text-muted-foreground">{episode.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/community/podcast/${episode.id}`}>
                          <Headphones className="mr-2 h-4 w-4" />
                          Listen
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Community Standards */}
      <section className="mb-16 rounded-xl bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Community Standards</h2>
            <p className="mb-4">
              Our community is built on respect, professionalism, and mutual support. We expect all members to adhere to
              our community standards to create a positive environment for everyone.
            </p>
            <Button asChild>
              <Link href="/community/standards">Read Our Community Standards</Link>
            </Button>
          </div>
          <div className="relative h-[200px] overflow-hidden rounded-xl md:h-auto">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Community+Standards"
              alt="Community Standards"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Join the Community */}
      <section className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Join Our Community Today</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Connect with fellow freelancers, share your experiences, learn from experts, and grow your network. The JobNOVA
          community is waiting for you!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/register">Sign Up Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/community/events">Explore Events</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
