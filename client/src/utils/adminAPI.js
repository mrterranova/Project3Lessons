import axios from "axios";

export default {
  // Gets all books
  getAdmins: function() {
    return axios.get("/api/admin");
  },
  // Gets the book with the given id
  getAdmin: function(id) {
    return axios.get("/api/admin/" + id);
  },
  // Deletes the book with the given id
  deleteAdmin: function(id) {
    return axios.delete("/api/admin/" + id);
  },
  // Saves a book to the database
  saveAdmin: function(adminData) {
    return axios.post("/api/admin", adminData);
  }
};