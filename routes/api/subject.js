const express = require("express");
const Subjects = require("../../models/subjects");
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

router.post("/create-subject", async (req, res) => {
  try {
    let { title } = req.body;
    let subjectExists = await Subjects.findOne({ title: title });
    if (subjectExists) {
      return res.status(400).json({
        status: 400,
        message: "This Subject is Entered",
      });
    } else {
      let newSubject = await new Subjects({ title });
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
