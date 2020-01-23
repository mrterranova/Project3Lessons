const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  category: { type: String, required: true }, 
  title: { type: String, required: true }, 
  body: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Notes = mongoose.model("Lessons", notesSchema);

module.exports = Notes;