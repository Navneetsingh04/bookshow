# 🎬 BookShow - Movie Booking Platform

A full-stack movie booking platform built with **React** and **Node.js** that allows users to browse movies, book tickets, manage wishlists, and handle payments seamlessly.

## 🔥 Live Demo

Check out the live version here: [bookshow-six.vercel.app](https://bookshow-movies.vercel.app) 

## 📚 Table of Contents

- [🖼️ Screenshots](#️-screenshots)
- [🌟 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Installation & Setup](#-installation--setup)
- [📁 Project Structure](#-project-structure)
- [🎯 Usage](#-usage)
- [📝 License](#-license)
- [👨‍💻 Author](#-author)


## 🖼️ Screenshots

| Home Page | Seat Selection | Movie Detail|
|-----------|----------------|-----------------|
| ![home](./client/public/screenshots/home.png) | ![seat](./client/public/screenshots/seat.png) | ![Movie Detail](./client/public/screenshots/detail.png) |


## 🌟 Features

### User Features
- **🔐 Authentication System** - User registration, login, and logout with JWT tokens
- **🎬 Movie Browsing** - View detailed movie information including cast, ratings, and trailers
- **💺 Seat Selection** - Interactive seat selection with real-time availability
- **💳 Payment Integration** - Secure payment processing with Razorpay
- **❤️ Wishlist Management** - Add/remove movies to personal wishlist
- **📧 Email Notifications** - Booking confirmation emails
- **🔍 Search Functionality** - Search for movies by title
- **📋 Booking History** - View past bookings

### Admin Features
- **🎭 Movie Management** - Add, edit, and delete movies
- **📊 Booking Analytics** - View booking statistics and reports
- **👥 User Management** - Manage user accounts

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router 7** - Client-side routing
- **Vite** - Build tool and dev server
- **SCSS** - Styling with CSS modules
- **Iconify** - Icon library
- **React Toastify** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Razorpay** - Payment gateway
- **CORS** - Cross-origin resource sharing

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Navneetsingh04/bookshow.git
cd bookshow
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
# Server Configuration
PORT=4001

# Database
MONGO_URI=mongodb://localhost:27017/bookshow
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookshow

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key
AUTH_COOKIE=authToken

# Email Configuration (Gmail)
SMTP_EMAIL=your-gmail@gmail.com
SMTP_PASSWORD=your-gmail-app-password

# Razorpay Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:4001`

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The client will run on `http://localhost:5173`


## 📁 Project Structure

```
bookshow/
├── client/                 # Frontend (React)
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable UI components
│   │   │   ├── atoms/     # Basic components (buttons, etc.)
│   │   │   └── molecules/ # Complex components (navbar, cards)
│   │   ├── data/          # Static data (movies.json)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page components
│   │   │   ├── home/      # Home page
│   │   │   ├── movies/    # Movie listing and details
│   │   │   ├── booking/   # Seat selection and booking
│   │   │   ├── wishlist/  # User wishlist
│   │   │   └── search/    # Search functionality
│   │   ├── popups/        # Modal components
│   │   ├── routes/        # Route protection
│   │   ├── store/         # Redux store and slices
│   │   └── styles/        # Global styles
│   └── package.json
│
├── server/                # Backend (Node.js)
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── db/           # Database connection
│   │   ├── middlewares/  # Auth and logging middleware
│   │   ├── model/        # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions (email, etc.)
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🎯 Usage

### For Users
1. **Register/Login** - Create an account or sign in
2. **Browse Movies** - View available movies with details
3. **Select Movie** - Click on a movie to view details
4. **Book Tickets** - Choose date, time, and seats
5. **Make Payment** - Complete booking with Razorpay
6. **Get Confirmation** - Receive email confirmation
7. **Manage Wishlist** - Add favorite movies to wishlist
8. **View Bookings** - Check booking history

### For Admins
1. **Login as Admin** - Use admin credentials
2. **Manage Movies** - Add/edit/delete movies
3. **View Analytics** - Check booking statistics
4. **Manage Users** - Handle user accounts


## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Navneet Singh**
- GitHub: [@Navneetsingh04](https://github.com/Navneetsingh04)
