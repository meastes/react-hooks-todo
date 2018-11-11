import React from 'react';

export default class NewTodo extends React.Component {
  state = {
    description: '',
  };

  handleChangeDescription = (event) => {
    this.setState({ description: event.currentTarget.value });
  };

  handleKeypress = (event) => {
    if (event.key === 'Enter') {
      this.props.onNewTodo(this.state.description);
      this.setState({ description: '' });
    }
  };

  render() {
    const { description } = this.state;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={description}
        onChange={this.handleChangeDescription}
        onKeyPress={this.handleKeypress}
        autoFocus
      />
    );
  }
}
