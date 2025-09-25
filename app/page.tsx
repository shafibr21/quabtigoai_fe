"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { WeatherHeader } from "@/components/weather-header"
import { WeatherSearch } from "@/components/weather-search"
import { MapPin } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [units, setUnits] = useState<"metric" | "imperial">("metric")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = async (city: string) => {
    setIsLoading(true)
    try {
      // Navigate to weather page with city parameter
      router.push(`/weather?city=${encodeURIComponent(city)}&units=${units}`)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen weather-gradient flex items-center justify-center">
      <div className="container mx-auto px-4 py-1 md:py-8 flex flex-col h-full ">
        <WeatherHeader title="Weather Today" units={units} onUnitsChange={setUnits} />

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h2 className="text-white text-2xl md:text-3xl font-light mb-12">{"How's the sky looking today?"}</h2>

          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

          <div className="mt-16 flex flex-col items-center text-gray-300">
            <Image src="/Vector.png" alt="Weather Placeholder" width={60} height={60} className="mb-4" />
            <p className="text-sm" style={{ color: "#9CA3AF" }}>Search for a city to see weather information</p>
          </div>
        </div>
      </div>
    </div>
  )
}
