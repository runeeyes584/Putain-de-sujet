import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface UserBadgeProps {
  level: string
  className?: string
}

export function UserBadge({ level, className }: UserBadgeProps) {
  const getBadgeStyle = () => {
    switch (level) {
      case "Level 1 Seller":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Level 2 Seller":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "Top Rated":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "New Seller":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getTooltipContent = () => {
    switch (level) {
      case "Level 1 Seller":
        return "Completed at least 10 orders with high satisfaction"
      case "Level 2 Seller":
        return "Completed at least 50 orders with exceptional ratings"
      case "Top Rated":
        return "Elite seller with outstanding performance metrics"
      case "New Seller":
        return "Recently joined our platform"
      default:
        return "Seller on our platform"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${getBadgeStyle()} ${className}`} variant="outline">
            {level}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
