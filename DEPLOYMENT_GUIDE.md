# Deployment Guide

## Backend Deployment (Required for Production)

Your frontend is deployed on Netlify, but you need to deploy the backend to a cloud service for it to work in production.

### Option 1: Deploy to Heroku (Recommended)

1. **Create a Heroku account** at https://heroku.com
2. **Install Heroku CLI** from https://devcenter.heroku.com/articles/heroku-cli
3. **Login to Heroku**:
   ```bash
   heroku login
   ```
4. **Create a new Heroku app**:
   ```bash
   cd backend
   heroku create your-app-name
   ```
5. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://thehospitalityhub.netlify.app"
   ```
6. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push heroku main
   ```

### Option 2: Deploy to Railway

1. **Create a Railway account** at https://railway.app
2. **Connect your GitHub repository**
3. **Set environment variables** in Railway dashboard
4. **Deploy automatically**

### Option 3: Deploy to Render

1. **Create a Render account** at https://render.com
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Set environment variables**
5. **Deploy**

## Frontend Configuration

After deploying your backend, update the frontend:

1. **Update the backend URL** in `src/services/api.js`:

   ```javascript
   const API_URL =
     process.env.REACT_APP_BACKEND_URL ||
     (window.location.hostname === 'localhost'
       ? 'http://localhost:5000/api'
       : 'https://your-actual-backend-url.herokuapp.com/api');
   ```

2. **Set environment variable** in Netlify:
   - Go to your Netlify dashboard
   - Navigate to Site settings > Environment variables
   - Add: `REACT_APP_BACKEND_URL` = `https://your-backend-url.herokuapp.com/api`

## Environment Variables Needed

### Backend (.env or Heroku config vars):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospitality-hub
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
FRONTEND_URL=https://thehospitalityhub.netlify.app
```

### Frontend (Netlify environment variables):

```
REACT_APP_BACKEND_URL=https://your-backend-url.herokuapp.com/api
```

## Quick Test

After deployment, test the backend:

```bash
curl https://your-backend-url.herokuapp.com/api/health
```

You should see:

```json
{
  "status": "OK",
  "message": "Hospitality Hub API is running",
  "timestamp": "..."
}
```

## Troubleshooting

1. **CORS errors**: Make sure your backend CORS configuration includes your Netlify domain
2. **Database connection**: Verify your MongoDB Atlas URI is correct
3. **Environment variables**: Double-check all environment variables are set correctly
4. **Logs**: Check Heroku logs with `heroku logs --tail`
