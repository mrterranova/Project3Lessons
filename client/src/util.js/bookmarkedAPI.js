import axios from "axios";

export default {
  // Gets all books
  getBookmarks: function() {
    return axios.get("/api/bookmarks");
  },
  // Gets the book with the given id
  getBookmark: function(id) {
    return axios.get("/api/bookmarks/" + id);
  },
  postBookmark: function(notesId, bookmarkData) {
    return axios.post("/api/user/bookmarks/" + notesId, bookmarkData);
  },
  // Deletes the book with the given id
  deleteBookmark: function(id) {
    return axios.delete("/api/bookmarks/" + id);
  },
  // Saves a book to the database
  saveBookmark: function(id, bookmarkData) {
    return axios.put("/api/bookmarks/" + id, bookmarkData);
  }
};