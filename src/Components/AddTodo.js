import React from "react";

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
        <form onSubmit={(e)=>{
            e.preventDefault();
            this.props.addTodoItem(this.state.title);
            this.setState({
              title: ""
            });            
          }}>
        <input
          name="todo-text"
          className="input-todo"
          type="Text"
          onChange={this.handleInputText}
          value={this.state.title}
          placeholder="Enter here ..."
        />
        <button
          className="btn-add"
          type="submit"
        >
          Add
        </button>
        <div className="clear"></div>
        </form>
      </div>
    );
  }
}

export default AddTodo;
