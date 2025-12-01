# Deployment Guide for Bhopal Food Choice App

This guide will help you deploy your full-stack MERN application.

## Strategy
- **Frontend (Client)**: Deploy to **Vercel** (Best for React apps).
- **Backend (Server)**: Deploy to **Render** (Best for Node.js + Socket.io).

---

## Step 1: Push Code to GitHub
1. Create a new repository on GitHub.
2. Push your project code to this repository.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Step 2: Deploy Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Configure the service:
   - **Name**: `bhopal-food-server` (or similar)
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Scroll down to **Environment Variables** and add:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secret key (e.g., `mysecretkey123`).
   - `NODE_ENV`: `production`
6. Click **Create Web Service**.
7. Wait for deployment. Once done, copy the **Service URL** (e.g., `https://bhopal-food-server.onrender.com`).

## Step 3: Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Configure the project:
   - **Root Directory**: Click `Edit` and select `client`.
   - **Framework Preset**: Vite (should be auto-detected).
5. Open **Environment Variables** and add:
   - `VITE_API_URL`: Paste your Render Backend URL + `/api` (e.g., `https://bhopal-food-server.onrender.com/api`).
   - `VITE_SERVER_URL`: Paste your Render Backend URL (e.g., `https://bhopal-food-server.onrender.com`).
6. Click **Deploy**.

## Step 4: Final Check
1. Open your Vercel URL.
2. Try logging in or browsing the menu.
3. If you see data, everything is working! 🚀
