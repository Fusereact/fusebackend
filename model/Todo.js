const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String },
  notes: { type: String },
  startDate: { type: Date, default: Date.now },
  labels: [String],
  completed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: true,
  },
  starred: {
    type: Boolean,
    default: false,
  },

  dueDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todos", todoSchema);
