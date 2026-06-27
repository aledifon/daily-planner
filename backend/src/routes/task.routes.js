// Import Express (HTTP)
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

// Load the project controller
const TaskController = require("../controllers/task.controller");

// Define the routes
router.post("/", authMiddleware, TaskController.create);            // CREATE   C
router.get("/", authMiddleware, TaskController.list);               // READ     R
router.get("/:id", authMiddleware, TaskController.getOne);
router.put("/:id", authMiddleware, TaskController.update);          // UPDATE   U
router.delete("/:id", authMiddleware, TaskController.remove);       // DELETE   D

// Export the routes
module.exports = router;