import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.log("Error upserting user", error);
  }
};

export const generateStremToken = (userId) => {
    try {
      const userIdStr = userId.toString();
      const token = streamClient.createToken(userIdStr);
      return token;
    } catch (error) {
      console.log("Error generating stream token", error);
    }
};