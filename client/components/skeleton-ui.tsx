import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function SkeletonServiceCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900", className)}>
      <div className="space-y-3">
        <div className="relative h-40 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700">
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonProfileCard({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-lg border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex w-full justify-center space-x-2">
          <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export function SkeletonGigDetail({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="h-[400px] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="grid grid-cols-5 gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export function SkeletonMessageList({ className }: SkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start space-x-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-16 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonSearchResults({ className }: SkeletonProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {[...Array(6)].map((_, i) => (
        <SkeletonServiceCard key={i} />
      ))}
    </div>
  )
}
