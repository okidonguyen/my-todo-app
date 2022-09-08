import React from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

/**
 * TodoApp Components
 * @augments {Component<Props, State>}
 */
class TodoApp extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem("items")) ?? []
  };

   // Save to Local Storage and return data
  saveToLocalStorage = (data) => {
    const jsonItems = JSON.stringify(data);
    localStorage.setItem("items", jsonItems);
  };

  handleCheckboxChange = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
    this.saveToLocalStorage(this.state.todos);
  };

  deleteTodoItem = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
    this.saveToLocalStorage(this.state.todos);
  };

  addTodoItem = (message) => {
    const todoItem = {
      id: uuid(),
      title: message,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, todoItem],
    });
    this.saveToLocalStorage(this.state.todos);
  };

  render() {
    return (
      <div className="container">
        <Header />
        <AddTodo addTodoItem={this.addTodoItem} />
        <Todos
          todos={this.state.todos}
          handleChange={this.handleCheckboxChange}
          deleteTodoItem={this.deleteTodoItem}
        />
      </div>
    );
  }
}

/**
 * Header Components
 * @augments {Component<Props, State>}
 */
class Header extends React.Component {
  render() {
    return (
      <header className="header-container">
        <h1 className="header-tittle">Todo Class React</h1>
        <h3>Save to Local Storage</h3>
      </header>
    );
  }
}

/**
 * AddTodo Components
 * @augments {Component<Props, State>}
 */
class AddTodo extends React.Component {
  handleInputText = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  state = {
    title: "",
  };

  render() {
    return (
      <div>
        <form
          style={{ display: "flex" }}
          onSubmit={(e) => {
            e.preventDefault();
            this.props.addTodoItem(this.state.title);
            this.setState({
              title: "",
            });
          }}
        >
          <input
            name="todo-text"
            className="input-todo"
            type="Text"
            onChange={this.handleInputText}
            value={this.state.title}
            placeholder="Enter here ..."
          />
          <button className="btn-add" type="submit">
            Add
          </button>
          <div className="clear"></div>
        </form>
      </div>
    );
  }
}

/**
 * Todos Components
 * @augments {Component<Props, State>}
 */
class Todos extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleChange={this.props.handleChange}
              deleteTodoItem={this.props.deleteTodoItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

/**
 * TodoItem Components
 * @augments {Component<Props, State>}
 */
class TodoItem extends React.Component {
  render() {
    const { id, completed, title } = this.props.todo;
    return (
      <li className="todo-item">
        <input
          type="checkbox"
          onChange={() => {
            this.props.handleChange(id);
          }}
          checked={completed}
        />
        <span className={completed ? "completed" : ""}>{title}</span>
        <button
          className="btn-style"
          onClick={() => {
            this.props.deleteTodoItem(id);
          }}
        >
          X
        </button>
      </li>
    );
  }
}

export default TodoApp;
