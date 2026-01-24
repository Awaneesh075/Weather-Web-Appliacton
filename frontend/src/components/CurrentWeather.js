export const renderCurrentWeather = (data) => {
  const section = document.createElement('section')
  section.className = 'current-weather-section'

  if (!data || !data.location || !data.current) {
    section.innerHTML = '<p>Unable to load weather data</p>'
    return section
  }

  const { location, current } = data

  const getWeatherEmoji = (iconUrl) => {
    if (!iconUrl) return '🌤️'
    if (iconUrl.includes('rain')) return '🌧️'
    if (iconUrl.includes('cloud')) return '☁️'
    if (iconUrl.includes('clear') || iconUrl.includes('sunny')) return '☀️'
    if (iconUrl.includes('snow')) return '❄️'
    if (iconUrl.includes('thunder') || iconUrl.includes('lightning')) return '⛈️'
    return '🌤️'
  }

  const html = `
    <div class="current-weather">
      <div class="location-info">
        <h1 class="location-name">${location.name || 'Unknown'}, ${location.country || ''}</h1>
        <p class="location-meta">
          <span>${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          <span class="dot">•</span>
          <span>${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </p>
      </div>

      <div class="weather-main">
        <div class="weather-icon-temp">
          <div class="weather-emoji">${getWeatherEmoji(current.condition?.icon || '')}</div>
          <div class="temp-display">
            <span class="temperature">${Math.round(current.temp_c || 0)}°</span>
            <span class="temp-unit">C</span>
          </div>
        </div>

        <div class="weather-description">
          <p class="condition">${current.condition?.text || 'Unknown'}</p>
          <p class="feels-like">Feels like ${Math.round(current.feelslike_c || 0)}°C</p>
        </div>
      </div>

      <div class="weather-quick-stats">
        <div class="stat">
          <i class="fas fa-droplet"></i>
          <div>
            <span class="label">Humidity</span>
            <span class="value">${current.humidity || 0}%</span>
          </div>
        </div>
        <div class="stat">
          <i class="fas fa-wind"></i>
          <div>
            <span class="label">Wind</span>
            <span class="value">${Math.round(current.windspeed_kph || 0)} km/h</span>
          </div>
        </div>
        <div class="stat">
          <i class="fas fa-eye"></i>
          <div>
            <span class="label">Visibility</span>
            <span class="value">${Math.round(current.visibility_km || 10)} km</span>
          </div>
        </div>
        <div class="stat">
          <i class="fas fa-gauge"></i>
          <div>
            <span class="label">Pressure</span>
            <span class="value">${current.pressure_mb || 1013} mb</span>
          </div>
        </div>
      </div>
    </div>
  `

  section.innerHTML = html
  return section
}
