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

const testRoutes = require("./routes/tests.routes");

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// root & test endpoints
app.use('/', testRoutes);

module.exports = app;