// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the project controller
const TaskController = require("../controllers/task.controller");

// Define the routes
router.post("/", TaskController.create);            // CREATE   C
router.get("/", TaskController.list);               // READ     R
router.get("/:id", TaskController.getOne);
router.put("/:id", TaskController.update);          // UPDATE   U
router.delete("/:id", TaskController.remove);       // DELETE   D

// Export the routes
module.exports = router;