// Import Schema and model utilities from Mongoose
const { Schema, model } = require("mongoose");

// Define the structure and validation rules for Task documents
const TaskSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    dueDate:{
        type: Date
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

// Create and export the Task model based on TaskSchema.
// This model provides access to documents stored in the "tasks" collection.
module.exports = model("Task", TaskSchema, "tasks");
