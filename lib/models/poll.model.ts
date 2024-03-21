import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  vote: {
    upvote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  options: [
    {
      id: Number,
      title: String,
      votes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.models.Poll || mongoose.model("Poll", pollSchema);

export default Poll;
