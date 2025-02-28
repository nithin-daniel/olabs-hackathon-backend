const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const ChapterSchema = new mongoose.Schema(
  {
    chapter_id: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    yt_links: {
      type: [Object],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", ChapterSchema);
