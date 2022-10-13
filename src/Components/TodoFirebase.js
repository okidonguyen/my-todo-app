import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import "./App.css";

const TodoApp = () => {
  
  const getAllTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));    
    console.log(querySnapshot.data());
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  };

  const handleSubmit = async (e) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: "title",
        completed: false,
        created: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      alert(err);
    }
  };

  const [tasks, setTasks] = useState(() => {
    const storageItems = getAllTasks();
    // if storageItems undefined or null return []
    return storageItems ?? [];
  });

  return (
    <div>
      <TodoInput handleSubmit={handleSubmit}></TodoInput>
      {/* <TodoItems data={tasks}></TodoItems> */}
    </div>
  );
};

const TodoInput = (props) => {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
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
        placeholder="Enter Text here"
        onChange={handleInput}
        value={text}
      />
      <button className="input-todo">Add</button>
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
