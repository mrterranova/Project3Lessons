import axios from "axios";

export default {
  // Gets all books
  getBookmarks: function() {
    return axios.get("/api/notes");
  },
  // Gets the book with the given id
  getBookmark: function(id) {
    return axios.get("/api/notes/" + id);
  },
  saveBookmark: function(userId, bookmarkData) {
    return axios.post("/api/user/note/" + userId, bookmarkData);
  },
  // Deletes the book with the given id
  deleteBookmark: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Saves a book to the database
  saveBookmark: function(id, bookmarkData) {
    return axios.put("/api/notes/" + id, bookmarkData);
  }
};