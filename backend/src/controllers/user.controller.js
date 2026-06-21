// Import dependencies
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Methods

// Create resource
const create = async(req,res) => {
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

        return res.status(500).json({
            status: "error",
            message: "Error creating a new user",
            error
        });
    }
};

// Get resources List
const list = async(req, res) => {
    try{

        const resources = await User.find();

        // Return a response
        return res.status(200).json({
            status: "success",
            resources
        });
    }
    catch(error){

        return res.status(500).json({
            status: "error",
            message: "Error listing users",
            error
        });
    }    
};

// Get resource by Id
const getOne = async(req, res) => {
    try{

        // Receive the id param
        let id = req.params.id;

        // Data validation (will be performed with Mongoose in the future)        
                
        const resource = await User.findById(id)
        
        if(!resource){

            // Return a negative response (resource not found)
            return res.status(404).json({
                status: "error",
                message: "User with id = " + id + " not found"
            });
        }

        // Return a positive response (resource found)
        return res.status(200).json({
            status: "success",
            resource
        });
        
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error getting user" ,
            error
        });
    }      
};

// Update resource by Id
const update = async(req, res) => {
    try{

        // Receive the id param
        let id = req.params.id;

        // Id validation (will be performed with Mongoose in the future)        

        // Receive the new task data
        let body = req.body;
        
        // Data validation
        if(!body.name || !body.email || !body.password){
            return res.status(400).json({
                status: "error",
                message: "There are some missing data"
            });
        }
                
        const updatedResource = await User.findByIdAndUpdate(id, body, {new: true});
        
        if(!updatedResource){

            // Return a negative response (resource not found)
            return res.status(404).json({
                status: "error",
                message: "User with id = " + id + " not found"
            });
        }

        // Return a positive response (resource found)
        return res.status(200).json({
            status: "success",
            resourceUpdate: updatedResource
        });
        
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error updating user" ,
            error
        });
    }      
};

// Delete resource by Id
const remove = async(req, res) => {
    try{

        // Receive the id param
        let id = req.params.id;

        // Id validation (will be performed with Mongoose in the future)
        
        const deletedResource = await User.findByIdAndDelete(id);        

        if(!deletedResource){

            // Return a negative response (resource not found)
            return res.status(404).json({
                status: "error",
                message: "User with id = " + id + " not found"
            });
        }

        // Return a positive response (resource found)
        return res.status(200).json({
            status: "success",
            deletedResource
        });
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error deleting user" ,
            error
        });
    }      
};

// Export the controllers
module.exports = {
    create,
    list,
    getOne,    
    update,
    remove
};