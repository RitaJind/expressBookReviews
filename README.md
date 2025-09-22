# 📚 Express Book Reviews API

A **production-ready RESTful API** built with Node.js and Express for managing book collections and user reviews. This service demonstrates modern backend development practices, JWT authentication, and secure API design patterns for content management systems.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)
![REST API](https://img.shields.io/badge/REST-API-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Project Overview

This RESTful API implements a **comprehensive book review system** with user authentication, book catalog management, and review functionality. Built following **REST principles** and **secure coding practices**, it's designed for content platforms requiring scalable book and review management.

### 🏗️ **Architecture Highlights**
- **RESTful API Design** - Standard HTTP methods and status codes
- **JWT Authentication** - Secure token-based user authentication
- **Session Management** - Express sessions with middleware protection
- **Modular Architecture** - Clean separation of concerns with router modules
- **In-Memory Storage** - Fast data access with structured book database
- **Middleware Pipeline** - Authentication and authorization layers

## 📋 Features

### 🔑 **Authentication & Authorization**
- ✅ **User Registration** with username validation
- ✅ **JWT Authentication** with session management
- ✅ **Protected Routes** - Middleware-based access control
- ✅ **User-Specific Reviews** - Ownership validation for review operations
- ✅ **Session Security** - Secure session configuration

### 📖 **Book Management**
- ✅ **Book Catalog** - Complete book database with metadata
- ✅ **Search Functionality** - Search by ISBN, author, and title
- ✅ **Case-Insensitive Search** - Flexible search capabilities
- ✅ **Review System** - User reviews with CRUD operations
- ✅ **Promise-Based Operations** - Async/await pattern implementation

### 🛠️ **Technical Features**
- ✅ **RESTful Endpoints** - Standard HTTP methods and responses
- ✅ **Error Handling** - Comprehensive error responses with status codes
- ✅ **Input Validation** - Request validation and sanitization
- ✅ **CORS Support** - Cross-origin request handling
- ✅ **Development Ready** - Nodemon integration for hot reloading

## 🏃‍♂️ Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Installation & Setup**
```bash
# Clone the repository
git clone https://github.com/RitaJind/expressBookReviews.git
cd expressBookReviews/final_project

# Install dependencies
npm install

# Start the development server
npm start
```

The API will be available at `http://localhost:5000`

## 📡 API Documentation

### **Base URL**: `http://localhost:5000`

### **Public Endpoints (No Authentication Required)**

#### **GET /** - Get All Books
```bash
curl -X GET http://localhost:5000/
```

#### **GET /isbn/:isbn** - Get Book by ISBN
```bash
curl -X GET http://localhost:5000/isbn/9780385472579
```

#### **GET /author/:author** - Get Books by Author
```bash
curl -X GET http://localhost:5000/author/Chinua%20Achebe
```

#### **GET /title/:title** - Get Books by Title
```bash
curl -X GET http://localhost:5000/title/Things%20Fall%20Apart
```

#### **GET /review/:isbn** - Get Book Reviews
```bash
curl -X GET http://localhost:5000/review/9780385472579
```

#### **POST /register** - User Registration
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "bookworm",
    "password": "securepass123"
  }'
```

### **Protected Endpoints (Authentication Required)**

#### **POST /customer/login** - User Login
```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "bookworm",
    "password": "securepass123"
  }'
```

#### **PUT /customer/auth/review/:isbn** - Add/Update Review
```bash
curl -X PUT http://localhost:5000/customer/auth/review/9780385472579 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "review": "An excellent classic that explores themes of tradition and change."
  }'
```

#### **DELETE /customer/auth/review/:isbn** - Delete Review
```bash
curl -X DELETE http://localhost:5000/customer/auth/review/9780385472579 \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🏗️ Architecture & Design Patterns

### **Project Structure**
```
final_project/
├── index.js                    # Application entry point & server setup
├── package.json               # Dependencies and scripts
├── router/                    # Route modules
│   ├── general.js            # Public endpoints (books, search)
│   ├── auth_users.js         # Authentication & protected routes
│   └── booksdb.js           # Book data store and models
└── README.md                 # Project documentation
```

### **Key Components**

#### **Authentication Flow**
1. User registers with username/password
2. User logs in to receive JWT token
3. Token required for protected operations
4. Session middleware validates authenticated users

#### **Data Models**
- **Books Database**: Pre-populated with 10 sample books
- **User Registry**: In-memory user storage with credentials
- **Reviews**: User-specific reviews linked to books by ISBN

## 🧪 Testing

### **Manual API Testing**
Test the API endpoints using curl commands or tools like Postman:

```bash
# Test public endpoint
curl -X GET http://localhost:5000/

# Test registration
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'

# Test login and get token
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

## �‍💻 About the Developer

**Rita Jindal** - Full Stack Developer  

*Passionate about building scalable, secure, and maintainable software solutions. Experienced in REST API development, authentication systems, and modern JavaScript frameworks.*
