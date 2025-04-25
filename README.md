# 📦 My Node.js Backend API

This is a simple Node.js backend API built using Express.js. It provides RESTful endpoints for handling common backend tasks such as authentication, data handling, and more.

## 🚀 Features

- ✅ Express.js for routing
- 🔐 JWT-based authentication
- 📦 firestore
- 📄 RESTful API structure
- 🌐 CORS enabled
- 🧪 Basic testing with Jest or Mocha (optional)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/backend-repo-main

# Navigate into the project directory
cd backend-repo-main

# Install dependencies
npm install

# Start the app in development mode
npm run dev

# Start the app in production mode
npm start

POST /api/v1/login           # Login user
GET  api/v1/fetch-user-data  # Get current user profile
PUT api/v1/update-user-data  # Update user profile
