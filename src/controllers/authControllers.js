import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { ApiError } from "../utils/ApiError.js";

//POST /api/auth/register
export async function register(req, res) {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });

  if (exists) throw new ApiError(409, "Credentials already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  const token = generateToken(user._id);

  const userObj = user.toObject();
  delete userObj.password;

  res.status(201).json({ token, user: userObj });
}

//POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) throw new ApiError(401, "Invalid Login");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ApiError(401, "Invalid Login");

  const token = generateToken(user._id);

  const userObj = user.toObject();
  delete userObj.password;

  res.json({ token, user: userObj });
}

//POST /api/auth/me (protected)

export async function getMe(req, res) {
  res.json(req.user);
}
