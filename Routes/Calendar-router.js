const express = require("express");

const { check } = require("express-validator");


const calendarController = require("../controllers/calendar-controllers");

const router = express.Router();

router.get("/" , calendarController.getEvents)

router.post("/addEvent" , calendarController.addEvents)

router.put("/" , calendarController.updateEvents)

router.delete("/" , calendarController.deleteEvent)

module.exports = router;