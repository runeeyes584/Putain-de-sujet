import { exchangeRates, currencyLocales, currencySymbols } from "@/context/currency-context"

/**
 * Converts a price from USD to the target currency
 */
export function convertPrice(priceUSD: number, targetCurrency: string): number {
  const rate = exchangeRates[targetCurrency as keyof typeof exchangeRates] || 1
  return priceUSD * rate
}

/**
 * Formats a price according to the currency and locale
 */
export function formatPrice(price: number, currency: string): string {
  const locale = currencyLocales[currency as keyof typeof currencyLocales] || "en-US"
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(price)
}

/**
 * Gets the currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: string): string {
  return currencySymbols[currency as keyof typeof currencySymbols] || "$"
}

/**
 * Formats a price with just the symbol (no currency code)
 */
export function formatPriceWithSymbol(price: number, currency: string): string {
  const symbol = getCurrencySymbol(currency)
  const locale = currencyLocales[currency as keyof typeof currencyLocales] || "en-US"

  return `${symbol}${new Intl.NumberFormat(locale, {
    style: "decimal",
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(price)}`
}

/**
 * Animates a price change with a counting effect
 * @param element The DOM element to update
 * @param startPrice The starting price
 * @param endPrice The ending price
 * @param currency The currency to format in
 * @param duration The animation duration in ms
 */
export function animatePriceChange(
  element: HTMLElement,
  startPrice: number,
  endPrice: number,
  currency: string,
  duration = 500,
): void {
  const startTime = performance.now()
  const difference = endPrice - startPrice

  function updatePrice(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentValue = startPrice + difference * progress

    element.textContent = formatPrice(currentValue, currency)

    if (progress < 1) {
      requestAnimationFrame(updatePrice)
    }
  }

  requestAnimationFrame(updatePrice)
}

/**
 * Parses a price range string (e.g. "$10-$50") and returns min and max values
 */
export function parsePriceRange(priceRange: string, currency: string): [number, number] {
  const symbol = getCurrencySymbol(currency)
  const regex = new RegExp(`${symbol}(\\d+)\\s*-\\s*${symbol}(\\d+)`)
  const match = priceRange.match(regex)

  if (match) {
    return [Number.parseInt(match[1]), Number.parseInt(match[2])]
  }

  return [0, 1000] // Default range
}

/**
 * Converts a price range from one currency to another
 */
export function convertPriceRange(
  minPrice: number,
  maxPrice: number,
  fromCurrency: string,
  toCurrency: string,
): [number, number] {
  // Convert to USD first (as our base currency)
  const fromRate = exchangeRates[fromCurrency as keyof typeof exchangeRates] || 1
  const minUSD = minPrice / fromRate
  const maxUSD = maxPrice / fromRate

  // Then convert to target currency
  const toRate = exchangeRates[toCurrency as keyof typeof exchangeRates] || 1
  return [minUSD * toRate, maxUSD * toRate]
}
