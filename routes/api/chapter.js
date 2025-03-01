const express = require("express");
const Chapters = require("../../models/chapter");
const Class = require("../../models/class");
const Subjects = require("../../models/subjects");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let chapters = await Chapters.find({});
    res.json({
      status: 200,
      message: "Chapter Fetched Successfully",
      data: chapters,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error logging in user",
      error: error.err,
    });
  }
});

router.get("/:id", async (req, res) => {
  const chapterId = req.params.id;

  try {
    let chapters = await Chapters.findOne({ _id: chapterId });
    res.json({
      status: 200,
      message: "Chapter Fetched Successfully",
      data: chapters,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error logging in user",
      error: error.err,
    });
  }
});

router.post("/create-chapter", async (req, res) => {
  try {
    let { title, content, yt_links, class_id, subject_id } = req.body;
    let classExists = await Class.findOne({ _id: class_id });
    let subjectExists = await Subjects.findOne({ _id: subject_id });

    if (classExists && subjectExists) {
      let newChapter = await new Chapters({
        title: title,
        content: content,
        yt_links: yt_links,
        class_id: class_id,
        subject_id: subject_id,
      });

      await newChapter.save();
      res.json({
        status: 200,
        message: "Chapter Created Successfully",
        data: newChapter,
      });
    } else {
      res.json({
        status: 400,
        message: "Class ID or Subject ID wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
    });
  }
});

router.delete("/delete-chapter/:id", async (req, res) => {
  try {
    const chapterId = req.params.id;

    await Chapters.deleteOne({ _id: chapterId });

    res.json({
      status: 200,
      message: "Chapter Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error logging in user",
      error: error.err,
    });
  }
});

module.exports = router;
