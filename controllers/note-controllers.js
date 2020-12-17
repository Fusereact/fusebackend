const HttpError = require("../model/http-error");
const Note = require("../model/Notes");

//var path = require("path");
//var fs = require("fs");

// const addNote = async (req, res, next) => {
//   console.log("image", req.file);
//   const {
//     id,
//     title,
//     reminder,
//     description,
//     image,
//     time,
//     checklist,
//     labels,
//     archive,
//   } = req.body.note;
//   console.log("body", req.body);
//   let newNote = new Note({
//     // noteImage: req.file.path,
//     id,
//     title,
//     reminder,
//     description,
//     image,
//     time,
//     checklist,
//     labels,
//     archive,
//   });
//   let addingNote;
//   try {
//     console.log("trying adding note");
//     addingNote = await newNote.save();
//     return res.status(201).json({
//       message: "note Added",
//       note: addingNote,
//     });
//   } catch (err) {
//     console.log("That did not go well.");
//     return res.status(404).json({
//       message: "note not Added",
//     });
//   }
// };
const addNote = async (req, res, next) => {
  const {
    title,
    description,
    reminder,
    image,
    labels,
    checklist,
    archive,
    time,
  } = req.body.note;
  console.log("note body", req.body.note);

  const newNote = new Note({
    title,
    description,
    reminder,
    image,
    labels,
    checklist,
    archive,
    time,
  });

  console.log("new note to be added", newNote);
  let addingNote;
  try {
    console.log("trying adding addingNote");
    addingNote = await newNote.save();
    return res.status(201).json({
      message: "note Added",
      note: addingNote,
    });
  } catch (err) {
    console.log("That did not go well.");
    return res.status(404).json({
      message: "note not Added",
    });
  }
};

const getNotes = async (req, res, next) => {
  let notes;
  try {
    notes = await Note.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching notes failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ notes: notes });
};
const deleteNote = async (req, res, next) => {
  console.log("dleetinggggg");

  const { id } = req.body;
  console.log(id);

  Note.findById(id, (err, note) => {
    try {
      note.remove((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted successfuly");
          res.status(200).json({
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
const updateNote = async (req, res, next) => {
  console.log("in updating function");

  const {
    id,
    title,
    description,
    reminder,
    labels,
    checklist,
    time,
    image,
    archive,
  } = req.body.note;
  console.log("note body", req.body);

  // let updatedEvent

  Note.findById({ _id: id }, (err, note) => {
    try {
      note.updateOne(
        {
          title,
          description,
          reminder,
          labels,
          checklist,
          time,
          image,
          archive,
        },
        (err, updatedNote) => {
          if (err) {
            console.log("error updating note", err);
          } else {
            console.log("yoooooo");
            Note.findById(id, (err, foundUpdatedEvent) => {
              console.log(foundUpdatedEvent);
              res.status(200).json({
                message: "Updated Note",
                id: foundUpdatedEvent.id,
                title: foundUpdatedEvent.title,
                description: foundUpdatedEvent.description,

                reminder: foundUpdatedEvent.reminder,
                image: foundUpdatedEvent.image,
                time: foundUpdatedEvent.image,
                checklist: foundUpdatedEvent.checklist,
                archive: foundUpdatedEvent.archive,
                labels: foundUpdatedEvent.labels,
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
module.exports = { addNote, getNotes, deleteNote, updateNote };
