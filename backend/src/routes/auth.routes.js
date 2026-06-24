// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the controller
const AuthController = require("../controllers/auth.controller");

// Define the routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Export the routes
module.exports = router;