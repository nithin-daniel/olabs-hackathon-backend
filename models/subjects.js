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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", SubjectSchema);
