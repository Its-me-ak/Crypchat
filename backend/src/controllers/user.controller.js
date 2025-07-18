import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current login user
        { _id: { $nin: currentUser.friends } }, // exclude current user friends
        { isOnboarded: true },
      ],
    });

    return apiResponse(res, 200, "Recommended users", recommendedUser);
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};

export const getMyFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("friends").populate({
      path: "friends",
      select: "fullName profilePic nativeLanguage learningLanguage location",
    });

    return apiResponse(res, 200, "Friends list fetch successfully", user.friends);
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};
