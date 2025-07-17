import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return apiError(res, 400, "All fields are required");
    }

    if (password < 6) {
      return apiError(res, 400, "Password must be at least 6 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return apiError(res, 400, "Invalid email format");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiError(
        res,
        400,
        "Email already exists, please use a different email"
      );
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar-placeholder.iran.liara.run/${idx}`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    // TODO: create the user in stream as well

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      return apiResponse(res, 201, "User created successfully", newUser);
    } else {
      return apiError(res, 400, "Failed to create user");
    }
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};

export const login = async (req, res) => {
  res.send("login function");
};

export const logout = (req, res) => {
  res.send("logout function");
};
