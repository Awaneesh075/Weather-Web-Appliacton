import { weatherService } from '../services/weatherService.js'

export const renderHeader = () => {
  const header = document.createElement('header')
  header.className = 'app-header'
  header.innerHTML = `
    <div class="header-content">
      <div class="logo">
        <i class="fas fa-cloud-sun"></i>
        <span>Weather App</span>
      </div>
    </div>
  `
  return header
}

export const renderSearchBar = (onSearch) => {
  const searchDiv = document.createElement('div')
  searchDiv.className = 'search-box'

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'search-input'
  input.placeholder = 'Search for a city...'
  input.id = 'locationInput'

  const suggestionsDiv = document.createElement('div')
  suggestionsDiv.className = 'suggestions-dropdown'
  suggestionsDiv.id = 'suggestionsDropdown'

  const searchButton = document.createElement('button')
  searchButton.className = 'search-button'
  searchButton.innerHTML = '<i class="fas fa-search"></i>'
  searchButton.title = 'Search'

  const handleSearch = () => {
    const location = input.value.trim()
    if (location) {
      onSearch(location)
      suggestionsDiv.style.display = 'none'
    }
  }

  searchButton.addEventListener('click', handleSearch)

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  })

  // Auto-suggestions
  let debounceTimer
  input.addEventListener('input', async (e) => {
    clearTimeout(debounceTimer)
    const query = e.target.value.trim()

    if (query.length < 2) {
      suggestionsDiv.style.display = 'none'
      return
    }

    debounceTimer = setTimeout(async () => {
      try {
        const locations = await weatherService.searchLocations(query)
        suggestionsDiv.innerHTML = ''

        if (locations.length === 0) {
          suggestionsDiv.innerHTML = '<div class="suggestion-item">No results found</div>'
        } else {
          locations.slice(0, 5).forEach((location) => {
            const item = document.createElement('div')
            item.className = 'suggestion-item'
            item.innerHTML = `${location.name}, ${location.country}`
            item.addEventListener('click', () => {
              input.value = location.name
              suggestionsDiv.style.display = 'none'
              handleSearch()
            })
            suggestionsDiv.appendChild(item)
          })
        }

        suggestionsDiv.style.display = locations.length > 0 ? 'block' : 'none'
      } catch (error) {
        console.error('Search error:', error)
      }
    }, 300)
  })

  searchDiv.appendChild(input)
  searchDiv.appendChild(suggestionsDiv)
  searchDiv.appendChild(searchButton)

  return searchDiv
}
