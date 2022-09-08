import { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./App.css";

// Todo App Main Components
const TodoApp = () => {
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://mockend.com/ptathienlap/my-todo-app/items")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  // useState hook
  const [items, setItems] = useState(() => {
    const storageItems = JSON.parse(localStorage.getItem("items"));
    // if storageItems undefined or null return [ư]
    return storageItems ?? [];
  });

  // Save to Local Storage and return data
  const saveToLocalStorage = (data) => {
    const jsonItems = JSON.stringify(data);
    localStorage.setItem("items", jsonItems);
    return data;
  };

  // Handle Submit form
  const handleSubmit = (value) => {
    const newItem = {
      id: v4(), // get unit id
      title: value,
      completed: false,
    };

    // join new array to older array
    const newItems = [...items, newItem];
    setItems(saveToLocalStorage(newItems));
  };

  // Handle Delete item
  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(saveToLocalStorage(newItems));
  };

  // Handle CheckBox change
  const handleChecked = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setItems(saveToLocalStorage(newItems));
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
      <h1 className="header-tittle">Okido Todo App</h1>
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
