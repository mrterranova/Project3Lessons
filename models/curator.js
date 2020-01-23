const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const curatorSchema = new Schema({
  location: { type: String, required: true }, 
  notes: { type: String, required: true },
  highlights: { type: String, required: false }, 
  noteLocation: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Curator = mongoose.model("Curator", curatorSchema);

module.exports = Curator;
