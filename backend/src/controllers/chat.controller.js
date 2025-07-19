import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { generateStremToken } from "../utils/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = generateStremToken(req.user.id);
    return apiResponseesponse(res, 200, "Stream token", token);
  } catch (error) {
    console.log(error);
    return apiError(res, 500, "Internal server error");
  }
};
