# Hospitality Hub - Complete Setup Guide

This guide will help you set up both the frontend and backend for the Hospitality Hub service industry application.

## Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## Project Structure

```
ServiceIndustryApplication/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── contexts/          # React contexts (AuthContext)
│   └── services/          # API service layer
├── backend/               # Node.js/Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Main server file
└── build/                # Frontend build output
```

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/hospitality-hub
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/hospitality-hub

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-random
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Start MongoDB

**Option A: Local MongoDB**

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

**Option B: MongoDB Atlas**

- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Create a new cluster
- Get your connection string and update the `MONGODB_URI` in `.env`

### 5. Initialize the Database

Run the setup script to create an admin user:

```bash
npm run setup
```

This will create an admin user with:

- Email: `admin@hospitalityhub.com`
- Password: `admin123456`

**⚠️ Important: Change the admin password in production!**

### 6. Start the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Root Directory

```bash
cd ..  # Go back to the project root
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp env.example .env
```

Edit the `.env` file:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Environment
NODE_ENV=development
```

### 4. Start the Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Testing the Application

### 1. Test Backend API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

You should see:

```json
{
  "status": "OK",
  "message": "Hospitality Hub API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test Frontend

1. Open `http://localhost:3000` in your browser
2. Click "Sign In" or "Register" to test authentication
3. Try registering a new user
4. Try signing in with the admin account:
   - Email: `admin@hospitalityhub.com`
   - Password: `admin123456`

### 3. Test API Endpoints

You can test the API using tools like Postman or curl:

**Register a new user:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "customer"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## API Endpoints Reference

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/profile` - Update profile

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (providers only)
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Make sure MongoDB is running
   - Check your `MONGODB_URI` in the `.env` file
   - For Atlas, ensure your IP is whitelisted

2. **CORS Errors**

   - Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
   - Make sure both servers are running

3. **JWT Token Errors**

   - Ensure `JWT_SECRET` is set in the backend `.env` file
   - Check that the token is being sent in the Authorization header

4. **Port Already in Use**
   - Change the `PORT` in the backend `.env` file
   - Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

### Development Tips

1. **Backend Logs**: Check the terminal where you ran `npm run dev` for backend logs
2. **Frontend Logs**: Check the browser console for frontend errors
3. **Network Tab**: Use browser dev tools to inspect API requests
4. **Database**: Use MongoDB Compass to view your database

## Next Steps

Now that you have the basic setup working, you can:

1. **Add More Features**: Implement service booking, reviews, messaging
2. **Enhance UI**: Add more components and improve the design
3. **Add Tests**: Write unit and integration tests
4. **Deploy**: Deploy to platforms like Heroku, Vercel, or AWS
5. **Add Real-time Features**: Implement WebSocket connections for real-time updates

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Make sure MongoDB is running and accessible

Happy coding! 🚀
