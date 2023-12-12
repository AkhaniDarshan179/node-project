import jwt from "jsonwebtoken";
import { check } from "express-validator";

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    req.user = user;

    next();
  });
};

export const validatePassword = [
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export default { authenticateToken, validatePassword };
