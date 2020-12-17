const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String },
  description: { type: String },
  reminder: { type: Date },
  image: { type: String },
  labels: [String],
  checklist: [{ type: String }],
  archive: {
    type: Boolean,
    default: true,
  },

  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notes", noteSchema);
