const jwt = require("jsonwebtoken");

const verfiToken = (req, res, next) => {
  // Get token from header
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied ❌" });
  }

 jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded; // save user info for next route
    next(); // allow route to run
  });
};

module.exports = verfiToken;
