import React from "react";
import { useEffect, useState } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, isDone] = React.useState([
    {
      text: useState(""),
      isDone: useState(false)
    }
  ]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const doneTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const updateTodoItem = (index) => {
    const newTodoItems = [...todos];
    const item = newTodoItems[index];
    let newItem = prompt(`Update ${item.setTodos}?`, item.setTodos);
    let todoObj = { text: newItem, isDone: false };
    newTodoItems.splice(index, 1, todoObj);
    if (newItem === null || newItem === "") {
      return;
    } else {
      item.todo = newItem;
    }
    setTodos(newTodoItems);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="texttodo">TODO LIST</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              doneTodo={doneTodo}
              removeTodo={removeTodo}
              updateTodoItem={updateTodoItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Todo({ todo, index, doneTodo, removeTodo, updateTodoItem }) {
  return (
    <div
      className="todo"
      style={{ backgroundColor: todo.isDone ? "#0BDA51" : "" }}
    >
      <span>{todo.text}</span>
      <div className="todobutton">
        <button
          onClick={() => updateTodoItem(index)}
          id="buttonupdate"
          style={{ display: todo.isDone ? "none" : "" }}
        >
          ✏️
        </button>
        <button
          onClick={() => doneTodo(index)}
          id="buttonupdate"
          style={{ display: todo.isDone ? "none" : "" }}
        >
          ✔️
        </button>
        <button onClick={() => removeTodo(index)}>🗑️</button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="formtodo">
        {}
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type Here"
        />
        {}
      </form>
    </section>
  );
}
