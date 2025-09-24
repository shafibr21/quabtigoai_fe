"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UnitsDropdownProps {
  units: "metric" | "imperial"
  onUnitsChange: (units: "metric" | "imperial") => void
}

export function UnitsDropdown({ units, onUnitsChange }: UnitsDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-white/10 gap-1 border border-gray-600">
          ⚙️ Units 
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-600">
        <DropdownMenuItem onClick={() => onUnitsChange("metric")} className="text-white hover:bg-gray-700">
          Celsius (°C)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onUnitsChange("imperial")} className="text-white hover:bg-gray-700">
          Fahrenheit (°F)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
