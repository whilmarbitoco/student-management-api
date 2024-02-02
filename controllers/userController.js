const db = require("../models");
const bcrypt = require("bcrypt");

// Display all users
async function index(req, res) {
  const users = await db.User.findAll();
  res.send(users);
}

// Create a user
async function create(req, res) {
  const { name, username, password } = req.body;
  console.log(req.body);
  const imgPath = req.file.path;

  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      name,
      username,
      password: hashedPass,
      imgPath,
    });
    res.status(200).send(user);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
}

// Get one user by uuid
async function getOne(req, res) {
  try {
    const uuid = req.params.uuid;
    const user = await db.User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
}

// Delete a user by uuid
async function destroy(req, res) {
  try {
    const uuid = req.params.uuid; // corrected typo
    const user = await db.User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// exports the controllers
module.exports = {
  index,
  create,
  getOne,
  destroy,
};
