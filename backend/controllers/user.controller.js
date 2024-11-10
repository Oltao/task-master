import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1 * 60 * 60 * 1000, // 1 hours
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatches = await user.matchPassword(password);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    return res
      .cookie("_taskmasteruser", token, cookieOptions)
      .status(200)
      .json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res) => {
  const { fullName, username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!fullName || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };

    const newUser = await User.create({ fullName, username, password });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
