import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import likeRoutes from './routes/likeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import basketRoutes from './routes/basketRoutes.js';
import dreamTeamRoutes from './routes/dreamTeamRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my app' });
});

app.use('/api/user', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/dreamteam', dreamTeamRoutes);

mongoose
  .connect(process.env.MONGOURI, { dbName: 'demo_db' })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
