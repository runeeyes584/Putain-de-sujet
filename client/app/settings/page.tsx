"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, Eye, EyeOff, Check, X, CreditCard, Building, ShoppingCartIcon as Paypal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")

  const handleSave = () => {
    setSaveStatus("saving")
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 1000)
  }

  return (
    <main className="flex-1 bg-gray-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </div>

          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            </TabsList>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <TabsContent value="profile" className="space-y-6">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="md:w-1/3">
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your personal information and how others see you on the platform
                    </p>
                  </div>
                  <div className="flex-1 space-y-6">
                    {/* Profile Picture */}
                    <div>
                      <Label className="mb-2 block text-base font-medium">Profile Picture</Label>
                      <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24">
                          <Image
                            src="/placeholder.svg?height=96&width=96"
                            alt="Profile"
                            width={96}
                            height={96}
                            className="rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-md">
                            <Upload className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>JPG, GIF or PNG. Max size 2MB</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Upload New Picture
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="display-name">Display Name</Label>
                        <Input id="display-name" defaultValue="johnsmith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.smith@example.com" />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                        defaultValue="I'm a professional graphic designer with over 5 years of experience specializing in logo design and brand identity."
                      />
                      <p className="text-xs text-gray-500">Brief description for your profile. Max 400 characters.</p>
                    </div>

                    {/* Location */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <Label htmlFor="languages">Languages</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="languages">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add Another Language
                      </Button>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {saveStatus === "saving" ? (
                          "Saving..."
                        ) : saveStatus === "success" ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Saved
                          </>
                        ) : saveStatus === "error" ? (
                          <>
                            <X className="mr-2 h-4 w-4" /> Error
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="md:w-1/3">
                    <h2 className="text-lg font-semibold">Security Settings</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage your password and account security preferences</p>
                  </div>
                  <div className="flex-1 space-y-6">
                    {/* Change Password */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="••••••••"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                            <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500">
                          Password must be at least 8 characters and include a number and a special character.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="bg-emerald-500 hover:bg-emerald-600">Update Password</Button>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* Two-Factor Authentication */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">
                            Add an extra layer of security to your account by requiring a verification code
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* Session Management */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Active Sessions</h3>
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between border-b p-4">
                          <div>
                            <div className="font-medium">Current Session</div>
                            <div className="text-sm text-gray-500">New York, USA • Chrome on Windows</div>
                            <div className="mt-1 text-xs text-emerald-600">Active now</div>
                          </div>
                          <Button variant="outline" size="sm" disabled>
                            Current
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <div className="font-medium">Unknown Location</div>
                            <div className="text-sm text-gray-500">Chicago, USA • Firefox on macOS</div>
                            <div className="mt-1 text-xs text-gray-500">Active 2 days ago</div>
                          </div>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Sign Out
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" className="text-red-600 hover:text-red-700">
                        Sign Out All Devices
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="md:w-1/3">
                    <h2 className="text-lg font-semibold">Notification Preferences</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Control how and when you receive notifications from the platform
                    </p>
                  </div>
                  <div className="flex-1 space-y-6">
                    {/* Email Notifications */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-orders" className="text-sm font-normal">
                              Order Updates
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive emails about your order status changes and updates
                            </p>
                          </div>
                          <Switch id="email-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-messages" className="text-sm font-normal">
                              Messages
                            </Label>
                            <p className="text-xs text-gray-500">Receive emails when someone sends you a message</p>
                          </div>
                          <Switch id="email-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-promotions" className="text-sm font-normal">
                              Promotions
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive emails about promotions, discounts, and special offers
                            </p>
                          </div>
                          <Switch id="email-promotions" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-account" className="text-sm font-normal">
                              Account Activity
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive emails about your account activity and security
                            </p>
                          </div>
                          <Switch id="email-account" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* Push Notifications */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Push Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-orders" className="text-sm font-normal">
                              Order Updates
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive push notifications about your order status changes
                            </p>
                          </div>
                          <Switch id="push-orders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-messages" className="text-sm font-normal">
                              Messages
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive push notifications when someone sends you a message
                            </p>
                          </div>
                          <Switch id="push-messages" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-reminders" className="text-sm font-normal">
                              Reminders
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive push notifications for order deadlines and reminders
                            </p>
                          </div>
                          <Switch id="push-reminders" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* SMS Notifications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-medium">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">
                            Receive text messages for important updates (standard rates may apply)
                          </p>
                        </div>
                        <Switch id="sms-notifications" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input id="phone-number" type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {saveStatus === "saving" ? (
                          "Saving..."
                        ) : saveStatus === "success" ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Saved
                          </>
                        ) : saveStatus === "error" ? (
                          <>
                            <X className="mr-2 h-4 w-4" /> Error
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <div className="flex flex-col gap-8 md:flex-row">
                  <div className="md:w-1/3">
                    <h2 className="text-lg font-semibold">Payment Methods</h2>
                    <p className="mt-1 text-sm text-gray-500">Manage your payment methods and payout preferences</p>
                  </div>
                  <div className="flex-1 space-y-6">
                    {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Your Payment Methods</h3>
                      <div className="rounded-md border">
                        <RadioGroup defaultValue="card1">
                          <div className="flex items-center justify-between border-b p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="card1" id="card1" />
                              <Label htmlFor="card1" className="flex items-center gap-3">
                                <CreditCard className="h-5 w-5 text-gray-500" />
                                <div>
                                  <div className="font-medium">Visa ending in 4242</div>
                                  <div className="text-sm text-gray-500">Expires 12/2025</div>
                                </div>
                              </Label>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <Label htmlFor="paypal" className="flex items-center gap-3">
                                <Paypal className="h-5 w-5 text-blue-500" />
                                <div>
                                  <div className="font-medium">PayPal</div>
                                  <div className="text-sm text-gray-500">john.smith@example.com</div>
                                </div>
                              </Label>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                      <Button variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* Payout Methods */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Payout Methods</h3>
                      <p className="text-sm text-gray-500">Choose how you want to receive payments for your services</p>

                      <div className="space-y-4">
                        <div className="rounded-md border p-4">
                          <RadioGroup defaultValue="bank">
                            <div className="mb-4 flex items-center gap-3">
                              <RadioGroupItem value="bank" id="bank" />
                              <Label htmlFor="bank" className="flex items-center gap-3">
                                <Building className="h-5 w-5 text-gray-500" />
                                <div className="font-medium">Bank Account (ACH)</div>
                              </Label>
                            </div>
                            <div className="ml-7 space-y-3">
                              <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="account-name">Account Holder Name</Label>
                                  <Input id="account-name" placeholder="John Smith" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="account-type">Account Type</Label>
                                  <Select>
                                    <SelectTrigger id="account-type">
                                      <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="checking">Checking</SelectItem>
                                      <SelectItem value="savings">Savings</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="routing-number">Routing Number</Label>
                                  <Input id="routing-number" placeholder="123456789" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="account-number">Account Number</Label>
                                  <Input id="account-number" placeholder="••••••••1234" />
                                </div>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="rounded-md border p-4">
                          <div className="flex items-center gap-3">
                            <RadioGroup defaultValue="bank">
                              <RadioGroupItem value="paypal-payout" id="paypal-payout" />
                            </RadioGroup>
                            <Label htmlFor="paypal-payout" className="flex items-center gap-3">
                              <Paypal className="h-5 w-5 text-blue-500" />
                              <div className="font-medium">PayPal</div>
                            </Label>
                          </div>
                          <div className="ml-7 mt-3 space-y-2">
                            <Label htmlFor="paypal-email">PayPal Email</Label>
                            <Input id="paypal-email" type="email" placeholder="your.email@example.com" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="my-6 border-t"></div>

                    {/* Billing Address */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">Billing Address</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="billing-country">Country</Label>
                          <Select defaultValue="us">
                            <SelectTrigger id="billing-country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-zip">ZIP / Postal Code</Label>
                          <Input id="billing-zip" placeholder="10001" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="billing-address">Address</Label>
                          <Input id="billing-address" placeholder="123 Main St" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">City</Label>
                          <Input id="billing-city" placeholder="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-state">State / Province</Label>
                          <Input id="billing-state" placeholder="NY" />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        {saveStatus === "saving" ? (
                          "Saving..."
                        ) : saveStatus === "success" ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Saved
                          </>
                        ) : saveStatus === "error" ? (
                          <>
                            <X className="mr-2 h-4 w-4" /> Error
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
