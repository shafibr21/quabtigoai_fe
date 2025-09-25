import Image from "next/image"
import type { ForecastData } from "@/lib/weather-api"
import { getDayName, groupForecastByDay } from "@/lib/weather-utils"
import { getWeatherIconUrl } from "@/lib/weather-api"

interface DailyForecastProps {
  forecast: ForecastData
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const dailyData = groupForecastByDay(forecast.list)
  console.log(dailyData)

  return (
    <div className=" backdrop-blur-sm rounded-lg md:p-4 max-w-[917.33px] w-full h-[526px] sm:h-auto"
    
    >
      <h3 className="text-white text-lg font-medium mb-4">Daily Forecast</h3>

      {/* Horizontal scroll / grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {dailyData.slice(0, 7).map((dayData, index) => {
          const firstItem = dayData[0]
          const temps = dayData.map((item) => item.main.temp)
          const minTemp = Math.min(...temps)
          const maxTemp = Math.max(...temps)

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-gray-900/40 rounded-lg p-1 md:p-4 text-white"
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
              <span className="text-lg font-medium">{Math.round(maxTemp)}°</span>
              <span className="text-sm opacity-70">{Math.round(minTemp)}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
