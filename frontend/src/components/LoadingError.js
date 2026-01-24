export const renderLoading = () => {
  const div = document.createElement('div')
  div.className = 'loading-container'
  div.innerHTML = `
    <div class="spinner"></div>
    <p>Loading weather data...</p>
  `
  return div
}

export const renderError = (message) => {
  const div = document.createElement('div')
  div.className = 'error-container'
  div.innerHTML = `
    <div class="error-icon">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <h3>Oops! Something went wrong</h3>
    <p>${message}</p>
    <p class="error-hint">Please try searching for a different location or check your internet connection.</p>
  `
  return div
}
