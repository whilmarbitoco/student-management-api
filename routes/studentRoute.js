const express = require("express");
const router = express.Router();
const db = require("../models/");
const upload = require("../multerConifg/upload");

// Display all students
router.get("/", async (req, res) => {
  const students = await db.Student.findAll();
  res.send(students);
});

// Add a student
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

// Update a student by uuid
router.put("/:uuid", upload.single("uploaded_file"), async (req, res) => {
  const { name, gender, age, course, year } = req.body;
  const uuid = req.params.uuid;
  const imgPath = req.file.path;

  try {
    const student = await db.Student.findOne({ where: { uuid } });
    student.update({
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
