import Image from "next/image";
import type { ForecastData } from "@/lib/weather-api";
import {
  formatTime,
  getHourlyForecast,
  getCurrentDayName,
  getTemperatureUnit,
} from "@/lib/weather-utils";
import { getWeatherIconUrl } from "@/lib/weather-api";

interface HourlyForecastProps {
  forecast: ForecastData;
  units: "metric" | "imperial";
}

export function HourlyForecast({ forecast, units }: HourlyForecastProps) {
  const hourlyData = getHourlyForecast(forecast.list, 8);
  const tempUnit = getTemperatureUnit(units);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 w-full max-w-full sm:max-w-md lg:max-w-lg">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-white text-base sm:text-lg font-medium">Hourly forecast</h3>
        <span className="text-white text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 whitespace-nowrap">
          {getCurrentDayName()}
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {hourlyData.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-2 ${
              index !== 7 ? "border-b border-gray-600" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center flex-shrink-0">
                <Image
                  src={
                    getWeatherIconUrl(item.weather[0].icon) ||
                    "/placeholder.svg"
                  }
                  alt={item.weather[0].description}
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  onError={(e) => {
                    // Fallback to Lucide icon if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const icon = document.createElement("div");
                      icon.innerHTML = `<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`;
                      parent.appendChild(icon);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                  {formatTime(item.dt)}
                </span>
                <span className="text-gray-400 text-xs sm:text-sm truncate">
                  {item.weather[0].description}
                </span>
              </div>
            </div>

            <span className="text-white text-sm sm:text-base font-medium flex-shrink-0 ml-2">
              {Math.round(item.main.temp)}°{tempUnit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
