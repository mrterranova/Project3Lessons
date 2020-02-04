import axios from "axios";

export default {
  // Gets all books
  getLessons: function() {
    return axios.get("/api/lessons");
  },
  // Gets the book with the given id
  getLesson: function(id) {
    return axios.get("/api/lesson/" + id);
  },
  // Saves a book to the database
  postLesson: function(bookmarkData) {
      return axios.post("/api/admin/lesson/post", bookmarkData);
    },
  // Deletes the book with the given id
  deleteLesson: function(id) {
    return axios.delete("/api/admin/lesson/delete/" + id);
  },
  // Saves a book to the database
  saveLesson: function(id, bookmarkData) {
    return axios.put("/api/admin/lesson/update/" + id, bookmarkData);
  }
};