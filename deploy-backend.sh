#!/bin/bash

# Backend Deployment Script for Heroku
echo "🚀 Deploying Hospitality Hub Backend to Heroku..."

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed. Please install it first:"
    echo "   https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if user is logged in to Heroku
if ! heroku auth:whoami &> /dev/null; then
    echo "❌ Please login to Heroku first:"
    echo "   heroku login"
    exit 1
fi

# Create Heroku app (if it doesn't exist)
echo "📱 Creating Heroku app..."
heroku create hospitality-hub-backend-$(date +%s) 2>/dev/null || echo "App might already exist"

# Set environment variables
echo "🔧 Setting environment variables..."
echo "Please set these environment variables in your Heroku dashboard:"
echo "   MONGODB_URI=your-mongodb-atlas-uri"
echo "   JWT_SECRET=your-jwt-secret"
echo "   NODE_ENV=production"
echo "   FRONTEND_URL=https://thehospitalityhub.netlify.app"

# Deploy
echo "🚀 Deploying to Heroku..."
git add .
git commit -m "Deploy backend to Heroku" || echo "No changes to commit"
git push heroku main

echo "✅ Deployment complete!"
echo "🔗 Your backend URL: https://$(heroku apps:info --json | jq -r '.app.name').herokuapp.com"
echo "📝 Don't forget to update your frontend with the new backend URL!"
