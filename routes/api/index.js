const express = require("express");
const router = express.Router();

const subjects = require("./subject");
const classes = require("./class");
const chapters = require("./chapter");

router.use("/subject/", subjects);
router.use("/class/", classes);
router.use("/chapter/", chapters);

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "API is working properly",
  });
});

module.exports = router;
