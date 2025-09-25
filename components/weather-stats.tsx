import type { WeatherData } from "@/lib/weather-api"

interface WeatherStatsProps {
  weather: WeatherData
}

export function WeatherStats({ weather }: WeatherStatsProps) {
  const stats = [
    {
      label: "Feels like",
      value: `${Math.round(weather.main.feels_like)}°`,
    },
    {
      label: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      label: "Wind",
      value: `${Math.round(weather.wind.speed)} km/h`,
    },
    {
      label: "Precipitation",
      value: `${weather.main.pressure} hPa`,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-start">
          <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
          <p className="text-white text-lg font-medium">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
