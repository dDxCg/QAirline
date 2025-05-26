const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed or expired.",
      });
    }
    if (!decoded.role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: User role not found in token.",
      });
    }
    req.user = decoded;
    next();
  });
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Forbidden: User role not available.",
        });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Your role (${req.user.role}) is not authorized for this action.`,
      });
    }
    next();
  };
};
