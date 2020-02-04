import axios from "axios";

export default {
  // Gets all books
  getBookmarks: function() {
    return axios.get("/api/curator/notes");
  },
  // Gets the book with the given id
  getBookmark: function(id) {
    return axios.get("/api/curator/notes/" + id);
  },
  postBookmark: function(LessonId, bookmarkData) {
    return axios.post("/api/admin/lesson/post/" + LessonId, bookmarkData);
  },
  // Deletes the book with the given id
  deleteBookmark: function(id) {
    return axios.delete("/api/curator/notes/" + id);
  },
  // Saves a book to the database
  saveBookmark: function(id, bookmarkData) {
    return axios.put("/api/curator/notes/" + id, bookmarkData);
  }
};