const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models");
const upload = require("../multerConifg/upload");

// Display all users
router.get("/", async (req, res) => {
  const users = await db.User.findAll();
  res.send(users);
});

// Add a user
router.post("/", upload.single("uploaded_file"), async (req, res) => {
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
});

//  Get one user by uuid
router.get("/:uuid", async (req, res) => {
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
});

// Delete user by uuid
router.delete("/:uuid", async (req, res) => {
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
});

module.exports = router;
