// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the controller
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRegisterMiddleware = require("../middlewares/validateRegisterMiddleware");

// Define the routes
router.post("/register", validateRegisterMiddleware , AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware, AuthController.me);

// Export the routes
module.exports = router;