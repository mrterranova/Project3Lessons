const router = require("express").Router();
const lessonsController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(lessonsController.findAll)
  .post(lessonsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(lessonsController.findById)
  .put(lessonsController.update)
  .delete(lessonsController.remove);

module.exports = router;