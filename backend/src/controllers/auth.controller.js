// Import dependencies
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Methods

// Register a new user
const register = async(req,res) => {
    try{

        // Receive the data
        let body = req.body;

        // Data validation
        if(!body.name || !body.email || !body.password){
            return res.status(400).json({
                status: "error",
                message: "There are some missing data"
            });
        }

        // POSSIBLE FUTURE ENHANCEMENT:
        // TODO: Check if the email is already registered 
        // TODO: Assign default roles or permissions to the new user
        // TODO: Send a welcome email or verification email to the user
        // TODO: Generate a JWT token for the user upon successful registration
        // TODO: Create a user profile or settings document associated with the new user

        // Encrypt the password before saving the user
        const saltRounds = 10;
        body.password = await bcrypt.hash(body.password, saltRounds);   

        // OPTION 1: Create a document in memory and save it later.
        // Useful when you want full control before persisting the document.
        // const resource = new User(body);
        // await resource.save();

        // OPTION 2: Create and save the document in a single step.
        // More concise when no intermediate processing is needed.
        const resource = await User.create(body);

        // select:false only affects MongoDB queries.
        // User.create() returns the newly created document, including password.
        resource.password = undefined; 

        // Return a response
        return res.status(201).json({
            status: "success",
            resource
        });
    } 
    catch(error){

        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Error registering a new user"
        });
    }
};

// Login a user
const login = async(req,res) => {
    try{

        // Receive the data
        let body = req.body;

        // Data validation
        if(!body.email || !body.password){
            return res.status(400).json({
                status: "error",
                message: "There are some missing data"
            });
        }

        // Find user by email (Enables the select of the password field, which is 
        // excluded by default in the User model)
        const user = await User.findOne({ email: body.email }).select("+password"); 

        if(!user){
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials"
            });
        }

        // Verify password (Compare if the password provided in the request matches 
        // the hashed password stored in the database)
        const isPasswordOk = await bcrypt.compare(body.password, user.password);
                
        if(!isPasswordOk){
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials"
            });
        }

        // Verify the Jwt secret is configured on the env. vars.
        if(!process.env.JWT_SECRET)
            throw new Error("JWT_SECRET is not configured!");

        // Generate JWT (If jwt.signs() fails, it will throw an exception, caught by the catch block)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Return a response
        return res.status(200).json({
            status: "success",
            token
        });
    } 
    catch(error){

        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Error logging in a user"
        });
    }
};

// Export the controllers
module.exports = {
    register,
    login
};