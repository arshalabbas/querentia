import mongoose from "mongoose";

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptioin: String,
  vote: {
    upvote: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    downvote: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  options: [
    {
      id: Number,
      name: String,
      votes: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.models.Poll || mongoose.model("Poll", PollSchema);

export default Poll;
