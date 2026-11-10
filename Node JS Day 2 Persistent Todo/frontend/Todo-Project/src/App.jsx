const { useState } = require("react");

function App() {
  
  const [input, setInput] = useState(" ");
  const [todo, setTodo] = useState(null);

  async function getTodofn() {
    const response = await fetch("http://localhost:8080/todo");
    const data = await response.json();

    console.log(data.todos);
    setTodo(data.todos);
  }

  async function addTodofn() {
    const response = await fetch("http://localhost:8080/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newTodo: input,
      }),
    });

    const data = await response.json();
    console.log(data.msg);

    alert(data.msg);

    getTodofn();
    setInput(" ");
  }

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(task.id)} className="task-text">
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="empty-msg">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}
