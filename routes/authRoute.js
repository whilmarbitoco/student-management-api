const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: { username } });

  if (!user) return res.json({ error: "User does not Exist" });

  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass)
    return res
      .status(401)
      .json({ error: "Username and Password does not match" });

  console.log("route", user.uuid);
  const jwtToken = jwt.sign(
    { id: user.uuid, email: user.username },
    process.env.JWT_SECRET
  );

  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;
