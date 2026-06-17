// Import Schema and model utilities from Mongoose
const { Schema, model } = require("mongoose");

// Define the structure and validation rules for User documents
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },    
    createdAt:{
        type: Date,
        default: Date.now
    }
});

// Create and export the model based on the Schema
// This model provides access to documents stored in the defined collection.
module.exports = model("User", UserSchema, "users");
