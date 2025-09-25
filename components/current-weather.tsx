import Image from "next/image"
import { formatDate } from "@/lib/weather-utils"
import { getWeatherIconUrl, type WeatherData } from "@/lib/weather-api"

interface CurrentWeatherProps {
  weather: WeatherData
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="bg-blue-600/80 backdrop-blur-sm rounded-2xl p-7 text-white">
      <div className=" items-start">
        <div>
          <h2 className="text-xl font-medium">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-blue-100 text-sm">{formatDate(weather.dt)}</p>
        </div>
        <div className="flex items-center">
          <Image
            src={getWeatherIconUrl(weather.weather[0].icon) || "/placeholder.svg"}
            alt={weather.weather[0].description}
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>
      </div>

      <div className="text-end">
        <div className="text-6xl font-light mb-2">{Math.round(weather.main.temp)}°</div>
      </div>
    </div>
  )
}
