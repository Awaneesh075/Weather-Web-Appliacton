# 🌤️ Weather App - Modern Weather Forecasting Application

A production-ready, responsive weather application built with vanilla JavaScript, Node.js, and Express.js. Features real-time weather data, 5-day forecasts, and beautiful UI with smooth animations.

## ✨ Features

### 🎨 Modern UI/UX
- **Stunning Gradient Animations**: Dynamic background with animated color shifts
- **Glassmorphism Design**: Modern frosted glass effect with backdrop blur
- **Smooth Transitions**: Cubic-bezier animations for all interactive elements
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Dark Mode Support**: Automatic dark mode based on system preferences

### 🌍 Weather Data
- **Real-time Weather**: Current temperature, conditions, and detailed metrics
- **5-Day Forecast**: Daily weather predictions with highs, lows, and conditions
- **8 Weather Highlights**: Humidity, wind speed, cloud cover, UV index, pressure, visibility, dew point, precipitation
- **Location Search**: Auto-suggestions with geocoding support
- **Global Coverage**: Access weather data for any location worldwide

### 🔧 Technical Excellence
- **Free API**: Powered by Open-Meteo (no authentication required, unlimited requests)
- **Async/Await**: Modern JavaScript with proper error handling
- **Debounced Search**: Optimized location suggestions with debouncing
- **Progressive Enhancement**: Works with and without JavaScript
- **Security Headers**: Helmet.js for production security
- **CORS Enabled**: Cross-origin requests properly configured

### 📦 Deployment Ready
- **Docker Support**: Complete Docker & Docker Compose configuration
- **Nginx Reverse Proxy**: Production-grade web server setup
- **PM2 Configuration**: Process management for production
- **Multiple Deployment Guides**: Heroku, AWS, DigitalOcean, Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Local Development

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd Weather-Web-Appliacton
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

Start backend:
```bash
npm start
# or for development with auto-reload
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The frontend will open at `http://localhost:3000`

## 📂 Project Structure

```
Weather-Web-Application/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express server entry point
│   │   ├── controllers/
│   │   │   └── weatherController.js  # API handlers
│   │   ├── routes/
│   │   │   └── weather.js         # API endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.js    # Error handling & async wrapper
│   │   └── utils/
│   │       └── weatherApi.js      # Open-Meteo API wrapper
│   ├── package.json
│   ├── .env
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── main.js                # Application entry
│   │   ├── App.js                 # Main component
│   │   ├── components/
│   │   │   ├── Header.js          # Header & search
│   │   │   ├── CurrentWeather.js  # Current weather display
│   │   │   ├── Highlights.js      # Weather metrics cards
│   │   │   ├── Forecast.js        # 5-day forecast
│   │   │   └── LoadingError.js    # Loading spinner & error
│   │   ├── services/
│   │   │   └── weatherService.js  # API client
│   │   └── styles/
│   │       └── main.css           # Complete styling
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml
├── DEPLOYMENT.md
├── QUICK_START.md
└── README.md
```

## 🎯 API Endpoints

### Backend Endpoints (http://localhost:5000/api)

| Endpoint | Method | Parameters | Description |
|----------|--------|-----------|-------------|
| `/weather/current` | GET | `location` (string) | Current weather for location |
| `/weather/forecast` | GET | `location`, `days` (1-16) | Weather forecast |
| `/weather/search` | GET | `q` (string) | Search locations |
| `/weather/astronomy` | GET | `location`, `date` | Astronomy data |
| `/health` | GET | - | Health check |

### Response Format
```json
{
  "success": true,
  "message": "Current weather fetched successfully",
  "data": {
    "location": {
      "name": "New York",
      "country": "United States",
      "lat": 40.7128,
      "lon": -74.0060
    },
    "current": {
      "temp_c": 22,
      "condition": {
        "text": "Partly Cloudy",
        "icon": "cloud"
      },
      "humidity": 65,
      "windspeed_kph": 12,
      ...
    }
  }
}
```

## 🎨 UI Components

### Current Weather Section
- Large temperature display with gradient text
- Location and date/time information
- Weather condition with emoji
- Quick stats: Humidity, Wind, Visibility, Pressure

### Highlights Section (8 Cards)
- **Humidity**: Percentage with progress bar
- **Wind Speed**: Current and gust speed
- **Cloud Cover**: Coverage percentage with bar
- **UV Index**: Value with risk category
- **Pressure**: Atmospheric pressure in mb/in
- **Visibility**: Clear vision distance
- **Dew Point**: Moisture indicator
- **Precipitation**: Last hour precipitation

### Forecast Section (5-Day)
- Day name and date
- Weather emoji and condition
- High/Low temperatures
- Additional metrics: Humidity, Wind, Precipitation chance

## 🛠️ Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start with nodemon (auto-reload)
npm run lint       # Run ESLint
npm run lint:fix   # Fix linting issues
```

#### Frontend
```bash
npm start          # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env, if needed)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 768px to 1024px
- **Desktop**: 1024px and above

## 🔒 Security Features

- **Helmet.js**: Security headers (CSP, HSTS, XSS protection)
- **CORS Configuration**: Restricted to specified origins
- **Input Validation**: Location parameters validated
- **Error Handling**: Proper error messages without exposing internals
- **Rate Limiting Ready**: Structure supports rate limiting middleware

## 🚢 Deployment

### Docker Deployment
```bash
docker-compose up --build
```

Accesses at http://localhost

### Traditional Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides:
- Heroku Deployment
- AWS Deployment
- DigitalOcean Deployment
- Vercel Deployment

## 🎨 Design System

### Colors
- **Primary**: `#667eea` (Periwinkle)
- **Secondary**: `#764ba2` (Purple)
- **Accent**: `#f093fb` (Pink)
- **Text**: `#1f2937` (Dark Gray)
- **Muted**: `#9ca3af` (Light Gray)

### Typography
- **Font Family**: Inter (system fonts fallback)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Sizes**: Responsive and scalable

### Effects
- **Shadows**: Multiple depth levels
- **Blur**: Backdrop filter with webkit support
- **Animations**: Smooth transitions with cubic-bezier
- **Gradients**: Linear gradients with 3-4 color stops

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome 90+)

## 📊 Performance Optimizations

- **Minification**: Terser for bundle size reduction
- **Lazy Loading**: Components render on demand
- **Debouncing**: Search suggestions debounced
- **Caching**: Browser caching for assets
- **Code Splitting**: Vendor libraries separated
- **Reduced Motion**: Respects `prefers-reduced-motion`

## 🐛 Error Handling

- Graceful fallbacks for missing data
- User-friendly error messages
- Console error logging for debugging
- Network error recovery
- Timeout handling (10s default)

## 📚 API Reference

### getCurrentWeather(location)
```javascript
const weather = await weatherService.getCurrentWeather('New York')
// Returns: { location, current, last_updated, last_updated_epoch }
```

### getForecast(location, days)
```javascript
const forecast = await weatherService.getForecast('London', 5)
// Returns: { location, current, forecast: [...] }
```

### searchLocations(query)
```javascript
const locations = await weatherService.searchLocations('Paris')
// Returns: [ { id, name, region, country, lat, lon, url }, ... ]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **Open-Meteo**: Free weather API without authentication
- **Font Awesome**: Icon library
- **Google Fonts**: Typography
- **Vite**: Fast frontend tooling
- **Express.js**: Backend framework

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](../../issues)
- Email: support@weatherapp.local

## 🗺️ Roadmap

- [ ] Weather alerts and notifications
- [ ] User accounts and favorites
- [ ] Historical weather data
- [ ] Weather maps and radar
- [ ] Air quality index
- [ ] Pollen forecasts
- [ ] Multi-language support
- [ ] PWA with offline support
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

---

**Made with ❤️ by the Weather App Team**

[⬆ Back to Top](#-weather-app---modern-weather-forecasting-application)
