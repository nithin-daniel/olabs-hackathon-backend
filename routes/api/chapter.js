const express = require("express");
const Chapters = require("../../models/chapter");
const Class = require("../../models/class");
const Subjects = require("../../models/subjects");
const Enroll = require("../../models/enroll");
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

router.post("/enroll", async (req, res) => {
  try {
    let { student_id, chapter_id, status, mark } = req.body;
    let enrollExists = await Enroll.find({
      student_id: student_id,
      chapter_id: chapter_id,
    });

    if (enrollExists) {
      let newEnroll = await new Enroll({
        student_id: student_id,
        chapter_id: chapter_id,
        status: status,
        mark: mark,
      });

      await newEnroll.save();
      res.json({
        status: 200,
        message: "New Enroll Created Successfully",
        data: newEnroll,
      });
    } else {
      res.json({
        status: 400,
        message: "Student ID or Chapter ID maybe wrong",
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

router.patch("/enroll/:id", async (req, res) => {
  const enrollId = req.params.id;

  try {
    let { status, mark } = req.body;

    let enrollExists = await Enroll.findOne({ _id: enrollId });

    if (enrollExists) {
      enrollExists.status = status;
      enrollExists.mark = mark;

      await enrollExists.save();
      res.json({
        status: 200,
        message: "Enrollment Updated Successfully",
        data: enrollExists,
      });
    } else {
      res.json({
        status: 400,
        message: "Enrollment ID is wrong",
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
