const express = require("express");
const router = express.Router();
const db = require("../models/");
const upload = require("../multerConifg/upload");

router.get("/", async (req, res) => {
  const students = await db.Student.findAll();
  res.send(students);
});

router.post("/", upload.single("uploaded_file"), async (req, res) => {
  const { name, gender, age, course, year } = req.body;
  const imgPath = req.file.path;

  try {
    const student = await db.Student.create({
      name,
      gender,
      age,
      course,
      year,
      imgPath,
    });
    res.status(200).json(student);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
