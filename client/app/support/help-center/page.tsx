'use client';
import React from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Book, Video, MessageSquare, FileText, Users } from "lucide-react"

export default function HelpCenterPage() {
  const categories = [
    {
      icon: <Book className="h-8 w-8" />,
      title: "Basic Guides",
      description: "Learn how to get started with JobNOVA and its basic features",
      articles: [
        "How to create an account",
        "Login guide",
        "Update personal information",
        "Account security"
      ]
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Video Tutorials",
      description: "Watch detailed video guides on how to use JobNOVA",
      articles: [
        "Create your first service",
        "Manage orders",
        "Payments and withdrawals",
        "Customer interaction"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Customer Support",
      description: "Get answers to common questions and issues",
      articles: [
        "Dispute resolution",
        "Refund policy",
        "Report violations",
        "Contact support"
      ]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Policy Documents",
      description: "Learn about JobNOVA's policies and terms",
      articles: [
        "Terms of service",
        "Privacy policy",
        "Payment policy",
        "Community guidelines"
      ]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Join the JobNOVA community to learn and share experiences",
      articles: [
        "Discussion forum",
        "Community events",
        "Share experiences",
        "Connect with other users"
      ]
    }
  ];

  const popularTopics = [
    {
      title: "How to create and manage services",
      description: "Detailed guide on creating, editing, and managing your services",
      link: "#"
    },
    {
      title: "Payment and withdrawal process",
      description: "Learn about payment methods and how to withdraw from your account",
      link: "#"
    },
    {
      title: "Dispute and complaint handling",
      description: "Guide on the dispute and complaint resolution process",
      link: "#"
    },
    {
      title: "Seller profile optimization",
      description: "Tips and strategies to optimize your seller profile",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Find answers to your questions or contact our support team
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Support Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="mb-4 text-primary">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.articles.map((article, idx) => (
                      <li key={idx}>
                        <Link href="#" className="text-primary hover:underline">
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Topics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {popularTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                <p className="text-muted-foreground mb-4">{topic.description}</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href={topic.link}>Learn more →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-lg mb-6">
              Our support team is always ready to help. Contact us for quick assistance.
            </p>
            <Button size="lg" asChild>
              <Link href="/support/contact">Contact Support</Link>
            </Button>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Support Email</h4>
                <p className="text-muted-foreground">support@jobnova.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Phone</h4>
                <p className="text-muted-foreground">+84 123 456 789</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Working Hours</h4>
                <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
              </div>
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
              question: "How do I get started with JobNOVA?",
              answer: "Sign up for an account, complete your profile, and start creating services or finding services that match your needs."
            },
            {
              question: "How do payments and withdrawals work?",
              answer: "JobNOVA supports multiple payment methods. You can withdraw funds via bank transfer, e-wallet, or other methods."
            },
            {
              question: "How are disputes resolved?",
              answer: "We have a clear dispute resolution process. You can report issues and our support team will help you resolve them."
            },
            {
              question: "How can I secure my account?",
              answer: "Use a strong password, enable two-factor authentication, and never share your login credentials with anyone."
            }
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
        <h2 className="text-3xl font-bold mb-4">Need more help?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Our support team is available 24/7 to assist you
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/support/contact">Contact Us Now</Link>
        </Button>
      </section>
    </div>
  );
} 