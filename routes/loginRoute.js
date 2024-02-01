const express = require("express");

const router = express.Router();
// const db = require("../models");

router.post("/", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);
});

module.exports = router;
