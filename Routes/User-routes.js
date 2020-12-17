const express = require("express");
const middleware = require("../middleware/check-auth");

const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", middleware, usersController.getUsers);

router.post(
  "/register",

  check("displayName").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),

  usersController.signup
);

router.post("/login", usersController.login);

// router.get("/access-token", usersController.getToken);

module.exports = router;
