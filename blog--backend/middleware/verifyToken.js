import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";
// jwt cookie guard
export function verifyToken(req, res, next) {
  let token = req.cookies["auth-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = decodedToken;
  next();
}

// role gatekeeper middleware
export function checkRole(requiredRole) {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
}