import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const weatherService = {
  async getCurrentWeather(location) {
    try {
      const response = await apiClient.get('/weather/current', {
        params: { location }
      })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch current weather')
    }
  },

  async getForecast(location, days = 5) {
    try {
      const response = await apiClient.get('/weather/forecast', {
        params: { location, days }
      })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast')
    }
  },

  async searchLocations(query) {
    try {
      const response = await apiClient.get('/weather/search', {
        params: { q: query }
      })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search locations')
    }
  },

  async getAstronomy(location, date) {
    try {
      const response = await apiClient.get('/weather/astronomy', {
        params: { location, date }
      })
      return response.data.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch astronomy data')
    }
  }
}

export default weatherService
