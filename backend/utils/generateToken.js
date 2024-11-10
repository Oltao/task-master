import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const tokenPayload = { userId };
  const tokenOptions = {
    expiresIn: "1h"
  };

  return jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenOptions);
};
