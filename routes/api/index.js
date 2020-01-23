const router = require("express").Router();
const adminRoutes = require("./admin");
const curatorRoutes = require("./curator")
const lessonsRoutes = require("./lessons")
const userRoutes = require("./user")
const bookmarkedRoutes = require("./bookmarked")
const notesRoutes = require("./notes")

// Book routes
router.use("/admin", adminRoutes);
router.use("/curator", curatorRoutes);
router.use("/lessons", lessonsRoutes);
router.use("/user", userRoutes);
router.use("/bookmarked", bookmarkedRoutes)
router.use("/notes", notesRoutes)

module.exports = router;
