import React from "react";

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
        onClick={()=>{
          this.props.deleteTodoItem(id);
        }}
        >X</button>
      </li>
    );
  }
}

export default TodoItem;
