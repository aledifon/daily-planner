// Import the Mongoose ODM library
const mongoose = require("mongoose");

// Connect to MongoDB
const connection = async() => {
    try{

        // Connect to the local MongoDB database        
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connection established successfully");
    } 
    catch(error){

        // Log and rethrow connection errors
        console.log(error);

        throw new Error("MongoDB connection could not be established!");
    }
};

// Export the connection function
module.exports = connection;
