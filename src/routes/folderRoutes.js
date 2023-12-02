const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/folderController");
const path = require("path");

const checkFolderExists = require("../middlewares/folder");
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.params.id;
    cb(null, path.join(__dirname, `../../uploads/${id}`));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/folders", fileController.createFolder);

router.put("/folders/:id", fileController.reNameFolder);

router.post(
  "/folders/:id/upload",
  checkFolderExists,
  upload.single("file"),
  fileController.uploadFile
);

router.delete("/folders/:id", fileController.deleteFolder);

module.exports = router;
