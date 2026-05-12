import jwt from "jsonwebtoken";

// jwt cookie guard
export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
  let token = req.cookies["auth-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    req.user = decodedToken;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please login again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(401).json({ message: "Invalid or expired token." });
  }
  };
}
