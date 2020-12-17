const express = require("express");
var fs = require("fs");
var path = require("path");
const { check } = require("express-validator");

const todoController = require("../controllers/todo-controllers");
const router = express.Router();

// const noteController = require("../controllers/note-controllers");

// const router = express.Router();

router.get("/getTodos", todoController.getTodos);

router.post("/addTodo", todoController.addTodo);

router.put("/updateTodo", todoController.updateTodo);

router.delete("/deleteTodo", todoController.deleteTodo);

module.exports = router;
