const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const userRouter = require("./routes/userRoute");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log(path.join(__dirname, "uploads"));

app.get("/", (req, res) => {
  res.send("Student Management Rest Api");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  db.sequelize.authenticate();
  console.log("DB connected...");
});
