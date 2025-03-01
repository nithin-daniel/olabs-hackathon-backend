const express = require("express");
const Subjects = require("../../models/subjects");
const Chapters = require("../../models/chapter");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let subjects = await Subjects.find({});
    res.json({
      status: 200,
      message: "Subjects Fetched Successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
    });
  }
});

router.get("/get-subject/:id", async (req, res) => {
  try {
    const subjectId = req.params.id;

    let subjects = await Chapters.find({ subject_id: subjectId }).populate(
      "class_id"
    );

    res.json({
      status: 200,
      message: "Subjects Fetched Successfully",
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
    });
  }
});

router.post("/create-subject", async (req, res) => {
  try {
    let { title, class_id } = req.body;
    let subjectExists = await Subjects.findOne({ title: title });
    if (subjectExists) {
      return res.status(400).json({
        status: 400,
        message: "This Subject is Entered",
      });
    } else {
      let newSubject = await new Subjects({ title: title, class_id: class_id });
      await newSubject.save();
      res.json({
        status: 200,
        message: "Subject Created Successfully",
        data: newSubject,
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

router.delete("/delete-subject/:id", async (req, res) => {
  try {
    const subjectId = req.params.id;

    await Subjects.deleteOne({ _id: subjectId });

    res.json({
      status: 200,
      message: "Subject Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      error: error.message,
    });
  }
});

module.exports = router;
