import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Todo App Main Components
const TodoApp = () => {
  const getAllItems = () => {
    axios
      .get(`https://6319565e8e51a64d2be271d1.mockapi.io/items`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  };

  // useState hook
  const [items, setItems] = useState(() => {
    const storageItems = getAllItems();
    // if storageItems undefined or null return []
    return storageItems ?? [];
  });

  // Handle Submit form
  const handleSubmit = (value) => {
    const newItem = {
      title: value,
      completed: false,
    };

    // POST new item to mockapi
    axios.post(`https://6319565e8e51a64d2be271d1.mockapi.io/items`, newItem)
    .then(res => {
      const newItems = [...items, res.data];
      setItems(newItems);
    });
  };

  // Handle Delete item
  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    // Delete item mockapi
    axios.delete(`https://6319565e8e51a64d2be271d1.mockapi.io/items/${id}`)
    .then(res => {
      setItems(newItems);
    });
  };

  // Handle CheckBox change
  const handleChecked = (id) => {
    const updateData = {"completed":false};
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
        updateData.completed = item.completed;
      }
      return item;
    });
    // Update item mockapi
    axios.put(`https://6319565e8e51a64d2be271d1.mockapi.io/items/${id}`,updateData)
    .then(res => {
      setItems(newItems);
    });
  };

  // Render
  return (
    <div>
      <TodoHeader></TodoHeader>
      <TodoInput handleSubmit={handleSubmit}></TodoInput>
      <TodoItems
        data={items}
        handleDelete={handleDelete}
        handleChecked={handleChecked}
      ></TodoItems>
    </div>
  );
};

//Todo Header Components
const TodoHeader = () => {
  return (
    <header className="header-container">
      <h1 className="header-tittle">Todo Function React</h1>
      <h3>Save DATA with Mockapi.io</h3>
    </header>
  );
};

// Todo Input Components
const TodoInput = (props) => {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
    // console.log(text);
  };
  return (
    <form
      style={{ display: "flex" }}
      onSubmit={(e) => {
        e.preventDefault();
        if (text.trim() !== "") {
          props.handleSubmit(text);
          setText("");
        }
      }}
    >
      <input
        className="input-todo"
        type="text"
        placeholder="Enter text here ..."
        value={text}
        onChange={handleInput}
      />
      <button className="btn-add" type="submit">
        ADD
      </button>
    </form>
  );
};

// Todo Items Components
const TodoItems = (props) => {
  return (
    <ul>
      {props.data.map((item) => (
        <li className="todo-item" key={item.id}>
          <input
            type="checkbox"
            onChange={() => {
              props.handleChecked(item.id);              
            }}
            checked={item.completed ? item.completed : ""}
          />
          <span className={item.completed ? "completed" : ""}>
            {item.title}
          </span>
          <button
            className="btn-style"
            onClick={() => {
              props.handleDelete(item.id);
            }}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoApp;
