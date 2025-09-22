const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("Auth Middleware - Checking authorization");
  
  let token; 

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  
  // Get token from cookies if not in header
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);
    
    const user = await User.findById(decoded.id).select("-password");
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("User not found in database");
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Not authorized, token expired" });
    }
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
