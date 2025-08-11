import express from 'express';
import "dotenv/config"
import authRoutes from './routes/auth.routes.js'
import userRoutes from "./routes/user.route.js";;
import chatRoutes from "./routes/chat.route.js";
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow frontend to send cookies
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
 