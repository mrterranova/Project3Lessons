//import following through node
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new instance of schema for bookmarked
const bookmarkedSchema = new Schema({
    // following fields included
  userName: { 
      type: String, 
      required: true 
    }, 
  lessonSaved: { 
      type: String, 
      required: false 
    }, 
  category: { 
      type: String, 
      required: true 
    },
  date: { 
      type: Date, 
      default: Date.now 
    }
});

// create bookmarked datatable
const Bookmarked = mongoose.model("Bookmarked", bookmarkedSchema);

// export model
module.exports = Bookmarked;