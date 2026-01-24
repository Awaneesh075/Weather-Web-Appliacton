import { weatherService } from './services/weatherService.js'
import { renderHeader, renderSearchBar } from './components/Header.js'
import { renderCurrentWeather } from './components/CurrentWeather.js'
import { renderHighlights } from './components/Highlights.js'
import { renderForecast } from './components/Forecast.js'
import { renderLoading, renderError } from './components/LoadingError.js'

let currentWeatherData = null
let forecastData = null

const App = () => {
  const container = document.createElement('div')
  container.className = 'app-container'
  container.id = 'root'

  const handleSearch = async (location) => {
    try {
      const contentDiv = container.querySelector('.app-content')
      contentDiv.innerHTML = ''
      contentDiv.appendChild(renderLoading())

      const current = await weatherService.getCurrentWeather(location)
      const forecast = await weatherService.getForecast(location, 5)

      currentWeatherData = current
      forecastData = forecast

      contentDiv.innerHTML = ''
      contentDiv.appendChild(renderCurrentWeather(current))
      contentDiv.appendChild(renderHighlights(current))
      contentDiv.appendChild(renderForecast(forecast))
    } catch (error) {
      const contentDiv = container.querySelector('.app-content')
      contentDiv.innerHTML = ''
      contentDiv.appendChild(renderError(error.message || 'Failed to fetch weather data'))
    }
  }

  const initApp = async () => {
    // Render header and search bar
    container.appendChild(renderHeader())

    const searchContainer = document.createElement('div')
    searchContainer.className = 'search-container'
    container.appendChild(searchContainer)
    searchContainer.appendChild(renderSearchBar(handleSearch))

    // Content container
    const contentDiv = document.createElement('div')
    contentDiv.className = 'app-content'
    container.appendChild(contentDiv)

    // Load default location
    contentDiv.appendChild(renderLoading())
    try {
      const defaultLocation = 'New York'
      const current = await weatherService.getCurrentWeather(defaultLocation)
      const forecast = await weatherService.getForecast(defaultLocation, 5)

      currentWeatherData = current
      forecastData = forecast

      contentDiv.innerHTML = ''
      contentDiv.appendChild(renderCurrentWeather(current))
      contentDiv.appendChild(renderHighlights(current))
      contentDiv.appendChild(renderForecast(forecast))
    } catch (error) {
      contentDiv.innerHTML = ''
      contentDiv.appendChild(renderError('Failed to load default weather. Please search for a location.'))
    }
  }

  initApp()
  return container
}

export default App
