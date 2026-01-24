import express from 'express';
import {
  getCurrentWeather,
  getForecast,
  searchLocationsHandler,
  getAstronomy
} from '../controllers/weatherController.js';

const router = express.Router();

/**
 * GET /api/weather/current
 * Get current weather for a location
 * Query params: location (required)
 */
router.get('/current', getCurrentWeather);

/**
 * GET /api/weather/forecast
 * Get weather forecast for a location
 * Query params: location (required), days (optional, default: 5, max: 10)
 */
router.get('/forecast', getForecast);

/**
 * GET /api/weather/search
 * Search for locations
 * Query params: q (required)
 */
router.get('/search', searchLocationsHandler);

/**
 * GET /api/weather/astronomy
 * Get astronomy data for a location on a specific date
 * Query params: location (required), date (required, format: YYYY-MM-DD)
 */
router.get('/astronomy', getAstronomy);

export default router;
