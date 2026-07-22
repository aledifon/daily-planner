// Import Express (HTTP)
const express = require("express");
const router = express.Router();

// Load the controller
const TestController = require("../controllers/tests.controller");

// Define the routes
router.get("/", TestController.getApiInfo);
router.get("/test", TestController.testEndpoint);

// Export the routes
module.exports = router;