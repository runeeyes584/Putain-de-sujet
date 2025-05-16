import * as React from "react"

const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1400,
}

export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`)
    const onChange = () => {
      setIsBelowBreakpoint(window.innerWidth < BREAKPOINTS[breakpoint])
    }
    mql.addEventListener("change", onChange)
    setIsBelowBreakpoint(window.innerWidth < BREAKPOINTS[breakpoint])
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isBelowBreakpoint
}

// Giữ lại useIsMobile cho backward compatibility
export function useIsMobile() {
  return useBreakpoint("md")
}
