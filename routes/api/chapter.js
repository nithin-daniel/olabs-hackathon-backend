const express = require("express");
const Chapters = require("../../models/chapter");
const router = express.Router();

router.get("/", async (req, res) => {
  let chapters = await Chapters.find({});
  res.json({
    status: 200,
    message: "Chapter Fetched Successfully",
    data: chapters,
  });
});

router.post("/create-chapter", async (req, res) => {
  let { title, content, yt_links } = req.body;

  let newChapter = await new Chapters({ title, content, yt_links });
  await newChapter.save();
  res.json({
    status: 200,
    message: "Chapter Created Successfully",
    data: newChapter,
  });
});

router.delete("/delete-chapter/:id", async (req, res) => {
  const chapterId = req.params.id;

  await Chapters.deleteOne({ _id: chapterId });

  res.json({
    status: 200,
    message: "Chapter Deleted Successfully",
  });
});

module.exports = router;
