const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true}, 
  notes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Notes"
  }], 
  bookmarked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookmarked'
  }], 
  location: { type: String, required: false }, 
  settings: { type: String, default: "normal"}, 
  language: { type: String, default: "english"},
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
