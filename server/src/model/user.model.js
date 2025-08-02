const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [5, "Name must be at least 5 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email should be required"],
      unique: [true, "Email should be unique!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "password must be 8 character long"],
    },
    age: {
      type: Number,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
      default: "",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movies',
    }],
  },
  { timestamps: true }
);


const user = mongoose.model("Users",userSchema);

module.exports = user;