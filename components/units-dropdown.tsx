"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

interface UnitsDropdownProps {
  units: "metric" | "imperial"
  onUnitsChange: (units: "metric" | "imperial") => void
}

export function UnitsDropdown({ units, onUnitsChange }: UnitsDropdownProps) {
  console.log("UnitsDropdown rendered with units:", units)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        className="text-white hover:bg-white/10 gap-1 border border-gray-600"
        onClick={() => {
          console.log("Button clicked, isOpen:", isOpen)
          setIsOpen(!isOpen)
        }}
      >
        ⚙️ {units === "metric" ? "Celsius" : "Fahrenheit"}
        <ChevronDown className="h-4 w-4" />
      </Button>
      
      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-1 min-w-[150px] bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50"
        >
          <div 
            onClick={() => {
              console.log("Metric clicked")
              onUnitsChange("metric")
              setIsOpen(false)
            }}
            className="px-3 py-2 text-white hover:bg-gray-700 cursor-pointer rounded-t-md"
          >
            Celsius (°C) {units === "metric" && "✓"}
          </div>
          <div 
            onClick={() => {
              console.log("Imperial clicked")
              onUnitsChange("imperial")
              setIsOpen(false)
            }}
            className="px-3 py-2 text-white hover:bg-gray-700 cursor-pointer rounded-b-md"
          >
            Fahrenheit (°F) {units === "imperial" && "✓"}
          </div>
        </div>
      )}
    </div>
  )
}