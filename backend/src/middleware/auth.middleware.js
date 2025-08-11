import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { apiError } from "../utils/apiError.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.JWT;
    if (!token) {
      return apiError(res, 401, "Unauthorized - No token provided");
    }
<<<<<<< HEAD

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      return apiError(res, 401, "Unauthorized - Invalid token");
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return apiError(res, 401, "Unauthorized - User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
=======
>>>>>>> d0d61b25dd0108d6ecf703bdd52b38fd60e969c2
};
