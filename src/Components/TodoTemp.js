import { useState } from "react";
import { v4 } from "uuid";

const data = [];

const TodoApp = () => {
  const [item, setItem] = useState(data);

  // Submit Title
  const onSubmitTitle = (title) => {
    const newItem = {
      id: v4(),
      title: title,
      completed: false,
    };
    const newData = [...item, newItem];
    setItem(newData);
  };

  // Delete item
  const onDeleteItem = (id) => {
    const newData = item.filter((ite) => ite.id !== id);
    setItem(newData);
  };

  const onChangeCheckbox = (id) => {
    const newData = item.map((ite) => {
      if (ite.id === id) {
        ite.completed = !ite.completed;
      }
      return ite;
    });
    console.log(newData);
    setItem(newData);
  };

  // Render
  return (
    <div style={{ padding: 30 }}>
      <TodoHeader />
      <TodoInput onSubmitTitle={onSubmitTitle} />
      <TodoList
        item={item}
        onDeleteItem={onDeleteItem}
        onChangeCheckbox={onChangeCheckbox}
      />
    </div>
  );
};

const TodoHeader = () => {
  return <h1>Todo App ReactJS</h1>;
};

const TodoInput = (props) => {
  const [text, setText] = useState("");
  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onSubmitButton = (e) => {
    e.preventDefault();
    props.onSubmitTitle(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmitButton}>
      <input
        type="text"
        onChange={onTextChange}
        value={text}
        placeholder="Enter here"
      />
      <button>SEND</button>
    </form>
  );
};

const TodoList = (props) => {
  return (
    <div>
      <ul>
        {props.item.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              onChange={() => {
                props.onChangeCheckbox(item.id);
              }}
              checked={item.completed}
            />
            {item.title} -{" "}
            <button
              onClick={() => {
                props.onDeleteItem(item.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
