const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  userName: { type: String, required: true }, 
  lesson: { type: String, required: true }, 
  title: { type: String, required: true },
  body: { type: String, required: true }, 
  category: { type: String, required: false},
  date: { type: Date, default: Date.now }
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
