# Bhopal Food Choice App

A full-stack MERN application for ordering food on trains at Bhopal Junction.

## Features
- **User**: Browse menu, add to cart, place orders with seat delivery details.
- **Admin**: Dashboard to view and manage order statuses.
- **Tech Stack**: React, Tailwind CSS, Node.js, Express, MongoDB.

## Prerequisites
- Node.js installed
- MongoDB installed and running locally

## Installation

1. **Clone/Download the repository**

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Environment Variables**
   Ensure `server/.env` exists with:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/bhopalfood
   JWT_SECRET=your_jwt_secret
   ```

5. **Seed Database** (Optional, for initial data)
   ```bash
   cd server
   node seeder.js
   ```
   *Note: This will also create the default admin user.*

## Running the Project

You need to run the backend and frontend in separate terminals.

### 1. Start Backend Server
```bash
cd server
npm run dev
```
Runs on: `http://localhost:5000`

### 2. Start Frontend Client
```bash
cd client
npm run dev
```
Runs on: `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser.
2. **Admin Login**:
   - Email: `admin@example.com`
   - Password: `password123`
# Bhopal-Food
