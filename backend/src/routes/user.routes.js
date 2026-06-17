// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the controller
const UserController = require("../controllers/user.controller");

// Define the routes
router.post("/", UserController.create);            // CREATE   C
router.get("/", UserController.list);               // READ     R
router.get("/:id", UserController.getOne);
router.put("/:id", UserController.update);          // UPDATE   U
router.delete("/:id", UserController.remove);   // DELETE   D

// Export the routes
module.exports = router;