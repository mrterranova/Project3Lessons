import axios from "axios";

export default {
  // Gets all books
  getBookmarks: function() {
    return axios.get("/api/lesson");
  },
  // Gets the book with the given id
  getBookmark: function(id) {
    return axios.get("/api/lesson/" + id);
  },
  // Deletes the book with the given id
  deleteBookmark: function(id) {
    return axios.delete("/api/lesson/" + id);
  },
  // Saves a book to the database
  saveBookmark: function(bookmarkData) {
    return axios.post("/api/lesson", bookmarkData);
  }
};