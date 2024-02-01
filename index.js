const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const path = require("path");

// routers
const userRouter = require("./routes/userRoute");
const studentRouter = require("./routes/studentRoute");
const loginRouter = require("./routes/loginRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// index
app.get("/", (req, res) => {
  res.send("Student Management Rest Api");
});

// routes
app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/login", loginRouter);

// listening
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // await db.sequelize.sync({ force: true }); // for development
  await db.sequelize.authenticate();
  console.log("DB connected...");
});
