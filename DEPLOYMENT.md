# Weather App - Production Ready Deployment

## Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
PORT=5000
NODE_ENV=production
RAPIDAPI_KEY=your_api_key_here
RAPIDAPI_HOST=weatherapi-com.p.rapidapi.com
CORS_ORIGIN=https://yourdomain.com
```

## Docker Deployment

### Build Images

```bash
docker-compose build
```

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Manual Deployment

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Build for production:
```bash
npm run build
```

4. Serve with a static server:
```bash
npm install -g serve
serve -s dist -l 3000
```

## Cloud Deployments

### Heroku

#### Backend:
```bash
heroku create weather-api-backend
heroku buildpacks:add heroku/nodejs
git push heroku main
heroku config:set RAPIDAPI_KEY=your_key_here
```

#### Frontend:
```bash
heroku create weather-app-frontend
heroku buildpacks:add heroku/nodejs
git push heroku main
```

### Vercel (Frontend)

```bash
npm install -g vercel
vercel deploy frontend
```

### AWS (EC2 + S3 + CloudFront)

#### Backend on EC2:
1. Launch EC2 instance (Node.js AMI)
2. SSH into instance
3. Clone repository
4. Install dependencies and configure
5. Use PM2 for process management

#### Frontend on S3 + CloudFront:
1. Build frontend: `npm run build`
2. Upload `dist/` folder to S3
3. Create CloudFront distribution
4. Set S3 bucket as origin

### DigitalOcean

#### Backend:
```bash
# Create Droplet with Node.js
# SSH into droplet
git clone your-repo
cd Weather-Web-Appliacton/backend
npm install
npm start
```

#### Frontend:
```bash
# Create Droplet with Node.js
# SSH into droplet
git clone your-repo
cd Weather-Web-Appliacton/frontend
npm install
npm run build
# Use Nginx to serve dist folder
```

## Database & Caching (Optional)

### Redis (for caching API responses)

```bash
docker run -d -p 6379:6379 redis:latest
```

Add to backend environment:
```
REDIS_URL=redis://localhost:6379
```

## Monitoring & Logging

### PM2 Monitoring (Backend)

```bash
npm install -g pm2
pm2 start src/server.js --name "weather-api"
pm2 save
pm2 startup
pm2 logs
```

### Health Checks

- Backend: `http://localhost:5000/api/health`
- Frontend: `http://localhost:3000/health`

## Performance Optimization

- [ ] Enable gzip compression (done in nginx.conf)
- [ ] Implement API response caching
- [ ] Use CDN for static assets
- [ ] Minify and bundle frontend assets
- [ ] Enable database indexing (if using database)
- [ ] Implement rate limiting

## Security Checklist

- [ ] Update RAPIDAPI_KEY in environment
- [ ] Enable HTTPS/SSL
- [ ] Set appropriate CORS_ORIGIN
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Enable security headers (Helmet.js already included)
- [ ] Regular security audits

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### API Connection Issues

1. Check backend is running: `curl http://localhost:5000/api/health`
2. Verify RAPIDAPI_KEY is correct
3. Check CORS configuration

### Frontend Build Issues

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Support

For issues or questions, please create an issue in the repository.
