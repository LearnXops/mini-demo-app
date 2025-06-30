# JWT Authentication API with Node.js, Express, and MongoDB

A secure RESTful API for user authentication and management using JWT (JSON Web Tokens), built with Node.js, Express, and MongoDB. The application is containerized using Docker for easy deployment and development.

## Features

- User registration and authentication with JWT
- Role-based authorization (user/admin)
- Rate limiting to prevent abuse
- MongoDB for data storage
- Containerized with Docker and Docker Compose
- API documentation with example requests

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js (only needed for local development without Docker)

## Getting Started

### With Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will start three services:
   - Node.js API server on port 5000
   - MongoDB on port 27017
   - MongoDB Express (web-based admin interface) on port 8081

3. The API will be available at `http://localhost:5001`
4. MongoDB Express will be available at `http://localhost:8081`

### Without Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auth-db
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Make sure MongoDB is running on your system

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login and get JWT token
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user profile (requires authentication)

### Users (Admin Only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

- `PORT` - Port for the Express server (default: 5000)
- `MONGODB_URI` - MongoDB connection string (default: mongodb://mongo:27017/auth-db)
- `JWT_SECRET` - Secret key for JWT token generation
- `NODE_ENV` - Application environment (development/production)

## Rate Limiting

The API includes rate limiting to prevent abuse. By default, it allows 100 requests per 15 minutes per IP address.

## Security

- Passwords are hashed using bcrypt before storing in the database
- JWT tokens are used for authentication
- Rate limiting helps prevent brute force attacks
- Sensitive routes are protected with authentication middleware

## License

This project is open source and available under the [MIT License](LICENSE).
