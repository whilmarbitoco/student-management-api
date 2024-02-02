const db = require("../models/");

async function index(req, res) {
  const students = await db.Student.findAll();
  res.send(students);
}

async function create(req, res) {
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
}

async function getOne(req, res) {
  try {
    const uuid = req.params.uuid;
    const student = await db.Student.findOne({ where: { uuid } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
}

async function update(req, res) {
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
}

async function destroy(req, res) {
  const uuid = req.params.uuid;
  const student = await db.Student.findOne({ where: { uuid } });

  if (!student)
    return res.status(404).json({ error: "Student does not exist" });

  await student.destroy();
  res.status(200).json({ message: "Student Deleted" });
}

module.exports = {
  index,
  getOne,
  create,
  update,
  destroy,
};
