export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  })
}

export function getDayName(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  })
}

export function groupForecastByDay(forecastList: any[]) {
  const grouped: { [key: string]: any[] } = {}

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString()
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(item)
  })

  return Object.values(grouped).slice(0, 7)
}

export function getHourlyForecast(forecastList: any[], count = 8) {
  return forecastList.slice(0, count)
}

export function getCurrentDayName(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
  })
}
