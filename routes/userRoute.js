const express = require("express");
const router = express.Router();
const upload = require("../multerConifg/upload");
const userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/", upload.single("uploaded_file"), userController.create);
router.get("/:uuid", userController.getOne);
router.delete("/:uuid", userController.destroy);

module.exports = router;
