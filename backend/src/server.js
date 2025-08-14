import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";
import cron from "node-cron"
import axios from "axios";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// ping server for every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get("https://crypchat.onrender.com");
    console.log("Pinged server to keep it awake:", response.status);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
});

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
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
  connectDB();
});
