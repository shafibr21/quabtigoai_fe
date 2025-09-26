import Image from "next/image";
import { formatDate, getTemperatureUnit } from "@/lib/weather-utils";
import { getWeatherIconUrl, type WeatherData } from "@/lib/weather-api";

interface CurrentWeatherProps {
  weather: WeatherData;
  units: "metric" | "imperial";
}

export function CurrentWeather({ weather, units }: CurrentWeatherProps) {
  const tempUnit = getTemperatureUnit(units);

  return (
    <div className="bg-blue-600/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-7 text-white w-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-medium break-words">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm">
            {formatDate(weather.dt)}
          </p>
        </div>
        <div className="flex items-center ml-2">
          <Image
            src={
              getWeatherIconUrl(weather.weather[0].icon) || "/placeholder.svg"
            }
            alt={weather.weather[0].description}
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </div>
      </div>

      <div className="text-center sm:text-end">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-light mb-2">
          {Math.round(weather.main.temp)}°{tempUnit}
        </div>
        <div className="text-sm sm:text-base text-blue-100 capitalize">
          {weather.weather[0].description}
        </div>
      </div>
    </div>
  );
}
