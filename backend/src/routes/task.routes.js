// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the project controller
const TaskController = require("../controllers/task.controller");

// Define the routes
router.get("/", TaskController.list);
router.post("/", TaskController.create);

// Export the routes
module.exports = router;