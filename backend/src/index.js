// Import dependencies
const app = require("./app");
const connectDB = require("./config/db");

// Load environment variables from the .env file into process.env
require("dotenv").config();

// Backend server port
const port = process.env.PORT;

// Connect to MongoDB and start the Express server
async function startServer() {

    try{
        // Assure the MongoDB Connection before starting the Node server
        await connectDB();    

        // Start the backend server through Express and listen for incoming requests
        app.listen(port, () => {
            console.log("Server is running correctly, on the port " + port);
        });
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }    
};

startServer();
