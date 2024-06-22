// rbac.js

const User = require("./path/to/userModel");

const roles = {
  admin: ["read", "write", "delete"],
  mentor: ["read", "write"],
  student: ["read"],
};

const checkRole = (role, action) => {
  return roles[role].includes(action);
};

const ensureRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming req.user is populated with the authenticated user's info
    if (userRole === role || userRole === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

const ensureRoles = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming req.user is populated with the authenticated user's info
    if (allowedRoles.includes(userRole) || userRole === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};

module.exports = {
  checkRole,
  ensureRole,
  ensureRoles,
};
