import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search?category=graphics-design" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Graphics & Design
                </Link>
              </li>
              <li>
                <Link href="/search?category=digital-marketing" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/search?category=writing-translation" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Writing & Translation
                </Link>
              </li>
              <li>
                <Link href="/search?category=video-animation" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Video & Animation
                </Link>
              </li>
              <li>
                <Link href="/search?category=programming-tech" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Programming & Tech
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">About</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Press & News
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Trust & Safety
                </Link>
              </li>
              <li>
                <Link href="/selling" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Selling on Freelance
                </Link>
              </li>
              <li>
                <Link href="/buying" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Buying on Freelance
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Forum
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-900">Business Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/business" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Freelance Business
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Freelance Enterprise
                </Link>
              </li>
              <li>
                <Link href="/teams" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                  Freelance for Teams
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
              <Image src="/placeholder.svg?height=32&width=100" alt="Freelance Logo" width={100} height={32} />
            </Link>
            <span className="text-sm text-gray-500">© 2023 Freelance Inc.</span>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-200">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-200">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-200">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-200">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-200">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
