const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to register user
async function handleUserRegister(req, res) {
  try {
    const { username } = req.body;
    const { email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Usrname already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ msg: "Username atleast have 4 characters" });
    }
    if (existingEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const newPass = await bcrypt.hash(req.body.password, 10);

    //   create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: newPass,
      role: req.body.role,
    });
    await newUser.save();
    return res.status(200).json({ msg: "Registered Successfully!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error." });
  }
}

// function to log in user
async function handleUserLogIn(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      user: {
        id: user._id.toString(), // Convert ObjectId to string
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, msg: "Login Successfully!!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

// function to find user profile
async function getUserProfile(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID format" });
    }

    const user = await User.findById(id);
    console.log("Received User ID:", id);

    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

// function to update the user profile
async function updateUserProfile(req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID format" });
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Internal server error" });
  }
}

module.exports = {
  handleUserRegister,
  handleUserLogIn,
  getUserProfile,
  updateUserProfile,
};
