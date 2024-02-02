// // Multer config for file upload

const multer = require("multer");

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = originalName.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "wb2c0-" + file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = upload;
