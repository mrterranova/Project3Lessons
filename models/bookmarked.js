const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkedSchema = new Schema({
  userName: { type: String, required: true }, 
  lessonSaved: { type: String, required: false }, 
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Bookmarked = mongoose.model("Notes", bookmarkedSchema);

module.exports = Bookmarked;