# ⚡ Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Start Backend
```bash
cd backend
npm install
npm start
```
✅ Runs on `http://localhost:5000`

### Step 2: Start Frontend
```bash
cd frontend
npm install
npm start
```
✅ Opens at `http://localhost:3000`

---

## 📁 Project Structure Quick Guide

```
Weather-Web-Appliacton/
├── backend/
│   └── src/
│       ├── server.js          ← Main server
│       ├── controllers/       ← API handlers
│       ├── routes/            ← Endpoints
│       ├── middleware/        ← Error handling
│       └── utils/             ← API wrapper
│
├── frontend/
│   └── src/
│       ├── App.js             ← Main component
│       ├── components/        ← React-style components
│       ├── services/          ← API client
│       └── styles/            ← CSS (main.css)
│
└── Documentation files (README, DEPLOYMENT, etc.)
```

---

## 🔧 Common Commands

### Backend
| Command | Purpose |
|---------|---------|
| `npm start` | Run production server |
| `npm run dev` | Run with auto-reload |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |

### Frontend
| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server on 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Format code |

### Docker
| Command | Purpose |
|---------|---------|
| `docker-compose up --build` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose logs` | View container logs |

---

## 🌐 API Quick Reference

### Current Weather
```
GET /api/weather/current?location=London
```

### 5-Day Forecast
```
GET /api/weather/forecast?location=Paris&days=5
```

### Search Locations
```
GET /api/weather/search?q=New
```

### Health Check
```
GET /api/health
```

---

## 🎨 UI Features at a Glance

### ✨ Visual Design
- 🌈 Animated gradient background
- 🔮 Glassmorphism cards (frosted glass)
- ✨ Gradient text effects
- 🎬 Smooth animations (staggered loading)
- 🌙 Dark mode support

### 🎯 Interactive Features
- 🔍 Auto-complete location search (debounced)
- 🎪 Floating emoji animation
- 🖱️ Hover effects (scale + lift)
- 📱 Responsive on all devices
- ♿ Accessibility support (reduced motion, dark mode)

### 📊 Information Displays
- 🌡️ Current temperature with emoji
- 📈 8 weather metric cards
- 📅 5-day forecast cards
- ⚡ Quick stats (humidity, wind, visibility, pressure)

---

## 🔐 Security Features

- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling
- ✅ No sensitive data in responses

---

## 📱 Responsive Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile Phone | 480px | Single column, stacked |
| Tablet | 768px | 2 columns, adjusted sizing |
| Small Desktop | 1024px | 3-4 columns |
| Large Desktop | 1400px | Full width with max-width |

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Port 5000 Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### API Not Responding
1. Check backend is running: `npm start` in backend folder
2. Verify port 5000 is open
3. Check CORS_ORIGIN in .env matches frontend URL

### Styles Not Updating
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Restart frontend dev server

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| `README_NEW.md` | Complete project overview |
| `QUICK_START.md` | Getting started guide |
| `DEPLOYMENT.md` | Production deployment guides |
| `UI_ENHANCEMENTS.md` | Design system & animations |
| `PROJECT_COMPLETION_REPORT.md` | Full feature list & metrics |
| `REFACTORING_SUMMARY.md` | Changes & improvements |

---

## 🎯 Key Features

### Current Weather
- Location name, country, date, time
- Large temperature display
- Weather condition with emoji
- Feels-like temperature
- Quick stats: humidity, wind, visibility, pressure

### 5-Day Forecast
- Day name and date
- Weather emoji and condition
- High/low temperatures
- Humidity, wind speed, precipitation chance

### 8 Highlights
1. Humidity (with bar)
2. Wind Speed
3. Cloud Cover (with bar)
4. UV Index with risk level
5. Pressure (mb + in)
6. Visibility
7. Dew Point
8. Precipitation

---

## 🚀 Deployment

### Docker (One Command)
```bash
docker-compose up --build
```
Visit: `http://localhost`

### Heroku
See `DEPLOYMENT.md` for full guide
- Connect GitHub repo
- Set environment variables
- Deploy with one click

### Traditional Server
1. Install Node.js
2. Install dependencies
3. Set .env variables
4. Run `npm start`

---

## 📊 Performance Tips

- 🚀 Frontend is pre-compiled (Vite)
- 💾 Animations use GPU acceleration
- ⚡ Search is debounced (300ms)
- 🔄 API responses are optimized
- 📦 Code is minified for production

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile | Modern | ✅ Full |

---

## 🎓 Code Examples

### Search for Weather
```javascript
const weather = await weatherService.getCurrentWeather('Tokyo');
console.log(weather.current.temp_c); // 22°C
```

### Get Forecast
```javascript
const forecast = await weatherService.getForecast('Paris', 5);
forecast.forEach(day => {
  console.log(day.day.condition.text); // "Sunny", "Rainy", etc.
});
```

### Search Locations
```javascript
const locations = await weatherService.searchLocations('New');
locations.forEach(loc => {
  console.log(`${loc.name}, ${loc.country}`);
});
```

---

## 💡 Tips & Tricks

### Faster Development
1. Keep terminal windows open for both backend & frontend
2. Use browser DevTools for debugging
3. Hot reload is enabled by default
4. Check console for error messages

### Better Search Results
1. Type at least 2 characters
2. Wait for suggestions to appear (debounced)
3. Click or press Enter to search
4. Results show top 5 matches

### Mobile Testing
1. Open DevTools (F12)
2. Click device toggle (Ctrl+Shift+M)
3. Select device from list
4. Test all responsive features

### Dark Mode Testing
1. Open System Settings
2. Set theme to Dark
3. Refresh browser
4. Styles automatically update

---

## 🔗 Useful Links

- **Weather API**: https://open-meteo.com
- **Font Awesome**: https://fontawesome.com
- **Google Fonts**: https://fonts.google.com
- **Vite Docs**: https://vitejs.dev
- **Express Docs**: https://expressjs.com

---

## ⏰ Timeline Overview

| Phase | Task | Status |
|-------|------|--------|
| 1 | Backend Setup | ✅ Complete |
| 2 | API Integration | ✅ Complete |
| 3 | Frontend Build | ✅ Complete |
| 4 | UI Enhancement | ✅ Complete |
| 5 | Documentation | ✅ Complete |
| 6 | Deployment Setup | ✅ Complete |

---

## 📞 Need Help?

1. **Check Documentation**: See `README_NEW.md` first
2. **Review Examples**: Check component files
3. **Check Logs**: Backend/frontend console for errors
4. **Restart Services**: Kill and restart both servers

---

## ✅ Pre-Deployment Checklist

- ✅ Backend runs without errors
- ✅ Frontend loads at localhost:3000
- ✅ Search functionality works
- ✅ Weather data displays correctly
- ✅ Responsive design looks good
- ✅ Dark mode toggles properly
- ✅ No console errors
- ✅ All animations are smooth

---

**Keep This Guide Handy!** 📌

**Last Updated**: January 24, 2026  
**Version**: 2.0
