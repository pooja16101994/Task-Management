const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    console.log("Decoded Token:", decoded); // Debugging

    req.user = decoded.user; // ✅ Ensure this matches login payload
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
