import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../utils/stream.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return apiError(res, 400, "All fields are required");
    }

    if (password.length < 6) {
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

    await upsertStreamUser({
      id: newUser._id.toString(),
      fullName: newUser.fullName,
      profilePic: newUser.profilePic,
    })
    console.log(`Stream user created for ${newUser.fullName}`);
    

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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return apiError(res, 400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return apiError(res, 401, "Invalid email or password");
    }

    const isPasswordCorrect = await user.isPasswordMatch(password);

    if (!isPasswordCorrect) {
      return apiError(res, 401, "Password is incorrect");
    }

    generateTokenAndSetCookie(user._id, res);
    return apiResponse(res, 200, "Login successful", user);
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};

export const logout = (req, res) => {
  try {
   res.clearCookie("JWT");
    return apiResponse(res, 200, "Logout successful");
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};
