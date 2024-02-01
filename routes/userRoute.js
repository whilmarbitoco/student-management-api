const express = require("express");
const router = express.Router();
const db = require("../models");
const upload = require("../multerConifg/upload");

router.get("/", async (req, res) => {
  const users = await db.User.findAll();
  res.send(users);
});

router.post("/", upload.single("uploaded_file"), async (req, res) => {
  const { name, username, password } = req.body;
  const imgPath = req.file.path;

  try {
    const user = await db.User.create({ name, username, password, imgPath });
    res.status(200).send(user);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
});

router.get("/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const user = await db.User.findOne({ where: { uuid } });
    res.status(200).json(user);
  } catch (err) {
    const errorMessage = err.errors[0].message;
    res.status(500).json({ error: errorMessage });
  }
});

module.exports = router;
