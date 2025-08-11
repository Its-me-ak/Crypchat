import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendResetEmail, sendResetSuccessEmail } from "../utils/sendEmail.js";
import { upsertStreamUser } from "../utils/stream.js";
import crypto from "crypto";

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
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}`;
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    await upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      profilePic: newUser.profilePic,
    });
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

export const onboarding = async (req, res) => {
  // In protected routes, you can access req.user for authenticated user info.
  // In unprotected routes (where this middleware is not used), req.user will be undefined.
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location } =
      req.body;

    if (
      !fullName ||
      !bio ||
      !nativeLanguage ||
      !learningLanguage ||
      !location
    ) {
      return apiError(res, 400, "All fields are required");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return apiError(res, 400, "Failed to update user");
    }

    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      profilePic: updatedUser.profilePic,
    });

    return apiResponse(res, 200, "Onboarding successful", updatedUser);
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return apiError(res, 404, "User not found");
    }
    return apiResponse(res, 200, "User found", user);
  } catch (error) {
    console.error("Error while getting user", error);
    return apiError(res, 500, "Internal server error");
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return apiError(res, 400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return apiError(res, 404, "User not found");
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpireAt;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendResetEmail(email, resetLink);

    return apiResponse(res, 200, "Password reset email sent successfully");
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return apiError(res, 500, "Internal server error");
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    if (!token || !password) {
      return apiError(res, 400, "Token and password are required");
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // Check if token is still valid
    });
    if (!user) {
      return apiError(res, 400, "Invalid or expired token");
    }

    user.password = password;
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpiresAt = undefined; // Clear the expiration

    await user.save();
    await sendResetSuccessEmail(user.email);
    return apiResponse(res, 200, "Password reset successfully");
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return apiError(res, 500, "Internal server error");
  }
};
