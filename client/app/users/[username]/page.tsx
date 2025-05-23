import Image from "next/image"
import { Star, MapPin, Flag, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceCard } from "@/components/service-card"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  // In a real app, you would fetch the user data based on the username
  const user = sampleUser

  return (
    <main className="flex-1 bg-gray-50 py-8">
      <div className="container px-4">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center md:items-start md:flex-row md:gap-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              </div>
              <div className="mt-4 text-center md:mt-0 md:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-lg text-gray-600">@{user.username}</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{user.rating}</span>
                    <span className="ml-1 text-gray-600">({user.reviewCount})</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {user.location}
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="text-gray-600">Member since {user.memberSince}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 md:ml-auto md:mt-0">
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Me
              </Button>
              <Button variant="outline">
                <Flag className="mr-2 h-4 w-4" />
                Report User
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column - About & Info */}
          <div className="w-full lg:w-1/3">
            {/* About Section */}
            <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">About Me</h2>
              <div className="space-y-4 text-gray-700">
                <p>{user.about}</p>
              </div>
            </div>

            {/* Languages */}
            <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Languages</h2>
              <ul className="space-y-3">
                {user.languages.map((language) => (
                  <li key={language.name} className="flex justify-between">
                    <span>{language.name}</span>
                    <span className="text-gray-600">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Education</h2>
              <ul className="space-y-4">
                {user.education.map((edu) => (
                  <li key={edu.degree} className="space-y-1">
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-gray-600">{edu.institution}</div>
                    <div className="text-sm text-gray-500">{edu.years}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Gigs & Reviews */}
          <div className="flex-1">
            <Tabs defaultValue="gigs" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="gigs">Gigs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="gigs">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {user.gigs.map((gig) => (
                    <ServiceCard key={gig.id} service={gig} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{user.rating}</span>
                      </div>
                      <span className="text-gray-600">({user.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {user.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                        <div className="mb-3 flex items-center gap-3">
                          <Image
                            src={review.buyer.avatar || "/placeholder.svg"}
                            alt={review.buyer.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div>
                            <div className="font-medium">{review.buyer.name}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1">{review.rating}</span>
                              </div>
                              <span>|</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full">
                      Show More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

// Sample data
const sampleUser = {
  id: "1",
  name: "Alex Johnson",
  username: "alexdesigns",
  avatar: "/placeholder.svg?height=200&width=200",
  location: "New York, USA",
  memberSince: "April 2020",
  rating: 4.9,
  reviewCount: 156,
  about:
    "Hi there! I'm Alex, a professional graphic designer with over 7 years of experience specializing in logo design and brand identity. I have a passion for creating unique, memorable logos that perfectly capture the essence of your brand. My design philosophy centers around simplicity, memorability, and timeless appeal. I believe that a great logo should tell your brand's story at a glance. When you work with me, you're not just getting a logo – you're getting a dedicated partner who cares about your business success.",
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Conversational" },
    { name: "French", level: "Basic" },
  ],
  skills: [
    "Logo Design",
    "Brand Identity",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Typography",
    "Color Theory",
    "Vector Art",
    "Illustration",
  ],
  education: [
    {
      degree: "Bachelor of Fine Arts in Graphic Design",
      institution: "Parsons School of Design",
      years: "2013 - 2017",
    },
    {
      degree: "Certificate in Digital Marketing",
      institution: "New York Digital Academy",
      years: "2018",
    },
  ],
  gigs: [
    {
      id: 1,
      title: "I will design a professional logo for your business",
      price: 25,
      image: "/placeholder.svg?height=200&width=300",
      seller: {
        name: "AlexDesigns",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Level 2 Seller",
      },
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: 2,
      title: "I will create a complete brand identity package",
      price: 120,
      image: "/placeholder.svg?height=200&width=300",
      seller: {
        name: "AlexDesigns",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Level 2 Seller",
      },
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: 3,
      title: "I will design social media graphics for your brand",
      price: 45,
      image: "/placeholder.svg?height=200&width=300",
      seller: {
        name: "AlexDesigns",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Level 2 Seller",
      },
      rating: 4.9,
      reviewCount: 156,
    },
    {
      id: 4,
      title: "I will create custom illustrations for your project",
      price: 65,
      image: "/placeholder.svg?height=200&width=300",
      seller: {
        name: "AlexDesigns",
        avatar: "/placeholder.svg?height=40&width=40",
        level: "Level 2 Seller",
      },
      rating: 4.9,
      reviewCount: 156,
    },
  ],
  reviews: [
    {
      id: "1",
      buyer: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely amazing work! Alex delivered exactly what I was looking for and was very responsive to my feedback. The logo perfectly captures my brand's essence. I highly recommend his services!",
    },
    {
      id: "2",
      buyer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "1 month ago",
      comment:
        "Working with Alex was a pleasure. He understood my vision from the start and delivered a stunning logo that exceeded my expectations. The process was smooth, and he was very patient with my revision requests.",
    },
    {
      id: "3",
      buyer: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 4,
      date: "2 months ago",
      comment:
        "Great experience overall. The logo looks professional and modern. I would have liked a bit more variety in the initial concepts, but the final result is excellent. Would use this service again.",
    },
    {
      id: "4",
      buyer: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      rating: 5,
      date: "3 months ago",
      comment:
        "Alex is incredibly talented and professional. He took my vague ideas and transformed them into a perfect logo. The communication was excellent throughout the process. Highly recommended!",
    },
  ],
}
