// Import the task model
const Task = require("../models/task.model");

// Methods

// Create Task
const create = async(req,res) => {
    try{

        // Receive the data
        let body = req.body;

        // Data validation
        if(!body.title || !body.description || !body.status){
            return res.status(400).send({
                status: "error",
                message: "There are some missing data"
            });
        }

        // Create a new Task instance according to the Task model
        let taskToSave = new Task(body);

        // Save the Task object on the MongoDB
        const task = await taskToSave.save();        

        // Return a response
        return res.status(201).send({
            status: "success",
            task
        });
    } 
    catch(error){

        return res.status(500).send({
            status: "error",
            message: "Error creating a new task",
            error
        });
    }
};

// Get Tasks List
const list = async(req, res) => {
    try{

        const tasks = await Task.find();

        // Return a response
        return res.status(200).send({
            status: "success",
            tasks
        });
    }
    catch(error){

        return res.status(500).send({
            status: "error",
            message: "Error listing tasks",
            error
        });
    }    
};

// Export the controllers
module.exports = {
    list,
    create
};