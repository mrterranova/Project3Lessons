import axios from "axios";

export default {
  // Gets all books
  getLessons: function() {
    return axios.get("/api/lesson");
  },
  // Gets the book with the given id
  getLesson: function(id) {
    return axios.get("/api/lesson/" + id);
  },
  // Deletes the book with the given id
  deleteLesson: function(id) {
    return axios.delete("/api/lesson/" + id);
  },
  // Saves a book to the database
  saveLesson: function(lessonData) {
    return axios.post("/api/lesson", lessonData);
  }
};