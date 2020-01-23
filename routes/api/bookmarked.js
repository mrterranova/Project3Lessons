const router = require("express").Router();
const bookmarkedController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(bookmarkedController.findAll)
  .post(bookmarkedController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bookmarkedController.findById)
  .put(bookmarkedController.update)
  .delete(bookmarkedController.remove);

module.exports = router;