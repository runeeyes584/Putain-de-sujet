"use client"

import { useState } from "react"
import { Download, ArrowUpRight, Filter, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("earnings")

  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <DashboardSidebar />

        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Wallet & Earnings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your earnings and withdrawals</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Available for Withdrawal</CardDescription>
                <CardTitle className="text-3xl font-bold">$1,245.89</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="mt-2 w-full bg-emerald-500 hover:bg-emerald-600">Withdraw Funds</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Clearance</CardDescription>
                <CardTitle className="text-3xl font-bold">$350.00</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">Funds will be available in 7-14 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Lifetime Earnings</CardDescription>
                <CardTitle className="text-3xl font-bold">$12,840.50</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+18% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="earnings" value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="earnings" className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-xl font-semibold">Earnings History</h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search transactions"
                      className="h-9 w-full pl-8 pr-4 sm:w-[200px]"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left dark:border-gray-800">
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Service</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b dark:border-gray-800">
                          <td className="p-3 text-sm">{transaction.id}</td>
                          <td className="p-3 text-sm">{transaction.date}</td>
                          <td className="p-3 text-sm">{transaction.service}</td>
                          <td className="p-3 text-sm font-medium">${transaction.amount}</td>
                          <td className="p-3 text-sm">
                            <Badge
                              className={`${
                                transaction.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : transaction.status === "Pending"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t p-3 dark:border-gray-800">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">20</span> results
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="withdrawals" className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-xl font-semibold">Withdrawal History</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600">Request Withdrawal</Button>
              </div>

              <div className="rounded-lg border bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left dark:border-gray-800">
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Method</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                        <th className="p-3 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.map((withdrawal) => (
                        <tr key={withdrawal.id} className="border-b dark:border-gray-800">
                          <td className="p-3 text-sm">{withdrawal.id}</td>
                          <td className="p-3 text-sm">{withdrawal.date}</td>
                          <td className="p-3 text-sm">{withdrawal.method}</td>
                          <td className="p-3 text-sm font-medium">${withdrawal.amount}</td>
                          <td className="p-3 text-sm">
                            <Badge
                              className={`${
                                withdrawal.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                  : withdrawal.status === "Processing"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {withdrawal.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment-methods" className="space-y-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600">Add Payment Method</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>PayPal</CardTitle>
                      <Badge>Default</Badge>
                    </div>
                    <CardDescription>Connected on May 10, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">user@example.com</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bank Account</CardTitle>
                    <CardDescription>Connected on April 15, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Bank of America
                      <br />
                      Account ending in 4567
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

// Sample data
const transactions = [
  {
    id: "ORD-12345",
    date: "May 12, 2025",
    service: "Logo Design",
    amount: 50,
    status: "Completed",
  },
  {
    id: "ORD-12346",
    date: "May 10, 2025",
    service: "Website Design",
    amount: 95,
    status: "Completed",
  },
  {
    id: "ORD-12347",
    date: "May 8, 2025",
    service: "Social Media Graphics",
    amount: 35,
    status: "Pending",
  },
  {
    id: "ORD-12348",
    date: "May 5, 2025",
    service: "Logo Design",
    amount: 25,
    status: "Completed",
  },
  {
    id: "ORD-12349",
    date: "May 3, 2025",
    service: "Business Card Design",
    amount: 15,
    status: "Clearing",
  },
]

const withdrawals = [
  {
    id: "WD-12345",
    date: "May 1, 2025",
    method: "PayPal",
    amount: 500,
    status: "Completed",
  },
  {
    id: "WD-12346",
    date: "Apr 15, 2025",
    method: "Bank Transfer",
    amount: 750,
    status: "Completed",
  },
  {
    id: "WD-12347",
    date: "Apr 1, 2025",
    method: "PayPal",
    amount: 300,
    status: "Completed",
  },
  {
    id: "WD-12348",
    date: "May 12, 2025",
    method: "Bank Transfer",
    amount: 1000,
    status: "Processing",
  },
]
