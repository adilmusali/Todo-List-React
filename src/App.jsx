import { useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "./components/Appbar";
import "./assets/style.css";

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem !== "") {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          { id: crypto.randomUUID(), title: newItem, completed: false },
        ];
      });
    }
    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <AppBar/>
      <div className="container">
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <FormLabel htmlFor="item">New Item</FormLabel>
          <TextField
            id="item filled-textarea"
            label="Task"
            placeholder="Add Task"
            multiline
            variant="filled"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="taskli">
              <FormLabel>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </FormLabel>
              <Button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </li>
          );
        })}
      </ul>
      </div>
    </>
  );
}

export default App;
