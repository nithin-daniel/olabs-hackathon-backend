const mongoose = require("mongoose");

const ChapterEnrollSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    chapter_id: {
      type: mongoose.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "started",
      enum: ["pending", "completed", "failed", "started"],
    },
    mark: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("ChapterEnroll", ChapterEnrollSchema);
