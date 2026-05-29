const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // ✅ NO TOKEN
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    // ✅ GET TOKEN
    const token = authHeader.split(" ")[1];

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ✅ SAVE USER INSIDE REQUEST
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;