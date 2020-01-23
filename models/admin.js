const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userName: { type: String, required: true}, 
  notes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Lessons"
  }], 
  date: { type: Date, default: Date.now }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
