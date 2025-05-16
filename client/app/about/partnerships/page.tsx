import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export default function PartnershipsPage() {
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrate your technology with JobNOVA to enhance the freelancer and buyer experience.",
      benefits: [
        "API access for seamless integration",
        "Co-marketing opportunities",
        "Joint product development",
        "Access to JobNOVA's global user base",
      ],
      icon: "/logo.png?height=80&width=80",
    },
    {
      title: "Agency Partners",
      description: "Expand your service offerings by accessing JobNOVA's network of skilled freelancers.",
      benefits: [
        "White-label solutions",
        "Dedicated account management",
        "Priority access to top talent",
        "Custom workflow solutions",
      ],
      icon: "/logo.png?height=80&width=80",
    },
    {
      title: "Educational Partners",
      description: "Collaborate with JobNOVA to provide educational resources and career opportunities.",
      benefits: [
        "Co-branded learning materials",
        "Student discounts and programs",
        "Career pathway development",
        "Certification opportunities",
      ],
      icon: "/logo.png?height=80&width=80",
    },
    {
      title: "Affiliate Partners",
      description: "Earn commissions by referring new users to JobNOVA's marketplace.",
      benefits: [
        "Competitive commission structure",
        "Marketing materials and support",
        "Real-time performance tracking",
        "Regular payment schedule",
      ],
      icon: "/logo.png?height=80&width=80",
    },
  ]

  const featuredPartners = [
    {
      name: "Adobe",
      logo: "/icon/adobe.png?height=60&width=120",
      description: "Integrating creative tools directly into the JobNOVA platform.",
    },
    {
      name: "Wix",
      logo: "/icon/wix.png?height=60&width=120",
      description: "Connecting website builders with JobNOVA designers and developers.",
    },
    {
      name: "Canva",
      logo: "/icon/canva.png?height=60&width=120",
      description: "Empowering freelancers with professional design capabilities.",
    },
    {
      name: "HubSpot",
      logo: "/icon/hubspot.png?height=60&width=120",
      description: "Streamlining marketing services for businesses of all sizes.",
    },
    {
      name: "Shopify",
      logo: "/icon/shopify.png?height=60&width=120",
      description: "Helping e-commerce businesses find specialized talent.",
    },
    {
      name: "Zoom",
      logo: "/icon/zoom.png?height=60&width=120",
      description: "Facilitating seamless communication between buyers and sellers.",
    },
  ]

  const successStories = [
    {
      partner: "TechCorp",
      logo: "/icon/tech.png?height=80&width=80",
      title: "Scaling Design Operations with JobNOVA Enterprise",
      quote:
        "Our partnership with JobNOVA has allowed us to scale our design operations efficiently, accessing specialized talent when we need it most.",
      person: "Sarah Johnson, VP of Design at TechCorp",
      image: "/icon/?height=300&width=400",
    },
    {
      partner: "EduLearn",
      logo: "/icon/edu.png?height=80&width=80",
      title: "Creating Career Pathways for Students",
      quote:
        "By partnering with JobNOVA, we've created real-world opportunities for our students to gain experience and build their portfolios.",
      person: "Michael Chen, Director at EduLearn",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      partner: "MarketPro",
      logo: "/icon/market.png?height=80&width=80",
      title: "Expanding Service Offerings Through Partnership",
      quote:
        "Our agency has been able to take on more diverse projects by leveraging JobNOVA's talent pool, increasing our revenue by 35%.",
      person: "Jessica Williams, CEO of MarketPro",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Partner with JobNOVA</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Join forces with the world's largest marketplace for digital services and create new opportunities for growth
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#become-partner">Become a Partner</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#partner-types">Explore Partnership Types</Link>
          </Button>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Why Partner With Us?</h2>
          <p className="text-lg mb-6">
            Partnering with JobNOVA opens doors to a global community of freelancers and businesses. Together, we can
            create innovative solutions, expand market reach, and drive mutual growth.
          </p>
          <div className="space-y-4">
            {[
              "Access to millions of users worldwide",
              "Co-marketing and brand exposure opportunities",
              "Revenue sharing and growth potential",
              "Innovative integration possibilities",
              "Dedicated partnership support team",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-2 flex-shrink-0" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img
            src="/banner/banner-partner.jpg?height=400&width=600"
            alt="Partnership benefits"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Partner Types Section */}
      <section id="partner-types" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Partnership Opportunities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {partnerTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 mr-4 flex-shrink-0">
                    <img
                      src={type.icon || "/placeholder.svg"}
                      alt={type.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <p className="text-sm">{benefit}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`#${type.title.toLowerCase().replace(/\s+/g, "-")}`}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Partners Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {featuredPartners.map((partner, index) => (
            <div
              key={index}
              className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
            >
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12 mb-4 object-contain" />
              <p className="text-sm text-center">{partner.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/about/partnerships/directory">View All Partners</Link>
          </Button>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
        <Tabs defaultValue={successStories[0].partner}>
          <TabsList className="flex justify-center mb-8">
            {successStories.map((story, index) => (
              <TabsTrigger key={index} value={story.partner} className="flex items-center">
                <img
                  src={story.logo || "/placeholder.svg"}
                  alt={story.partner}
                  className="h-6 w-6 mr-2 object-contain"
                />
                {story.partner}
              </TabsTrigger>
            ))}
          </TabsList>

          {successStories.map((story, index) => (
            <TabsContent key={index} value={story.partner}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{story.title}</h3>
                  <p className="text-lg italic mb-6">"{story.quote}"</p>
                  <p className="font-medium">{story.person}</p>
                  <Button className="mt-6" variant="outline" asChild>
                    <Link href={`/about/partnerships/case-studies/${story.partner.toLowerCase()}`}>
                      Read Full Case Study
                    </Link>
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Become a Partner Section */}
      <section id="become-partner" className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-muted rounded-xl p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
            <p className="text-lg mb-6">
              Interested in exploring partnership opportunities with JobNOVA? Fill out the form and our partnerships team
              will get in touch with you to discuss potential collaboration.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-1">Submit Your Application</h3>
                  <p className="text-muted-foreground">
                    Fill out the partnership inquiry form with your details and partnership idea.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-1">Initial Consultation</h3>
                  <p className="text-muted-foreground">
                    Our partnerships team will review your application and schedule a call to discuss further.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-1">Partnership Development</h3>
                  <p className="text-muted-foreground">
                    Together, we'll create a tailored partnership plan that aligns with both our goals.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-bold mb-1">Launch & Growth</h3>
                  <p className="text-muted-foreground">
                    Implement the partnership and work together to ensure its success and growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Partnership Inquiry Form</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name*</label>
                  <Input placeholder="First Name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name*</label>
                  <Input placeholder="Last Name" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name*</label>
                <Input placeholder="Company Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Work Email*</label>
                <Input placeholder="your@company.com" type="email" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input placeholder="Phone Number" type="tel" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Website*</label>
                <Input placeholder="https://www.example.com" type="url" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Partnership Type*</label>
                <select className="w-full h-10 px-3 rounded-md border border-input bg-background" required>
                  <option value="">Select Partnership Type</option>
                  <option>Technology Partner</option>
                  <option>Agency Partner</option>
                  <option>Educational Partner</option>
                  <option>Affiliate Partner</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tell us about your partnership idea*</label>
                <textarea
                  className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background resize-y"
                  placeholder="Please describe your partnership idea and how it could benefit both parties"
                  required
                ></textarea>
              </div>
              <Button className="w-full">Submit Inquiry</Button>
              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our{" "}
                <Link href="/about/privacy-policy" className="underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/about/terms" className="underline">
                  Terms of Service
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              question: "What types of partnerships does JobNOVA offer?",
              answer:
                "JobNOVA offers various partnership types including technology integrations, agency partnerships, educational collaborations, and affiliate programs. Each type is designed to create mutual value and gro",
            },
            {
              question: "How long does the partnership process take?",
              answer:
                "The timeline varies depending on the partnership type and complexity. Simple integrations may take a few weeks, while more complex partnerships could take several months to develop and implement.",
            },
            {
              question: "Is there a cost associated with becoming a JobNOVA partner?",
              answer:
                "Partnership costs vary based on the type and scope. Some partnerships like our affiliate program have no upfront costs, while others may involve investment from both parties. Details are discussed during the consultation phase.",
            },
            {
              question: "Can small businesses or startups become JobNOVA partners?",
              answer:
                "We partner with organizations of all sizes. We evaluate partnerships based on strategic alignment, innovation potential, and mutual value creation rather than company size.",
            },
            {
              question: "What support does JobNOVA provide to partners?",
              answer:
                "Partners receive dedicated support from our partnerships team, access to relevant APIs and resources, co-marketing opportunities, and regular performance reviews to ensure the partnership's success.",
            },
            {
              question: "How are partnership success metrics determined?",
              answer:
                "Success metrics are established collaboratively during the partnership development phase and are tailored to the specific goals of each partnership. These might include user adoption, revenue generation, or other relevant KPIs.",
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary text-primary-foreground rounded-xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore Partnership Opportunities?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join the JobNOVA ecosystem and create new possibilities for your business and our global community.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link href="#become-partner">Get Started Today</Link>
        </Button>
      </section>
    </div>
  )
}
