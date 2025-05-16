"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, X, Upload, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { GigCreationWizard } from "@/components/gig-creation-wizard"

export default function CreateGigPage() {
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ])

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, "/placeholder.svg?height=200&width=300"])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const steps = [
    {
      id: "overview",
      title: "Overview",
      description: "Basic information about your gig",
    },
    {
      id: "pricing",
      title: "Pricing",
      description: "Set your packages and pricing",
    },
    {
      id: "description",
      title: "Description",
      description: "Describe your service in detail",
    },
    {
      id: "requirements",
      title: "Requirements",
      description: "What you need from buyers",
    },
    {
      id: "gallery",
      title: "Gallery",
      description: "Add images and videos",
    },
    {
      id: "publish",
      title: "Publish",
      description: "Review and publish your gig",
    },
  ]

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create a New Gig</h1>
            <p className="text-gray-600 dark:text-gray-400">Fill in the details to create your service offering</p>
          </div>

          <GigCreationWizard steps={steps} onComplete={() => alert("Gig created successfully!")}>
            {/* Step 1: Overview */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="gig-title" className="text-base font-medium">
                  Gig Title
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Create a catchy title that describes your service clearly
                </p>
                <Input
                  id="gig-title"
                  placeholder="I will design a professional logo for your business"
                  className="h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-base font-medium">
                  Category
                </Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Main category</p>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="graphics-design">Graphics & Design</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="writing-translation">Writing & Translation</SelectItem>
                        <SelectItem value="video-animation">Video & Animation</SelectItem>
                        <SelectItem value="music-audio">Music & Audio</SelectItem>
                        <SelectItem value="programming-tech">Programming & Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Subcategory</p>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="logo-design">Logo Design</SelectItem>
                        <SelectItem value="brand-identity">Brand Identity</SelectItem>
                        <SelectItem value="business-cards">Business Cards</SelectItem>
                        <SelectItem value="social-media">Social Media Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-base font-medium">
                  Tags
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Add up to 5 tags that best describe your gig (press Enter after each tag)
                </p>
                <Input id="tags" placeholder="e.g., logo, branding, design" className="h-12" />
              </div>
            </div>

            {/* Step 2: Pricing */}
            <div>
              <h3 className="mb-4 text-lg font-medium">Packages & Pricing</h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Set up your service packages with different features and price points
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="p-3"></th>
                      <th className="p-3 text-center">Basic</th>
                      <th className="p-3 text-center">Standard</th>
                      <th className="p-3 text-center">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Package Name</td>
                      <td className="p-3">
                        <Input placeholder="Basic" className="text-center" required />
                      </td>
                      <td className="p-3">
                        <Input placeholder="Standard" className="text-center" required />
                      </td>
                      <td className="p-3">
                        <Input placeholder="Premium" className="text-center" required />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Description</td>
                      <td className="p-3">
                        <Textarea
                          placeholder="Basic package description"
                          className="h-20 resize-none text-center"
                          required
                        />
                      </td>
                      <td className="p-3">
                        <Textarea
                          placeholder="Standard package description"
                          className="h-20 resize-none text-center"
                          required
                        />
                      </td>
                      <td className="p-3">
                        <Textarea
                          placeholder="Premium package description"
                          className="h-20 resize-none text-center"
                          required
                        />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Delivery Time</td>
                      <td className="p-3">
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">2 days</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">2 days</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">2 days</SelectItem>
                            <SelectItem value="3">3 days</SelectItem>
                            <SelectItem value="5">5 days</SelectItem>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Price ($)</td>
                      <td className="p-3">
                        <Input type="number" min="5" placeholder="25" className="text-center" required />
                      </td>
                      <td className="p-3">
                        <Input type="number" min="5" placeholder="50" className="text-center" required />
                      </td>
                      <td className="p-3">
                        <Input type="number" min="5" placeholder="100" className="text-center" required />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step 3: Description */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="gig-description" className="text-base font-medium">
                  Gig Description
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Provide a detailed description of your service (min 120 characters)
                </p>
                <Textarea
                  id="gig-description"
                  placeholder="Describe your service in detail..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="gig-faq" className="text-base font-medium">
                  Frequently Asked Questions
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Add questions and answers to help buyers understand your service better
                </p>
                <div className="space-y-4">
                  <div className="rounded-md border p-4 dark:border-gray-700">
                    <div className="mb-3">
                      <Label htmlFor="faq-question-1">Question</Label>
                      <Input
                        id="faq-question-1"
                        placeholder="e.g., How many revisions do you offer?"
                        className="mb-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="faq-answer-1">Answer</Label>
                      <Textarea
                        id="faq-answer-1"
                        placeholder="Provide a detailed answer..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another FAQ
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 4: Requirements */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="requirements" className="text-base font-medium">
                    Buyer Requirements
                  </Label>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-gray-400" />
                    <div className="absolute left-0 top-6 z-10 hidden w-64 rounded-md border bg-white p-3 text-sm shadow-md group-hover:block dark:border-gray-700 dark:bg-gray-800">
                      Ask buyers for information you need to start working on their order.
                    </div>
                  </div>
                </div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Specify what information you need from buyers to get started
                </p>
                <div className="space-y-4">
                  <div className="rounded-md border p-4 dark:border-gray-700">
                    <div className="mb-3">
                      <Label htmlFor="requirement-1">Requirement</Label>
                      <Input
                        id="requirement-1"
                        placeholder="e.g., What is your brand name and industry?"
                        className="mb-2"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="required-1" defaultChecked />
                      <Label htmlFor="required-1">Required</Label>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Requirement
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 5: Gallery */}
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Gig Images</Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload high-quality images that showcase your service (max 5 images)
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-md border dark:border-gray-700">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gig image ${index + 1}`}
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-md dark:bg-gray-800"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="flex aspect-video items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="gig-video" className="text-base font-medium">
                  Gig Video (Optional)
                </Label>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Upload a video that demonstrates your service (max 75MB, mp4 format)
                </p>
                <div className="flex aspect-video flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                  <Upload className="mb-2 h-8 w-8 text-gray-400" />
                  <p className="mb-1 text-sm font-medium">Drag and drop a video file</p>
                  <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">or</p>
                  <Button type="button" variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 6: Publish */}
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-900/20">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-400">Ready to publish!</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Review all the information you've provided before publishing your gig. Once published, your gig
                      will be visible to potential buyers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gig Summary</h3>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Title:</span>
                    <span>I will design a professional logo for your business</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>Graphics & Design &gt; Logo Design</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Basic Package:</span>
                    <span>$25</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Delivery Time:</span>
                    <span>2 days</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium">Images:</span>
                    <span>{images.length} uploaded</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="terms" />
                  <Label htmlFor="terms">
                    I agree to the Terms of Service and understand that my gig must be approved before it appears in
                    search results.
                  </Label>
                </div>
              </div>
            </div>
          </GigCreationWizard>
        </div>
      </div>
    </main>
  )
}
