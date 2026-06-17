// Import the resource model
const Task = require("../models/task.model");

// Methods

// Create resource
const create = async(req,res) => {
    try{

        // Receive the data
        let body = req.body;

        // Data validation
        if(!body.title || !body.description || !body.status){
            return res.status(400).json({
                status: "error",
                message: "There are some missing data"
            });
        }

        // Create a new Task instance according to the Task model
        let taskToSave = new Task(body);

        // Save the Task object on the MongoDB
        const task = await taskToSave.save();        

        // Return a response
        return res.status(201).json({
            status: "success",
            task
        });
    } 
    catch(error){

        return res.status(500).json({
            status: "error",
            message: "Error creating a new task",
            error
        });
    }
};

// Get resources List
const list = async(req, res) => {
    try{

        const tasks = await Task.find();

        // Return a response
        return res.status(200).json({
            status: "success",
            tasks
        });
    }
    catch(error){

        return res.status(500).json({
            status: "error",
            message: "Error listing tasks",
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
                
        const task = await Task.findById(id)
        
        if(!task){

            // Return a negative response (Task not found)
            return res.status(404).json({
                status: "error",
                message: "Task with id = " + id + " not found"
            });
        }

        // Return a positive response (Task found)
        return res.status(200).json({
            status: "success",
            task
        });
        
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error getting task" ,
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
        if(!body.title || !body.description || !body.status){
            return res.status(400).json({
                status: "error",
                message: "There are some missing data"
            });
        }        
                
        const updatedTask = await Task.findByIdAndUpdate(id, body, {new: true});
        
        if(!updatedTask){

            // Return a negative response (Task not found)
            return res.status(404).json({
                status: "error",
                message: "Task with id = " + id + " not found"
            });
        }

        // Return a positive response (Task found)
        return res.status(200).json({
            status: "success",
            taskUpdate: updatedTask
        });
        
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error updating task" ,
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
        
        const deletedTask = await Task.findByIdAndDelete(id);        

        if(!deletedTask){

            // Return a negative response (Task not found)
            return res.status(404).json({
                status: "error",
                message: "Task with id = " + id + " not found"
            });
        }

        // Return a positive response (Task found)
        return res.status(200).json({
            status: "success",
            deletedTask
        });
    }
    catch(error){

        // Return a negative response (Error)
        return res.status(500).json({
            status: "error",
            message: "Error deleting task" ,
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