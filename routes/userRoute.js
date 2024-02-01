const express = require("express");
const router = express.Router();
const db = require("../models");
const upload = require("../multerConifg/upload");

router.get("/", async (req, res) => {
  const users = await db.User.findAll();
  res.send(users);
});

router.post("/", upload.single("uploaded_file"), function (req, res) {
  const { name, username, password } = req.body;
  const imgPath = req.file.path;

  try {
    db.User.create({ name, username, password, imgPath });
    res.status(200).send("User created");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;