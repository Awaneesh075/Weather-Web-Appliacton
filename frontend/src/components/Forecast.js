export const renderForecast = (data) => {
  const section = document.createElement('section')
  section.className = 'forecast-section'

  // Handle both direct array and object with forecast property
  let forecast = Array.isArray(data) ? data : (data?.forecast || [])

  if (!Array.isArray(forecast) || forecast.length === 0) {
    section.innerHTML = '<h2 class="section-title">5-Day Forecast</h2><div class="forecast-cards"><p>No forecast data available</p></div>'
    return section
  }

  let html = '<h2 class="section-title">5-Day Forecast</h2><div class="forecast-cards">'

  forecast.forEach((day) => {
    const date = new Date(day.date)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const emoji = getWeatherEmoji(day.day.condition.icon)

    html += `
      <div class="forecast-card">
        <div class="forecast-header">
          <span class="day-name">${dayName}</span>
          <span class="date">${dateStr}</span>
        </div>

        <div class="forecast-icon">${emoji}</div>

        <div class="forecast-temps">
          <span class="high">${Math.round(day.day.maxtemp_c)}°</span>
          <span class="separator">/</span>
          <span class="low">${Math.round(day.day.mintemp_c)}°</span>
        </div>

        <p class="forecast-condition">${day.day.condition.text}</p>

        <div class="forecast-details">
          <div class="detail">
            <i class="fas fa-droplet"></i>
            <span>${day.day.avghumidity}%</span>
          </div>
          <div class="detail">
            <i class="fas fa-wind"></i>
            <span>${Math.round(day.day.maxwind_kph)} km/h</span>
          </div>
          <div class="detail">
            <i class="fas fa-cloud-rain"></i>
            <span>${Math.round(day.day.chance_of_rain)}%</span>
          </div>
        </div>
      </div>
    `
  })

  html += '</div>'
  section.innerHTML = html
  return section
}

const getWeatherEmoji = (iconUrl) => {
  if (iconUrl.includes('rain')) return '🌧️'
  if (iconUrl.includes('cloud')) return '☁️'
  if (iconUrl.includes('clear') || iconUrl.includes('sunny')) return '☀️'
  if (iconUrl.includes('snow')) return '❄️'
  if (iconUrl.includes('thunder') || iconUrl.includes('lightning')) return '⛈️'
  if (iconUrl.includes('mist') || iconUrl.includes('fog')) return '🌫️'
  return '🌤️'
}
