import React from "react";
import {v4 as uuid} from "uuid"; 
import Header from "../Components/Header";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import {todos as todosData} from "../data/todos";

/**
 * TodoApp Components
 * @augments {Component<Props, State>}
 */
class TodoApp extends React.Component {
  state = {
    todos: todosData,
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
  };

  deleteTodoItem = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  addTodoItem = (message) => {
    const todoItem = {
      id: uuid(),
      title: message,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, todoItem]      
    });
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

export default TodoApp;
