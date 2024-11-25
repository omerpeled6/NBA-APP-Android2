import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path' // Required to serve static files

import likeRoutes from './routes/likeRoutes.js'
import userRoutes from './routes/userRoutes.js'
import basketRoutes from './routes/basketRoutes.js'
import dreamTeamRoutes from './routes/dreamTeamRoutes.js'
import myPlayerRoutes from './routes/myPlayerRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/user', userRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/basket', basketRoutes)
app.use('/api/dreamteam', dreamTeamRoutes)
app.use('/api/myplayer', myPlayerRoutes)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder to serve React build folder
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // All other routes should return index.html from the build folder
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
  })
} else {
  // For development, this will be handled by the frontend server
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app' })
  })
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURI, { dbName: 'demo_db' })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.error('Database connection error:', error)
  })
