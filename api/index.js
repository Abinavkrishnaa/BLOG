import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
// parse cookies
app.use(cookieParser())
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log('mongodb connected');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'Internal server error';
  res.status(statuscode).json({
    success: false,
    statuscode,
    message
  });

  return;
});
