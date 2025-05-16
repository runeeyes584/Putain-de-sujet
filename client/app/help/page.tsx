"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, MessageSquare, Phone, Mail, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="sm" className="mr-4" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for topics or questions..."
            className="w-full pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>
        <TabsContent value="faq">
          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                To reset your password, go to the login page and click on "Forgot password". Follow the instructions
                sent to your email address.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>We accept all major credit cards, PayPal, and bank transfers.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                You can track your order by logging into your account and viewing the order details. A tracking number
                will be provided once your order ships.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="contact">
          {/* Contact Us Section */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
              <CardDescription>We're here to help! Reach out to us through the following channels:</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                <a href="mailto:support@example.com">support@example.com</a>
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-gray-500" />
                <a href="#">Live Chat (Available 24/7)</a>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Submit a Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
