const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonsSchema = new Schema({
  keyTerms: { type: String, required: true }, 
  title: { type: String, required: true }, 
  body: { type: String, required: true },
  scriptures: { type: String, required: true }, 
  audio: { type: String, required: false },
  curatorNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curator'
  }], 
  views: { type: Number, default: 0 }, 
  date: { type: Date, default: Date.now }
});

const Lessons = mongoose.model("Lessons", lessonsSchema);

module.exports = Lessons;
