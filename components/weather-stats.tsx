import type { WeatherData } from "@/lib/weather-api";
import { getTemperatureUnit, getWindSpeedUnit } from "@/lib/weather-utils";

interface WeatherStatsProps {
  weather: WeatherData;
  units: "metric" | "imperial";
}

export function WeatherStats({ weather, units }: WeatherStatsProps) {
  const tempUnit = getTemperatureUnit(units);
  const windUnit = getWindSpeedUnit(units);

  const stats = [
    {
      label: "Feels like",
      value: `${Math.round(weather.main.feels_like)}°${tempUnit}`,
    },
    {
      label: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      label: "Wind",
      value: `${Math.round(weather.wind.speed)} ${windUnit}`,
    },
    {
      label: "Precipitation",
      value: `${weather.main.pressure} hPa`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-start"
        >
          <p className="text-gray-400 text-xs sm:text-sm mb-1">{stat.label}</p>
          <p className="text-white text-base sm:text-lg font-medium break-all">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
