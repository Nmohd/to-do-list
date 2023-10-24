const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(bodyParser.json());

// Simple in-memory database for tasks
let tasks = ["Task 1", "Task 2"];

// Routes
app.get("/api/tasks", (req, res) => {
  //   res.json({ message: "Hello from server!" });
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { task } = req.body;

  if (task.trim() !== "") {
    tasks.push(task);

    res.status(201).json({ message: "Task added successfully" });
  } else {
    res.status(400).json({ message: "Task cannot be empty" });
  }
});

app.delete("/api/tasks/:index", (req, res) => {
  const { index } = req.params;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.json({ message: "Task removed successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
