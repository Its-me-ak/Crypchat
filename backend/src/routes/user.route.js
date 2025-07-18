import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectedRoute); // apply auth middleware to all routes
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

export default router;
