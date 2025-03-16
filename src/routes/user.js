const router = require("express").Router();
const {
  handleUserRegister,
  handleUserLogIn,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogIn);
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
router.get("/profile/:id", getUserProfile);
router.put("/update/:id", updateUserProfile);

module.exports = router;
