import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import studentProfileRoutes from './routes/studentProfileRoutes';
import jobApplicationRoutes from './routes/jobApplicationRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5173', 
  credentials: true,
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/profile', studentProfileRoutes);
app.use('/api/applications', jobApplicationRoutes);
app.use('/api/users', userRoutes);

app.get('/', (_req, res) => {
  res.send('Placement Portal API is working');
});

export default app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
