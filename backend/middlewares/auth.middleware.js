import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies["_taskmasteruser"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized", reason: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized", reason: "Invalid token" });
    }

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized", reason: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Unauthorized", reason: error.message });
  }
};

export default authenticate;
