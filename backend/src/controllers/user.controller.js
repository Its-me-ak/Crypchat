import FriendRequest from "../models/FriendRequest.model.js";
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

    return apiResponse(
      res,
      200,
      "Friends list fetch successfully",
      user.friends
    );
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const currentLoginUserId = req.user._id;
    const { id: recipientId } = req.params;

    // denied sending friend request to yourself
    if (recipientId === currentLoginUserId) {
      return apiError(res, 400, "You cannot send friend request to yourself");
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return apiError(res, 404, "Recipient user not found");
    }

    // check if you are already friends with the recipient
    if (recipient.friends.includes(currentLoginUserId)) {
      return apiError(res, 400, "You are already friends with this user");
    }

    // check if you have already sent a friend request to the recipient
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: currentLoginUserId, recipient: recipientId },
        { sender: recipientId, recipient: currentLoginUserId },
      ]
    })

    if (existingRequest) {
      return apiError(res, 400, "You have already sent a friend request to this user");
    }

    const friendRequest = await FriendRequest.create({
      sender: currentLoginUserId,
      recipient: recipientId,
    });

    return apiResponse(
      res,
      201,
      "Friend request sent successfully",
      friendRequest
    );

  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};
