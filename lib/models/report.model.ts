import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    enum: ["question", "poll", "feed"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;
