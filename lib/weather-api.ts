const API_KEY = "9d729cfd40c256defac28e6a8266b774"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export interface WeatherData {
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  dt: number
}

export interface ForecastData {
  list: Array<{
    dt: number
    main: {
      temp: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
    }
    dt_txt: string
  }>
  city: {
    name: string
    country: string
  }
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

  if (!response.ok) {
    throw new Error("City not found")
  }

  return response.json()
}

export async function getForecast(city: string): Promise<ForecastData> {
  const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

  if (!response.ok) {
    throw new Error("City not found")
  }

  return response.json()
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export interface CitySearchResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export async function searchCities(query: string): Promise<CitySearchResult[]> {
  if (query.length < 2) return []

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
    )

    if (!response.ok) {
      return []
    }

    return response.json()
  } catch (error) {
    console.error("City search error:", error)
    return []
  }
}
