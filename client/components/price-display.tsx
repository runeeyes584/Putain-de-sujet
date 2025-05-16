"use client"

import { useEffect, useRef, useState } from "react"
import { useCurrency } from "@/context/currency-context"
import { animatePriceChange } from "@/utils/currency"

interface PriceDisplayProps {
  priceUSD: number
  className?: string
  showCurrency?: boolean
  animate?: boolean
  size?: "small" | "medium" | "large"
  symbolOnly?: boolean
}

export function PriceDisplay({
  priceUSD,
  className = "",
  showCurrency = true,
  animate = true,
  size = "medium",
  symbolOnly = false,
}: PriceDisplayProps) {
  const { currency, convertPrice, formatPrice, formatPriceWithSymbol } = useCurrency()
  const priceRef = useRef<HTMLSpanElement>(null)
  const prevPriceRef = useRef<number>(priceUSD)
  const prevCurrencyRef = useRef<string>(currency)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Convert the price to the selected currency
  const convertedPrice = convertPrice(priceUSD)

  // Apply size-based classes
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-xl font-semibold",
  }

  const combinedClassName = `${className} ${sizeClasses[size] || ""}`

  useEffect(() => {
    // Skip animation on first render or if not client-side
    if (
      priceRef.current &&
      animate &&
      isClient &&
      (prevPriceRef.current !== priceUSD || prevCurrencyRef.current !== currency)
    ) {
      const prevConvertedPrice = convertPrice(prevPriceRef.current)
      animatePriceChange(priceRef.current, prevConvertedPrice, convertedPrice, currency)
    }

    // Update refs for next comparison
    prevPriceRef.current = priceUSD
    prevCurrencyRef.current = currency
  }, [priceUSD, currency, convertPrice, convertedPrice, animate, isClient])

  // Handle server-side rendering and client-side hydration
  if (!isClient) {
    return (
      <span ref={priceRef} className={combinedClassName}>
        ${priceUSD.toFixed(2)}
      </span>
    )
  }

  return (
    <span ref={priceRef} className={combinedClassName}>
      {symbolOnly ? formatPriceWithSymbol(convertedPrice) : formatPrice(convertedPrice)}
    </span>
  )
}
