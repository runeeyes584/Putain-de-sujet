import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "10 Tips to Boost Your Freelance Career in 2024",
      excerpt:
        "Learn the strategies top freelancers are using to increase their earnings and attract better clients in today's competitive market.",
      author: "Sarah Johnson",
      authorRole: "Senior Content Strategist",
      authorImage: "/placeholder.svg?height=100&width=100&text=SJ",
      date: "April 28, 2024",
      category: "Career Advice",
      image: "/placeholder.svg?height=600&width=1200&text=Career+Tips",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "How to Create a Portfolio That Converts Clients",
      excerpt:
        "Discover the essential elements every freelancer portfolio needs to turn visitors into paying clients. Includes real examples and templates.",
      author: "Michael Chen",
      authorRole: "UX Designer",
      authorImage: "/placeholder.svg?height=100&width=100&text=MC",
      date: "April 15, 2024",
      category: "Marketing",
      image: "/placeholder.svg?height=600&width=1200&text=Portfolio+Tips",
      readTime: "6 min read",
    },
  ]

  const recentPosts = [
    {
      id: 3,
      title: "The Future of AI in Freelancing: Opportunities and Challenges",
      excerpt:
        "Explore how artificial intelligence is transforming the freelance landscape and how to stay ahead of the curve.",
      author: "Elena Rodriguez",
      authorRole: "Tech Analyst",
      authorImage: "/placeholder.svg?height=100&width=100&text=ER",
      date: "April 3, 2024",
      category: "Technology",
      image: "/placeholder.svg?height=300&width=500&text=AI+Freelancing",
      readTime: "10 min read",
    },
    {
      id: 4,
      title: "Tax Planning for Freelancers: A Global Guide",
      excerpt:
        "Navigate the complex world of freelance taxes with this comprehensive guide covering multiple countries and jurisdictions.",
      author: "David Kim",
      authorRole: "Financial Advisor",
      authorImage: "/placeholder.svg?height=100&width=100&text=DK",
      date: "March 25, 2024",
      category: "Finance",
      image: "/placeholder.svg?height=300&width=500&text=Tax+Planning",
      readTime: "12 min read",
    },
    {
      id: 5,
      title: "Building Client Relationships That Last",
      excerpt:
        "Learn how to transform one-time clients into long-term partners who provide steady income and referrals.",
      author: "Jessica Patel",
      authorRole: "Business Coach",
      authorImage: "/placeholder.svg?height=100&width=100&text=JP",
      date: "March 18, 2024",
      category: "Client Relations",
      image: "/placeholder.svg?height=300&width=500&text=Client+Relationships",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Productivity Systems for the Busy Freelancer",
      excerpt:
        "Discover time-tested productivity systems that help freelancers manage multiple projects without burning out.",
      author: "Thomas Wright",
      authorRole: "Productivity Coach",
      authorImage: "/placeholder.svg?height=100&width=100&text=TW",
      date: "March 10, 2024",
      category: "Productivity",
      image: "/placeholder.svg?height=300&width=500&text=Productivity",
      readTime: "9 min read",
    },
    {
      id: 7,
      title: "From Freelancer to Agency: Scaling Your Business",
      excerpt:
        "Ready to grow beyond solo freelancing? This guide covers everything you need to know about building a team and scaling up.",
      author: "Olivia Martinez",
      authorRole: "Agency Founder",
      authorImage: "/placeholder.svg?height=100&width=100&text=OM",
      date: "March 3, 2024",
      category: "Business Growth",
      image: "/placeholder.svg?height=300&width=500&text=Scaling+Business",
      readTime: "11 min read",
    },
    {
      id: 8,
      title: "Mastering the Art of Freelance Proposals",
      excerpt:
        "Learn how to craft proposals that stand out from the competition and win high-value projects consistently.",
      author: "James Wilson",
      authorRole: "Proposal Specialist",
      authorImage: "/placeholder.svg?height=100&width=100&text=JW",
      date: "February 25, 2024",
      category: "Marketing",
      image: "/placeholder.svg?height=300&width=500&text=Proposals",
      readTime: "8 min read",
    },
  ]

  const categories = [
    "All Categories",
    "Career Advice",
    "Marketing",
    "Technology",
    "Finance",
    "Client Relations",
    "Productivity",
    "Business Growth",
    "Design",
    "Writing",
    "Development",
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">JobNOVA Blog</h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
          Insights, tips, and resources to help you succeed in the freelance economy
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-12">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[180px]">
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold">Featured Articles</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-[300px] w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute left-4 top-4">
                  <Badge className="text-sm">{post.category}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/community/blog/${post.id}`}>Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Recent Articles</h2>
          <Button variant="outline" asChild>
            <Link href="/community/blog/archive">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-[200px] w-full">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute left-3 top-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>By {post.author}</span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {post.readTime}
                  </div>
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
      </section>

      {/* Topics */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Popular Topics</h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((category) => category !== "All Categories")
            .map((category) => (
              <Link key={category} href={`/community/blog/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                <Badge variant="outline" className="text-sm hover:bg-muted">
                  {category}
                </Badge>
              </Link>
            ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="rounded-xl bg-muted p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="mx-auto mb-6 max-w-2xl">
          Get the latest articles, resources, and freelancing tips delivered directly to your inbox.
        </p>
        <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
          <Input type="email" placeholder="Enter your email" className="flex-1" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </main>
  )
}
