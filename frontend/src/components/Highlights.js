export const renderHighlights = (data) => {
  const section = document.createElement('section')
  section.className = 'highlights-section'

  if (!data || !data.current) {
    section.innerHTML = '<h2 class="section-title">Today\'s Highlights</h2><p>No data available</p>'
    return section
  }

  const { current } = data

  const html = `
    <h2 class="section-title">Today's Highlights</h2>
    <div class="highlights-grid">
      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-droplet"></i>
          <span>Humidity</span>
        </div>
        <div class="highlight-value">${current.humidity || 0}%</div>
        <div class="highlight-bar">
          <div class="bar-fill" style="width: ${current.humidity || 0}%"></div>
        </div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-wind"></i>
          <span>Wind Speed</span>
        </div>
        <div class="highlight-value">${Math.round(current.windspeed_kph || 0)} km/h</div>
        <div class="highlight-meta">Gust: ${Math.round(current.gust_kph || 0)} km/h</div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-cloud"></i>
          <span>Cloud Cover</span>
        </div>
        <div class="highlight-value">${current.cloud || 50}%</div>
        <div class="highlight-bar">
          <div class="bar-fill" style="width: ${current.cloud || 50}%"></div>
        </div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-sun"></i>
          <span>UV Index</span>
        </div>
        <div class="highlight-value">${current.uv || 5}</div>
        <div class="highlight-meta">${getUVCategory(current.uv || 5)}</div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-gauge"></i>
          <span>Pressure</span>
        </div>
        <div class="highlight-value">${current.pressure_mb || 1013} mb</div>
        <div class="highlight-meta">${current.pressure_in || 29.92} in</div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-eye"></i>
          <span>Visibility</span>
        </div>
        <div class="highlight-value">${Math.round(current.visibility_km || 10)} km</div>
        <div class="highlight-meta">Clear vision</div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-tint"></i>
          <span>Dew Point</span>
        </div>
        <div class="highlight-value">${Math.round(current.dewpoint_c || 10)}°C</div>
        <div class="highlight-meta">Moisture level</div>
      </div>

      <div class="highlight-card">
        <div class="highlight-header">
          <i class="fas fa-cloud-rain"></i>
          <span>Precipitation</span>
        </div>
        <div class="highlight-value">${current.precip_mm || 0} mm</div>
        <div class="highlight-meta">Last hour</div>
      </div>
    </div>
  `

  section.innerHTML = html
  return section
}

const getUVCategory = (uv) => {
  if (uv < 3) return 'Low'
  if (uv < 6) return 'Moderate'
  if (uv < 8) return 'High'
  if (uv < 11) return 'Very High'
  return 'Extreme'
}
