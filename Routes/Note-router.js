const express = require("express");
var fs = require("fs");
var path = require("path");
const { check } = require("express-validator");

const noteController = require("../controllers/note-controllers");
const router = express.Router();

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.memetype === "image/jpeg" || "image/png" || "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

// const noteController = require("../controllers/note-controllers");

// const router = express.Router();

router.get("/getNotes", noteController.getNotes);

router.post("/addNote", noteController.addNote);

router.put("/updateNote", noteController.updateNote);

router.delete("/deleteNote", noteController.deleteNote);

module.exports = router;
