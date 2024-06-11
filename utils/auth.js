const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Move to the next middleware
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid, or it's expired" });
  }
};

module.exports = { ensureAuthenticated };
