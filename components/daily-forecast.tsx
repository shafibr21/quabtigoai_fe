import Image from "next/image"
import type { ForecastData } from "@/lib/weather-api"
import { getDayName, groupForecastByDay, getTemperatureUnit } from "@/lib/weather-utils"
import { getWeatherIconUrl } from "@/lib/weather-api"

interface DailyForecastProps {
  forecast: ForecastData
  units: "metric" | "imperial"
}

export function DailyForecast({ forecast, units }: DailyForecastProps) {
  const dailyData = groupForecastByDay(forecast.list)
  const tempUnit = getTemperatureUnit(units)
  console.log(dailyData)

  return (
    <div className="sm:p-4 w-full">
      <h3 className="text-white text-base sm:text-lg font-medium mb-3 sm:mb-4">Daily Forecast</h3>

      {/* Mobile: horizontal scroll, Desktop: grid */}
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 sm:gap-3 md:gap-4">
        {/* Mobile horizontal scroll container */}
        <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden">
          {dailyData.slice(0, 7).map((dayData, index) => {
            const firstItem = dayData[0]
            const temps = dayData.map((item) => item.main.temp)
            const minTemp = Math.min(...temps)
            const maxTemp = Math.max(...temps)

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-gray-900/40 rounded-lg p-3 text-white min-w-[80px] flex-shrink-0"
              >
                {/* Day name */}
                <span className="text-xs mb-2 text-center">
                  {index === 0 ? "Today" : getDayName(firstItem.dt)}
                </span>

                {/* Weather icon */}
                <Image
                  src={getWeatherIconUrl(firstItem.weather[0].icon) || "/placeholder.svg"}
                  alt={firstItem.weather[0].description}
                  width={32}
                  height={32}
                  className="mb-2"
                />

                {/* Temps */}
                <span className="text-sm font-medium">{Math.round(maxTemp)}°{tempUnit}</span>
                <span className="text-xs opacity-70">{Math.round(minTemp)}°{tempUnit}</span>
              </div>
            )
          })}
        </div>

        {/* Desktop grid */}
        {dailyData.slice(0, 7).map((dayData, index) => {
          const firstItem = dayData[0]
          const temps = dayData.map((item) => item.main.temp)
          const minTemp = Math.min(...temps)
          const maxTemp = Math.max(...temps)

          return (
            <div
              key={index}
              className="hidden sm:flex flex-col items-center justify-center bg-gray-900/40 rounded-lg p-3 sm:p-4 text-white"
            >
              {/* Day name */}
              <span className="text-sm mb-2">
                {index === 0 ? "Today" : getDayName(firstItem.dt)}
              </span>

              {/* Weather icon */}
              <Image
                src={getWeatherIconUrl(firstItem.weather[0].icon) || "/placeholder.svg"}
                alt={firstItem.weather[0].description}
                width={48}
                height={48}
                className="mb-2"
              />

              {/* Temps */}
              <span className="text-lg font-medium">{Math.round(maxTemp)}°{tempUnit}</span>
              <span className="text-sm opacity-70">{Math.round(minTemp)}°{tempUnit}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
