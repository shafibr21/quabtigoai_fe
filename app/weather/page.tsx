"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { WeatherHeader } from "@/components/weather-header";
import { WeatherSearch } from "@/components/weather-search";
import { CurrentWeather } from "@/components/current-weather";
import { WeatherStats } from "@/components/weather-stats";
import { DailyForecast } from "@/components/daily-forecast";
import { HourlyForecast } from "@/components/hourly-forecast";
import {
  getCurrentWeather,
  getForecast,
  type WeatherData,
  type ForecastData,
} from "@/lib/weather-api";
import { Loader2 } from "lucide-react";

export default function WeatherPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const city = searchParams.get("city");
  const urlUnits = searchParams.get("units") as "metric" | "imperial";

  useEffect(() => {
    if (urlUnits) {
      setUnits(urlUnits);
    }
  }, [urlUnits]);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city, units]); // Added units dependency

  const fetchWeatherData = async (cityName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(cityName, units), // Pass units parameter
        getForecast(cityName, units), // Pass units parameter
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError("City not found. Please try another city.");
      console.error("Weather fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (newCity: string) => {
    router.push(`/weather?city=${encodeURIComponent(newCity)}&units=${units}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen weather-gradient flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading weather data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen weather-gradient flex flex-col">
        <div className="container mx-auto px-4 py-8">
          <WeatherHeader
            title="Weather Now"
            units={units}
            onUnitsChange={setUnits}
          />

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h2 className="text-white text-2xl md:text-3xl font-light mb-12">
              {"How's the sky looking today?"}
            </h2>

            <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

            <div className="mt-8 text-red-400 bg-red-900/20 backdrop-blur-sm rounded-lg p-4">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen weather-gradient">
      <div className="container mx-auto px-4 py-8">
        <WeatherHeader
          title="Weather Now"
          units={units}
          onUnitsChange={setUnits}
        />

        <div className="flex flex-col items-center mb-8">
          <h2 className="text-white text-2xl md:text-3xl font-light mb-8">
            {"How's the sky looking today?"}
          </h2>

          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {weather && forecast && (
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
              {/* Left column */}
              <div className="flex-1 space-y-4 sm:space-y-6">
                <CurrentWeather weather={weather} units={units} />
                <WeatherStats weather={weather} units={units} />
                <div className="block lg:hidden">
                  <HourlyForecast forecast={forecast} units={units} />
                </div>
                <DailyForecast forecast={forecast} units={units} />
              </div>

              {/* Right column - desktop only */}
              <div className="hidden lg:block lg:w-80 xl:w-96">
                <HourlyForecast forecast={forecast} units={units} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
