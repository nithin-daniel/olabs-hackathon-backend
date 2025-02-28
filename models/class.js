const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const ClassSchema = new mongoose.Schema(
  {
    cource_id: {
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

module.exports = mongoose.model("Class", ClassSchema);
