// Import dependencies
const express = require("express");
const cors = require("cors");

// Create the Express application
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load application routes here
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Test endpoints
app.get("/", (req, res) => {
    console.log("The root route has been called!");

    return res.status(200).json({
        project: "Daily Planner",
        status: "API running",
        author: "Alejandro Diaz"
    });
});

app.get("/tests", (req, res) => {
    console.log("My test endpoint has been executed!");

    return res.status(200).send(`
        <section>
            <h1>Daily Planner App</h1>
            <h2>First steps</h2>
            <p>This is a route</p>
        </section>
    `);
});

module.exports = app;