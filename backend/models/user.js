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
    likes: { type: [String] },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "role",
      required: true,
    }
  },
  {
    timeStamps: true,
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
