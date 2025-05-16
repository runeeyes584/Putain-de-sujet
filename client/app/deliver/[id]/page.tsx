import Link from "next/link"
import { ArrowLeft, Check, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function DeliverOrderPage({ params }: { params: { id: string } }) {
  // Mock order data
  const order = {
    id: params.id,
    title: "Professional Logo Design",
    buyer: "businessowner",
    price: 85,
    delivery: "May 12, 2025",
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="flex items-center mb-6">
        <Link href={`/seller/orders/${params.id}`} className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Deliver Order</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order #{params.id}</CardTitle>
          <p className="text-gray-500">{order.title}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-medium mb-4">Upload Deliverables</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-4">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-gray-400">Max file size: 25MB</p>
              <Button variant="outline" size="sm" className="mt-4">
                Select Files
              </Button>
            </div>
            <div className="text-xs text-gray-500">
              Supported file types: JPG, PNG, GIF, PDF, PSD, AI, ZIP, RAR (max 5 files)
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <label htmlFor="delivery-message" className="block font-medium mb-2">
              Message to Buyer
            </label>
            <Textarea
              id="delivery-message"
              placeholder="Describe what you're delivering and provide any instructions for the buyer..."
              className="min-h-32"
            />
          </div>

          <div className="bg-amber-50 p-4 rounded-md mb-6">
            <h4 className="font-medium text-amber-800 mb-2 flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Delivery Checklist
            </h4>
            <ul className="text-sm text-amber-700 space-y-2 pl-6 list-disc">
              <li>Make sure all files are properly organized and labeled</li>
              <li>Include source files if specified in the order requirements</li>
              <li>Provide clear instructions on how to use the deliverables</li>
              <li>Double-check that all requirements have been met</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" className="sm:order-1">
              Save as Draft
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 sm:order-2">Submit Delivery</Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>
          By submitting this delivery, you confirm that all work is original or properly licensed for commercial use.
        </p>
      </div>
    </div>
  )
}
