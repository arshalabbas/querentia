import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: String,
  },
  avatar: {
    type: String,
    required: true,
  },
  bio: String,
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Question",
    },
  ],
  polls: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Poll",
    },
  ],
  feeds: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Feed",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  onboarded: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ["user", "admin", "expert"],
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
