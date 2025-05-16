import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BecomeSellerPage() {
  const benefits = [
    "Access to millions of customers worldwide",
    "Freedom to work on your own schedule",
    "Set your own rates and service offerings",
    "Get paid securely and on time",
    "Build your professional portfolio",
    "Join a community of talented freelancers",
  ]

  const steps = [
    {
      title: "Create your seller profile",
      description: "Showcase your skills, experience, and portfolio to stand out",
    },
    {
      title: "Create your first gig",
      description: "Define your service, set your price, and add compelling descriptions",
    },
    {
      title: "Start receiving orders",
      description: "Deliver quality work on time and build your reputation",
    },
    {
      title: "Grow your business",
      description: "Increase your earnings and expand your service offerings",
    },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Become a Seller</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Join our global community of freelancers</h2>
          <p className="text-gray-600 mb-6">
            Turn your skills into income by offering your services to clients around the world. Whether you're a
            designer, writer, developer, or have any other marketable skill, there's a place for you on our platform.
          </p>

          <h3 className="text-lg font-medium mb-3">Why become a seller?</h3>
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button className="bg-emerald-600 hover:bg-emerald-700 w-full md:w-auto">Get Started Now</Button>
        </div>

        <div>
          <img
            src="/banner/banner-seller.jpg?height=300&width=500"
            alt="Freelancer working"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <h3 className="text-lg font-medium mb-4">How it works</h3>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <Card key={index} className="border-l-4 border-emerald-600">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-600 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Ready to start earning?</h2>
        <p className="text-gray-600 mb-4">
          Join thousands of freelancers who are building successful businesses on our platform.
        </p>
        <Link href="/register?type=seller">
          <Button className="bg-emerald-600 hover:bg-emerald-700">Create Seller Account</Button>
        </Link>
      </div>
    </div>
  )
}
