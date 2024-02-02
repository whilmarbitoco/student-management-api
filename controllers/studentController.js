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

module.exports = {
  index,
  create,
  update,
};
