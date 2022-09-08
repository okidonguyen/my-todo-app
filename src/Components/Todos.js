import React from "react";
import TodoItem from "./TodoItem";

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

export default Todos;
