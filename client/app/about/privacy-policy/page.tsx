'use client';
import React from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Last Updated: May 1, 2024
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/about/terms">Terms of Service</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/support/trust-safety">Trust & Safety</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/support/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-12 bg-muted p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li><a href="#introduction" className="hover:underline text-primary">Introduction</a></li>
          <li><a href="#information-we-collect" className="hover:underline text-primary">Information We Collect</a></li>
          <li><a href="#how-we-use-information" className="hover:underline text-primary">How We Use Your Information</a></li>
          <li><a href="#information-sharing" className="hover:underline text-primary">Information Sharing and Disclosure</a></li>
          <li><a href="#your-rights" className="hover:underline text-primary">Your Rights and Choices</a></li>
          <li><a href="#data-retention" className="hover:underline text-primary">Data Retention</a></li>
          <li><a href="#security" className="hover:underline text-primary">Security</a></li>
          <li><a href="#international-transfers" className="hover:underline text-primary">International Data Transfers</a></li>
          <li><a href="#children" className="hover:underline text-primary">Children's Privacy</a></li>
          <li><a href="#changes" className="hover:underline text-primary">Changes to This Privacy Policy</a></li>
          <li><a href="#contact" className="hover:underline text-primary">Contact Us</a></li>
        </ol>
      </section>

      {/* Main Content */}
      <div className="space-y-12 mb-12">
        <section id="introduction">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Fiverr.com, including its subdomains, and all related sites, applications, services and tools (collectively, the "Site") is operated by Fiverr International Ltd. and its affiliated companies (collectively, "Fiverr", "we", "us" and/or "our").
          </p>
          <p className="mb-4">
            This Privacy Policy describes how we collect, use, share and protect the personal information that we gather from you when you use the Site. By using the Site, you agree to the terms of this Privacy Policy and our Terms of Service.
          </p>
          <p>
            Please be sure to read this entire Privacy Policy before using the Site or submitting information to us. If you disagree with or do not accept any part of this Privacy Policy, do not use the Site or submit any information to us.
          </p>
        </section>

        <section id="information-we-collect">
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide to Us</h3>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when you create or modify your account, request customer support, or otherwise communicate with us. This information may include:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Personal identifiers, such as your name, email address, postal address, phone number, and date of birth</li>
            <li>Account credentials, such as your username and password</li>
            <li>Profile information, such as your profile picture, skills, education, certifications, and portfolio</li>
            <li>Financial information, such as bank account numbers, credit card numbers, and payment details</li>
            <li>Communications and correspondence you send to us</li>
            <li>Other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">2.2 Information We Collect Automatically</h3>
          <p className="mb-4">
            When you use our Site, we automatically collect certain information about your device and usage, including:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Device information, such as hardware model, operating system, unique device identifiers, IP address, browser type, and mobile network</li>
            <li>Usage information, such as pages visited, time spent on pages, and features used</li>
            <li>Location information, if you grant us permission to access your location</li>
            <li>Cookies and similar technologies to collect information about your browsing activities</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
