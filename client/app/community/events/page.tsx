import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CalendarIcon, MapPin, Search, Users, Filter } from "lucide-react"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "JobNOVA Freelance Summit 2024",
      date: "June 15-17, 2024",
      location: "New York City",
      image: "/placeholder.svg?height=400&width=600&text=JobNOVA+Summit",
      attendees: 1200,
      category: "Conference",
      description:
        "Join us for our annual flagship event bringing together freelancers, entrepreneurs, and industry leaders for three days of learning, networking, and inspiration.",
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      date: "July 8, 2024",
      location: "Virtual",
      image: "/placeholder.svg?height=400&width=600&text=Marketing+Masterclass",
      attendees: 850,
      category: "Workshop",
      description:
        "Learn cutting-edge digital marketing strategies from industry experts to help grow your freelance business and attract high-value clients.",
    },
    {
      id: 3,
      title: "Freelancer Networking Mixer",
      date: "May 25, 2024",
      location: "London",
      image: "/placeholder.svg?height=400&width=600&text=Networking+Mixer",
      attendees: 300,
      category: "Networking",
      description:
        "Connect with fellow freelancers in a relaxed setting. Share experiences, exchange tips, and build valuable professional relationships.",
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      date: "August 12-16, 2024",
      location: "Berlin",
      image: "/placeholder.svg?height=400&width=600&text=Dev+Bootcamp",
      attendees: 150,
      category: "Workshop",
      description:
        "An intensive 5-day bootcamp covering the latest web development technologies, frameworks, and best practices for freelance developers.",
    },
    {
      id: 5,
      title: "Freelance Business Essentials",
      date: "September 5, 2024",
      location: "Virtual",
      image: "/placeholder.svg?height=400&width=600&text=Business+Essentials",
      attendees: 600,
      category: "Webinar",
      description:
        "Learn the essential business skills every freelancer needs: contracts, pricing, taxes, client management, and more.",
    },
    {
      id: 6,
      title: "Creative Portfolio Review",
      date: "July 22, 2024",
      location: "Toronto",
      image: "/placeholder.svg?height=400&width=600&text=Portfolio+Review",
      attendees: 120,
      category: "Workshop",
      description:
        "Get personalized feedback on your creative portfolio from industry professionals and potential clients.",
    },
  ]

  const pastEvents = [
    {
      id: 101,
      title: "JobNOVA Freelance Summit 2023",
      date: "June 10-12, 2023",
      location: "Miami",
      image: "/placeholder.svg?height=400&width=600&text=2023+Summit",
      attendees: 1100,
      category: "Conference",
      description: "Our annual flagship event from last year featuring keynote speakers, workshops, and networking.",
    },
    {
      id: 102,
      title: "AI for Freelancers Workshop",
      date: "March 15, 2023",
      location: "Virtual",
      image: "/placeholder.svg?height=400&width=600&text=AI+Workshop",
      attendees: 750,
      category: "Workshop",
      description:
        "A workshop exploring how freelancers can leverage AI tools to enhance productivity and service offerings.",
    },
    {
      id: 103,
      title: "Freelancer Tax Preparation Webinar",
      date: "February 8, 2023",
      location: "Virtual",
      image: "/placeholder.svg?height=400&width=600&text=Tax+Webinar",
      attendees: 920,
      category: "Webinar",
      description: "Expert advice on tax preparation and financial planning specifically for freelancers.",
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Community Events</h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
          Connect with the JobNOVA community through virtual and in-person events designed to help you learn, network,
          and grow your freelance business
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-12">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search events..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">Location</Button>
            <Button variant="outline">Category</Button>
            <Button variant="outline">Date</Button>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="mb-16">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-[200px] w-full">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute right-2 top-2">
                      <Badge>{event.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/community/events/${event.id}`}>Details</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/community/events/${event.id}/register`}>Register</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Events Tab */}
          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-[200px] w-full">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute right-2 top-2">
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/community/events/${event.id}`}>View Recap</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Host an Event */}
      <section className="rounded-xl bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Host Your Own Event</h2>
            <p className="mb-6">
              Are you an expert in your field? Share your knowledge with the JobNOVA community by hosting a workshop,
              webinar, or meetup. We provide the platform and audience, you provide the expertise.
            </p>
            <Button asChild>
              <Link href="/community/events/host">Apply to Host an Event</Link>
            </Button>
          </div>
          <div className="relative h-[200px] overflow-hidden rounded-xl md:h-auto">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Host+An+Event"
              alt="Host an event"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
