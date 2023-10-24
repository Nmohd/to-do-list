import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const apiUrl = "http://localhost:5500/api/";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const notify = (message) => toast(message);
  let message = "";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${apiUrl}tasks`);
    const data = await response.json();
    setTasks(data);
  };

  // const keyPress = (e) => {
  //   console.log("hello  ");
  //   if (e.keyCode == 13) {
  //     addTask();
  //   }
  // };

  const addTask = async () => {
    message = "Atleast type 4 or more letters.";

    if (taskInput.length < 4) return notify(message);

    const UtaskInput = taskInput[0].toUpperCase() + taskInput.slice(1);

    if (UtaskInput.trim() !== "") {
      await fetch(`${apiUrl}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: UtaskInput }),
      });

      setTaskInput("");
      fetchTasks();
    }
    message = "Task added successfully";
    notify(message);
  };

  const removeTask = async (index) => {
    await fetch(`${apiUrl}tasks/${index}`, {
      method: "DELETE",
    });
    fetchTasks();
    message = `Hurray!! You have completed your ${tasks[index]} task.`;
    notify(message);
  };

  return (
    <>
      <ToastContainer />
      <div className="gradient"></div>
      <div className=" App">
        <h1>
          <span>To Do List App </span>
        </h1>
        <div className="input-section">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index}>
                <h2>
                  <span>
                    {index + 1}. {task}
                  </span>
                </h2>
                <button onClick={() => removeTask(index)}>Completed</button>
              </li>
            ))
          ) : (
            <h2>Add task to list here..</h2>
          )}
        </ul>
      </div>
    </>
  );
};

export default TodoApp;
