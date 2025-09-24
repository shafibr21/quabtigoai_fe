"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface WeatherSearchProps {
  onSearch: (city: string) => void
  isLoading?: boolean
}

export function WeatherSearch({ onSearch, isLoading }: WeatherSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      setSearchQuery("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
