import axios from "axios";

export default {
  getQuestions: function() {
    return axios.get("/api/questions");
  },
  // Gets the questions with the given id
  getQuestion: function(id) {
    return axios.get("/api/questions/" + id);
  },
  // Deletes the questions with the given id
  deleteQuestions: function(id) {
    return axios.delete("/api/questions/" + id);
  },
  // Saves a questions to the database
  saveQuestions: function(questionData) {
    return axios.post("/api/questions", questionData);
  }
};
