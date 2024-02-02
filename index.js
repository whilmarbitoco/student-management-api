require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./models");
require("./auth/passport");

const PORT = process.env.PORT || 3500;

// routers
const userRouter = require("./routes/userRoute");
const studentRouter = require("./routes/studentRoute");
const authRoute = require("./routes/authRoute");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// index
app.get("/", (req, res) => {
  res.send("Student Management Rest Api");
});

// routes
app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/student", studentRouter);
app.use("/login", authRoute);

// listening
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // await db.sequelize.sync({ force: true }); // for development
  await db.sequelize.authenticate();
  console.log("DB connected...");
});
