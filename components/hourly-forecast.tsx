import Image from "next/image"
import type { ForecastData } from "@/lib/weather-api"
import { formatTime, getHourlyForecast, getCurrentDayName } from "@/lib/weather-utils"
import { getWeatherIconUrl } from "@/lib/weather-api"

interface HourlyForecastProps {
  forecast: ForecastData
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const hourlyData = getHourlyForecast(forecast.list, 8)

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4" style={{ width: "458.66px", height: "526px", borderRadius: "16px" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-medium">Hourly forecast</h3>
        <span className="text-white text-sm border border-gray-900 rounded-lg pl-2 pt-1" style={{width: "120px", height: "28px" , background: "#374151" , border: "1px solid #4B5563"  }}>{getCurrentDayName()}</span>
      </div>

      <div className="space-y-3">
        {hourlyData.map((item, index) => (
          <div key={index}  className={`flex items-center justify-between py-2 ${index !== 7 ? 'border-b border-gray-600' : ''}`}>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-6 h-6 flex items-center justify-center">
                <Image
                  src={getWeatherIconUrl(item.weather[0].icon) || "/placeholder.svg"}
                  alt={item.weather[0].description}
                  width={24}
                  height={24}
                  className="w-6 h-6"
                  onError={(e) => {
                    // Fallback to Lucide icon if image fails
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      const icon = document.createElement("div")
                      icon.innerHTML = `<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`
                      parent.appendChild(icon)
                    }
                  }}
                />
              </div>
              <span className="text-white text-sm min-w-[3rem]">{formatTime(item.dt)}</span>
              <span className="text-gray-400 text-sm">{item.weather[0].description}</span>
            </div>

            <span className="text-white text-sm">{Math.round(item.main.temp)}°</span>
            
          </div>
        ))}
      </div>
    </div>
  )
}
