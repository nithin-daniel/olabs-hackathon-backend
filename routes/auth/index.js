const express = require("express");
const router = express.Router();

const superadminauth = require("../auth/superadmin");
const studentauth = require("../auth/student");
const teacherauth = require("../auth/teacher");

// router.use('/api/v1', api);
router.use("/superuser", superadminauth);
router.use("/student", studentauth);
router.use("/teacher", teacherauth);

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "API is working properly",
  });
});

module.exports = router;
