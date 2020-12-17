const HttpError = require("../model/http-error");
const Calendar = require("../model/Calendar");

const getEvents = async (req, res, next) => {
  let events;

  try {
    events = await Calendar.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching Events from calendar got failed",
      500
    );
    return next(error);
  }
  res.json(events);
};

const addEvents = async (req, res, next) => {
  const { id, title, start, end, desc, allDay } = req.body;
  console.log(req.body);

  const newEvent = new Calendar({
    id,
    title,
    start,
    end,
    desc,
    allDay,
  });

  console.log(newEvent);

  try {
    console.log("trying adding event");
    await newEvent.save();
  } catch (err) {
    const error = new HttpError("failed adding events", 500);
    return next(error);
  }

  res.status(201).json({
    message: "Event Added",
    id: newEvent.id,
    title: newEvent.title,
    start: newEvent.start,
    end: newEvent.end,
    desc: newEvent.desc,
    allDay: newEvent.allDay,
  });
};

const updateEvents = async (req, res, next) => {
  console.log("in updating function");

  const { id, title, start, end, desc, allDay } = req.body;
  console.log(req.body);

  // let updatedEvent

  Calendar.findById(id, (err, event) => {
    try {
      event.updateOne(
        {
          title,
          start,
          end,
          desc,
          allDay,
        },
        (err, updatedEvent) => {
          if (err) {
            console.log("error updating", err);
          } else {
            console.log("yoooooo");
            Calendar.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(201).json({
                message: "Updated event",
                id: foundUpdatedEvent.id,
                title: foundUpdatedEvent.title,
                start: foundUpdatedEvent.start,
                end: foundUpdatedEvent.end,
                desc: foundUpdatedEvent.desc,
                allDay: foundUpdatedEvent.allDay,
              });
              return foundUpdatedEvent;
            });
          }
        }
      );
    } catch (err) {
      const error = new HttpError("failed updating events", 500);
      return next(error);
    }
  });
};

const deleteEvent = async (req, res, next) => {
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Calendar.findById(id, (err, event) => {
    try {
      event.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(201).json({
            id: id,
          });
        }
      });
    } catch (err) {
      const error = new HttpError("failed deleting events", 500);
      return next(error);
    }
  });
};

module.exports = { getEvents, addEvents, updateEvents, deleteEvent };
