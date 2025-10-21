# Hospitality Hub Backend API

A comprehensive backend API for the Hospitality Hub service industry application, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with role-based access control
- **User Management**: Complete user profile management with different user roles
- **Service Management**: CRUD operations for service listings
- **Security**: Password hashing, rate limiting, CORS protection, and input validation
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: RESTful API with comprehensive error handling

## User Roles

- **Customer**: Can browse and book services
- **Service Provider**: Can create and manage service listings
- **Venue Owner**: Can create and manage service listings for their venue
- **Admin**: Full access to all features and user management

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user profile
- `POST /logout` - Logout user
- `PUT /profile` - Update user profile

### Users (`/api/users`)

- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Deactivate user
- `GET /stats/overview` - Get user statistics (admin only)

### Services (`/api/services`)

- `GET /` - Get all services with filtering and search
- `GET /:id` - Get service by ID
- `POST /` - Create new service (service providers only)
- `PUT /:id` - Update service
- `DELETE /:id` - Deactivate service
- `GET /provider/:providerId` - Get services by provider
- `GET /categories/list` - Get service categories

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   MONGODB_URI=mongodb://localhost:27017/hospitality-hub
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**

   - Local MongoDB: Make sure MongoDB is running on your system
   - MongoDB Atlas: Use your Atlas connection string in the `.env` file

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

### Production Deployment

1. **Build the application:**

   ```bash
   npm start
   ```

2. **Environment variables for production:**
   - Set `NODE_ENV=production`
   - Use a strong JWT secret
   - Configure proper CORS origins
   - Use MongoDB Atlas or a production MongoDB instance

## Database Models

### User Model

- Personal information (name, email, phone)
- Business information (business name, type, address)
- Role-based access control
- Account preferences and settings
- Timestamps and activity tracking

### Service Model

- Service details (title, description, category)
- Pricing and availability
- Location and capacity information
- Provider relationship
- Rating and metadata

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request limits
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for protection
- **Role-based Authorization**: Granular access control

## API Response Format

All API responses follow a consistent format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {
    // Response data
  },
  "errors": [
    // Validation errors (if any)
  ]
}
```

## Error Handling

The API includes comprehensive error handling:

- Validation errors (400)
- Authentication errors (401)
- Authorization errors (403)
- Not found errors (404)
- Server errors (500)

## Development

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Code Structure

```
backend/
├── models/          # MongoDB models
├── routes/          # API route handlers
├── middleware/      # Custom middleware
├── server.js        # Main server file
├── package.json     # Dependencies and scripts
└── README.md        # This file
```

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Update documentation for new endpoints
5. Test all endpoints thoroughly

## License

This project is part of the Hospitality Hub application.
