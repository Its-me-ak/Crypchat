import express from 'express';
import "dotenv/config"
import authRoutes from './routes/auth.routes.js';
import { connectDB } from './config/db.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes 
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
 