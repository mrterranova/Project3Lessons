import axios from "axios";

export default {
  // Gets all books
  getCuratorNotes: function() {
    return axios.get("/api/curator");
  },
  // Gets the book with the given id
  getCuratorNote: function(id) {
    return axios.get("/api/curator/" + id);
  },
  // Deletes the book with the given id
  deleteCuratorNote: function(id) {
    return axios.delete("/api/curator/" + id);
  },
  // Saves a book to the database
  saveCuratorNote: function(curatorData) {
    return axios.post("/api/curator", curatorData);
  }
};