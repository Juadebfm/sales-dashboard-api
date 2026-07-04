import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";

export async function protect(req, res, next) {
  try {
    // check or confirm if the response and request header matches
    const header = req.headers.authorization;
    // check if token is in headers:authorization, if not throw the error
    if (!header?.startsWith("Bearer ")) {
      throw new ApiError(401, "Not Authorized, No Token");
    }

    // if the token is present
    // ["Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiAxMjM0NSwidW5hbWUiOiAiam9obS5kb2UiLCJleHAiOiAxNjc5ODA4MDAwfQ.5f1b1b9b9c9c1b9b9c9c"]
    const decoded = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);

    //find the user
    req.user = await User.findById(decoded.id); //password hidden by default due to the select false.

    if (!req.user) {
      throw new ApiError(401, "User Not Found");
    }

    next();
  } catch (error) {
    if (error instanceof ApiError) return next(error);

    console.error(error);
    next(new ApiError(401, "Not Authorized, token failed"));
  }
}
