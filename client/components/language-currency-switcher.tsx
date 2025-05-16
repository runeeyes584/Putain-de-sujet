"use client"
import { useEffect, useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrency } from "@/context/currency-context"

interface LanguageCurrencySwitcherProps {
  className?: string
}

export function LanguageCurrencySwitcher({ className }: LanguageCurrencySwitcherProps) {
  const { currency, setCurrency, getCurrencySymbol } = useCurrency()
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const currencies = [
    { code: "USD", name: "USD", symbol: "$" },
    { code: "EUR", name: "EUR", symbol: "€" },
    { code: "GBP", name: "GBP", symbol: "£" },
    { code: "CAD", name: "CAD", symbol: "CA$" },
    { code: "AUD", name: "AUD", symbol: "A$" },
    { code: "JPY", name: "JPY", symbol: "¥" },
    { code: "INR", name: "INR", symbol: "₹" },
    { code: "BRL", name: "BRL", symbol: "R$" },
    { code: "MXN", name: "MXN", symbol: "MX$" },
    { code: "SGD", name: "SGD", symbol: "S$" },
    { code: "VND", name: "VND", symbol: "₫" },
  ]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
            <span>{isClient ? getCurrencySymbol() : "$"}</span>
            <span className="hidden md:inline">{isClient ? currency : "USD"}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {currencies.map((curr) => (
            <DropdownMenuItem
              key={curr.code}
              className="flex items-center justify-between"
              onClick={() => setCurrency(curr.code)}
            >
              <span>
                {curr.symbol} {curr.name}
              </span>
              {isClient && currency === curr.code && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
