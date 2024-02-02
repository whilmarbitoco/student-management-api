const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const upload = require("../multerConifg/upload");

router.get("/", studentController.index);
router.post("/", upload.single("uploaded_file"), studentController.create);
router.put("/:uuid", upload.single("uploaded_file"), studentController.update);

module.exports = router;
