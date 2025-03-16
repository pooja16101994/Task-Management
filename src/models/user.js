const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "guest"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
