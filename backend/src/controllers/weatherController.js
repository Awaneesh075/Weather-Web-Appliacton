import {
  fetchCurrentWeather,
  fetchForecast,
  fetchAstronomy,
  searchLocations
} from '../utils/weatherApi.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

/**
 * Get current weather for a location
 */
export const getCurrentWeather = asyncHandler(async (req, res) => {
  const { location } = req.query;

  if (!location) {
    throw new AppError('Location query parameter is required', 400);
  }

  const data = await fetchCurrentWeather(location);

  res.status(200).json({
    success: true,
    message: 'Current weather fetched successfully',
    data: data
  });
});

/**
 * Get weather forecast for a location
 */
export const getForecast = asyncHandler(async (req, res) => {
  const { location, days = 5 } = req.query;

  if (!location) {
    throw new AppError('Location query parameter is required', 400);
  }

  const forecastDays = Math.min(Math.max(parseInt(days) || 5, 1), 10);
  const data = await fetchForecast(location, forecastDays);

  res.status(200).json({
    success: true,
    message: 'Forecast fetched successfully',
    data: data
  });
});

/**
 * Search for locations
 */
export const searchLocationsHandler = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError('Search query parameter is required', 400);
  }

  const data = await searchLocations(q);

  res.status(200).json({
    success: true,
    message: 'Search completed successfully',
    data: data.map(location => ({
      id: location.id,
      name: location.name,
      region: location.region,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      url: location.url
    }))
  });
});

/**
 * Get astronomy data for a specific date
 */
export const getAstronomy = asyncHandler(async (req, res) => {
  const { location, date } = req.query;

  if (!location) {
    throw new AppError('Location query parameter is required', 400);
  }

  if (!date) {
    throw new AppError('Date query parameter is required (YYYY-MM-DD)', 400);
  }

  const data = await fetchAstronomy(location, date);

  res.status(200).json({
    success: true,
    message: 'Astronomy data fetched successfully',
    data: {
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country
      },
      astronomy: data.astronomy.astro
    }
  });
});
