const express = require("express");
const Class = require("../../models/class");
const router = express.Router();

router.get("/", async (req, res) => {
  let classes = await Class.find({});
  res.json({
    status: 200,
    message: "Class Fetched Successfully",
    data: classes,
  });
});

router.post("/create-class", async (req, res) => {
  let { title } = req.body;
  let classExists = await Class.findOne({ title: title });
  if (classExists) {
    return res.status(400).json({
      status: 400,
      message: "This Class is already entered",
    });
  } else {
    let newClass = await new Class({ title });
    await newClass.save();
    res.json({
      status: 200,
      message: "Class Created Successfully",
      data: newClass,
    });
  }
});
router.delete("/delete-class/:id", async (req, res) => {
  const subjectId = req.params.id;

  await Class.deleteOne({ _id: subjectId });

  res.json({
    status: 200,
    message: "Subject Deleted Successfully",
  });
});

module.exports = router;
