const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    bio: { type: String, max: 256 },
    likes: { type: [String] },
  },
  {
    timeStamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
