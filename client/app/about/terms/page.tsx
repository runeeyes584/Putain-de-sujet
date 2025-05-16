import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link href="/about">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to About
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Terms of Service</h1>
      </div>

      <div className="mb-8 rounded-lg bg-muted p-4">
        <p className="text-sm">
          <strong>Last Updated:</strong> May 1, 2024
        </p>
      </div>

      <Tabs defaultValue="users" className="mb-8">
        <TabsList className="w-full">
          <TabsTrigger value="users" className="flex-1">
            For Users
          </TabsTrigger>
          <TabsTrigger value="sellers" className="flex-1">
            For Sellers
          </TabsTrigger>
          <TabsTrigger value="business" className="flex-1">
            For Business
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="pt-6">
          <div className="grid gap-8 md:grid-cols-[250px_1fr]">
            {/* Sidebar Navigation */}
            <div className="hidden md:block">
              <div className="sticky top-20 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#introduction">Introduction</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#key-terms">Key Terms</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#account">Account Terms</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#purchasing">Purchasing Terms</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#payments">Payments</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#refunds">Refunds</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#content">User Content</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#prohibited">Prohibited Uses</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#termination">Termination</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#disclaimers">Disclaimers</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#liability">Limitation of Liability</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#disputes">Dispute Resolution</a>
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose max-w-none">
              <section id="introduction" className="mb-8">
                <h2 className="text-2xl font-bold">Introduction</h2>
                <p>
                  Welcome to Fiverr. These Terms of Service ("Terms") govern your access to and use of the Fiverr
                  website, mobile applications, and other online products and services (collectively, the "Services").
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these
                  Terms, you may not access or use the Services.
                </p>
              </section>

              <section id="key-terms" className="mb-8">
                <h2 className="text-2xl font-bold">Key Terms</h2>
                <ul>
                  <li>
                    <strong>Buyer:</strong> Any user who purchases services on Fiverr.
                  </li>
                  <li>
                    <strong>Seller:</strong> Any user who offers and provides services on Fiverr.
                  </li>
                  <li>
                    <strong>Gig:</strong> A service offered by a Seller on Fiverr.
                  </li>
                  <li>
                    <strong>Order:</strong> A Buyer's purchase of a Gig from a Seller.
                  </li>
                  <li>
                    <strong>Order Page:</strong> The page provided to manage the Gig purchase, delivery, and payment.
                  </li>
                </ul>
              </section>

              <section id="account" className="mb-8">
                <h2 className="text-2xl font-bold">Account Terms</h2>
                <p>
                  To use our Services, you must create an account. When you create an account, you must provide accurate
                  and complete information. You are responsible for maintaining the security of your account and
                  password. Fiverr cannot and will not be liable for any loss or damage resulting from your failure to
                  comply with this security obligation.
                </p>
                <p>
                  You are responsible for all activity that occurs under your account. You agree to notify Fiverr
                  immediately of any unauthorized use of your account or any other breach of security.
                </p>
              </section>

              <section id="purchasing" className="mb-8">
                <h2 className="text-2xl font-bold">Purchasing Terms</h2>
                <p>
                  When you purchase a Gig on Fiverr, you are entering into a contract directly with the Seller. Fiverr
                  is not a party to that contract but facilitates the transaction between you and the Seller.
                </p>
                <p>
                  Before purchasing a Gig, you should carefully review the Gig description, price, delivery time, and
                  any additional terms specified by the Seller. By placing an Order, you agree to be bound by the Gig
                  description and any additional terms specified by the Seller.
                </p>
                <p>
                  Once you place an Order, you cannot cancel it unless the Seller agrees to the cancellation or fails to
                  deliver the Order within the specified timeframe.
                </p>
              </section>

              <section id="payments" className="mb-8">
                <h2 className="text-2xl font-bold">Payments</h2>
                <p>
                  All payments are processed through Fiverr's payment system. You agree to pay the full amount for any
                  Gig you purchase, including the Gig price, any additional services, and applicable fees and taxes.
                </p>
                <p>
                  Fiverr holds your payment until the Order is completed. Once you confirm that the Order has been
                  completed to your satisfaction, the payment is released to the Seller.
                </p>
                <p>
                  If you do not take action (confirm completion or request revisions) within 3 days after the Seller
                  marks the Order as delivered, the Order will be automatically marked as complete, and payment will be
                  released to the Seller.
                </p>
              </section>

              <section id="refunds" className="mb-8">
                <h2 className="text-2xl font-bold">Refunds</h2>
                <p>
                  If you are not satisfied with the delivered work, you can request revisions according to the Seller's
                  revision policy. If the Seller cannot resolve the issue to your satisfaction, you may be eligible for
                  a refund.
                </p>
                <p>
                  Refund eligibility depends on various factors, including the nature of the issue, the Seller's
                  revision policy, and whether the Seller has made reasonable efforts to address your concerns. Fiverr
                  reserves the right to determine refund eligibility at its sole discretion.
                </p>
              </section>

              <section id="content" className="mb-8">
                <h2 className="text-2xl font-bold">User Content</h2>
                <p>
                  You retain ownership of any content you submit, post, or display on or through the Services. By
                  submitting, posting, or displaying content on or through the Services, you grant Fiverr a worldwide,
                  non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute,
                  and display such content.
                </p>
                <p>
                  You represent and warrant that you own or have the necessary rights to the content you submit, and
                  that the content does not infringe the intellectual property rights or other rights of any third
                  party.
                </p>
              </section>

              <section id="prohibited" className="mb-8">
                <h2 className="text-2xl font-bold">Prohibited Uses</h2>
                <p>
                  You may not use the Services for any illegal or unauthorized purpose. You agree to comply with all
                  laws, rules, and regulations applicable to your use of the Services.
                </p>
                <p>Prohibited activities include, but are not limited to:</p>
                <ul>
                  <li>Violating any applicable law or regulation</li>
                  <li>Infringing the intellectual property rights of others</li>
                  <li>Engaging in fraudulent or deceptive practices</li>
                  <li>Harassing, threatening, or intimidating others</li>
                  <li>Posting or transmitting malicious code or viruses</li>
                  <li>Attempting to gain unauthorized access to Fiverr's systems or user accounts</li>
                  <li>Using the Services to promote illegal activities or products</li>
                </ul>
              </section>

              <section id="termination" className="mb-8">
                <h2 className="text-2xl font-bold">Termination</h2>
                <p>
                  Fiverr may terminate or suspend your account and access to the Services at any time, without prior
                  notice or liability, for any reason, including if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms
                  that by their nature should survive termination shall survive termination, including ownership
                  provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              <section id="disclaimers" className="mb-8">
                <h2 className="text-2xl font-bold">Disclaimers</h2>
                <p>
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  FIVERR DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE
                  CORRECTED, OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER
                  HARMFUL COMPONENTS.
                </p>
              </section>

              <section id="liability" className="mb-8">
                <h2 className="text-2xl font-bold">Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL FIVERR, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF
                  PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR
                  INABILITY TO ACCESS OR USE THE SERVICES.
                </p>
              </section>

              <section id="disputes" className="mb-8">
                <h2 className="text-2xl font-bold">Dispute Resolution</h2>
                <p>
                  Any disputes arising out of or relating to these Terms or the Services shall be resolved through
                  binding arbitration in accordance with the rules of the American Arbitration Association. The
                  arbitration shall be conducted in English and shall take place in New York, New York.
                </p>
                <p>
                  You agree that any dispute resolution proceedings will be conducted only on an individual basis and
                  not in a class, consolidated, or representative action. If for any reason a claim proceeds in court
                  rather than in arbitration, you waive any right to a jury trial.
                </p>
              </section>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="sellers" className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg">
              This tab would contain the Terms of Service specifically for Sellers on the Fiverr platform, including:
            </p>
            <ul>
              <li>Seller eligibility requirements</li>
              <li>Gig creation and management policies</li>
              <li>Service delivery requirements</li>
              <li>Payment terms and fees</li>
              <li>Intellectual property rights</li>
              <li>Communication guidelines</li>
              <li>Dispute resolution process</li>
              <li>Account termination policies</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="business" className="pt-6">
          <div className="prose max-w-none">
            <p className="text-lg">
              This tab would contain the Terms of Service specifically for Business users of the Fiverr platform,
              including:
            </p>
            <ul>
              <li>Business account requirements</li>
              <li>Team management features</li>
              <li>Enterprise billing options</li>
              <li>Service level agreements</li>
              <li>Confidentiality provisions</li>
              <li>Custom workflow solutions</li>
              <li>Dedicated support services</li>
              <li>Compliance and security measures</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
