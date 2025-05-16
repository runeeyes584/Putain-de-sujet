import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function PressPage() {
  const pressReleases = [
    {
      title: "Fiverr Announces Fourth Quarter and Full Year 2023 Results",
      date: "February 21, 2024",
      category: "Financial",
      excerpt:
        "Revenue grew 10% year over year to $91.4 million for the fourth quarter of 2023, and 8% year over year to $351.1 million for the full year 2023.",
    },
    {
      title: "Fiverr Introduces AI-Powered Tools to Enhance Freelancer Productivity",
      date: "January 15, 2024",
      category: "Product",
      excerpt:
        "New suite of AI tools helps freelancers create better proposals, manage projects more efficiently, and deliver higher quality work to clients.",
    },
    {
      title: "Fiverr Expands Business Solutions to Enterprise Clients",
      date: "December 5, 2023",
      category: "Business",
      excerpt:
        "Fiverr Business Solutions now offers enterprise-grade services to Fortune 500 companies, providing access to top-tier freelance talent.",
    },
    {
      title: "Fiverr Launches Certified Program for Top-Tier Freelancers",
      date: "November 10, 2023",
      category: "Product",
      excerpt:
        "New certification program recognizes and rewards the platform's most skilled and reliable freelancers with enhanced visibility and benefits.",
    },
    {
      title: "Fiverr Reports Third Quarter 2023 Financial Results",
      date: "November 8, 2023",
      category: "Financial",
      excerpt:
        "Revenue increased by 12% year over year to $88.3 million. Active buyers reached 4.2 million, up 2% year over year.",
    },
    {
      title: "Fiverr Announces Expansion into 5 New Markets",
      date: "October 3, 2023",
      category: "Business",
      excerpt:
        "Platform now available in local languages and currencies in Poland, Sweden, Denmark, Norway, and Finland, bringing total to 25 countries.",
    },
  ]

  const mediaAppearances = [
    {
      title: "How Fiverr Is Changing The Future Of Work",
      publication: "Forbes",
      date: "March 15, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Fiverr CEO on the Rise of Freelance Economy",
      publication: "CNBC",
      date: "February 22, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "The Platform Revolutionizing How Businesses Find Talent",
      publication: "Bloomberg",
      date: "January 30, 2024",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Fiverr's Impact on the Global Gig Economy",
      publication: "The Economist",
      date: "December 12, 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Press & News</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Stay up to date with the latest news, press releases, and media coverage about Fiverr
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#press-releases">Press Releases</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#media-kit">Media Kit</Link>
          </Button>
        </div>
      </section>

      {/* Press Contact Section */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Press Contact</h2>
            <p className="text-lg mb-6">
              For press inquiries, please contact our media relations team. We're happy to provide information, arrange
              interviews with Fiverr executives, or assist with any other media needs.
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> press@fiverr.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Hours:</strong> Monday-Friday, 9am-6pm ET
              </p>
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Media Request Form</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input placeholder="First Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <Input placeholder="Last Name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input placeholder="your@email.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publication/Organization</label>
                <Input placeholder="Publication or Organization" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Inquiry Type</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                  <option>Interview Request</option>
                  <option>Press Kit</option>
                  <option>Comment Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background resize-y"
                  placeholder="Please describe your request"
                ></textarea>
              </div>
              <Button className="w-full">Submit Request</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases Section */}
      <section id="press-releases" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Press Releases</h2>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="flex flex-wrap h-auto mb-6">
            {["All", "Financial", "Product", "Business"].map((category, index) => (
              <TabsTrigger key={index} value={category} className="mb-2">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {["All", "Financial", "Product", "Business"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="space-y-6">
                {pressReleases
                  .filter((release) => category === "All" || release.category === category)
                  .map((release, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <span>{release.date}</span>
                            <span className="mx-2">•</span>
                            <span className="bg-muted px-2 py-0.5 rounded-full text-xs">{release.category}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                          <p className="mb-4">{release.excerpt}</p>
                          <Button variant="link" className="self-start p-0" asChild>
                            <Link href={`/about/press/${release.title.toLowerCase().replace(/\s+/g, "-")}`}>
                              Read More →
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/about/press/archive">View All Press Releases</Link>
          </Button>
        </div>
      </section>

      {/* Media Coverage Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Media Coverage</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaAppearances.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <span>{item.publication}</span>
                  <span className="mx-2">•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <Button variant="link" className="p-0" asChild>
                  <Link href="#">Read Article →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/about/press/media-coverage">View All Media Coverage</Link>
          </Button>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Media Kit</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Download Our Media Kit</h3>
            <p className="mb-6">
              Our media kit includes company information, executive bios, logos, brand guidelines, high-resolution
              images, and more resources for press and media professionals.
            </p>
            <Button size="lg" asChild>
              <Link href="/downloads/fiverr-media-kit.zip">Download Media Kit</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <img src="/placeholder.svg?height=100&width=200" alt="Fiverr logo" className="mx-auto mb-2" />
              <p className="text-sm font-medium">Fiverr Logos</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <img src="/placeholder.svg?height=100&width=200" alt="Brand guidelines" className="mx-auto mb-2" />
              <p className="text-sm font-medium">Brand Guidelines</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <img src="/placeholder.svg?height=100&width=200" alt="Executive photos" className="mx-auto mb-2" />
              <p className="text-sm font-medium">Executive Photos</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <img src="/placeholder.svg?height=100&width=200" alt="Product screenshots" className="mx-auto mb-2" />
              <p className="text-sm font-medium">Product Screenshots</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Facts Section */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Company Facts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Fiverr</h3>
            <p className="mb-4">
              Fiverr's mission is to change how the world works together. The Fiverr platform connects businesses with
              freelancers offering digital services in more than 500 categories across 9 verticals including graphic
              design, digital marketing, programming, video, and animation.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                <span>Founded in 2010 by Micha Kaufman and Shai Wininger</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                <span>Headquartered in New York with offices worldwide</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                <span>Publicly traded on the NYSE (FVRR) since 2019</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                <span>Over 4 million active buyers from more than 160 countries</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Key Milestones</h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4 text-right w-16 font-bold">2010</div>
                <div className="flex-1 pb-4 border-l-2 border-primary pl-4">Fiverr founded in Tel Aviv, Israel</div>
              </div>
              <div className="flex">
                <div className="mr-4 text-right w-16 font-bold">2015</div>
                <div className="flex-1 pb-4 border-l-2 border-primary pl-4">
                  Introduced Fiverr Pro, offering curated professional services
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-right w-16 font-bold">2019</div>
                <div className="flex-1 pb-4 border-l-2 border-primary pl-4">
                  Initial public offering on the New York Stock Exchange
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-right w-16 font-bold">2020</div>
                <div className="flex-1 pb-4 border-l-2 border-primary pl-4">
                  Launched Fiverr Business for team collaboration
                </div>
              </div>
              <div className="flex">
                <div className="mr-4 text-right w-16 font-bold">2023</div>
                <div className="flex-1 pb-4 border-l-2 border-primary pl-4">
                  Introduced AI-powered tools for freelancers and buyers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="text-center bg-primary text-primary-foreground rounded-xl p-12">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our press release mailing list to receive the latest news and updates from Fiverr.
        </p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <Input placeholder="Enter your email" className="bg-white text-black placeholder:text-gray-500" />
          <Button variant="secondary">Subscribe</Button>
        </div>
      </section>
    </div>
  )
}
