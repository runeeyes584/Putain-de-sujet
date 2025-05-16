import Link from "next/link"
import { ArrowLeft, ImageIcon, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function EditGigPage({ params }: { params: { id: string } }) {
  // Mock gig data
  const gig = {
    id: params.id,
    title: "I will design a professional logo for your business",
    category: "Graphics & Design",
    subcategory: "Logo Design",
    description:
      "I will create a modern, professional logo for your business with unlimited revisions until you're satisfied. I specialize in minimalist, memorable designs that help your brand stand out.",
    price: {
      basic: 50,
      standard: 85,
      premium: 150,
    },
    delivery: {
      basic: 3,
      standard: 5,
      premium: 7,
    },
    revisions: {
      basic: 1,
      standard: 3,
      premium: "Unlimited",
    },
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    tags: ["logo design", "branding", "business logo", "minimalist logo"],
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex items-center mb-8">
        <Link href={`/gigs/${params.id}`} className="mr-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold dark:text-white">Edit Gig</h1>
      </div>

      <Tabs defaultValue="overview" className="mb-10">
        <TabsList className="grid grid-cols-4 mb-8 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl dark:text-white">Gig Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label htmlFor="gig-title" className="block font-medium mb-2 dark:text-white">
                  Gig Title
                </label>
                <Input id="gig-title" placeholder="I will..." defaultValue={gig.title} className="max-w-2xl h-12" />
                <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
                  Clearly describe what you are offering (max 80 characters)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="category" className="block font-medium mb-2 dark:text-white">
                    Category
                  </label>
                  <Select defaultValue={gig.category}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Graphics & Design">Graphics & Design</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      <SelectItem value="Writing & Translation">Writing & Translation</SelectItem>
                      <SelectItem value="Video & Animation">Video & Animation</SelectItem>
                      <SelectItem value="Programming & Tech">Programming & Tech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="subcategory" className="block font-medium mb-2 dark:text-white">
                    Subcategory
                  </label>
                  <Select defaultValue={gig.subcategory}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Logo Design">Logo Design</SelectItem>
                      <SelectItem value="Brand Style Guides">Brand Style Guides</SelectItem>
                      <SelectItem value="Business Cards">Business Cards</SelectItem>
                      <SelectItem value="Social Media Design">Social Media Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block font-medium mb-2 dark:text-white">
                  Search Tags
                </label>
                <Input
                  id="tags"
                  placeholder="Add search terms that buyers would use to find your service"
                  defaultValue={gig.tags.join(", ")}
                  className="max-w-2xl h-12"
                />
                <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Enter up to 5 tags separated by commas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl dark:text-white">Packages & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["basic", "standard", "premium"].map((tier) => (
                  <Card
                    key={tier}
                    className={`border-2 ${
                      tier === "basic"
                        ? "border-gray-200 dark:border-gray-700"
                        : tier === "standard"
                          ? "border-emerald-100 dark:border-emerald-900"
                          : "border-purple-100 dark:border-purple-900"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg capitalize dark:text-white">{tier}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <label htmlFor={`price-${tier}`} className="block text-sm font-medium mb-2 dark:text-gray-200">
                          Price ($)
                        </label>
                        <Input
                          id={`price-${tier}`}
                          type="number"
                          defaultValue={gig.price[tier as keyof typeof gig.price]}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`delivery-${tier}`}
                          className="block text-sm font-medium mb-2 dark:text-gray-200"
                        >
                          Delivery Time (days)
                        </label>
                        <Select defaultValue={gig.delivery[tier as keyof typeof gig.delivery].toString()}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 7, 10, 14, 21, 30].map((day) => (
                              <SelectItem key={day} value={day.toString()}>
                                {day} {day === 1 ? "day" : "days"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label
                          htmlFor={`revisions-${tier}`}
                          className="block text-sm font-medium mb-2 dark:text-gray-200"
                        >
                          Revisions
                        </label>
                        <Select defaultValue={gig.revisions[tier as keyof typeof gig.revisions].toString()}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5, 10, "Unlimited"].map((rev) => (
                              <SelectItem key={rev.toString()} value={rev.toString()}>
                                {rev === 0
                                  ? "No revisions"
                                  : rev === 1
                                    ? "1 revision"
                                    : rev === "Unlimited"
                                      ? "Unlimited"
                                      : `${rev} revisions`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl dark:text-white">Description & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <label htmlFor="description" className="block font-medium mb-2 dark:text-white">
                  Gig Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your service in detail..."
                  defaultValue={gig.description}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
                  Min. 120 characters - Describe what you offer, your process, and why buyers should choose you
                </p>
              </div>

              <Separator className="my-8" />

              <div>
                <h3 className="font-medium mb-4 dark:text-white">Frequently Asked Questions</h3>
                <div className="space-y-5 mb-6">
                  <div className="p-5 border rounded-xl dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <Input
                        placeholder="Question"
                        defaultValue="How many logo concepts will I receive?"
                        className="mb-3 h-12"
                      />
                      <Button variant="ghost" size="icon" className="text-red-500 ml-2">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Answer"
                      defaultValue="With the standard package, you'll receive 3 initial concepts to choose from. The premium package includes 5 concepts."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="p-5 border rounded-xl dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <Input placeholder="Question" defaultValue="Do you provide source files?" className="mb-3 h-12" />
                      <Button variant="ghost" size="icon" className="text-red-500 ml-2">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Answer"
                      defaultValue="Yes, all packages include the source files (AI, EPS, PDF) along with PNG and JPG formats."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <Button variant="outline" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl dark:text-white">Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {gig.images.map((image, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gig image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-black/20">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center h-48 p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Add more images</p>
                  <p className="text-xs text-gray-400 mb-4">PNG, JPG, GIF (max 5MB)</p>
                  <Button variant="outline" size="sm">
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-xl mb-6 border border-amber-100 dark:border-amber-800">
                <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-3">Gallery Tips</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-2 pl-5 list-disc">
                  <li>Add high-quality images that showcase your work</li>
                  <li>Include before/after examples if applicable</li>
                  <li>First image will be your gig thumbnail</li>
                  <li>Recommended: At least 3 images per gig</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Button variant="outline" className="px-6">
          Preview Gig
        </Button>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Delete Gig
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 px-6">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
