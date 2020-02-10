const path = require("path");
const router = require("express").Router();
const authRoutes = require("./api/auth");
const lessonRoutes = require("./api/lessons")
const notesRoutes = require("./api/notes")
const userRoutes = require("./api/user")

// API Routes
router.use("/api", authRoutes);
router.use("/api", lessonRoutes); 
router.use("/api", notesRoutes);
router.use("/api", userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
