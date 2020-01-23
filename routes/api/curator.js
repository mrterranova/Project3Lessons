const router = require("express").Router();
const curatorController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(curatorController.findAll)
  .post(curatorController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(curatorController.findById)
  .put(curatorController.update)
  .delete(curatorController.remove);

module.exports = router;