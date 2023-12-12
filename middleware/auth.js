import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  // Check if the token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  // Verify the token
  jwt.verify(token, "your-secret-key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    // Attach the user to the request object for further use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
