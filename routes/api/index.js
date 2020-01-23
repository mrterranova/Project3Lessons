const router = require("express").Router();
const adminRoutes = require("./user");

// Book routes
router.use("/user", bookRoutes);
router.use("/admin", adminRoutes);
router.use("/curator", curatorRoutes);
router.use("/lessons", lessonsRoutes);
router.use("/notes", notesRoutes);
router.use("/bookmarked", bookmarkedRoutes)

module.exports = router;
