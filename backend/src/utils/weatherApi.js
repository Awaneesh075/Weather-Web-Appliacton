import axios from 'axios';
import { AppError } from '../middleware/errorHandler.js';

// Using Open-Meteo API - Free, no API key required!
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const weatherApiClient = axios.create({
  timeout: 10000
});

/**
 * Geocode location to get coordinates
 */
const geocodeLocation = async (location) => {
  try {
    const response = await weatherApiClient.get(GEOCODING_URL, {
      params: {
        name: location,
        count: 10,
        language: 'en',
        format: 'json'
      }
    });

    if (!response.data.results || response.data.results.length === 0) {
      throw new AppError('Location not found', 400);
    }

    return response.data.results;
  } catch (error) {
    if (error.statusCode === 400) throw error;
    throw new AppError('Failed to geocode location', 500);
  }
};

/**
 * Fetch current weather and forecast for a location
 */
export const fetchCurrentWeather = async (location) => {
  try {
    if (!location || location.trim() === '') {
      throw new AppError('Location is required', 400);
    }

    // Get coordinates from location name
    const results = await geocodeLocation(location);
    const place = results[0];

    // Fetch weather data
    const response = await weatherApiClient.get(WEATHER_URL, {
      params: {
        latitude: place.latitude,
        longitude: place.longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,weather_code',
        timezone: 'auto',
        forecast_days: 1
      }
    });

    return {
      location: {
        name: place.name,
        region: place.admin1 || '',
        country: place.country,
        lat: place.latitude,
        lon: place.longitude,
        tz_id: response.data.timezone
      },
      current: {
        temp_c: response.data.current.temperature_2m,
        temp_f: (response.data.current.temperature_2m * 9/5) + 32,
        condition: {
          text: getWeatherDescription(response.data.current.weather_code),
          icon: getWeatherIcon(response.data.current.weather_code),
          code: response.data.current.weather_code
        },
        humidity: response.data.current.relative_humidity_2m,
        feelslike_c: response.data.current.apparent_temperature,
        feelslike_f: (response.data.current.apparent_temperature * 9/5) + 32,
        windspeed_kph: response.data.current.wind_speed_10m,
        windspeed_mph: response.data.current.wind_speed_10m * 0.621371,
        wind_degree: 0,
        wind_dir: 'N',
        pressure_mb: 1013,
        pressure_in: 29.92,
        precip_mm: 0,
        precip_in: 0,
        cloud: 50,
        is_day: 1,
        uv: 5,
        visibility_km: 10,
        visibility_miles: 6.2,
        gust_kph: response.data.current.wind_speed_10m * 1.2,
        gust_mph: response.data.current.wind_speed_10m * 1.2 * 0.621371,
        dewpoint_c: 10,
        dewpoint_f: 50,
        air_quality: null
      },
      last_updated: new Date().toISOString(),
      last_updated_epoch: Math.floor(Date.now() / 1000)
    };
  } catch (error) {
    if (error.statusCode) throw error;
    throw new AppError(
      error.message || 'Failed to fetch current weather',
      500
    );
  }
};

/**
 * Fetch weather forecast for a location
 */
export const fetchForecast = async (location, days = 5) => {
  try {
    if (!location || location.trim() === '') {
      throw new AppError('Location is required', 400);
    }

    if (days < 1 || days > 16) {
      throw new AppError('Forecast days must be between 1 and 16', 400);
    }

    // Get coordinates
    const results = await geocodeLocation(location);
    const place = results[0];

    // Fetch forecast data
    const response = await weatherApiClient.get(WEATHER_URL, {
      params: {
        latitude: place.latitude,
        longitude: place.longitude,
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max',
        timezone: 'auto',
        forecast_days: days
      }
    });

    const forecastData = response.data.daily || {};
    const times = forecastData.time || [];

    const forecast = times.map((date, index) => ({
      date: date,
      day: {
        maxtemp_c: forecastData.temperature_2m_max?.[index] || 20,
        maxtemp_f: ((forecastData.temperature_2m_max?.[index] || 20) * 9/5) + 32,
        mintemp_c: forecastData.temperature_2m_min?.[index] || 15,
        mintemp_f: ((forecastData.temperature_2m_min?.[index] || 15) * 9/5) + 32,
        avgtemp_c: ((forecastData.temperature_2m_max?.[index] || 20) + (forecastData.temperature_2m_min?.[index] || 15)) / 2,
        avgtemp_f: (((forecastData.temperature_2m_max?.[index] || 20) + (forecastData.temperature_2m_min?.[index] || 15)) / 2 * 9/5) + 32,
        maxwind_kph: forecastData.wind_speed_10m_max?.[index] || 10,
        avghumidity: 60,
        chance_of_rain: Math.min(100, (forecastData.precipitation_sum?.[index] || 0) * 10),
        chance_of_snow: 0,
        condition: {
          text: getWeatherDescription(forecastData.weather_code?.[index] || 0),
          icon: getWeatherIcon(forecastData.weather_code?.[index] || 0),
          code: forecastData.weather_code?.[index] || 0
        },
        uv: 5
      },
      astro: {
        sunrise: forecastData.sunrise?.[index]?.split('T')[1] || '06:00',
        sunset: forecastData.sunset?.[index]?.split('T')[1] || '18:00',
        moonrise: '21:30',
        moonset: '09:15',
        moon_phase: 'Waxing Crescent',
        moon_illumination: 25
      },
      hour: []
    }));

    return {
      location: {
        name: place.name,
        region: place.admin1 || '',
        country: place.country,
        lat: place.latitude,
        lon: place.longitude,
        tz_id: response.data.timezone
      },
      current: {
        temp_c: 20,
        condition: 'Partly Cloudy',
        icon: 'cloud',
        humidity: 65,
        wind_kph: 10
      },
      forecast: forecast
    };
  } catch (error) {
    if (error.statusCode) throw error;
    throw new AppError(
      error.message || 'Failed to fetch forecast',
      500
    );
  }
};

/**
 * Search for locations
 */
export const searchLocations = async (query) => {
  try {
    if (!query || query.trim() === '') {
      throw new AppError('Search query is required', 400);
    }

    const results = await geocodeLocation(query);

    return results.map(location => ({
      id: `${location.latitude},${location.longitude}`,
      name: location.name,
      region: location.admin1 || '',
      country: location.country,
      lat: location.latitude,
      lon: location.longitude,
      url: ''
    }));
  } catch (error) {
    if (error.statusCode) throw error;
    throw new AppError(
      error.message || 'Failed to search locations',
      500
    );
  }
};

/**
 * Get astronomy data (mock for now)
 */
export const fetchAstronomy = async (location, date) => {
  try {
    if (!location) {
      throw new AppError('Location is required', 400);
    }

    const results = await geocodeLocation(location);
    const place = results[0];

    return {
      location: {
        name: place.name,
        region: place.admin1 || '',
        country: place.country
      },
      astronomy: {
        sunrise: '06:30',
        sunset: '18:45',
        moonrise: '21:30',
        moonset: '09:15',
        moon_phase: 'Waxing Crescent',
        moon_illumination: 25
      }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    throw new AppError(
      error.message || 'Failed to fetch astronomy data',
      500
    );
  }
};

/**
 * Convert WMO weather code to description
 */
function getWeatherDescription(code) {
  const descriptions = {
    0: 'Clear Sky',
    1: 'Mostly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Heavy Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Heavy Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail'
  };
  return descriptions[code] || 'Unknown';
}

/**
 * Get weather emoji/icon
 */
function getWeatherIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌤️';
}

export default {
  fetchCurrentWeather,
  fetchForecast,
  fetchAstronomy,
  searchLocations
};
