const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "Access denied. You do not have the required permissions.",
        });
    }
  };
};

module.exports = { authenticateJWT, authorizeRole };
