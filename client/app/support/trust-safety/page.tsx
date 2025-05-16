'use client';
import React from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, UserCheck, AlertTriangle } from "lucide-react"

export default function TrustSafetyPage() {
  const safetyFeatures = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "All transactions are protected by our secure payment system."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Data Protection",
      description: "Your data is encrypted and protected according to the highest security standards."
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "User Verification",
      description: "Multi-layer identity verification system to ensure community safety."
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Violation Reporting",
      description: "Quick and effective reporting tools for any policy violations."
    }
  ];

  const safetyTips = [
    {
      title: "Account Protection",
      tips: [
        "Use strong and unique passwords",
        "Enable two-factor authentication",
        "Don't share login credentials",
        "Log out after use"
      ]
    },
    {
      title: "Safe Transactions",
      tips: [
        "Always use JobNOVA's payment system",
        "Don't transfer money outside the platform",
        "Verify buyer/seller information carefully",
        "Keep transaction evidence"
      ]
    },
    {
      title: "Information Protection",
      tips: [
        "Don't share sensitive personal information",
        "Be cautious with information requests",
        "Check links carefully before clicking",
        "Report suspicious activities"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Trust & Safety</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          We are committed to creating a safe and trustworthy environment for all users
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#safety-features">Security Features</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#safety-tips">Safety Tips</Link>
          </Button>
        </div>
      </section>

      {/* Safety Features Section */}
      <section id="safety-features" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Security Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Safety Tips Section */}
      <section id="safety-tips" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Safety Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {safetyTips.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 mr-2"></div>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Report Issues Section */}
      <section className="mb-16 bg-muted rounded-xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Report Issues</h2>
            <p className="text-lg mb-6">
              If you encounter any safety or security issues, we are here to help. Our Trust & Safety team will respond quickly and handle all reports seriously.
            </p>
            <Button size="lg" asChild>
              <Link href="/support/contact">Report an Issue</Link>
            </Button>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Contact Trust & Safety</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Support Email</h4>
                <p className="text-muted-foreground">trust-safety@jobnova.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Response Time</h4>
                <p className="text-muted-foreground">24/7 for urgent issues</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Emergency Phone</h4>
                <p className="text-muted-foreground">+84 123 456 789</p>
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
              question: "How can I protect my account?",
              answer: "Use a strong password, enable two-factor authentication, and never share your login credentials with anyone."
            },
            {
              question: "What happens if I notice suspicious activity?",
              answer: "Report it immediately to our Trust & Safety team. We will investigate and handle the issue."
            },
            {
              question: "How can I ensure safe transactions?",
              answer: "Always use JobNOVA's payment system and never transfer money outside the platform."
            },
            {
              question: "How is my information protected?",
              answer: "We use end-to-end encryption and comply with the highest security standards to protect your data."
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
        <h2 className="text-3xl font-bold mb-4">Need Additional Support?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Our Trust & Safety team is available to assist you 24/7
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link href="/support/contact">Contact Us Now</Link>
        </Button>
      </section>
    </div>
  );
} 