import { useEffect, useState } from "react";
import "./index.css";

/**
 * TypeScript interface for a Todo item
 * This defines the SHAPE of our data
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  // Typed state: array of Todo objects
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  // Load todos from localStorage (runs once)
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage (runs on change)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (): void => {
    if (!task.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>TypeScript To-Do App</h1>

      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} className="todo">
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default App;