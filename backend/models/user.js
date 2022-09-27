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


const roleSchema = mongoose.Schema({
  role: {
      type: String,
      enum: ["admin", "partner", "basic"],
      default: "basic"
  },
  apponitments: {
      type: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment"
          }
      ],
      default: function () {
          return this.role === "admin" ? undefined : this.value;
      },
      required: function () {
          return this.role === "admin" ? false : true;
      }
  }
})