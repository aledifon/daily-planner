// Import app
const app = require("./app");

// Define the port where the backend will listen
const port = 3977;

// Start the backend server
app.listen(port, () => {
    console.log("Server is running correctly, on the port " + port);
});