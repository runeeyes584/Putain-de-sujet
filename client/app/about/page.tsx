import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">About Fiverr</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Fiverr connects businesses with freelancers offering digital services in 500+ categories
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/join">Join Fiverr</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about/careers">Explore Careers</Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            To change how the world works together. Fiverr's platform connects businesses of all sizes with skilled
            freelancers offering digital services.
          </p>
          <p className="text-lg">
            We're creating opportunities for anyone in the world to build their business, brand, or dreams
            independently.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Fiverr mission"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Fiverr by the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">5.5M+</p>
            <p className="text-muted-foreground">Active Buyers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">830K+</p>
            <p className="text-muted-foreground">Active Sellers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">160+</p>
            <p className="text-muted-foreground">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Categories</p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Micha Kaufman",
              title: "Founder & CEO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Hila Klein",
              title: "COO",
              image: "/placeholder.svg?height=300&width=300",
            },
            {
              name: "Ofer Katz",
              title: "President & CFO",
              image: "/placeholder.svg?height=300&width=300",
            },
          ].map((leader, index) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{leader.name}</h3>
                <p className="text-muted-foreground">{leader.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Company Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Innovation",
              description: "We constantly push boundaries to create better experiences.",
            },
            {
              title: "Inclusion",
              description: "We believe talent is universal, but opportunity is not.",
            },
            {
              title: "Integrity",
              description: "We operate with transparency and honesty in all we do.",
            },
            {
              title: "Impact",
              description: "We measure success by the positive change we create.",
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary text-primary-foreground rounded-xl p-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Whether you're looking to hire or be hired, Fiverr has a place for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/become-seller">Become a Seller</Link>
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-white hover:bg-white hover:text-primary"
            size="lg"
            asChild
          >
            <Link href="/register">Join as a Buyer</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
