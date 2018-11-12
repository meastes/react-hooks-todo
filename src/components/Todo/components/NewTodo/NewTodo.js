import PropTypes from 'prop-types';
import React from 'react';
import { useDescription } from './hooks';

const NewTodo = ({ onNewTodo }) => {
  const { description, handleChangeDescription, handleKeypress } = useDescription(onNewTodo);

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      value={description}
      onChange={handleChangeDescription}
      onKeyPress={handleKeypress}
      autoFocus
    />
  );
};

NewTodo.propTypes = {
  onNewTodo: PropTypes.func.isRequired,
};

export default NewTodo;
