const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const SubjectSchema = new mongoose.Schema(
  {
    subject_id: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    title: {
      type: String,
      required: true,
    },
    class_id: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
