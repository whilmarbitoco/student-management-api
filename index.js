const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const db = require("./models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  db.User.findAll().then((users) => {
    return res.send(users);
  });
});

app.post("/", upload.single("uploaded_file"), function (req, res) {
  console.log(req.file.path);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
